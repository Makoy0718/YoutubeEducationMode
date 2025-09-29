let youtubeTabs = new Set();

async function initAI() {
    try {
        // Verificar disponibilidad
        const availability = await ai.languageModel.availability();
        console.log("Disponibilidad:", availability);

        if (availability !== "available") {
            console.warn("El modelo no está disponible.");
            return;
        }

        // Crear sesión con el modelo
        const session = await ai.languageModel.create({
            // "default" = modelo básico, "advanced" = mejor calidad (si está disponible)
            model: "default" 
        });

        // Enviar un prompt
        const result = await session.prompt("Escribe un haiku sobre programar extensiones de Chrome.");
        console.log("Respuesta IA:", result);
    } catch (err) {
        console.error("Error al usar el modelo:", err);
    }
}

initAI();

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
        youtubeTabs.add(tabId); // Guardamos el tabId en el set
    }
});


chrome.tabs.onActivated.addListener((activeInfo) => {
    if (youtubeTabs.has(activeInfo.tabId)) {
        chrome.tabs.get(activeInfo.tabId, (tab) => {
            console.log("Title: " + tab.title);
        });
    }
});