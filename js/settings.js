
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("darkModeToggle");
    const isDark = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark-mode", isDark);
    toggle.checked = isDark;

    toggle.addEventListener("change", () => {
        document.documentElement.classList.toggle("dark-mode");
        localStorage.setItem("theme", toggle.checked ? "dark" : "light");
    });
});
