document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', function(event) {
        if (!validateForm()) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
    });

    function validateForm() {
        let isValid = true;

        // First Name validation
        const firstName = document.getElementById('firstName');
        if (firstName.value.trim() === '') {
            setInvalid(firstName, 'Please enter your first name.');
            isValid = false;
        } else {
            setValid(firstName);
        }

        // Last Name validation
        const lastName = document.getElementById('lastName');
        if (lastName.value.trim() === '') {
            setInvalid(lastName, 'Please enter your last name.');
            isValid = false;
        } else {
            setValid(lastName);
        }

        // Phone Number validation
        const phone = document.getElementById('phone');
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone.value.trim())) {
            setInvalid(phone, 'Please enter a valid 10-digit phone number.');
            isValid = false;
        } else {
            setValid(phone);
        }

        // Age validation
        const age = document.getElementById('age');
        if (age.value < 18) {
            setInvalid(age, 'You must be at least 18 years old.');
            isValid = false;
        } else {
            setValid(age);
        }

        // Gender validation
        const gender = document.getElementById('gender');
        if (gender.value === '') {
            setInvalid(gender, 'Please select your gender.');
            isValid = false;
        } else {
            setValid(gender);
        }

        // Password validation
        const password = document.getElementById('password');
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordRegex.test(password.value)) {
            setInvalid(password, 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
            isValid = false;
        } else {
            setValid(password);
        }

        // Confirm Password validation
        const confirmPassword = document.getElementById('confirmPassword');
        if (confirmPassword.value !== password.value) {
            setInvalid(confirmPassword, 'Passwords do not match.');
            isValid = false;
        } else {
            setValid(confirmPassword);
        }

        return isValid;
    }

    function setInvalid(element, message) {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        element.nextElementSibling.textContent = message;
    }

    function setValid(element) {
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
    }
});
