function toggleMenu() {
    const menu = document.getElementById('side-menu');
    menu.classList.toggle('open');
}

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const cours = urlParams.get('cours');
    const coursNoms = {
        "relation_publique": "Relation Publique",
        "evenementiel": "Introduction à l'Évènementiel",
        "semiologie": "Sémiologie",
        "media": "Introduction aux Médias",
        "cinema": "Langage Cinématographique",
        "interculturelle": "Communication Interculturelle",
        "anglais": "Anglais",
        "francais": "Français"
    };

    if (cours && document.getElementById('cours-nom')) {
        document.getElementById('cours-nom').textContent = coursNoms[cours] || 'QCM';
    }

    fetch('../data/questions.json')
        .then(response => response.json())
        .then(data => {
            if (data[cours]) {
                const questions = data[cours];
                let questionHtml = '';
                
                questions.forEach((q, index) => {
                    questionHtml += `<div class="question">
                        <p>${q.question}</p>
                        ${q.options.map(option => `<label><input type="radio" name="question${index}" value="${option}">${option}</label>`).join('<br>')}
                    </div>`;
                });

                document.getElementById('questions').innerHTML = questionHtml;
            } else {
                document.getElementById('questions').innerHTML = '<p>Aucune question trouvée pour ce cours.</p>';
            }
        })
        .catch(error => {
            console.error('Erreur de chargement des questions:', error);
            document.getElementById('questions').innerHTML = '<p>Erreur de chargement des questions. Veuillez réessayer plus tard.</p>';
        });
});