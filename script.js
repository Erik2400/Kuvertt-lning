(() => {
    const STORAGE_KEY = "xhr_127_counter";

    if (window.__xhrCounterInstalled) {
        alert("Tælleren kører allerede.");
        return;
    }

    window.__xhrCounterInstalled = true;

    let count = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);

    const panel = document.createElement("div");
    panel.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 2147483647;
        background: rgba(0,0,0,0.85);
        color: white;
        padding: 10px;
        border-radius: 8px;
        font-family: Arial,sans-serif;
        font-size: 14px;
        min-width: 180px;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
    `;

    const text = document.createElement("div");

    function updateText() {
        text.textContent = `Kuverter: ${count}`;
    }

    updateText();

    const resetButton = document.createElement("button");
    resetButton.textContent = "Nulstil tæller";
    resetButton.style.marginTop = "8px";

    resetButton.onclick = () => {
        if (confirm("Er du sikker på, at du vil nulstille tælleren?")) {
            count = 0;
            localStorage.setItem(STORAGE_KEY, count);
            updateText();
        }
    };

    panel.appendChild(text);
    panel.appendChild(resetButton);
    document.body.appendChild(panel);

    const originalOpen = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function(method, url, ...args) {
        try {
            if (typeof url === "string" && url.includes("127.0.0.1")) {
                count++;
                localStorage.setItem(STORAGE_KEY, count);
                updateText();
            }
        } catch (e) {}

        return originalOpen.call(this, method, url, ...args);
    };
})();