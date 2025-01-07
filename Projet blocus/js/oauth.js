// Google Sign-In
function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    const id_token = googleUser.getAuthResponse().id_token;
    console.log('ID Token: ' + id_token);
    // Envoyer le jeton au serveur pour validation et création de la session utilisateur
}

// Apple Sign-In
AppleID.auth.init({
    clientId: 'com.yourdomain.client-id',
    scope: 'name email',
    redirectURI: 'https://your-ngrok-url.ngrok.io/callback',
    state: 'state',
    usePopup: true
});

document.getElementById('appleid-signin').addEventListener('click', () => {
    AppleID.auth.signIn();
});
