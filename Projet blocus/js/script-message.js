document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');
    const content = urlParams.get('content');
    const messageTitle = document.getElementById('message-title');
    const messageTitleDisplay = document.getElementById('message-title-display');
    const messageContent = document.getElementById('message-content');
    const commentsList = document.getElementById('comments-list');
    const commentForm = document.getElementById('comment-form');
    const messageUserPhoto = document.getElementById('message-user-photo');
    const messageUsername = document.getElementById('message-username');
    const attachmentsSection = document.getElementById('attachments-section');

    messageTitle.innerText = title;
    messageTitleDisplay.innerText = title;
    messageContent.innerText = content;

    const savedMessages = JSON.parse(localStorage.getItem('forumMessages')) || [];
    const currentMessage = savedMessages.find(msg => msg.title === title && msg.content === content);

    if (currentMessage) {
        messageUserPhoto.src = currentMessage.profileImg;
        messageUsername.innerText = currentMessage.userName;

        currentMessage.files.forEach(file => {
            const fileLink = document.createElement('a');
            fileLink.href = file.url;
            fileLink.download = file.name;
            fileLink.innerText = file.name;
            attachmentsSection.appendChild(fileLink);
        });
    }

    const comments = JSON.parse(localStorage.getItem(title + '-comments')) || [];
    comments.forEach(displayComment);

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const comment = document.getElementById('comment').value;

        comments.push(comment);
        localStorage.setItem(title + '-comments', JSON.stringify(comments));

        displayComment(comment);
        commentForm.reset();
    });

    function displayComment(comment) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';

        const userPhotoElement = document.createElement('img');
        userPhotoElement.src = '../images/profile.png'; // Remplacez par la logique pour récupérer la photo du commentateur
        userPhotoElement.alt = "Utilisateur";
        userPhotoElement.className = 'comment-user-photo';

        const commentText = document.createElement('p');
        commentText.innerHTML = `<strong>Utilisateur:</strong> ${comment}`; // Remplacez par la logique pour récupérer le nom du commentateur

        commentElement.appendChild(userPhotoElement);
        commentElement.appendChild(commentText);
        commentsList.appendChild(commentElement);
    }
});