# predict.py
import itertools
import torch
import torch.nn as nn
import numpy as np
import pandas as pd
from sklearn import preprocessing
from .models import Medication

def fetch_medicin():
    medications = Medication.objects.filter(patient='PA_1')  # Assuming 'PA_1' is the user's ID
    medicine_names = [med.medication_name for med in medications]
    return medicine_names





class ADEP(nn.Module):
    def __init__(self, input_size, label_size):
        super(ADEP, self).__init__()
        self.encoder = nn.Sequential(
            nn.Linear(input_size, 4096),
            nn.BatchNorm1d(4096),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(4096, 2048),
            nn.BatchNorm1d(2048),
            nn.ReLU(),
            nn.Dropout(0.2)
        )
        self.decoder = nn.Sequential(
            nn.Linear(2048, 4096),
            nn.BatchNorm1d(4096),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(4096, input_size),
            nn.Sigmoid()
        )
        self.discriminator = nn.Sequential(
            nn.Linear(2048, 512),
            nn.BatchNorm1d(512),
            nn.ReLU(),
            nn.Linear(512, 256),
            nn.BatchNorm1d(256),
            nn.ReLU(),
            nn.Linear(256, 1),
            nn.Sigmoid()
        )
        self.classifier = nn.Sequential(
            nn.Linear(2048, 512 + 256),
            nn.BatchNorm1d(512 + 256),
            nn.Dropout(0.2),
            nn.ReLU(),
            nn.Linear(512 + 256, 256),
            nn.BatchNorm1d(256),
            nn.ReLU(),
            nn.Linear(256, label_size),
            nn.LogSoftmax(dim=1)
        )

    def forward(self, x):
        encoded = self.encoder(x)
        decoded = self.decoder(encoded)
        classified = self.classifier(encoded)
        discriminated = self.discriminator(encoded)
        return decoded, classified, discriminated


def load_model(file_path, input_size, label_size):
    model = ADEP(input_size, label_size)
    model.load_state_dict(torch.load(file_path))
    model.eval()
    return model


def predict_interaction(model, df_drug, drug1, drug2, le):
    device = next(model.parameters()).device

    # Get features for both drugs
    drugA = df_drug[df_drug['name'] == drug1].drop(columns=['name']).values.astype('float32')
    drugB = df_drug[df_drug['name'] == drug2].drop(columns=['name']).values.astype('float32')

    # Combine features
    combined = np.concatenate([drugA.flatten(), drugB.flatten()])

    # Convert to tensor and add batch dimension
    input_tensor = torch.tensor(combined).unsqueeze(0).to(device)

    # Make prediction
    with torch.no_grad():
        _, classified, _ = model(input_tensor)
        predicted_class = torch.argmax(classified, dim=1).item()

    # Convert predicted class back to original label
    predicted_interaction = le.inverse_transform([predicted_class])[0]

    return predicted_interaction


def get_dataset(ds_name):
    if ds_name == 'DS1':
        df_drug = pd.read_pickle('/kaggle/input/adep-dataset/Data/DS1/df.pkl')
        conn = sqlite3.connect('/kaggle/input/adep-dataset/Data/DS1/event.db')
        extraction = pd.read_sql('SELECT * FROM extraction;', conn)
        extraction.drop(columns=['index'], inplace=True)
        df_drug = feature_extractor(df_drug, ['side', 'target', 'enzyme', 'pathway', 'smile'])
    elif ds_name == 'DS2':
        df_drug = pd.read_csv('/kaggle/input/adep-dataset/Data/DS2/drug_information_1258.csv')
        extraction = pd.read_csv('/kaggle/input/adep-dataset/Data/DS2/drug_interaction.csv')
        extraction.drop(columns=['index', "Unnamed: 0"], inplace=True)
        df_drug = feature_extractor(df_drug, ['target', 'enzyme', 'smile'])
    else:
        raise ValueError("Unsupported dataset")

    extraction['side'] = extraction['mechanism'] + ' ' + extraction['action']
    extraction.drop(columns=['mechanism', 'action'], inplace=True)
    df_drug.drop(columns=['id'], inplace=True, errors='ignore')

    le = preprocessing.LabelEncoder()
    extraction['side'] = le.fit_transform(extraction['side'])

    print(f"df_drug shape: {df_drug.shape}")
    print(f"extraction shape: {extraction.shape}")

    return df_drug, extraction, le


if __name__ == '__main__':
    ds_name = 'DS2'  # Specify the dataset name
    df_drug, extraction, le = get_dataset(ds_name)

    input_size = (df_drug.shape[1] - 1) * 2  # Subtract 1 for 'name' column, multiply by 2 for drug pair
    label_size = len(extraction['side'].unique())

    # Load the trained model
    model = load_model('adep_model.pth', input_size, label_size)
    list_med = fetch_medicin()

    for drug1, drug2 in itertools.combinations(list_med, 2):
        interaction = predict_interaction(model, df_drug, drug1, drug2, le)
        print(f"Predicted interaction between {drug1} and {drug2}: {interaction}") # Example usage
