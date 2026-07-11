var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timerunning') 

let timeRunning = 3000 
let timeAutoNext = 7000

nextBtn.onclick = function(){
    showSlider('next')
}

prevBtn.onclick = function(){
    showSlider('prev')
}

let runTimeOut 

let runNextAuto = setTimeout(() => {
    nextBtn.click()
}, timeAutoNext)


function resetTimeAnimation() {
    runningTime.style.animation = 'none'
    runningTime.offsetHeight /* trigger reflow */
    runningTime.style.animation = null 
    runningTime.style.animation = 'runningTime 7s linear 1 forwards'
}


function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item')
    if(type === 'next'){
        list.appendChild(sliderItemsDom[0])
        carousel.classList.add('next')
    } else{
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
        carousel.classList.add('prev')
    }

    clearTimeout(runTimeOut)
    runTimeOut = setTimeout(()=>{
        carousel.classList.remove('next')
        carousel.classList.remove('prev')
    }, timeAutoNext)

    clearTimeout(runNextAuto)
    runNextAuto = setTimeout(()=>{
        nextBtn.click()
    }, timeAutoNext)

    resetTimeAnimation() //reset the running time animation
}

//Start the initial animation

resetTimeAnimation()

// Mobile dropdown menu toggle
const menuIcon = document.querySelector('.nav-left i');
const navMenu = document.querySelector('.nav-menu');

if (menuIcon && navMenu) {
    menuIcon.onclick = function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
    }

    document.onclick = function(e) {
        if (!navMenu.contains(e.target) && e.target !== menuIcon) {
            navMenu.classList.remove('active');
        }
    }

    navMenu.querySelectorAll('li').forEach(li => {
        li.onclick = function() {
            navMenu.classList.remove('active');
        }
    });
}