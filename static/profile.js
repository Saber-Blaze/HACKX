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
        // Remove 'active' class from all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Add 'active' class to the selected section
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active');
        } else {
            console.error(`Section with id '${sectionId}' not found`);
            return; // Exit the function if the section is not found
        }

        // Update active state in navigation
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        } else {
            console.warn(`Nav link for section '${sectionId}' not found`);
        }

        // Handle specific section behaviors
        if (sectionId === 'medications' && !document.querySelector('#medicationTable tbody tr')) {
            populateMedicationTable();
        } else if (sectionId === 'adherence') {
            populateAdherenceSection();
        } else if (sectionId === 'reminders') {
            const reminderInput = document.getElementById('reminderInput');
            const addReminderBtn = document.getElementById('addReminderBtn');
            if (reminderInput && addReminderBtn) {
                reminderInput.style.display = 'inline-block';
                addReminderBtn.style.display = 'inline-block';
                setupReminderFunctionality();
            } else {
                console.warn('Reminder input or button not found');
            }
        }
        
        if (sectionId === 'overview') {
            populateOverview();
        }

        if (sectionId === 'alerts') {
            updateRefillAlerts();
        }
    }

    // Event listeners for nav links
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('data-section');
                if (sectionId) {
                    switchSection(sectionId);
                } else {
                    console.warn('No data-section attribute found on nav link:', link);
                    // Fallback to using the href attribute if data-section is not present
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        switchSection(href.slice(1));
                    } else {
                        console.error('Unable to determine section for nav link:', link);
                    }
                }
            });
        });
    } else {
        console.error('Navigation links not found');
    }

    // Sample medication data
    const medications =[
    {
        "medication_name": "Acetaminophen",
        "frequency": 3,
        "dosage": 5,
        "start_date": "2024-09-05",
        "end_date": "2024-09-10",
        "instruction": "after every meal"
    },
    {
        "medication_name": "Antibiotics",
        "frequency": 1,
        "dosage": 3,
        "start_date": "2024-09-05",
        "end_date": "2024-09-08",
        "instruction": "every morning empty stomach"
    }
]

    // Function to populate the medication table
    function populateMedicationTable() {
        const tableBody = document.querySelector("#medicationTable tbody");
        if (!tableBody) {
            console.error("Medication table body not found");
            return;
        }

       
        
        console.log(`Populated medication table with ${medications.length} medications`);
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

    // Function to set up reminder functionality
    function setupReminderFunctionality() {
        const reminderInput = document.getElementById('reminderInput');
        const reminderDateTime = document.getElementById('reminderDateTime');
        const addReminderBtn = document.getElementById('addReminderBtn');
        const reminderList = document.getElementById('reminderList');

        addReminderBtn.addEventListener('click', addReminder);

        function addReminder() {
            const reminderText = reminderInput.value.trim();
            const dateTime = reminderDateTime.value;

            if (reminderText !== '' && dateTime !== '') {
                const reminderDate = new Date(dateTime);
                const reminderItem = {
                    text: reminderText,
                    date: reminderDate
                };

                // Add to reminders list
                addReminderToList(reminderItem);

                // Update overview section
                updateOverviewReminders();

                reminderInput.value = '';
                reminderDateTime.value = '';

                // Schedule the reminder
                const now = new Date();
                const timeUntilReminder = reminderDate - now;

                if (timeUntilReminder > 0) {
                    setTimeout(() => {
                        alert(`Reminder: ${reminderText}`);
                        // Update the reminder status in the list
                        updateReminderStatus(reminderItem);
                    }, timeUntilReminder);
                }

                console.log('Reminder added:', reminderItem); // Debug log
            }
        }

        function addReminderToList(reminder) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="reminder-text">${reminder.text}</span>
                <span class="reminder-date">${reminder.date.toLocaleString()}</span>
                <button class="delete-reminder">Delete</button>
            `;
            
            reminderList.prepend(li);

            // Add delete functionality
            const deleteBtn = li.querySelector('.delete-reminder');
            deleteBtn.addEventListener('click', () => {
                li.remove();
                updateOverviewReminders();
            });
        }

        function updateReminderStatus(reminder) {
            const reminderItems = reminderList.querySelectorAll('li');
            reminderItems.forEach(item => {
                const itemText = item.querySelector('.reminder-text').textContent;
                const itemDate = new Date(item.querySelector('.reminder-date').textContent);
                if (itemText === reminder.text && itemDate.getTime() === reminder.date.getTime()) {
                    item.classList.add('completed');
                }
            });
            updateOverviewReminders();
        }

        // Allow adding reminder with Enter key
        reminderInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addReminder();
            }
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

function updateOverviewReminders() {
    const upcomingRemindersList = document.getElementById('upcomingRemindersList');
    upcomingRemindersList.innerHTML = '';
    const reminderItems = document.querySelectorAll('#reminderList li');
    const now = new Date();
    let count = 0;

    console.log('Total reminders:', reminderItems.length); // Debug log

    reminderItems.forEach(item => {
        if (count >= 3) return; // Limit to 3 upcoming reminders
        const itemText = item.querySelector('.reminder-text').textContent;
        const itemDate = new Date(item.querySelector('.reminder-date').textContent);
        
        console.log('Checking reminder:', itemText, itemDate); // Debug log

        if (itemDate > now && !item.classList.contains('completed')) {
            const li = document.createElement('li');
            li.textContent = `${itemText} - ${itemDate.toLocaleString()}`;
            upcomingRemindersList.appendChild(li);
            count++;
            console.log('Added to overview:', itemText); // Debug log
        }
    });

    if (count === 0) {
        const li = document.createElement('li');
        li.textContent = 'No upcoming reminders';
        upcomingRemindersList.appendChild(li);
        console.log('No upcoming reminders found'); // Debug log
    }
}

let reminderList;

document.addEventListener('DOMContentLoaded', function() {
    reminderList = document.getElementById('reminderList');
    // ... rest of your existing code
});

document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    updateOverviewReminders();
    // ... rest of existing code ...
});

function updateRefillAlerts() {
    const refillAlertsList = document.getElementById('refillAlertsList');
    refillAlertsList.innerHTML = ''; // Clear existing alerts

    // Sample refill alerts data (replace this with actual data from your backend)
    const refillAlerts = [
        { medication: "Lisinopril", daysRemaining: 5 },
        { medication: "Metformin", daysRemaining: 3 },
        { medication: "Atorvastatin", daysRemaining: 7 }
    ];

    refillAlerts.forEach(alert => {
        const li = document.createElement('li');
        li.textContent = `${alert.medication}: Refill needed in ${alert.daysRemaining} days`;
        
        if (alert.daysRemaining <= 3) {
            li.style.color = 'red';
            li.style.fontWeight = 'bold';
        } else if (alert.daysRemaining <= 7) {
            li.style.color = 'orange';
        }

        refillAlertsList.appendChild(li);
    });

    if (refillAlerts.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No refill alerts at this time.';
        refillAlertsList.appendChild(li);
    }
}

// Call this function when the Alerts section is displayed
function switchSection(sectionId) {
    // ... existing code ...

    if (sectionId === 'alerts') {
        updateRefillAlerts();
    }

    // ... rest of the existing code ...
}
