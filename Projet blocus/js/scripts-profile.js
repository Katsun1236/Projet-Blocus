document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profile-form');
    const profileStatus = document.getElementById('profile-status');
    const scoresContainer = document.getElementById('scores');
    const menuIcon = document.querySelector('.menu-icon');
    const closeBtn = document.querySelector('.close-btn');
    const sideMenu = document.getElementById('side-menu');

    // Simuler l'état de connexion de l'utilisateur (à remplacer par la logique réelle)
    const isConnected = false; // Changez ceci en true pour simuler un utilisateur connecté

    if (isConnected) {
        profileStatus.innerText = 'En ligne';
        profileForm.username.value = 'NomUtilisateur';
        profileForm.email.value = 'utilisateur@example.com';

        // Mettre à jour les scores de l'utilisateur
        const scores = {
            'Relation Publique': '40/50',
            'Introduction à l\'Évènementiel': '35/50',
            'Sémiologie': '45/50',
            'Introduction aux Médias': '38/50',
            'Langage Cinématographique': '42/50',
            'Communication Interculturelle': '40/50',
            'Anglais': '39/50',
            'Français': '37/50'
        };

        for (const [course, score] of Object.entries(scores)) {
            const scoreElement = document.createElement('p');
            scoreElement.innerText = `${course} : ${score}`;
            scoresContainer.appendChild(scoreElement);
        }
    } else {
        profileStatus.innerText = 'Hors ligne';
        profileForm.username.value = '';
        profileForm.email.value = '';

        // Mettre les scores à 0 pour un utilisateur non connecté
        const courses = [
            'Relation Publique',
            'Introduction à l\'Évènementiel',
            'Sémiologie',
            'Introduction aux Médias',
            'Langage Cinématographique',
            'Communication Interculturelle',
            'Anglais',
            'Français'
        ];

        for (const course of courses) {
            const scoreElement = document.createElement('p');
            scoreElement.innerText = `${course} : 0/50`;
            scoresContainer.appendChild(scoreElement);
        }
    }

    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Les informations du profil ont été mises à jour !');
    });

    menuIcon.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);

    function toggleMenu() {
        sideMenu.classList.toggle('open');
        menuIcon.classList.toggle('open');
    }
});