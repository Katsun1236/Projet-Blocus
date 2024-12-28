document.addEventListener('DOMContentLoaded', function() {
    const messagesContainer = document.getElementById('messages');
    const savedMessages = JSON.parse(localStorage.getItem('forumMessages')) || [];

    function displayMessage(message) {
        console.log("Displaying message:", message); // Debugging

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
                ${message.file && message.file.url ? `<a href="${message.file.url}" download="${message.file.name}">${message.file.name}</a>` : ''}
            </div>
            <div class="reactions">
                <span class="reaction-button" data-reaction="👍">👍 ${message.reactions && message.reactions['👍'] !== undefined ? message.reactions['👍'] : 0}</span>
                <span class="reaction-button" data-reaction="❤️">❤️ ${message.reactions && message.reactions['❤️'] !== undefined ? message.reactions['❤️'] : 0}</span>
                <span class="reaction-button" data-reaction="😂">😂 ${message.reactions && message.reactions['😂'] !== undefined ? message.reactions['😂'] : 0}</span>
                <span class="reaction-button" data-reaction="😮">😮 ${message.reactions && message.reactions['😮'] !== undefined ? message.reactions['😮'] : 0}</span>
                <span class="reaction-button" data-reaction="😢">😢 ${message.reactions && message.reactions['😢'] !== undefined ? message.reactions['😢'] : 0}</span>
                <span class="reaction-button" data-reaction="😡">😡 ${message.reactions && message.reactions['😡'] !== undefined ? message.reactions['😡'] : 0}</span>
            </div>
        `;
        messagesContainer.appendChild(messageCard);

        const reactionButtons = messageCard.querySelectorAll('.reaction-button');
        reactionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const reaction = button.getAttribute('data-reaction');
                if (!message.reactions) {
                    message.reactions = {};
                }
                if (!message.reactions[reaction]) {
                    message.reactions[reaction] = 0;
                }
                message.reactions[reaction]++;
                localStorage.setItem('forumMessages', JSON.stringify(savedMessages));
                button.innerText = `${reaction} ${message.reactions[reaction]}`;
            });
        });
    }

    // Afficher les messages sauvegardés au chargement de la page
    savedMessages.forEach(displayMessage);
});