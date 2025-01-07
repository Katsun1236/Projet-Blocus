// Charger les fichiers audio
const correctSound = new Audio('../audio/correct.mp3');
const incorrectSound = new Audio('../audio/incorrect.mp3');

// Fonction pour régler le volume de 0 à 100
function setVolume(volume) {
    const normalizedVolume = volume / 100; // Normaliser le volume entre 0 et 1
    correctSound.volume = normalizedVolume;
    incorrectSound.volume = normalizedVolume;
}

function playCorrectSound() {
    correctSound.play();
}

function playIncorrectSound() {
    incorrectSound.play();
}