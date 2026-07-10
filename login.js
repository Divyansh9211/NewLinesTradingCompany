/*=========================================
        ELEMENTS
=========================================*/

const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const slider = document.querySelector(".tab-slider");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const gotoSignup = document.getElementById("gotoSignup");
const gotoLogin = document.getElementById("gotoLogin");


/*=========================================
        SHOW LOGIN
=========================================*/

function showLogin() {

    loginTab.classList.add("active");
    signupTab.classList.remove("active");

    slider.classList.remove("move");

    signupForm.classList.remove("active");
    loginForm.classList.add("active");

}


/*=========================================
        SHOW SIGNUP
=========================================*/

function showSignup() {

    signupTab.classList.add("active");
    loginTab.classList.remove("active");

    slider.classList.add("move");

    loginForm.classList.remove("active");
    signupForm.classList.add("active");

}


/*=========================================
        TAB EVENTS
=========================================*/

loginTab.addEventListener("click", showLogin);

signupTab.addEventListener("click", showSignup);

if(gotoSignup){

    gotoSignup.addEventListener("click", showSignup);

}

if(gotoLogin){

    gotoLogin.addEventListener("click", showLogin);

}


/*=========================================
        PASSWORD SHOW HIDE
=========================================*/

document.querySelectorAll(".toggle-password").forEach(function(icon){

    icon.addEventListener("click", function(){

        const input = this.previousElementSibling;

        if(input.type==="password"){

            input.type="text";

            this.classList.remove("fa-eye");

            this.classList.add("fa-eye-slash");

        }

        else{

            input.type="password";

            this.classList.remove("fa-eye-slash");

            this.classList.add("fa-eye");

        }

    });

});


/*=========================================
        INPUT FOCUS EFFECT
=========================================*/

document.querySelectorAll(".input-box input").forEach(function(input){

    input.addEventListener("focus",function(){

        this.parentElement.classList.add("focus");

    });

    input.addEventListener("blur",function(){

        this.parentElement.classList.remove("focus");

    });

});


/*=========================================
        RIPPLE EFFECT
=========================================*/

document.querySelectorAll(".main-btn").forEach(function(button){

    button.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        ripple.className="ripple";

        const rect=this.getBoundingClientRect();

        const size=Math.max(rect.width,rect.height);

        ripple.style.width=size+"px";
        ripple.style.height=size+"px";

        ripple.style.left=(e.clientX-rect.left-size/2)+"px";
        ripple.style.top=(e.clientY-rect.top-size/2)+"px";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});


/*=========================================
        PAGE LOAD
=========================================*/

window.addEventListener("load",function(){

    document.body.classList.add("loaded");

});


/*=========================================
        ESC KEY
=========================================*/

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        document.activeElement.blur();

    }

});


/*=========================================
        ENTER KEY
=========================================*/

document.querySelectorAll("input").forEach(function(input){

    input.addEventListener("keypress",function(e){

        if(e.key==="Enter"){

            e.preventDefault();

        }

    });

});