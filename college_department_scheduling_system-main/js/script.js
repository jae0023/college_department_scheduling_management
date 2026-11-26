
/* ==============================
   PASSWORD VISIBILITY
============================== */

function togglePassword() {
    const password = document.getElementById("password");
    const eye = document.getElementById("loginEye");

    password.type = password.type === "password" ? "text" : "password";

    eye.classList.toggle("fa-eye");
    eye.classList.toggle("fa-eye-slash");
}

function toggleSignupPassword() {
    togglePasswordField("signupPassword");
}

function toggleConfirmPassword() {
    togglePasswordField("confirmPassword");
}

function togglePasswordField(inputId) {
    const password = document.getElementById(inputId);
    const eye = password.parentElement.querySelector(".password-toggle i");

    password.type = password.type === "password" ? "text" : "password";

    eye.classList.toggle("fa-eye");
    eye.classList.toggle("fa-eye-slash");
}


/* ==============================
   RESET PASSWORD EYE ICONS
============================== */

function toggleResetPassword(inputId, eyeId) {
    const password = document.getElementById(inputId);
    const eye = document.getElementById(eyeId);

    password.type = password.type === "password" ? "text" : "password";

    eye.classList.toggle("fa-eye");
    eye.classList.toggle("fa-eye-slash");
}


/* ==============================
   OPEN AND CLOSE SIGNUP MODAL
============================== */

function openSignup() {
    document.getElementById("signupModal").classList.add("active");
}

function closeSignup() {
    document.getElementById("signupModal").classList.remove("active");
}


/* ==============================
   OPEN RESET PASSWORD MODAL
============================== */

function openResetPassword() {
    const modal = document.getElementById("resetPasswordModal");

    if (!modal) {
        console.error("Reset Password modal not found!");
        return;
    }

    modal.classList.add("active");

    const message = document.getElementById("resetMessage");

    message.textContent = "";
    message.className = "reset-message";
}


/* ==============================
   CLOSE RESET PASSWORD MODAL
============================== */

function closeResetPassword() {
    const modal = document.getElementById("resetPasswordModal");

    if (!modal) return;

    modal.classList.remove("active");

    const form = document.getElementById("resetPasswordForm");
    const message = document.getElementById("resetMessage");

    form.reset();

    message.textContent = "";
    message.className = "reset-message";

    document.getElementById("newPassword").type = "password";
    document.getElementById("confirmNewPassword").type = "password";

    document.getElementById("newPasswordEye").className = "fa-solid fa-eye";
    document.getElementById("confirmNewPasswordEye").className = "fa-solid fa-eye";
}


/* ==============================
   LOGIN FUNCTION
============================== */

function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please enter your email and password.");
        return;
    }

    alert("Login frontend is working! PHP authentication still needs to be connected.");
}


/* ==============================
   PASSWORD VALIDATION
============================== */

function isValidPassword(password) {
    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9\s])\S{8,}$/;

    return passwordPattern.test(password);
}


/* ==============================
   DOM CONTENT LOADED
============================== */

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const resetPasswordForm = document.getElementById("resetPasswordForm");

    const signupModal = document.getElementById("signupModal");
    const resetPasswordModal = document.getElementById("resetPasswordModal");


    /* ==============================
       LOGIN FORM
    ============================== */

    if (loginForm) {
        loginForm.addEventListener("submit", login);
    }


    /* ==============================
       SIGNUP FORM VALIDATION
    ============================== */

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const password = document.getElementById("signupPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            const assessment = document.getElementById("assessmentForm");
            const message = document.getElementById("signupMessage");

            message.textContent = "";
            message.className = "form-message";

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            if (password.length < 8) {
                alert("Password must contain at least 8 characters.");
                return;
            }

            if (!assessment.files || assessment.files.length === 0) {
                alert("Please upload your assessment form.");
                return;
            }

            const file = assessment.files[0];

            if (file.size > 5 * 1024 * 1024) {
                alert("Assessment form must not exceed 5MB.");

                assessment.value = "";
                document.getElementById("fileName").textContent =
                    "Click to upload assessment form";

                return;
            }

            const allowedTypes = [
                "application/pdf",
                "image/jpeg",
                "image/png"
            ];

            if (!allowedTypes.includes(file.type)) {
                alert("Only PDF, JPG, and PNG files are allowed.");

                assessment.value = "";
                document.getElementById("fileName").textContent =
                    "Click to upload assessment form";

                return;
            }

            alert("Signup form validated! PHP registration and file upload still need to be connected.");

        });
    }


    /* ==============================
       DISPLAY SELECTED FILE NAME
    ============================== */

    const assessmentInput = document.getElementById("assessmentForm");

    if (assessmentInput) {
        assessmentInput.addEventListener("change", function () {

            const fileName = document.getElementById("fileName");

            if (this.files.length > 0) {
                fileName.textContent = this.files[0].name;
            } else {
                fileName.textContent = "Click to upload assessment form";
            }

        });
    }


    /* ==============================
       RESET PASSWORD FORM
    ============================== */

    if (resetPasswordForm) {
        resetPasswordForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const newPassword = document.getElementById("newPassword").value;
            const confirmPassword = document.getElementById("confirmNewPassword").value;
            const message = document.getElementById("resetMessage");

            message.textContent = "";
            message.className = "reset-message";

            if (!isValidPassword(newPassword)) {

                message.textContent =
                    "Password must be at least 8 characters and include uppercase, lowercase, and special characters.";

                message.className = "reset-message error";
                return;
            }

            if (newPassword !== confirmPassword) {

                message.textContent =
                    "Passwords do not match. Please try again.";

                message.className = "reset-message error";
                return;
            }

            message.textContent =
                "Password validated successfully! Actual password updating still requires PHP/MySQL integration.";

            message.className = "reset-message success";

        });
    }


    /* ==============================
       CLOSE MODALS WHEN CLICKING OUTSIDE
    ============================== */

    if (signupModal) {
        signupModal.addEventListener("click", function (event) {

            if (event.target === signupModal) {
                closeSignup();
            }

        });
    }

    if (resetPasswordModal) {
        resetPasswordModal.addEventListener("click", function (event) {

            if (event.target === resetPasswordModal) {
                closeResetPassword();
            }

        });
    }


    /* ==============================
       CLOSE MODALS USING ESCAPE
    ============================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeSignup();
            closeResetPassword();
        }

    });

});
