// Fonction pour continuer sans se connecter
function continueWithoutSigningIn() {
    // Rediriger vers la page d'accueil ou une autre page souhaitée
    window.location.href = '/index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    // Récupération des éléments du formulaire
    const registerForm = document.getElementById('register-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Vérification que les éléments sont bien présents dans le DOM
    if (!registerForm) {
        console.error("Élément avec l'ID 'register-form' introuvable");
        return;
    }
    if (!emailInput) {
        console.error("Élément avec l'ID 'email' introuvable");
        return;
    }
    if (!passwordInput) {
        console.error("Élément avec l'ID 'password' introuvable");
        return;
    }

    // Ajout d'un paragraphe pour afficher les messages de validation
    const registerMessage = document.createElement('p');
    registerMessage.id = 'register-message';
    registerForm.appendChild(registerMessage);

    // Ajout d'un écouteur d'événement pour la soumission du formulaire
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;
        const newUser = {
            email: email,
            password: password
        };

        console.log('Envoi des données au serveur:', newUser);

        // Envoi des données d'inscription au serveur
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => {
            console.log('Réponse du serveur:', response);
            return response.json();
        })
        .then(data => {
            console.log('Données reçues du serveur:', data);
            if (data.message === 'Inscription réussie') {
                registerMessage.innerText = "Inscription réussie! Vous pouvez maintenant vous connecter.";
            } else {
                registerMessage.innerText = data.error || 'Erreur lors de l\'inscription.';
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            registerMessage.innerText = "Erreur lors de l'inscription.";
        });
    });
});