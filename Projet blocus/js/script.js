//scrip pour index
const menuIcon = document.querySelector('.menu-icon');

menuIcon.addEventListener('click', () => {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.toggle('open');
    menuIcon.classList.toggle('open');
});

const courses = [
    'relation_publique', 
    'evenementiel', 
    'semiologie', 
    'media', 
    'cinema', 
    'interculturelle', 
    'anglais', 
    'francais'
];

courses.forEach(course => {
    const scoreElement = document.getElementById(`score_${course}`);
    let score = 0; // Valeur par défaut
    // Récupérez le score du visiteur ici (remplacez cette logique par la vôtre)
    // Exemple :
    // let score = getScoreFromDatabase(course); // Assurez-vous que getScoreFromDatabase() renvoie le score correct

    scoreElement.textContent = `${score}/50`;
});

    // Fermer le menu latéral en cliquant sur le bouton de fermeture
const closeButton = document.querySelector('.close-btn');
closeButton.addEventListener('click', () => {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.remove('open');
    menuIcon.classList.remove('open');
});

//script pour login 
function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const passwordToggle = document.querySelector('.password-toggle');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        passwordToggle.src = '../images/eyes-open.png'; // Change l'image à l'œil ouvert
    } else {
        passwordField.type = 'password';
        passwordToggle.src = '../images/eyes-closed.png'; // Change l'image à l'œil fermé
    }
}

function loginWithGoogle() {
    // Fonctionnalité de connexion avec Google
    console.log("Connexion avec Google");
}

function loginWithApple() {
    // Fonctionnalité de connexion avec Apple
    console.log("Connexion avec Apple");
}
//script pour register 
function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const passwordToggle = document.querySelector('.password-toggle');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        passwordToggle.src = '../images/eyes-open.png'; // Change l'image à l'œil ouvert
    } else {
        passwordField.type = 'password';
        passwordToggle.src = '../images/eyes-closed.png'; // Change l'image à l'œil fermé
    }
}

function continueWithoutSigningIn() {
    // Redirection ou action pour continuer sans se connecter
    window.location.href = "index.html"; // Par exemple, rediriger vers la page d'accueil
}
//script pour profile 
document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profile-form');
    const profileStatus = document.getElementById('profile-status');
    const scoresContainer = document.getElementById('scores');

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

    document.querySelector('.menu-icon').addEventListener('click', toggleMenu);
    document.querySelector('.close-btn').addEventListener('click', toggleMenu);
});

function toggleMenu() {
    document.getElementById('side-menu').classList.toggle('open');
    document.querySelector('.menu-icon').classList.toggle('open');
}
