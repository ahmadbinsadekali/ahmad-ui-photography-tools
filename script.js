const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

document.querySelectorAll(".tool-card").forEach(card => {
  card.addEventListener("click", () => {
    const tool = card.dataset.tool || "Tool";
    showToast(tool + " selected");
  });
});

document.getElementById("notificationBtn").addEventListener("click", () => {
  showToast("You have 3 notifications 🔔");
});

document.getElementById("contactBtn").addEventListener("click", () => {
  showToast("Contact section selected 📩");
});

document.getElementById("settingsBtn").addEventListener("click", event => {
  event.preventDefault();
  showToast("Settings will be available soon ⚙️");
});

const navLinks = document.querySelectorAll(".bottom-nav a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(item => item.classList.remove("active"));
    link.classList.add("active");
  });
});

window.addEventListener("scroll", () => {
  const sections = [
    { id: "home", link: document.querySelector('.bottom-nav a[href="#home"]') },
    { id: "tools", link: document.querySelector('.bottom-nav a[href="#tools"]') },
    { id: "my", link: document.querySelector('.bottom-nav a[href="#my"]') }
  ];

  let current = "home";

  sections.forEach(section => {
    const el = document.getElementById(section.id);
    if (el && window.scrollY >= el.offsetTop - 180) {
      current = section.id;
    }
  });

  navLinks.forEach(link => link.classList.remove("active"));

  const activeLink = document.querySelector(
    `.bottom-nav a[href="#${current}"]`
  );

  if (activeLink) activeLink.classList.add("active");
});
