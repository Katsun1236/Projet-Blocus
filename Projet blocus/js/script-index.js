document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const closeBtn = document.querySelector('.close-btn');
    const sideMenu = document.getElementById('side-menu');

    if (menuIcon && closeBtn && sideMenu) {
        menuIcon.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', toggleMenu);
    }

    function toggleMenu() {
        sideMenu.classList.toggle('open');
        menuIcon.classList.toggle('open');
    }
});
