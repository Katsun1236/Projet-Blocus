document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async function(e) {
            const content = e.target.result;
            if (file.type === 'application/pdf') {
                const pdfText = await extractTextFromPDF(content);
                processFileContent(pdfText);
            } else {
                processFileContent(content);
            }
        };
        reader.readAsArrayBuffer(file);
    }
});

async function extractTextFromPDF(arrayBuffer) {
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
    const text = [];
    const pages = pdfDoc.getPages();
    for (const page of pages) {
        const { textContent } = await page.getTextContent();
        text.push(textContent.items.map(item => item.str).join(' '));
    }
    return text.join('\n');
}

function processFileContent(content) {
    const subjects = content.split('---'); // Utilisez un délimiteur pour séparer les sous-sujets
    subjects.forEach((subject, index) => {
        const subjectName = `Sujet ${index + 1}`;
        const button = document.createElement('button');
        button.textContent = subjectName;
        button.onclick = () => createSubjectPage(subject, subjectName);
        document.getElementById('subject-buttons').appendChild(button);
    });
}

function createSubjectPage(subjectContent, subjectName) {
    const subjectPageContent = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subjectName}</title>
            <link rel="stylesheet" href="../../css/styles.css">
        </head>
        <body>
            <header>
                <div class="header-content">
                    <div class="profile-frame">
                        <img src="../../images/profile.png" alt="Profil utilisateur" class="profile-img" />
                        <div class="profile-status">
                            <!-- Le contenu sera mis à jour via JavaScript -->
                        </div>
                    </div>
                    <img src="../../images/logo.png" alt="Question pour un Blocus" class="logo" />
                    <div class="menu-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <nav id="side-menu" class="side-menu">
                    <div class="close-btn" onclick="toggleMenu()">&#9776;</div>
                    <ul>
                        <li><a href="../../index.html"><img src="../../images/home.png" alt="Accueil" />Accueil</a></li>
                        <li><a href="../francais/francais.html"><img src="../../images/profile.png" alt="Français" />Français</a></li>
                        <li><a href="../relation_publique/relation_publique.html"><img src="../../images/forum.png" alt="Relation Publique" />Relation Publique</a></li>
                        <!-- Ajoutez d'autres liens ici -->
                    </ul>
                </nav>
            </header>
            <main class="main-content">
                <section>
                    <h2>${subjectName}</h2>
                    <p>${subjectContent}</p>
                </section>
            </main>
            <footer class="footer">
                <p>&copy; 2024 Question pour un Blocus</p>
            </footer>
            <script src="../../js/menu-toggle.js"></script>
        </body>
        </html>
    `;
    const subjectPageBlob = new Blob([subjectPageContent], { type: 'text/html' });
    const subjectPageUrl = URL.createObjectURL(subjectPageBlob);

    const tempLink = document.createElement('a');
    tempLink.href = subjectPageUrl;
    tempLink.target = '_blank';
    tempLink.click();
}