
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("darkModeToggle");
    const isDark = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark-mode", isDark);
    toggle.checked = isDark;

    toggle.addEventListener("change", () => {
        document.documentElement.classList.toggle("dark-mode");
        localStorage.setItem("theme", toggle.checked ? "dark" : "light");
    });

    highlightCurrentLanguage();
});

function setLanguage(lang) {
    localStorage.setItem("language", lang);
    highlightCurrentLanguage();
    location.reload();
}

function highlightCurrentLanguage() {
    const lang = localStorage.getItem("language") || "en";
    ['en', 'es', 'fr'].forEach(code => {
        const btn = document.getElementById("lang-" + code);
        if (btn) {
            btn.style.outline = (code === lang) ? "3px solid #03a9f4" : "none";
        }
    });
}
