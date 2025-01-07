let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer; // Variable pour le chronomètre
let secondsElapsed = 0; // Variable pour suivre le temps écoulé

document.addEventListener('DOMContentLoaded', function() {
    fetch('qcm_questions.html')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const questionElements = doc.querySelectorAll('.qcm-question');
            questions = Array.from(questionElements).map(element => ({
                question: element.getAttribute('data-question'),
                options: element.getAttribute('data-options').split('|'),
                correct: element.getAttribute('data-correct').split('|'),
                explanation: element.getAttribute('data-explanation')
            }));
            loadQuestion();
            startTimer(); // Démarrer le chronomètre
        })
        .catch(error => {
            console.error('Error loading questions:', error);
        });

    // Afficher le score et le chronomètre
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'score-display';
    scoreDisplay.innerHTML = `Score: ${score}`;
    document.body.appendChild(scoreDisplay);

    const timerDisplay = document.createElement('div');
    timerDisplay.className = 'timer-display';
    timerDisplay.innerHTML = `Temps écoulé: ${formatTime(secondsElapsed)}`;
    document.body.appendChild(timerDisplay);

    // Ajouter le bouton "Revenir à la page"
    const returnButton = document.createElement('button');
    returnButton.textContent = 'Revenir à la page';
    returnButton.className = 'return-button';
    returnButton.onclick = function() {
        window.location.href = 'semiologie.html'; // Remplacer par l'URL de la page de destination
    };
    document.body.appendChild(returnButton);
});

function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    const questionNumber = currentQuestionIndex + 1;
    const totalQuestions = questions.length;

    questionContainer.innerHTML = `
        <div class="qcm-question">
            <p>Question ${questionNumber}/${totalQuestions}</p>
            <p>${questions[currentQuestionIndex].question}</p>
            ${questions[currentQuestionIndex].options.map((option, index) => `
                <div>
                    <input type="checkbox" name="option" value="${String.fromCharCode(97 + index)}" id="option${index}">
                    <label for="option${index}">${option}</label>
                </div>
            `).join('')}
        </div>
        <div id="explanation" style="display: none;"></div>
    `;
    document.querySelector('.submit-button').style.display = 'block';
    document.querySelector('.next-button').style.display = 'none';

    // Mettre à jour l'affichage du score
    document.querySelector('.score-display').innerHTML = `Score: ${score}`;
}

function submitAnswer() {
    const selectedOptions = Array.from(document.querySelectorAll('input[name="option"]:checked')).map(input => input.value);
    const correctOptions = questions[currentQuestionIndex].correct;
    const explanationDiv = document.getElementById('explanation');

    selectedOptions.forEach(option => {
        const label = document.querySelector(`label[for="option${option.charCodeAt(0) - 97}"]`);
        if (correctOptions.includes(option)) {
            label.style.backgroundColor = 'lightgreen';
        } else {
            label.style.backgroundColor = 'lightcoral';
        }
    });

    correctOptions.forEach(option => {
        const label = document.querySelector(`label[for="option${option.charCodeAt(0) - 97}"]`);
        label.style.backgroundColor = 'lightgreen';
    });

    if (arraysEqual(selectedOptions, correctOptions)) {
        score++;
        explanationDiv.innerHTML = `<p style="color: green;">Correct ! ${questions[currentQuestionIndex].explanation}</p>`;
    } else {
        explanationDiv.innerHTML = `<p style="color: red;">Incorrect ! ${questions[currentQuestionIndex].explanation}</p>`;
    }

    explanationDiv.style.display = 'block';
    document.querySelector('.submit-button').style.display = 'none';
    document.querySelector('.next-button').style.display = 'block';

    // Mettre à jour l'affichage du score
    document.querySelector('.score-display').innerHTML = `Score: ${score}`;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        document.getElementById('explanation').style.display = 'none';
    } else {
        displayScore();
        stopTimer(); // Arrêter le chronomètre
    }
}

function displayScore() {
    const questionContainer = document.getElementById('question-container');
    const totalQuestions = questions.length;

    questionContainer.innerHTML = `
        <div class="qcm-question">
            <p>Vous avez terminé le QCM !</p>
            <p>Votre score : ${score} / ${totalQuestions}</p>
        </div>
    `;
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    arr1.sort();
    arr2.sort();
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

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
