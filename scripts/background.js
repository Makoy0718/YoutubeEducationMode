//Establecemos el link que va a detectar
const youtubeVideo = "youtube.com/watch"

// Al instalarse, inicia apagado
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ state: "OFF" });
  chrome.action.setBadgeText({ text: "OFF" });
});

//Función que se encarga de si clickeas prende o apaga la extensión
chrome.action.onClicked.addListener(async (tab) =>{
    const {state} = await chrome.storage.local.get("state");
    const nextState = state === "ON" ? "OFF" : "ON";

    await chrome.storage.local.set({state: nextState});
    await chrome.action.setBadgeText({ text: nextState});
});

// Escucha cambios de pestaña o URL
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url?.includes("youtube.com/watch")) {
        const { state } = await chrome.storage.local.get("state");
        if (state === "ON") {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["scripts/contentScript.js"] 
            })
        }
    }
});

// Escucha cambio de pestaña activa
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.url?.includes("youtube.com/watch")) {
        const { state } = await chrome.storage.local.get("state");
        if (state === "ON") {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["scripts/contentScript.js"]
            })
        }
    }
});

