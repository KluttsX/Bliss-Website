
let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');


menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
};
window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('open');
}

const sr = ScrollReveal({
    distance: '70px',
    duration: 2700,
    reset: true
});

window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    const scrollTop = window.scrollY;

    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('.navlist a');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Evitar el comportamiento predeterminado del enlace

            const targetId = this.getAttribute('href'); // Obtener el ID del objetivo del enlace
            const targetSection = document.querySelector(targetId); // Seleccionar la sección correspondiente

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave a la sección
            }
        });
    });
});

