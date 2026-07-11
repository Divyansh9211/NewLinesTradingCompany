// ========================================================
// NLTC Login & Signup JavaScript (Aligned with Mockup - rgb(255,0,0) Red Theme)
// ========================================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // Password Show / Hide
    // ==========================================

    const togglePassword = document.querySelectorAll(".togglePassword");

    togglePassword.forEach(icon => {

        icon.addEventListener("click", () => {

            const target = document.getElementById(icon.dataset.target);

            if (target.type === "password") {

                target.type = "text";

                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");

            } else {

                target.type = "password";

                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");

            }

        });

    });

    // ==========================================
    // Input Focus Effect
    // ==========================================

    const inputs = document.querySelectorAll(".input-box input");

    inputs.forEach(input => {

        input.addEventListener("focus", () => {

            input.parentElement.classList.add("active");

        });

        input.addEventListener("blur", () => {

            if (input.value === "") {

                input.parentElement.classList.remove("active");

            }

        });

    });

    // ==========================================
    // Login Validation
    // ==========================================

    const loginForm = document.querySelector(".login-form");

    if (loginForm) {

        loginForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const fields = loginForm.querySelectorAll("input");

            let valid = true;

            fields.forEach(field => {

                if (field.type !== "checkbox" && field.value.trim() === "") {

                    valid = false;

                    field.parentElement.classList.add("error");

                } else {

                    if (field.parentElement.classList.contains("input-box")) {

                        field.parentElement.classList.remove("error");

                    }

                }

            });

            if (valid) {

                alert("Login Successful!");

            }

        });

    }

    // ==========================================
    // Signup Validation
    // ==========================================

    const signupForm = document.querySelector(".signup-form");

    if (signupForm) {

        signupForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const password = document.getElementById("signupPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {

                alert("Passwords do not match.");

                return;

            }

            alert("Account Created Successfully!");

        });

    }

    // ==========================================
    // Ripple Button Effect
    // ==========================================

    const buttons = document.querySelectorAll("button");

    buttons.forEach(button => {

        button.addEventListener("click", function (e) {

            const circle = document.createElement("span");

            const diameter = Math.max(button.clientWidth, button.clientHeight);

            circle.style.width = diameter + "px";
            circle.style.height = diameter + "px";

            circle.classList.add("ripple");

            const rect = button.getBoundingClientRect();

            circle.style.left = (e.clientX - rect.left - diameter / 2) + "px";
            circle.style.top = (e.clientY - rect.top - diameter / 2) + "px";

            const ripple = button.getElementsByClassName("ripple")[0];

            if (ripple) {

                ripple.remove();

            }

            button.appendChild(circle);

        });

    });

    // ==========================================
    // Card Animation
    // ==========================================

    const cards = document.querySelectorAll(".glass-card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform = "translateY(40px)";

        setTimeout(() => {

            card.style.transition = "0.8s ease";

            card.style.opacity = "1";

            card.style.transform = "translateY(0px)";

        }, index * 250);

    });

    // ==========================================
    // Floating Animation
    // ==========================================

    setInterval(() => {

        cards.forEach((card, index) => {

            const offset = index % 2 === 0 ? -6 : 6;

            card.animate(

                [
                    { transform: "translateY(0px)" },
                    { transform: `translateY(${offset}px)` },
                    { transform: "translateY(0px)" }
                ],

                {
                    duration: 3000,
                    iterations: 1
                }

            );

        });

    }, 3000);

});