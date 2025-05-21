
document.addEventListener("DOMContentLoaded", () => {
    const photos = JSON.parse(sessionStorage.getItem("photos") || "[]");

    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
        const key = checkbox.id;
        checkbox.checked = localStorage.getItem(key) === "true";
        checkbox.addEventListener("change", () => {
            localStorage.setItem(key, checkbox.checked);
        });
    });

    document.querySelectorAll(".photo-btn").forEach((btn, i) => {
        btn.addEventListener("click", () => {
            const itemText = btn.previousElementSibling?.innerText?.trim() || "";
            const sectionHeading = btn.closest("ul")?.previousElementSibling?.innerText?.trim() || "";
            const menuTitle = document.querySelector("h1")?.innerText?.trim() || "UnknownMenu";

            const fullLabel = `${menuTitle}_${sectionHeading}_${itemText}`.replace(/[^a-z0-9]/gi, "_");

            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.capture = "environment";
            input.onchange = () => {
                const file = input.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        photos.push({ label: fullLabel, image: reader.result });
                        sessionStorage.setItem("photos", JSON.stringify(photos));
                        alert("Photo saved for: " + fullLabel);
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        });
    });
});
