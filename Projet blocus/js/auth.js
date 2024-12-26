document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('token');
    const currentPath = window.location.pathname.split('/').pop();

    // Redirection si l'utilisateur n'est pas connecté et n'est pas sur les pages de connexion/inscription
    if (!token && currentPath !== 'login.html' && currentPath !== 'register.html') {
        localStorage.setItem('role', 'anonyme');
    }

    // Redirection si l'utilisateur est déjà connecté et tente d'accéder aux pages de connexion/inscription
    if (token && (currentPath === 'login.html' || currentPath === 'register.html')) {
        window.location.href = 'index.html';
    }
});

document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
            alert('Inscription réussie. Vous pouvez maintenant vous connecter.');
            window.location.href = 'login.html';
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        alert('Erreur lors de l\'inscription. Veuillez réessayer.');
    }
});

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            alert('Connexion réussie.');
            window.location.href = 'index.html';
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        alert('Erreur lors de la connexion. Veuillez réessayer.');
    }
});