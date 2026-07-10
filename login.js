const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");

const switchSignup = document.getElementById("switchSignup");
const switchLogin = document.getElementById("switchLogin");

/* SHOW SIGNUP */

function showSignup(){

    signupForm.classList.add("active-form");
    loginForm.classList.remove("active-form");

    signupBtn.classList.add("active");
    loginBtn.classList.remove("active");

}

/* SHOW LOGIN */

function showLogin(){

    loginForm.classList.add("active-form");
    signupForm.classList.remove("active-form");

    loginBtn.classList.add("active");
    signupBtn.classList.remove("active");

}

/* TAB EVENTS */

signupBtn.addEventListener("click",showSignup);

loginBtn.addEventListener("click",showLogin);

/* TEXT SWITCH EVENTS */

switchSignup.addEventListener("click",showSignup);

switchLogin.addEventListener("click",showLogin);

/* PASSWORD SHOW/HIDE */

const eyes = document.querySelectorAll(".eye");

eyes.forEach((eye)=>{

    eye.addEventListener("click",()=>{

        const input = eye.previousElementSibling;

        if(input.type === "password"){

            input.type = "text";

            eye.classList.remove("fa-eye");

            eye.classList.add("fa-eye-slash");

        }

        else{

            input.type = "password";

            eye.classList.remove("fa-eye-slash");

            eye.classList.add("fa-eye");

        }

    });

});