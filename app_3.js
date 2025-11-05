// Blood Link - Online Blood Bank System
// Application Data and State Management

class BloodLinkApp {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'landingPage';
        this.initializeData();
        this.renderLandingPage();
        this.initializeEventListeners();
        console.log('BloodLinkApp initialized successfully');
    }

    initializeData() {
        // Application data based on provided JSON
        this.data = {
            bloodBanks: [
                {
                    id: "bb001",
                    name: "City General Blood Bank",
                    address: "123 Main Street, Downtown",
                    coordinates: {lat: 40.7128, lng: -74.0060},
                    phone: "+1-555-0101",
                    operatingHours: "24/7",
                    inventory: {
                        "A+": {units: 45, urgent: false},
                        "A-": {units: 12, urgent: true},
                        "B+": {units: 38, urgent: false},
                        "B-": {units: 8, urgent: true},
                        "AB+": {units: 15, urgent: false},
                        "AB-": {units: 3, urgent: true},
                        "O+": {units: 67, urgent: false},
                        "O-": {units: 18, urgent: true}
                    }
                },
                {
                    id: "bb002",
                    name: "Metro Hospital Blood Center",
                    address: "456 Health Avenue, Medical District",
                    coordinates: {lat: 40.7589, lng: -73.9851},
                    phone: "+1-555-0102",
                    operatingHours: "8:00 AM - 8:00 PM",
                    inventory: {
                        "A+": {units: 32, urgent: false},
                        "A-": {units: 5, urgent: true},
                        "B+": {units: 28, urgent: false},
                        "B-": {units: 11, urgent: false},
                        "AB+": {units: 9, urgent: true},
                        "AB-": {units: 2, urgent: true},
                        "O+": {units: 54, urgent: false},
                        "O-": {units: 7, urgent: true}
                    }
                },
                {
                    id: "bb003",
                    name: "Community Care Blood Bank",
                    address: "789 Community Road, Westside",
                    coordinates: {lat: 40.7282, lng: -74.0776},
                    phone: "+1-555-0103",
                    operatingHours: "9:00 AM - 6:00 PM",
                    inventory: {
                        "A+": {units: 41, urgent: false},
                        "A-": {units: 14, urgent: false},
                        "B+": {units: 22, urgent: false},
                        "B-": {units: 4, urgent: true},
                        "AB+": {units: 18, urgent: false},
                        "AB-": {units: 6, urgent: false},
                        "O+": {units: 59, urgent: false},
                        "O-": {units: 9, urgent: true}
                    }
                }
            ],
            urgentNeeds: [
                {
                    bloodType: "A-",
                    currentUnits: 31,
                    minimumRequired: 50,
                    locations: ["City General Blood Bank", "Metro Hospital Blood Center"],
                    priority: "critical"
                },
                {
                    bloodType: "B-",
                    currentUnits: 23,
                    minimumRequired: 40,
                    locations: ["City General Blood Bank", "Community Care Blood Bank"],
                    priority: "high"
                },
                {
                    bloodType: "AB-",
                    currentUnits: 11,
                    minimumRequired: 25,
                    locations: ["All Locations"],
                    priority: "critical"
                },
                {
                    bloodType: "O-",
                    currentUnits: 34,
                    minimumRequired: 75,
                    locations: ["All Locations"],
                    priority: "high"
                }
            ],
            users: {
                donors: [
                    {
                        id: "d001",
                        name: "John Smith",
                        email: "john.smith@email.com",
                        password: "password123",
                        bloodType: "O+",
                        lastDonation: "2025-07-15",
                        totalDonations: 8,
                        eligibleTodonate: true,
                        phone: "+1-555-1001",
                        age: 29,
                        weight: 70,
                        medicallyEligible: true,
                        donationHistory: [
                            {date: "2025-07-15", location: "City General Blood Bank", status: "completed"},
                            {date: "2025-04-10", location: "Metro Hospital Blood Center", status: "completed"},
                            {date: "2025-01-20", location: "City General Blood Bank", status: "completed"}
                        ]
                    },
                    {
                        id: "d002",
                        name: "Sarah Johnson",
                        email: "sarah.j@email.com",
                        password: "password123",
                        bloodType: "A-",
                        lastDonation: "2025-08-20",
                        totalDonations: 12,
                        eligibleTodonate: false,
                        phone: "+1-555-1002",
                        age: 34,
                        weight: 58,
                        medicallyEligible: true,
                        donationHistory: [
                            {date: "2025-08-20", location: "Community Care Blood Bank", status: "completed"},
                            {date: "2025-06-05", location: "City General Blood Bank", status: "completed"}
                        ]
                    }
                ],
                recipients: [
                    {
                        id: "r001",
                        name: "Michael Brown",
                        email: "michael.brown@email.com",
                        password: "password123",
                        bloodType: "B+",
                        urgencyLevel: "moderate",
                        requestHistory: [
                            {date: "2025-08-25", bloodType: "B+", units: 2, status: "fulfilled", location: "Metro Hospital Blood Center"},
                            {date: "2025-06-10", bloodType: "B+", units: 1, status: "fulfilled", location: "City General Blood Bank"}
                        ],
                        currentRequests: []
                    },
                    {
                        id: "r002",
                        name: "Lisa Davis",
                        email: "lisa.davis@email.com",
                        password: "password123",
                        bloodType: "AB-",
                        urgencyLevel: "critical",
                        requestHistory: [
                            {date: "2025-08-30", bloodType: "AB-", units: 1, status: "pending", location: "City General Blood Bank"}
                        ],
                        currentRequests: [
                            {bloodType: "AB-", units: 2, urgency: "critical", requestDate: "2025-09-01"}
                        ]
                    }
                ],
                admin: {
                    id: "a001",
                    name: "Admin User",
                    email: "admin@bloodlink.com",
                    password: "admin123",
                    role: "admin",
                    permissions: ["view_inventory", "manage_transfers", "view_analytics", "manage_locations"]
                }
            },
            donationRules: {
                minimumAge: 18,
                maximumAge: 65,
                minimumWeight: 50,
                donationInterval: 56,
                maxDonationsPerYear: 6,
                healthRequirements: [
                    "No recent illness or infection",
                    "No recent tattoos or piercings (within 6 months)",
                    "No high-risk activities",
                    "Adequate hemoglobin levels",
                    "No medication restrictions"
                ]
            },
            analytics: {
                totalDonations: 1247,
                totalRequests: 892,
                successfulMatches: 834,
                wastedUnits: 45,
                averageResponseTime: "4.2 hours",
                monthlyTrends: [
                    {month: "Jan", donations: 98, requests: 76},
                    {month: "Feb", donations: 105, requests: 89},
                    {month: "Mar", donations: 112, requests: 94},
                    {month: "Apr", donations: 89, requests: 78},
                    {month: "May", donations: 127, requests: 103},
                    {month: "Jun", donations: 134, requests: 118},
                    {month: "Jul", donations: 145, requests: 126},
                    {month: "Aug", donations: 156, requests: 134}
                ]
            }
        };
    }

    initializeEventListeners() {
        console.log('Initializing event listeners...');
        
        // Auth form submission
        const authForm = document.getElementById('authForm');
        if (authForm) {
            authForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAuth();
            });
        }

        // Blood request form
        const bloodRequestForm = document.getElementById('bloodRequestForm');
        if (bloodRequestForm) {
            bloodRequestForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBloodRequest();
            });
        }

        // Transfer form
        const transferForm = document.getElementById('transferForm');
        if (transferForm) {
            transferForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBloodTransfer();
            });
        }

        // Filter functionality
        const bloodTypeFilter = document.getElementById('bloodTypeFilter');
        if (bloodTypeFilter) {
            bloodTypeFilter.addEventListener('change', () => {
                this.applyFilters();
            });
        }

        const locationFilter = document.getElementById('locationFilter');
        if (locationFilter) {
            locationFilter.addEventListener('change', () => {
                this.applyFilters();
            });
        }

        console.log('Event listeners initialized');
    }

    // Page Navigation
    showPage(pageId) {
        console.log('Showing page:', pageId);
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
        }
    }

    // Authentication Functions
    showAuth(role, type) {
        console.log('showAuth called with:', role, type);
        
        const modal = document.getElementById('authModal');
        const title = document.getElementById('authTitle');
        const fieldsContainer = document.getElementById('authFields');
        
        if (!modal || !title || !fieldsContainer) {
            console.error('Modal elements not found');
            return;
        }
        
        modal.classList.remove('hidden');
        
        let titleText = type === 'login' ? 'Login' : 'Sign Up';
        titleText += ` - ${role.charAt(0).toUpperCase() + role.slice(1)}`;
        title.textContent = titleText;
        
        fieldsContainer.innerHTML = this.generateAuthFields(role, type);
        
        // Store current auth context
        modal.dataset.role = role;
        modal.dataset.type = type;

        // Set up validation listeners for the newly created form
        this.setupFormValidation(role, type);
    }

    generateAuthFields(role, type) {
        let fields = `
            <div class="form-group">
                <label class="form-label" for="authEmail">Email</label>
                <input type="email" class="form-control" id="authEmail" name="email" required>
                <div class="error-message" id="authEmailError"></div>
            </div>
            <div class="form-group">
                <label class="form-label" for="authPassword">Password</label>
                <input type="password" class="form-control" id="authPassword" name="password" required>
                <div class="error-message" id="authPasswordError"></div>
            </div>
        `;

        if (type === 'signup') {
            fields += `
                <div class="form-group">
                    <label class="form-label" for="authFullName">Full Name</label>
                    <input type="text" class="form-control" id="authFullName" name="fullName" required>
                    <div class="error-message" id="authFullNameError"></div>
                </div>
                <div class="form-group">
                    <label class="form-label" for="authPhone">Phone Number</label>
                    <input type="tel" class="form-control" id="authPhone" name="phone" required>
                    <div class="error-message" id="authPhoneError"></div>
                </div>
                <div class="form-group">
                    <label class="form-label" for="authBloodType">Blood Type</label>
                    <select class="form-control" id="authBloodType" name="bloodType" required>
                        <option value="">Select Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                    <div class="error-message" id="authBloodTypeError"></div>
                </div>
            `;

            if (role === 'donor') {
                fields += `
                    <div class="form-group">
                        <label class="form-label" for="authAge">Age</label>
                        <input type="number" class="form-control" id="authAge" name="age" min="18" max="65" required>
                        <div class="error-message" id="authAgeError"></div>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="authWeight">Weight (kg)</label>
                        <input type="number" class="form-control" id="authWeight" name="weight" min="50" required>
                        <div class="error-message" id="authWeightError"></div>
                    </div>
                `;
            }
        }

        return fields;
    }

    handleAuth() {
        // Run full form validation before proceeding
        if (!this.validateAuthForm()) {
            console.log('Form validation failed. Submission blocked.');
            return;
        }

        console.log('handleAuth called');
        
        const modal = document.getElementById('authModal');
        const form = document.getElementById('authForm');
        const formData = new FormData(form);
        const role = modal.dataset.role;
        const type = modal.dataset.type;
        
        const email = formData.get('email');
        const password = formData.get('password');

        console.log('Auth attempt:', {role, type, email});

        if (type === 'login') {
            // Simulate authentication
            let user = null;
            
            if (role === 'admin') {
                if (email === this.data.users.admin.email && password === this.data.users.admin.password) {
                    user = this.data.users.admin;
                    user.role = 'admin';
                }
            } else if (role === 'donor') {
                user = this.data.users.donors.find(d => d.email === email && d.password === password);
                if (user) user.role = 'donor';
            } else if (role === 'recipient') {
                user = this.data.users.recipients.find(r => r.email === email && r.password === password);
                if (user) user.role = 'recipient';
            }

            if (user) {
                console.log('Authentication successful:', user);
                this.currentUser = user;
                this.hideAuth();
                this.navigateToDashboard(role);
            } else {
                alert('Invalid credentials. Please try again.\n\nDemo credentials:\nDonor: john.smith@email.com / password123\nRecipient: michael.brown@email.com / password123\nAdmin: admin@bloodlink.com / admin123');
            }
        } else {
            // Simulate signup
            const newUser = {
                id: `${role.charAt(0)}${Date.now()}`,
                name: formData.get('fullName'),
                email: email,
                password: password,
                bloodType: formData.get('bloodType'),
                phone: formData.get('phone'),
                role: role
            };

            if (role === 'donor') {
                newUser.age = parseInt(formData.get('age'));
                newUser.weight = parseInt(formData.get('weight'));
                newUser.totalDonations = 0;
                newUser.donationHistory = [];
                newUser.eligibleTodonate = true;
                newUser.medicallyEligible = true;
                this.data.users.donors.push(newUser);
            } else if (role === 'recipient') {
                newUser.requestHistory = [];
                newUser.currentRequests = [];
                newUser.urgencyLevel = 'moderate';
                this.data.users.recipients.push(newUser);
            }

            console.log('Signup successful:', newUser);
            this.currentUser = newUser;
            this.hideAuth();
            this.navigateToDashboard(role);
        }
    }

    // --- Form Validation Methods ---

    setupFormValidation(role, type) {
        const inputsToValidate = [
            { id: 'authEmail', validator: this.validateEmail },
            { id: 'authPassword', validator: this.validatePassword }
        ];

        if (type === 'signup') {
            inputsToValidate.push(
                { id: 'authFullName', validator: this.validateRequired },
                { id: 'authPhone', validator: this.validatePhone },
                { id: 'authBloodType', validator: this.validateRequired }
            );
            if (role === 'donor') {
                inputsToValidate.push(
                    { id: 'authAge', validator: this.validateAge },
                    { id: 'authWeight', validator: this.validateWeight }
                );
            }
        }

        inputsToValidate.forEach(item => {
            const inputElement = document.getElementById(item.id);
            if (inputElement) {
                inputElement.addEventListener('blur', () => {
                    item.validator.call(this, inputElement);
                });
                inputElement.addEventListener('input', () => {
                    if (inputElement.classList.contains('is-invalid')) {
                       item.validator.call(this, inputElement);
                    }
                });
            }
        });
    }

    setValidationError(inputElement, message) {
        const errorElement = document.getElementById(`${inputElement.id}Error`);
        if (message) {
            inputElement.classList.add('is-invalid');
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.classList.add('show');
            }
        } else {
            inputElement.classList.remove('is-invalid');
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.remove('show');
            }
        }
    }

    validateRequired(input) {
        if (!input.value.trim()) {
            this.setValidationError(input, 'This field is required.');
            return false;
        }
        this.setValidationError(input, '');
        return true;
    }

    validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!input.value.trim()) {
            this.setValidationError(input, 'Email is required.');
            return false;
        }
        if (!emailRegex.test(input.value)) {
            this.setValidationError(input, 'Please enter a valid email address.');
            return false;
        }
        this.setValidationError(input, '');
        return true;
    }

    validatePassword(input) {
        if (!input.value) {
            this.setValidationError(input, 'Password is required.');
            return false;
        }
        if (input.value.length < 6) {
            this.setValidationError(input, 'Password must be at least 6 characters long.');
            return false;
        }
        this.setValidationError(input, '');
        return true;
    }

    validatePhone(input) {
        const phoneRegex = /^\+?[\d\s]{7,}$/;
        if (!input.value.trim()) {
            this.setValidationError(input, 'Phone number is required.');
            return false;
        }
        if (!phoneRegex.test(input.value)) {
            this.setValidationError(input, 'Please enter a valid phone number.');
            return false;
        }
        this.setValidationError(input, '');
        return true;
    }

    validateAge(input) {
        if (!input.value) {
            this.setValidationError(input, 'Age is required.');
            return false;
        }
        const age = parseInt(input.value);
        const min = parseInt(input.min);
        const max = parseInt(input.max);
        if (isNaN(age) || age < min || age > max) {
            this.setValidationError(input, `Age must be between ${min} and ${max}.`);
            return false;
        }
        this.setValidationError(input, '');
        return true;
    }

    validateWeight(input) {
        if (!input.value) {
            this.setValidationError(input, 'Weight is required.');
            return false;
        }
        const weight = parseInt(input.value);
        const min = parseInt(input.min);
        if (isNaN(weight) || weight < min) {
            this.setValidationError(input, `Weight must be at least ${min} kg.`);
            return false;
        }
        this.setValidationError(input, '');
        return true;
    }

    validateAuthForm() {
        const form = document.getElementById('authForm');
        const inputs = form.querySelectorAll('[required]');
        let isFormValid = true;
    
        const validatorMap = {
            'authEmail': this.validateEmail,
            'authPassword': this.validatePassword,
            'authFullName': this.validateRequired,
            'authPhone': this.validatePhone,
            'authBloodType': this.validateRequired,
            'authAge': this.validateAge,
            'authWeight': this.validateWeight
        };

        inputs.forEach(input => {
            const validator = validatorMap[input.id];
            if (validator && !validator.call(this, input)) {
                isFormValid = false;
            }
        });
    
        return isFormValid;
    }


    hideAuth() {
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    navigateToDashboard(role) {
        console.log('Navigating to dashboard:', role);
        
        switch (role) {
            case 'donor':
                this.showPage('donorDashboard');
                this.renderDonorDashboard();
                break;
            case 'recipient':
                this.showPage('recipientDashboard');
                this.renderRecipientDashboard();
                break;
            case 'admin':
                this.showPage('adminDashboard');
                this.renderAdminDashboard();
                break;
        }
    }

    logout() {
        console.log('Logout called');
        this.currentUser = null;
        this.showPage('landingPage');
        this.renderLandingPage();
    }

    // Landing Page Rendering
    renderLandingPage() {
        this.renderUrgentNeeds();
    }

    renderUrgentNeeds() {
        const container = document.getElementById('urgentGrid');
        if (!container) return;
        
        container.innerHTML = '';

        this.data.urgentNeeds.forEach(need => {
            const progressPercentage = (need.currentUnits / need.minimumRequired) * 100;
            
            const card = document.createElement('div');
            card.className = 'urgent-card';
            card.innerHTML = `
                <div class="urgent-header">
                    <div class="blood-type">${need.bloodType}</div>
                    <span class="priority ${need.priority}">${need.priority}</span>
                </div>
                <div class="units-info">
                    <p><strong>${need.currentUnits}</strong> / ${need.minimumRequired} units available</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${Math.min(progressPercentage, 100)}%"></div>
                    </div>
                </div>
                <div class="locations">
                    <strong>Locations:</strong> ${need.locations.join(', ')}
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Donor Dashboard
    renderDonorDashboard() {
        const welcomeElement = document.getElementById('donorWelcome');
        if (welcomeElement) {
            welcomeElement.textContent = `Welcome, ${this.currentUser.name}`;
        }
        
        this.renderDonorProfile();
        this.renderEligibilityStatus();
        this.renderNearbyBanks();
        this.renderDonationHistory();
        this.renderDonationRules();
    }

    renderDonorProfile() {
        const container = document.getElementById('donorProfile');
        if (!container) return;
        
        container.innerHTML = `
            <div class="profile-item">
                <span class="profile-label">Name:</span>
                <span class="profile-value">${this.currentUser.name}</span>
            </div>
            <div class="profile-item">
                <span class="profile-label">Blood Type:</span>
                <span class="profile-value">${this.currentUser.bloodType}</span>
            </div>
            <div class="profile-item">
                <span class="profile-label">Total Donations:</span>
                <span class="profile-value">${this.currentUser.totalDonations || 0}</span>
            </div>
            <div class="profile-item">
                <span class="profile-label">Last Donation:</span>
                <span class="profile-value">${this.currentUser.lastDonation || 'Never'}</span>
            </div>
        `;
    }

    renderEligibilityStatus() {
        const container = document.getElementById('eligibilityStatus');
        if (!container) return;
        
        const eligible = this.currentUser.eligibleTodonate;
        
        container.innerHTML = `
            <div class="eligibility-status ${eligible ? 'eligible' : 'not-eligible'}">
                <span>${eligible ? '✓' : '✗'}</span>
                <span>${eligible ? 'Eligible to Donate' : 'Not Eligible'}</span>
            </div>
            ${!eligible ? '<p class="next-eligible">Next eligible date: October 15, 2025</p>' : ''}
            <p>Donation interval: ${this.data.donationRules.donationInterval} days minimum</p>
        `;
    }

    renderNearbyBanks() {
        const container = document.getElementById('nearbyBanks');
        if (!container) return;
        
        container.innerHTML = '';

        this.data.bloodBanks.forEach(bank => {
            const bankElement = document.createElement('div');
            bankElement.className = 'bank-item';
            bankElement.innerHTML = `
                <div class="bank-name">${bank.name}</div>
                <div class="bank-address">${bank.address}</div>
                <div class="bank-hours">Hours: ${bank.operatingHours}</div>
                <button class="btn btn--primary btn--sm mt-8" onclick="bookDonation('${bank.id}')">
                    Book Appointment
                </button>
            `;
            container.appendChild(bankElement);
        });
    }

    renderDonationHistory() {
        const tbody = document.querySelector('#donationHistory tbody');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        const history = this.currentUser.donationHistory || [];
        
        if (history.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center">No donation history available</td></tr>';
            return;
        }

        history.forEach(donation => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${donation.date}</td>
                <td>${donation.location}</td>
                <td>${this.currentUser.bloodType}</td>
                <td><span class="status-badge status-${donation.status}">${donation.status}</span></td>
            `;
            tbody.appendChild(row);
        });
    }

    renderDonationRules() {
        const container = document.getElementById('donationRules');
        if (!container) return;
        
        const rules = this.data.donationRules;
        
        container.innerHTML = `
            <div class="rule-section">
                <h5>Basic Requirements</h5>
                <ul class="rule-list">
                    <li>Age: ${rules.minimumAge} - ${rules.maximumAge} years</li>
                    <li>Minimum weight: ${rules.minimumWeight} kg</li>
                    <li>Donation interval: ${rules.donationInterval} days</li>
                    <li>Maximum donations per year: ${rules.maxDonationsPerYear}</li>
                </ul>
            </div>
            <div class="rule-section">
                <h5>Health Requirements</h5>
                <ul class="rule-list">
                    ${rules.healthRequirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    bookDonation(bankId) {
        console.log('Booking donation at bank:', bankId);
        
        if (!this.currentUser.eligibleTodonate) {
            alert('You are not currently eligible to donate. Please check your eligibility status.');
            return;
        }

        const bank = this.data.bloodBanks.find(b => b.id === bankId);
        alert(`Donation appointment booked at ${bank.name}. You will receive a confirmation email shortly.`);
        
        // Simulate booking by adding to history
        this.currentUser.donationHistory = this.currentUser.donationHistory || [];
        this.currentUser.donationHistory.unshift({
            date: new Date().toISOString().split('T')[0],
            location: bank.name,
            status: 'scheduled'
        });
        
        this.renderDonationHistory();
    }

    // Recipient Dashboard
    renderRecipientDashboard() {
        const welcomeElement = document.getElementById('recipientWelcome');
        if (welcomeElement) {
            welcomeElement.textContent = `Welcome, ${this.currentUser.name}`;
        }
        
        this.renderAvailableBanks();
        this.renderCurrentRequests();
        this.renderRequestHistory();
    }

    renderAvailableBanks() {
        const container = document.getElementById('availableBanks');
        if (!container) return;
        
        container.innerHTML = '';

        this.data.bloodBanks.forEach(bank => {
            const availability = bank.inventory[this.currentUser.bloodType] || {units: 0};
            
            const bankElement = document.createElement('div');
            bankElement.className = 'bank-item';
            bankElement.innerHTML = `
                <div class="bank-name">${bank.name}</div>
                <div class="bank-address">${bank.address}</div>
                <div class="bank-hours">Hours: ${bank.operatingHours}</div>
                <div class="availability-info">
                    <strong>${this.currentUser.bloodType}:</strong> 
                    <span class="units-${availability.units < 10 ? 'critical' : availability.units < 25 ? 'low' : 'normal'}">
                        ${availability.units} units available
                    </span>
                </div>
            `;
            container.appendChild(bankElement);
        });
    }

    renderCurrentRequests() {
        const container = document.getElementById('currentRequests');
        if (!container) return;
        
        const requests = this.currentUser.currentRequests || [];
        
        if (requests.length === 0) {
            container.innerHTML = '<p class="text-center">No current requests</p>';
            return;
        }

        container.innerHTML = '';
        requests.forEach(request => {
            const requestElement = document.createElement('div');
            requestElement.className = 'request-item';
            requestElement.innerHTML = `
                <div class="request-info">
                    <strong>${request.bloodType}</strong> - ${request.units} units
                    <span class="priority ${request.urgency}">${request.urgency}</span>
                </div>
                <div class="request-date">Requested: ${request.requestDate}</div>
            `;
            container.appendChild(requestElement);
        });
    }

    renderRequestHistory() {
        const tbody = document.querySelector('#requestHistory tbody');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        const history = this.currentUser.requestHistory || [];
        
        if (history.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center">No request history available</td></tr>';
            return;
        }

        history.forEach(request => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${request.date}</td>
                <td>${request.bloodType}</td>
                <td>${request.units}</td>
                <td>${request.location}</td>
                <td><span class="status-badge status-${request.status}">${request.status}</span></td>
            `;
            tbody.appendChild(row);
        });
    }

    handleBloodRequest() {
        console.log('handleBloodRequest called');
        
        const form = document.getElementById('bloodRequestForm');
        const formData = new FormData(form);
        
        const request = {
            bloodType: formData.get('bloodType'),
            units: parseInt(formData.get('units')),
            urgency: formData.get('urgency'),
            requestDate: new Date().toISOString().split('T')[0]
        };

        console.log('Blood request:', request);

        // Add to current requests
        this.currentUser.currentRequests = this.currentUser.currentRequests || [];
        this.currentUser.currentRequests.push(request);

        // Add to history as pending
        this.currentUser.requestHistory = this.currentUser.requestHistory || [];
        this.currentUser.requestHistory.unshift({
            ...request,
            date: request.requestDate,
            status: 'pending',
            location: 'TBD'
        });

        alert('Blood request submitted successfully. We will contact you shortly with availability.');
        
        form.reset();
        this.renderCurrentRequests();
        this.renderRequestHistory();
    }

    // Admin Dashboard
    renderAdminDashboard() {
        this.renderInventoryTable();
        // Delay chart rendering to ensure canvas is ready
        setTimeout(() => {
            this.renderAnalyticsChart();
        }, 100);
    }

    renderInventoryTable() {
        const container = document.getElementById('inventoryTable');
        if (!container) return;
        
        container.innerHTML = '';

        this.data.bloodBanks.forEach(bank => {
            const bankElement = document.createElement('div');
            bankElement.className = 'inventory-bank';
            
            let inventoryHTML = '';
            Object.entries(bank.inventory).forEach(([type, data]) => {
                const statusClass = data.units < 10 ? 'critical' : data.units < 25 ? 'low' : 'normal';
                inventoryHTML += `
                    <div class="blood-type-cell">
                        <div class="blood-type-header">${type}</div>
                        <div class="blood-units units-${statusClass}">${data.units}</div>
                    </div>
                `;
            });
            
            bankElement.innerHTML = `
                <div class="bank-header-info">
                    <div class="bank-title">${bank.name}</div>
                    <div class="bank-info">${bank.address} • ${bank.operatingHours}</div>
                </div>
                <div class="inventory-grid">
                    ${inventoryHTML}
                </div>
            `;
            
            container.appendChild(bankElement);
        });
    }

    renderAnalyticsChart() {
        const canvas = document.getElementById('trendsChart');
        if (!canvas) {
            console.log('Canvas not found for chart');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.data.analytics.monthlyTrends.map(t => t.month),
                datasets: [
                    {
                        label: 'Donations',
                        data: this.data.analytics.monthlyTrends.map(t => t.donations),
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Requests',
                        data: this.data.analytics.monthlyTrends.map(t => t.requests),
                        borderColor: '#FFC185',
                        backgroundColor: 'rgba(255, 193, 133, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Monthly Donations vs Requests'
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Count'
                        }
                    }
                }
            }
        });
    }

    applyFilters() {
        const bloodTypeFilter = document.getElementById('bloodTypeFilter');
        const locationFilter = document.getElementById('locationFilter');
        
        if (!bloodTypeFilter || !locationFilter) return;
        
        const bloodType = bloodTypeFilter.value;
        const location = locationFilter.value;
        
        // For demo purposes, just show alert
        let message = 'Filters applied:';
        if (bloodType) message += ` Blood Type: ${bloodType}`;
        if (location) message += ` Location: ${location}`;
        
        console.log(message);
        this.renderInventoryTable(); // Re-render with filters (demo)
    }

    handleBloodTransfer() {
        console.log('handleBloodTransfer called');
        
        const form = document.getElementById('transferForm');
        const formData = new FormData(form);
        
        const transfer = {
            from: formData.get('fromLocation'),
            to: formData.get('toLocation'),
            bloodType: formData.get('bloodType'),
            units: parseInt(formData.get('units'))
        };

        console.log('Blood transfer:', transfer);

        if (transfer.from === transfer.to) {
            alert('Source and destination cannot be the same.');
            return;
        }

        // Simulate transfer
        const fromBank = this.data.bloodBanks.find(b => b.id === transfer.from);
        const toBank = this.data.bloodBanks.find(b => b.id === transfer.to);
        
        if (fromBank && toBank && fromBank.inventory[transfer.bloodType].units >= transfer.units) {
            fromBank.inventory[transfer.bloodType].units -= transfer.units;
            toBank.inventory[transfer.bloodType].units += transfer.units;
            
            alert(`Transfer successful: ${transfer.units} units of ${transfer.bloodType} transferred from ${fromBank.name} to ${toBank.name}`);
            
            form.reset();
            this.renderInventoryTable();
        } else {
            alert('Insufficient blood units at source location.');
        }
    }
}

// Global variables and functions
let app;

// Global functions for onclick handlers - Define immediately
function showAuth(role, type) {
    console.log('Global showAuth called:', role, type);
    if (app && app.showAuth) {
        app.showAuth(role, type);
    } else {
        console.error('App not initialized or showAuth method not available');
    }
}

function hideAuth() {
    console.log('Global hideAuth called');
    if (app && app.hideAuth) {
        app.hideAuth();
    } else {
        console.error('App not initialized');
    }
}

function logout() {
    console.log('Global logout called');
    if (app && app.logout) {
        app.logout();
    } else {
        console.error('App not initialized');
    }
}

function applyFilters() {
    console.log('Global applyFilters called');
    if (app && app.applyFilters) {
        app.applyFilters();
    } else {
        console.error('App not initialized');
    }
}

function bookDonation(bankId) {
    console.log('Global bookDonation called:', bankId);
    if (app && app.bookDonation) {
        app.bookDonation(bankId);
    } else {
        console.error('App not initialized');
    }
}

// Initialize the application immediately
console.log('Initializing Blood Link App...');
app = new BloodLinkApp();

// Also attach to window for debugging
window.app = app;
window.showAuth = showAuth;
window.hideAuth = hideAuth;
window.logout = logout;
window.applyFilters = applyFilters;
window.bookDonation = bookDonation;

console.log('Global functions attached to window:', {
    showAuth: typeof window.showAuth,
    hideAuth: typeof window.hideAuth,
    logout: typeof window.logout,
    applyFilters: typeof window.applyFilters,
    bookDonation: typeof window.bookDonation,
    app: typeof window.app
});