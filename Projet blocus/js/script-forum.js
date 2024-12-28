document.addEventListener('DOMContentLoaded', function() {
    const forumForm = document.getElementById('forum-form');
    const messagesContainer = document.getElementById('messages');
    const profileImg = "../images/profile.png"; // Simuler l'image de profil (remplacez par la logique réelle)
    const userName = "Utilisateur"; // Simuler le nom d'utilisateur (remplacez par la logique réelle)

    // Charger les messages depuis le stockage local
    const savedMessages = JSON.parse(localStorage.getItem('forumMessages')) || [];
    savedMessages.forEach(displayMessage);

    // Simuler l'état de connexion de l'utilisateur (à remplacer par la logique réelle)
    const isConnected = true; // Changez ceci en false pour simuler un utilisateur non connecté

    if (isConnected) {
        forumForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;
            const attachment = document.getElementById('attachments').files[0]; // Un seul fichier à la fois
            const file = attachment ? {
                name: attachment.name,
                url: URL.createObjectURL(attachment)
            } : null;

            const message = { title, content, file, userName, profileImg, reactions: {} };
            savedMessages.push(message);
            localStorage.setItem('forumMessages', JSON.stringify(savedMessages));

            displayMessage(message);
            forumForm.reset();
        });
    } else {
        forumForm.innerHTML = '<p>Vous devez être connecté pour publier un message.</p>';
    }

    function displayMessage(message) {
        const messageCard = document.createElement('div');
        messageCard.className = 'message-card';
        messageCard.innerHTML = `
            <div class="message-header">
                <img src="${message.profileImg}" alt="${message.userName}" class="message-user-photo">
                <strong>${message.userName}</strong>
                <a href="message.html?title=${encodeURIComponent(message.title)}&content=${encodeURIComponent(message.content)}">
                    <h3>${message.title}</h3>
                </a>
            </div>
            <p>${message.content}</p>
            <div class="attachments">
                ${message.file ? `<a href="${message.file.url}" download="${message.file.name}">${message.file.name}</a>` : ''}
            </div>
            <div class="reactions">
                <span class="reaction-button" data-reaction="👍">👍 ${message.reactions['👍'] || 0}</span>
                <span class="reaction-button" data-reaction="❤️">❤️ ${message.reactions['❤️'] || 0}</span>
                <span class="reaction-button" data-reaction="😂">😂 ${message.reactions['😂'] || 0}</span>
                <span class="reaction-button" data-reaction="😮">😮 ${message.reactions['😮'] || 0}</span>
                <span class="reaction-button" data-reaction="😢">😢 ${message.reactions['😢'] || 0}</span>
                <span class="reaction-button" data-reaction="😡">😡 ${message.reactions['😡'] || 0}</span>
            </div>
        `;
        messagesContainer.appendChild(messageCard);

        const reactionButtons = messageCard.querySelectorAll('.reaction-button');
        reactionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const reaction = button.getAttribute('data-reaction');
                if (message.reactions && !message.reactions[reaction]) {
                    message.reactions[reaction] = 0;
                }
                if (message.reactions && message.reactions[reaction] !== undefined) {
                    message.reactions[reaction]++;
                } else {
                    console.error("Error updating reaction:", reaction);
                }
                localStorage.setItem('forumMessages', JSON.stringify(savedMessages));
                button.innerText = `${reaction} ${message.reactions[reaction]}`;
            });
        });
    }
});
