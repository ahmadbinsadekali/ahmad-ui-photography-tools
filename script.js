const toast = document.getElementById("toast");

function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

document.querySelectorAll(".tool-card").forEach(card => {
    card.addEventListener("click", function () {
        const tool =
            this.dataset.tool ||
            this.querySelector("h3")?.textContent.trim();

        if (
            tool === "Remove BG" ||
            tool === "Background Remove" ||
            tool === "Remove Background"
        ) {
            window.location.href = "./remove-bg.html";
            return;
        }

        if (tool === "Cricket Live Score" || tool === "Cricket") {
            window.location.href = "https://crex.com/";
            return;
        }

        if (tool === "Football Live Score" || tool === "Football") {
            window.location.href = "https://www.sofascore.com/";
            return;
        }

        if (tool === "App Download" || tool === "Download") {
            showToast("App Download selected 📱");
            return;
        }

        showToast(tool + " selected");
    });
});

const notificationBtn = document.getElementById("notificationBtn");
if (notificationBtn) {
    notificationBtn.addEventListener("click", () => {
        showToast("You have 3 notifications 🔔");
    });
}

const contactBtn = document.getElementById("contactBtn");
if (contactBtn) {
    contactBtn.addEventListener("click", () => {
        showToast("Contact section selected 📩");
    });
}

const settingsBtn = document.getElementById("settingsBtn");
if (settingsBtn) {
    settingsBtn.addEventListener("click", event => {
        event.preventDefault();
        showToast("Settings will be available soon ⚙️");
    });
}

const navLinks = document.querySelectorAll(".bottom-nav a");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(item => item.classList.remove("active"));
        link.classList.add("active");
    });
});
