from datetime import date
import json
from django.shortcuts import render
from .models import PatientRecord,Medication
# Create your views here.
class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, date):
            return obj.isoformat()  # Convert date to ISO format
        return super().default(obj)

def home(request):
    # Fetch the patient and their medications
    patient = PatientRecord.objects.get(uid='PA_1')
    medications = Medication.objects.filter(patient='PA_1')


    # Serialize medications
    # medi = [
    #     {
    #         'name': med.medication_name,
    #         'frequency': med.frequency,
    #         'duration': med.dosage,
    #         'start_date': med.start_date,
    #         'end_date': med.end_date,
    #         'instruction': med.instruction,
    #     }
    #     for med in medications
    # ]

    # json_data = json.dumps(medi, cls=DateEncoder, indent=4)
    # print(json_data)
    print(patient)
    print(medications)
    context = {
        'patient': patient,
        'medication': medications,  # Pass the list of medications
    }
    return render(request, 'profile.html', context)
