document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const registerMessage = document.createElement('p');
    registerMessage.id = 'register-message';
    registerForm.appendChild(registerMessage);

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;
        const newUser = {
            email: email,
            password: password
        };

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Inscription réussie') {
                registerMessage.innerText = "Inscription réussie! Vous pouvez maintenant vous connecter.";
            } else {
                registerMessage.innerText = data.error || 'Erreur lors de l\'inscription.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            registerMessage.innerText = "Erreur lors de l'inscription.";
        });
    });
});