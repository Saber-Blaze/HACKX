// Sample patient data (replace with actual data fetching logic)
const patientData = {
    full_name: "John Doe",
    date_of_birth: "1980-05-15",
    gender: "Male",
    phone_number: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    emergency_contact_number: "+1 (555) 987-6543",
    blood_pressure: "120/80 mmHg",
    body_temperature: "98.6°F",
    heart_rate: "72 bpm",
    respiratory_rate: "14 breaths/min",
    height: "5'10\" (178 cm)",
    weight: "160 lbs (72.5 kg)",
    chronic_conditions: ["Hypertension", "Type 2 Diabetes"],
    blood_type: "A+"
};

// Wait for the DOM to be fully loaded before running any code
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.dashboard-section');

    // Function to switch active section
    function switchSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        if (sectionId === 'medications' && !document.querySelector('#medicationTable tbody tr')) {
            populateMedicationTable();
        } else if (sectionId === 'adherence') {
            populateAdherenceSection();
        } else if (sectionId === 'overview') {
            populateOverview();
        }
    }

    // Event listeners for nav links
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('data-section');
                switchSection(sectionId);
            });
        });
    } else {
        console.error('Navigation links not found');
    }

    // Sample medication data
    const medications = [
        {
            name: "Aspirin",
            frequency: "Twice daily",
            duration: "10 days",
            startDate: "2023-04-01",
            endDate: "2023-04-10",
            specialInstructions: "Take with food"
        },
        {
            name: "Lisinopril",
            frequency: "Once daily",
            duration: "Until further notice",
            startDate: "2023-03-15",
            endDate: "",
            specialInstructions: "Take in the morning"
        }
    ];

    // Function to populate the medication table
    function populateMedicationTable() {
        const tableBody = document.querySelector("#medicationTable tbody");
        if (!tableBody) {
            console.error("Medication table body not found");
            return;
        }

        tableBody.innerHTML = ''; // Clear existing rows

        medications.forEach(med => {
            addMedicationToTable(med, tableBody);
        });
    }

    // Function to add a single medication to the table
    function addMedicationToTable(med, tableBody) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${med.name}</td>
            <td>${med.frequency}</td>
            <td>${med.duration}</td>
            <td>${med.startDate}</td>
            <td>${med.endDate || 'N/A'}</td>
            <td>${med.specialInstructions}</td>
        `;
        tableBody.appendChild(row);
    }

    // Function to handle adding a new medication
    function handleAddMedication() {
        const name = document.getElementById('medName').value;
        const frequency = document.getElementById('medFrequency').value;
        const duration = document.getElementById('medDuration').value;
        const startDate = document.getElementById('medStartDate').value;
        const endDate = document.getElementById('medEndDate').value;
        const specialInstructions = document.getElementById('medInstructions').value;

        if (!name || !frequency || !duration || !startDate) {
            alert('Please fill in all required fields');
            return;
        }

        const newMedication = {
            name,
            frequency,
            duration,
            startDate,
            endDate: endDate || 'N/A',
            specialInstructions
        };

        medications.push(newMedication);

        const tableBody = document.querySelector("#medicationTable tbody");
        addMedicationToTable(newMedication, tableBody);

        // Clear input fields
        document.getElementById('medName').value = '';
        document.getElementById('medFrequency').value = '';
        document.getElementById('medDuration').value = '';
        document.getElementById('medStartDate').value = '';
        document.getElementById('medEndDate').value = '';
        document.getElementById('medInstructions').value = '';
    }

    // Add event listener for the Add Medication button
    const addMedicationButton = document.getElementById('addMedication');
    if (addMedicationButton) {
        addMedicationButton.addEventListener('click', handleAddMedication);
    } else {
        console.warn('Add Medication button not found');
    }

    // Function to populate the adherence section
    function populateAdherenceSection() {
        document.getElementById('patientName').textContent = patientData.full_name;
        document.getElementById('patientDOB').textContent = patientData.date_of_birth;
        document.getElementById('patientGender').textContent = patientData.gender;
        document.getElementById('patientPhone').textContent = patientData.phone_number;
        document.getElementById('patientEmail').textContent = patientData.email;
        document.getElementById('emergencyContact').textContent = patientData.emergency_contact_number;
        document.getElementById('bloodPressure').textContent = patientData.blood_pressure;
        document.getElementById('bodyTemperature').textContent = patientData.body_temperature;
        document.getElementById('heartRate').textContent = patientData.heart_rate;
        document.getElementById('respiratoryRate').textContent = patientData.respiratory_rate;
        document.getElementById('height').textContent = patientData.height;
        document.getElementById('weight').textContent = patientData.weight;
        document.getElementById('bloodType').textContent = patientData.blood_type;

        updateChronicConditionsList();

        // Add event listener for adding new condition
        const addConditionButton = document.getElementById('addCondition');
        addConditionButton.addEventListener('click', addChronicCondition);

        // Add event listeners for delete buttons
        const deleteButtons = document.querySelectorAll('.delete-condition');
        deleteButtons.forEach(button => {
            button.addEventListener('click', deleteChronicCondition);
        });
    }

    // Initialize the dashboard with overview section
    if (document.getElementById('overview')) {
        switchSection('overview');
    } else {
        console.error('Overview section not found');
    }

    // Handle logout
    const logoutButton = document.querySelector('.logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            console.log('Logout clicked');
            // Implement logout functionality here
        });
    } else {
        console.warn('Logout button not found');
    }

    // Handle notifications
    // const notificationsButton = document.querySelector('.notifications');
    // notificationsButton.addEventListener('click', function() {
    //     console.log('Notifications clicked');
    //     // Implement notifications functionality here
    // });
});

// Functions that don't directly manipulate the DOM can be outside the DOMContentLoaded event
function populateMedicationTable() {
    // Implementation for populating medication table
    console.log("Populating medication table");
}

// Function to handle editing health metrics
function handleEdit(event) {
    const field = event.target.dataset.field;
    const span = document.getElementById(field);
    const currentValue = span.textContent;

    // Create input field
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentValue;
    input.className = 'edit-input';

    // Create save button
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'save-btn';

    // Create cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.className = 'cancel-btn';

    // Replace span with input and buttons
    span.innerHTML = '';
    span.appendChild(input);
    span.appendChild(saveBtn);
    span.appendChild(cancelBtn);

    // Hide edit button
    event.target.style.display = 'none';

    // Add event listeners for save and cancel buttons
    saveBtn.addEventListener('click', () => saveEdit(field, input.value, span, event.target));
    cancelBtn.addEventListener('click', () => cancelEdit(field, currentValue, span, event.target));
}

// Function to save edited value
function saveEdit(field, newValue, span, editBtn) {
    patientData[field.toLowerCase()] = newValue;
    span.textContent = newValue;
    editBtn.style.display = 'inline';
}

// Function to cancel edit
function cancelEdit(field, originalValue, span, editBtn) {
    span.textContent = originalValue;
    editBtn.style.display = 'inline';
}

function updateChronicConditionsList() {
    const chronicConditionsList = document.getElementById('chronicConditionsList');
    chronicConditionsList.innerHTML = '';
    patientData.chronic_conditions.forEach((condition, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${condition}
            <button class="delete-condition" data-index="${index}">Delete</button>
        `;
        chronicConditionsList.appendChild(li);
    });

    // Add event listeners for delete buttons
    const deleteButtons = document.querySelectorAll('.delete-condition');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteChronicCondition);
    });
}

function addChronicCondition() {
    const newConditionInput = document.getElementById('newCondition');
    const newCondition = newConditionInput.value.trim();

    if (newCondition) {
        patientData.chronic_conditions.push(newCondition);
        updateChronicConditionsList();
        newConditionInput.value = '';
    } else {
        alert('Please enter a valid condition');
    }
}

function deleteChronicCondition(event) {
    const index = event.target.dataset.index;
    patientData.chronic_conditions.splice(index, 1);
    updateChronicConditionsList();
}

// Add this function to populate the overview section
function populateOverview() {
    document.getElementById('overviewName').textContent = patientData.full_name;
    document.getElementById('overviewBloodType').textContent = patientData.blood_type;
    
    // You can set a mock next appointment date
    document.getElementById('nextAppointment').textContent = '2024-09-15';

    document.getElementById('totalMedications').textContent = medications.length;
    
    // Set a mock next dose
    document.getElementById('nextDose').textContent = 'Aspirin - Today at 8:00 PM';

    // Populate recent medications
    const recentMedicationsList = document.getElementById('recentMedications');
    recentMedicationsList.innerHTML = '';
    medications.slice(0, 3).forEach(med => {
        const li = document.createElement('li');
        li.textContent = `${med.name} - ${med.frequency}`;
        recentMedicationsList.appendChild(li);
    });

    // Set mock adherence rate and last missed dose
    document.getElementById('adherenceRate').textContent = '95%';
    document.getElementById('lastMissedDose').textContent = '2024-08-28';

    // Populate recent alerts (you can customize this based on your alerts logic)
    const recentAlertsList = document.getElementById('recentAlertsList');
    recentAlertsList.innerHTML = '';
    const mockAlerts = [
        'Refill needed for Lisinopril',
        'Upcoming appointment on 2024-09-15',
        'Blood pressure check due'
    ];
    mockAlerts.forEach(alert => {
        const li = document.createElement('li');
        li.textContent = alert;
        recentAlertsList.appendChild(li);
    });

    // Populate upcoming reminders (you can customize this based on your reminders logic)
    const upcomingRemindersList = document.getElementById('upcomingRemindersList');
    upcomingRemindersList.innerHTML = '';
    const mockReminders = [
        'Take Aspirin at 8:00 PM',
        'Blood glucose test tomorrow morning',
        'Schedule follow-up appointment'
    ];
    mockReminders.forEach(reminder => {
        const li = document.createElement('li');
        li.textContent = reminder;
        upcomingRemindersList.appendChild(li);
    });

    // Populate health metrics
    document.getElementById('overviewBloodPressure').textContent = patientData.blood_pressure;
    document.getElementById('overviewHeartRate').textContent = patientData.heart_rate;
    document.getElementById('overviewWeight').textContent = patientData.weight;
}

// Call populateOverview when the page loads
document.addEventListener('DOMContentLoaded', function() {
    populateOverview();
});
