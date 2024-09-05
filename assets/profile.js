// Sample patient data (replace with actual data fetching logic)

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

        if (sectionId === 'medications') {
            populateMedicationTable(); // Ensure this is called regardless of table content
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
    // const medications = {
    //     medi: [
    //         {
    //             medication_name: "Aspirin",
    //             frequency: "Once a day",
    //             dosage: "100mg",
    //             start_date: "2023-01-01",
    //             end_date: "2023-12-31",
    //             instruction: "Take with food"
    //         },
    //         // Add more medication objects as needed
    //     ]
    // };

    // Function to populate the medication table
    // function populateMedicationTable() {
    //     const tableBody = document.querySelector("#medicationTable tbody");
    //     if (!tableBody) {
    //         console.error("Medication table body not found");
    //         return;
    //     }

    //     console.log('hello');
    //     console.log(medications); // Log the medications object

    //     tableBody.innerHTML = ''; // Clear existing rows

    //     // Ensure medications is defined and is an array
    //     const meds = Array.isArray(medications) ? medications : []; // Updated to use medications directly
    //     if (meds.length === 0) {
    //         console.warn("No medications available to display.");
    //         return; // Exit the function if there are no medications
    //     }

    //     meds.forEach(med => {
    //         const row = document.createElement("tr");
    //         row.innerHTML = `
    //             <td>${med.medication_name}</td>
    //             <td>${med.frequency}</td>
    //             <td>${med.dosage}</td>
    //             <td>${med.start_date}</td>
    //             <td>${med.end_date}</td>
    //             <td>${med.instruction}</td>
    //         `;
    //         tableBody.appendChild(row);
    //     });
    // }

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
