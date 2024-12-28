document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const closeBtn = document.querySelector('.close-btn');
    const sideMenu = document.getElementById('side-menu');

    function toggleMenu() {
        console.log("Menu toggle initiated"); // Debugging
        sideMenu.classList.toggle('open');
        menuIcon.classList.toggle('open');
    }

    if (menuIcon && closeBtn && sideMenu) {
        menuIcon.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', toggleMenu);
    } else {
        console.error("Elements for menu toggle not found");
    }
});
