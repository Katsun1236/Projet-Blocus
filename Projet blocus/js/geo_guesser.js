let timer; // Variable pour le chronomètre
let secondsElapsed = 0; // Variable pour suivre le temps écoulé
let score = 0;
let locations = [
    { image: '../../images/QCM/Evenementiel/Aula-Magna/A-M_hall.png', options: ['Aula Magna - Hall', 'Aula Magna - Lac', 'Aula Magna - LLN', 'Bois du Casier - Auditoire'], correct: 'Aula Magna - Hall' },
    { image: '../../images/QCM/Evenementiel/Aula-Magna/A-M_lac.png', options: ['Bois du Casier - Marcinelle', 'Bourse - Auditoire Michaux', 'Bourse - Auditoire Rops', 'Aula Magna - Lac'], correct: 'Aula Magna - Lac' },
    { image: '../../images/QCM/Evenementiel/Aula-Magna/AULA-MAGNA_LLN.png', options: ['Bourse - Catering', 'Bourse - Namur', 'Aula Magna - LLN', 'Bourse - Polyvalent'], correct: 'Aula Magna - LLN' },
    { image: '../../images/QCM/Evenementiel/Bois du casier/BDC_auditoire.png', options: ['Bois du Casier - Auditoire', 'Bois du Casier - Marcinelle', 'Bourse - Auditoire Michaux', 'Bourse - Auditoire Rops'], correct: 'Bois du Casier - Auditoire' },
    { image: '../../images/QCM/Evenementiel/Bois du casier/BDC_marcinelle.png', options: ['Bois du Casier - Marcinelle', 'Bourse - Catering', 'Bourse - Namur', 'Bourse - Polyvalent'], correct: 'Bois du Casier - Marcinelle' },
    { image: '../../images/QCM/Evenementiel/Bourse/bourse_auditoire_michaux.png', options: ['Bourse - Auditoire Michaux', 'Bourse - Auditoire Rops', 'Bourse - Salle de Réunion', 'CEME - Auditoire'], correct: 'Bourse - Auditoire Michaux' },
    { image: '../../images/QCM/Evenementiel/Bourse/bourse_auditoire_rops.png', options: ['Bourse - Auditoire Rops', 'CEME - Polyvalent', 'CEME - Rencontre', 'CEME - Salle'], correct: 'Bourse - Auditoire Rops' },
    { image: '../../images/QCM/Evenementiel/Bourse/bourse_catering.png', options: ['Bourse - Catering', 'CEME - Auditoire', 'CEME - Charleroi', 'CEME - Salle'], correct: 'Bourse - Catering' },
    { image: '../../images/QCM/Evenementiel/Bourse/bourse_namur.png', options: ['Bourse - Namur', 'CEME - Polyvalent', 'CEME - Rencontre', 'CEME - Salle'], correct: 'Bourse - Namur' },
    { image: '../../images/QCM/Evenementiel/Bourse/bourse_polyvalent.png', options: ['Bourse - Polyvalent', 'CEME - Auditoire', 'CEME - Charleroi', 'CEME - Rencontre'], correct: 'Bourse - Polyvalent' },
    { image: '../../images/QCM/Evenementiel/Bourse/bourse_salle_de_reunion.png', options: ['Bourse - Salle de Réunion', 'CEME - Polyvalent', 'CEME - Rencontre', 'CEME - Salle'], correct: 'Bourse - Salle de Réunion' },
    { image: '../../images/QCM/Evenementiel/CEME/CEME_auditoire.png', options: ['CEME - Auditoire', 'CEME - Charleroi', 'CEME - Polyvalent', 'CEME - Rencontre'], correct: 'CEME - Auditoire' },
    { image: '../../images/QCM/Evenementiel/CEME/CEME_charleroi.png', options: ['CEME - Charleroi', 'CEME - Polyvalent', 'CEME - Rencontre', 'CEME - Salle'], correct: 'CEME - Charleroi' },
    { image: '../../images/QCM/Evenementiel/CEME/CEME_polyvalent.png', options: ['CEME - Polyvalent', 'CEME - Rencontre', 'CEME - Salle', 'CSC - Auditoire'], correct: 'CEME - Polyvalent' },
    { image: '../../images/QCM/Evenementiel/CEME/CEME_rencontre.png', options: ['CEME - Rencontre', 'CEME - Salle', 'CSC - Auditoire', 'CSC - Bouge'], correct: 'CEME - Rencontre' },
    { image: '../../images/QCM/Evenementiel/CEME/CEME_salle.png', options: ['CEME - Salle', 'CSC - Auditoire', 'CSC - Bouge', 'Ilon - Namur'], correct: 'CEME - Salle' },
    { image: '../../images/QCM/Evenementiel/CSC/CSC_auditoire.png', options: ['CSC - Auditoire', 'CSC - Bouge', 'Ilon - Namur', 'Aula Magna - Hall'], correct: 'CSC - Auditoire' },
    { image: '../../images/QCM/Evenementiel/CSC/CSC_bouge.png', options: ['CSC - Bouge', 'Ilon - Namur', 'Aula Magna - Lac', 'Aula Magna - LLN'], correct: 'CSC - Bouge' },
    { image: '../../images/QCM/Evenementiel/Ilon/Ilon_namur.png', options: ['Ilon - Namur', 'Bois du Casier - Auditoire', 'Bois du Casier - Marcinelle', 'Bourse - Auditoire Michaux'], correct: 'Ilon - Namur' },
    { image: '../../images/QCM/Evenementiel/CSC/CSC_auditoire.png', options: ['CSC - Auditoire', 'CSC - Bouge', 'Ilon - Namur', 'Libramont - Auditoire'], correct: 'CSC - Auditoire' },
    { image: '../../images/QCM/Evenementiel/CSC/CSC_bouge.png', options: ['CSC - Bouge', 'Ilon - Namur', 'Palais du congrès - Europe', 'WCCM - Auditoire'], correct: 'CSC - Bouge' },
    { image: '../../images/QCM/Evenementiel/Ilon/Ilon_namur.png', options: ['Ilon - Namur', 'Palais du congrès - Grand foyer', 'WCCM - Forum', 'WCCM - Mons'], correct: 'Ilon - Namur' },
    { image: '../../images/QCM/Evenementiel/Libramont/LEC_auditoire.png', options: ['Libramont - Auditoire', 'Libramont - Polyvalent', 'Palais du congrès - Mosanes', 'Palais du congrès - Pas-perdus'], correct: 'Libramont - Auditoire' },
    { image: '../../images/QCM/Evenementiel/Libramont/LEC_polyvalent.png', options: ['Libramont - Polyvalent', 'Palais du congrès - Reine Elisabeth', 'Palais du congrès - Roger', 'WCCM - Auditoire'], correct: 'Libramont - Polyvalent' },
    { image: '../../images/QCM/Evenementiel/Palais du congrès/PDC_europe.png', options: ['Palais du congrès - Europe', 'Palais du congrès - Grand foyer', 'Palais du congrès - Liège', 'Palais du congrès - Mosanes'], correct: 'Palais du congrès - Europe' },
    { image: '../../images/QCM/Evenementiel/Palais du congrès/PDC_grand_foyer.png', options: ['Palais du congrès - Grand foyer', 'Palais du congrès - Liège', 'Palais du congrès - Mosanes', 'Palais du congrès - Pas-perdus'], correct: 'Palais du congrès - Grand foyer' },
    { image: '../../images/QCM/Evenementiel/Palais du congrès/PDC_liège.png', options: ['Palais du congrès - Liège', 'Palais du congrès - Mosanes', 'Palais du congrès - Pas-perdus', 'Palais du congrès - Reine Elisabeth'], correct: 'Palais du congrès - Liège' },
    { image: '../../images/QCM/Evenementiel/Palais du congrès/PDC_mosanes.png', options: ['Palais du congrès - Mosanes', 'Palais du congrès - Pas-perdus', 'Palais du congrès - Reine Elisabeth', 'Palais du congrès - Roger'], correct: 'Palais du congrès - Mosanes' },
    { image: '../../images/QCM/Evenementiel/Palais du congrès/PDC_pas-perdus.png', options: ['Palais du congrès - Pas-perdus', 'Palais du congrès - Reine Elisabeth', 'Palais du congrès - Roger', 'WCCM - Auditoire'], correct: 'Palais du congrès - Pas-perdus' },
    { image: '../../images/QCM/Evenementiel/Palais du congrès/PDC_reine-elisabeth.png', options: ['Palais du congrès - Reine Elisabeth', 'Palais du congrès - Roger', 'WCCM - Auditoire', 'WCCM - Forum'], correct: 'Palais du congrès - Reine Elisabeth' },
    { image: '../../images/QCM/Evenementiel/Palais du congrès/PDC_roger.png', options: ['Palais du congrès - Roger', 'WCCM - Auditoire', 'WCCM - Forum', 'WCCM - Mons'], correct: 'Palais du congrès - Roger' },
    { image: '../../images/QCM/Evenementiel/WCCM/WCCM_auditoire.png', options: ['WCCM - Auditoire', 'WCCM - Forum', 'WCCM - Mons', 'CSC - Auditoire'], correct: 'WCCM - Auditoire' },
    { image: '../../images/QCM/Evenementiel/WCCM/WCCM_forum.png', options: ['WCCM - Forum', 'WCCM - Mons', 'CSC - Auditoire', 'CSC - Bouge'], correct: 'WCCM - Forum' },
    { image: '../../images/QCM/Evenementiel/WCCM/WCCM_mons.png', options: ['WCCM - Mons', 'CSC - Auditoire', 'CSC - Bouge', 'Ilon - Namur'], correct: 'WCCM - Mons' }
];   

let currentLocationIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    loadLocation();
});

function loadLocation() {
    const location = locations[currentLocationIndex];
    const imageContainer = document.getElementById('image-container');
    const questionContainer = document.getElementById('question-container');

    imageContainer.innerHTML = `<img src="${location.image}" alt="Lieu à deviner" class="geo-image">`;
    questionContainer.innerHTML = `
        ${location.options.map((option, index) => `
            <div>
                <input type="radio" name="location" value="${option}" id="option${index}">
                <label for="option${index}">${option}</label>
            </div>
        `).join('')}
    `;

    document.querySelector('.submit-button').style.display = 'block';
    document.querySelector('.next-button').style.display = 'none';
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="location"]:checked');
    if (selectedOption) {
        const correctOption = locations[currentLocationIndex].correct;

        if (selectedOption.value === correctOption) {
            score++;
            playCorrectSound();
            alert('Correct !');
        } else {
            playIncorrectSound();
            alert('Incorrect !');
        }

        document.querySelector('.submit-button').style.display = 'none';
        document.querySelector('.next-button').style.display = 'block';
    } else {
        alert('Veuillez sélectionner une option.');
    }
}

function nextQuestion() {
    currentLocationIndex++;
    if (currentLocationIndex < locations.length) {
        loadLocation();
    } else {
        alert(`Vous avez terminé le Geo-Guesser avec un score de ${score} / ${locations.length} !`);
        document.querySelector('.submit-button').style.display = 'none';
        document.querySelector('.next-button').style.display = 'none';
    }
}

function playCorrectSound() {
    const correctSound = new Audio('../audio/correct.mp3');
    correctSound.play();
}

function playIncorrectSound() {
    const incorrectSound = new Audio('../audio/incorrect.mp3');
    incorrectSound.play();
}
// Fonction pour mélanger les questions
function shuffleLocations() {
    for (let i = locations.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [locations[i], locations[j]] = [locations[j], locations[i]];
    }
}

// Appeler cette fonction au chargement de la page pour mélanger les questions
document.addEventListener('DOMContentLoaded', function() {
    shuffleLocations();
    loadLocation();
});

document.addEventListener('DOMContentLoaded', function() {
    // Appeler cette fonction au chargement de la page pour mélanger les questions et démarrer le chronomètre
    shuffleLocations();
    loadLocation();
    startTimer(); // Démarrer le chronomètre

    // Afficher le score et le chronomètre
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'score-display';
    scoreDisplay.innerHTML = `Score: ${score}`;
    document.body.appendChild(scoreDisplay);

    const timerDisplay = document.createElement('div');
    timerDisplay.className = 'timer-display';
    timerDisplay.innerHTML = `Temps écoulé: ${formatTime(secondsElapsed)}`;
    document.body.appendChild(timerDisplay);
});

// Fonction pour démarrer le chronomètre
function startTimer() {
    timer = setInterval(() => {
        secondsElapsed++;
        document.querySelector('.timer-display').innerHTML = `Temps écoulé: ${formatTime(secondsElapsed)}`;
    }, 1000);
}

// Fonction pour arrêter le chronomètre
function stopTimer() {
    clearInterval(timer);
}

// Fonction pour formater le temps en minutes et secondes
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Mettre à jour l'affichage du score
function updateScoreDisplay() {
    document.querySelector('.score-display').innerHTML = `Score: ${score}`;
}
function submitAnswer() {
    const selectedOption = document.querySelector('input[name="location"]:checked');
    const correctOption = locations[currentLocationIndex].correct;

    if (selectedOption) {
        const labels = document.querySelectorAll('label');

        labels.forEach(label => {
            if (label.textContent === correctOption) {
                label.style.backgroundColor = 'lightgreen';
            }
        });

        if (selectedOption.value !== correctOption) {
            const selectedLabel = document.querySelector(`label[for="${selectedOption.id}"]`);
            selectedLabel.style.backgroundColor = 'lightcoral';
        }

        document.querySelector('.submit-button').style.display = 'none';
        document.querySelector('.next-button').style.display = 'block';

        // Mettre à jour l'affichage du score
        if (selectedOption.value === correctOption) {
            score++;
        }
        updateScoreDisplay();
    } else {
        alert('Veuillez sélectionner une option.');
    }
}

