document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const authMessage = document.createElement('p');
    authMessage.id = 'auth-message';
    loginForm.appendChild(authMessage);
    const userRoleDisplay = document.createElement('p');
    userRoleDisplay.id = 'user-role';
    loginForm.appendChild(userRoleDisplay);

    fetch('/users.json')  // Assurez-vous que l'URL est correcte
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(users => {
            let currentUser = null;

            function loginUser(email, password) {
                const user = users.find(u => u.email === email && u.password === password);
                if (user) {
                    currentUser = user;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    displayUserRole();
                    authMessage.innerText = "Connexion réussie!";
                    // Rediriger en fonction du rôle de l'utilisateur
                    if (currentUser.role === "Admin") {
                        window.location.href = "admin.html";
                    } else if (currentUser.role === "Membre") {
                        window.location.href = "member.html";
                    } else {
                        window.location.href = "index.html";
                    }
                } else {
                    authMessage.innerText = "Email ou mot de passe incorrect.";
                }
            }

            function logoutUser() {
                currentUser = null;
                localStorage.removeItem('currentUser');
                userRoleDisplay.innerText = "";
                authMessage.innerText = "Déconnexion réussie.";
            }

            function displayUserRole() {
                if (currentUser) {
                    userRoleDisplay.innerText = `Rôle : ${currentUser.role}`;
                }
            }

            loginForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const email = emailInput.value;
                const password = passwordInput.value;
                loginUser(email, password);
            });

            const logoutButton = document.createElement('button');
            logoutButton.id = 'logout-button';
            logoutButton.innerText = 'Se déconnecter';
            logoutButton.addEventListener('click', function() {
                logoutUser();
            });
            loginForm.appendChild(logoutButton);

            // Vérifier si un utilisateur est déjà connecté
            const storedUser = JSON.parse(localStorage.getItem('currentUser'));
            if (storedUser) {
                currentUser = storedUser;
                displayUserRole();
            }
        })
        .catch(error => {
            console.error('Error loading users:', error);
            authMessage.innerText = "Erreur de chargement des utilisateurs.";
        });
});