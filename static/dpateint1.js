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

        const chronicConditionsList = document.getElementById('chronicConditionsList');
        chronicConditionsList.innerHTML = '';
        patientData.chronic_conditions.forEach(condition => {
            const li = document.createElement('li');
            li.textContent = condition;
            chronicConditionsList.appendChild(li);
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
