
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
   OPEN SIGNUP MODAL
============================== */

function openSignup() {
    document.getElementById("signupModal").classList.add("active");
}

function closeSignup() {
    document.getElementById("signupModal").classList.remove("active");
}


/* ==============================
   REGISTRATION SUCCESS MODAL
============================== */

function openSuccess() {
    closeSignup();

    const successModal = document.getElementById("successModal");

    successModal.classList.add("active");
}

function closeSuccess() {
    document.getElementById("successModal").classList.remove("active");

    // Return focus to login email field
    const email = document.getElementById("email");

    if (email) {
        email.focus();
    }
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
   DISPLAY FORM MESSAGE
============================== */

function showSignupError(message) {
    const signupMessage = document.getElementById("signupMessage");

    signupMessage.textContent = message;
    signupMessage.className = "form-message error";
}

function clearSignupMessage() {
    const signupMessage = document.getElementById("signupMessage");

    signupMessage.textContent = "";
    signupMessage.className = "form-message";
}


/* ==============================
   RESET SIGNUP FORM
============================== */

function resetSignupForm() {
    const signupForm = document.getElementById("signupForm");

    signupForm.reset();

    clearSignupMessage();

    document.getElementById("fileName").textContent =
        "Upload Student Assessment Form";

    document.getElementById("signupPassword").type = "password";
    document.getElementById("confirmPassword").type = "password";

    const eyes = signupForm.querySelectorAll(".password-toggle i");

    eyes.forEach(function(eye) {
        eye.className = "fa-solid fa-eye";
    });
}


/* ==============================
   DOM CONTENT LOADED
============================== */

document.addEventListener("DOMContentLoaded", function() {

    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const resetPasswordForm = document.getElementById("resetPasswordForm");

    const signupModal = document.getElementById("signupModal");
    const resetPasswordModal = document.getElementById("resetPasswordModal");
    const successModal = document.getElementById("successModal");


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

        signupForm.addEventListener("submit", function(event) {

            event.preventDefault();

            const fullName = document.getElementById("fullName").value.trim();
            const email = document.getElementById("signupEmail").value.trim();
            const mobile = document.getElementById("mobile").value.trim();
            const studentNo = document.getElementById("studentNo").value.trim();

            const password = document.getElementById("signupPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            const assessment = document.getElementById("assessmentForm");

            clearSignupMessage();


            // Check required information

            if (!fullName || !email || !mobile || !studentNo) {
                showSignupError("Please complete all required fields.");
                return;
            }


            // Check mobile number

            if (!/^09[0-9]{9}$/.test(mobile)) {
                showSignupError("Please enter a valid 11-digit mobile number.");
                return;
            }


            // Check password strength

            if (!isValidPassword(password)) {
                showSignupError(
                    "Password must have at least 8 characters, uppercase, lowercase, and a special character."
                );
                return;
            }


            // Check password confirmation

            if (password !== confirmPassword) {
                showSignupError("Passwords do not match. Please try again.");
                return;
            }


            // Check assessment form

            if (!assessment.files || assessment.files.length === 0) {
                showSignupError("Please upload your Student Assessment Form.");
                return;
            }

            const file = assessment.files[0];


            // Check file size (5MB)

            if (file.size > 5 * 1024 * 1024) {
                showSignupError("Assessment form must not exceed 5MB.");

                assessment.value = "";

                document.getElementById("fileName").textContent =
                    "Upload Student Assessment Form";

                return;
            }


            // Check file type

            const allowedTypes = [
                "application/pdf",
                "image/jpeg",
                "image/png"
            ];

            if (!allowedTypes.includes(file.type)) {
                showSignupError("Only PDF, JPG, and PNG files are allowed.");

                assessment.value = "";

                document.getElementById("fileName").textContent =
                    "Upload Student Assessment Form";

                return;
            }


            // SUCCESS

            resetSignupForm();

            openSuccess();

        });
    }


    /* ==============================
       DISPLAY SELECTED FILE NAME
    ============================== */

    const assessmentInput = document.getElementById("assessmentForm");

    if (assessmentInput) {

        assessmentInput.addEventListener("change", function() {

            const fileName = document.getElementById("fileName");

            if (this.files.length > 0) {
                fileName.textContent = this.files[0].name;
            } else {
                fileName.textContent = "Upload Student Assessment Form";
            }

        });
    }


    /* ==============================
       RESET PASSWORD FORM
    ============================== */

    if (resetPasswordForm) {

        resetPasswordForm.addEventListener("submit", function(event) {

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

        signupModal.addEventListener("click", function(event) {

            if (event.target === signupModal) {
                closeSignup();
            }

        });
    }


    if (resetPasswordModal) {

        resetPasswordModal.addEventListener("click", function(event) {

            if (event.target === resetPasswordModal) {
                closeResetPassword();
            }

        });
    }


    if (successModal) {

        successModal.addEventListener("click", function(event) {

            if (event.target === successModal) {
                closeSuccess();
            }

        });
    }


    /* ==============================
       CLOSE MODALS USING ESCAPE
    ============================== */

    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape") {
            closeSignup();
            closeResetPassword();
            closeSuccess();
        }

    });

});
