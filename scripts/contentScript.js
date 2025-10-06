// Función para obtener el título del video
function logVideoTitle() {
    const titleEl = document.querySelector("h1.ytd-video-primary-info-renderer, h1.title, h1.title yt-formatted-string");
    const title = titleEl ? titleEl.innerText : document.title;
    console.log("Título del video:", title);
}

// Detecta cambios de URL en SPA
function listenUrlChanges() {
    let lastUrl = location.href;

    const observer = new MutationObserver(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            setTimeout(() => {
                logVideoTitle();
            }, 100);
        }
    });

    observer.observe(document, { childList: true, subtree: true });
}

// Inicialización
logVideoTitle();
listenUrlChanges();
