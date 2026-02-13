let menu = document.querySelector('#menu_icon');
let navbar = document.querySelector('.navbar');


menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

const typed = new Typed('.multiple-text', {
    strings: ['CSE Student', 'Backend Developer', 'Frontend Developer', 'Graphic Designer', 'Web Designer','Data Analyst'],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1200,
    loop: true,

});
