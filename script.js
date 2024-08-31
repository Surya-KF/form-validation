document.addEventListener('DOMContentLoaded', () => {
    // Grabbing all required elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const themeToggle = document.getElementById('themeToggle');
    const logo = document.getElementById('logo');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');


    // Check if elements exist before adding event listeners
    if (showRegister && loginForm && registerForm) {
        // Toggle between login and register forms
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        });
    }

    if (showLogin && loginForm && registerForm) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
        });
    }

    if (document.body.classList.contains('dark-theme')) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
    } else {
        sunIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
    }
    
    themeToggle.addEventListener('click', toggleTheme);

    // Logo click to refresh
    if (logo) {
        logo.addEventListener('click', () => {
            window.location.reload();
        });
    }

    // Show/Hide Password
    const showLoginPassword = document.getElementById('showLoginPassword');
    const showRegisterPassword = document.getElementById('showRegisterPassword');
    const loginPassword = document.getElementById('loginPassword');
    const registerPassword = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('confirmPassword');

    if (showLoginPassword && loginPassword) {
        showLoginPassword.addEventListener('change', () => {
            loginPassword.type = showLoginPassword.checked ? 'text' : 'password';
        });
    }

    if (showRegisterPassword && registerPassword && confirmPassword) {
        showRegisterPassword.addEventListener('change', () => {
            registerPassword.type = showRegisterPassword.checked ? 'text' : 'password';
            confirmPassword.type = showRegisterPassword.checked ? 'text' : 'password';
        });
    }

    // Form validation
    const login = document.getElementById('login');
    const register = document.getElementById('register');

    if (login) {
        login.addEventListener('submit', (e) => {
            e.preventDefault();
            const isValid = validateLoginForm();
            if (isValid) {
                alert('Login successful!');
                // Add your login logic here
            }
        });
    }

    if (register) {
        register.addEventListener('submit', (e) => {
            e.preventDefault();
            const isValid = validateRegisterForm();
            if (isValid) {
                alert('Registration successful!');
                // Add your registration logic here
            }
        });
    }

    function validateLoginForm() {
        const username = document.getElementById('loginUsername')?.value || '';
        const password = loginPassword?.value || '';
        let isValid = true;

        if (username.trim() === '') {
            showError('loginUsernameError', 'Username is required');
            isValid = false;
        } else {
            showError('loginUsernameError', '');
        }

        if (password.trim() === '') {
            showError('loginPasswordError', 'Password is required');
            isValid = false;
        } else {
            showError('loginPasswordError', '');
        }

        return isValid;
    }

    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        // Optionally, you can save the theme preference in local storage
        if (document.body.classList.contains('dark-theme')) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline';
        } else {
            sunIcon.style.display = 'inline';
            moonIcon.style.display = 'none';
        }
    }

    function validateRegisterForm() {
        const firstName = document.getElementById('firstName')?.value || '';
        const middleName = document.getElementById('middleName')?.value || '';
        const lastName = document.getElementById('lastName')?.value || '';
        const age = document.getElementById('age')?.value || '';
        const contactNumber = document.getElementById('contactNumber')?.value || '';
        const email = document.getElementById('registerEmail')?.value || '';
        const address = document.getElementById('address')?.value || '';
        const pincode = document.getElementById('pincode')?.value || '';
        const username = document.getElementById('registerUsername')?.value || '';
        const password = registerPassword?.value || '';
        const confirmPasswordValue = confirmPassword?.value || '';
        let isValid = true;

        // Check first name
        if (!validateName(firstName)) {
            showError('firstNameError', 'First name should contain only letters');
            isValid = false;
        } else {
            showError('firstNameError', '');
        }

        // Check middle name if it exists
        if (middleName && !validateName(middleName)) {
            showError('middleNameError', 'Middle name should contain only letters');
            isValid = false;
        } else {
            showError('middleNameError', '');
        }

        // Check last name
        if (!validateName(lastName)) {
            showError('lastNameError', 'Last name should contain only letters');
            isValid = false;
        } else {
            showError('lastNameError', '');
        }

        // Check age
        if (!validateAge(age)) {
            showError('ageError', 'You must be at least 18 years old');
            isValid = false;
        } else {
            showError('ageError', '');
        }

        // Check contact number
        if (!validatePhone(contactNumber)) {
            showError('contactNumberError', 'Invalid phone number');
            isValid = false;
        } else {
            showError('contactNumberError', '');
        }

        // Check email
        if (!validateEmail(email)) {
            showError('registerEmailError', 'Invalid email address');
            isValid = false;
        } else {
            showError('registerEmailError', '');
        }

        // Check address
        if (address.trim() === '') {
            showError('addressError', 'Address is required');
            isValid = false;
        } else {
            showError('addressError', '');
        }

        // Check pincode
        if (!validatePincode(pincode)) {
            showError('pincodeError', 'Invalid pincode');
            isValid = false;
        } else {
            showError('pincodeError', '');
        }

        // Check username
        if (username.trim() === '') {
            showError('registerUsernameError', 'Username is required');
            isValid = false;
        } else {
            showError('registerUsernameError', '');
        }

        // Check password
        if (!validatePassword(password)) {
            showError('registerPasswordError', 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
            isValid = false;
        } else {
            showError('registerPasswordError', '');
        }

        // Check confirm password
        if (confirmPasswordValue !== password) {
            showError('confirmPasswordError', 'Passwords do not match');
            isValid = false;
        } else {
            showError('confirmPasswordError', '');
        }

        return isValid;
    }

    function showError(id, message) {
        const errorElement = document.getElementById(id);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function validateName(name) {
        const re = /^[A-Za-z]+$/;
        return re.test(name);
    }

    function validateAge(age) {
        return parseInt(age) >= 18;
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return re.test(email.toLowerCase());
    }

    function validatePhone(phone) {
        const re = /^\d{10}$/;
        return re.test(phone);
    }

    function validatePincode(pincode) {
        const re = /^\d{6}$/;
        return re.test(pincode);
    }

    function validatePassword(password) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    }
});
