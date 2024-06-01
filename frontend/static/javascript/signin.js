// Función para mostrar el formulario de registro y ocultar el de login
document.getElementById("toggleRegister").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
});

// Función para mostrar el formulario de login y ocultar el de registro
document.getElementById("toggleLogin").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
});

// Función para mostrar el formulario de recuperación de contraseña y ocultar el de login
document.getElementById("toggleForgotPassword").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("forgotPasswordForm").style.display = "block";
});

// Validación de correo electrónico en tiempo real
const registerEmail = document.getElementById("registerEmail");
const emailFeedback = document.getElementById("emailFeedback");

registerEmail.addEventListener("input", function() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(registerEmail.value)) {
        registerEmail.classList.add("is-invalid");
    } else {
        registerEmail.classList.remove("is-invalid");
    }
});

// Validación de contraseña y confirmación en tiempo real
const registerPassword = document.getElementById("registerPassword");
const confirmPassword = document.getElementById("confirmPassword");
const passwordFeedback = document.getElementById("passwordFeedback");

function validatePasswords() {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (registerPassword.value !== confirmPassword.value || !passwordPattern.test(registerPassword.value)) {
        confirmPassword.classList.add("is-invalid");
    } else {
        confirmPassword.classList.remove("is-invalid");
    }
}

registerPassword.addEventListener("input", validatePasswords);
confirmPassword.addEventListener("input", validatePasswords);

// Validación de correo electrónico en el formulario de recuperación de contraseña
const forgotPasswordEmail = document.getElementById("forgotPasswordEmail");
const forgotPasswordEmailFeedback = document.getElementById("forgotPasswordEmailFeedback");

forgotPasswordEmail.addEventListener("input", function() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(forgotPasswordEmail.value)) {
        forgotPasswordEmail.classList.add("is-invalid");
    } else {
        forgotPasswordEmail.classList.remove("is-invalid");
    }
});

// Validación de nueva contraseña y confirmación en el formulario de restablecimiento
const newPassword = document.getElementById("newPassword");
const confirmNewPassword = document.getElementById("confirmNewPassword");
const resetPasswordFeedback = document.getElementById("resetPasswordFeedback");

function validateNewPasswords() {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (newPassword.value !== confirmNewPassword.value || !passwordPattern.test(newPassword.value)) {
        confirmNewPassword.classList.add("is-invalid");
    } else {
        confirmNewPassword.classList.remove("is-invalid");
    }
}

newPassword.addEventListener("input", validateNewPasswords);
confirmNewPassword.addEventListener("input", validateNewPasswords);
