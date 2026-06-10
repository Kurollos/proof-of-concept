document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".save-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", async function () {
      const id = this.dataset.id;
      const text = this.querySelector(".btn-text");

      if (this.classList.contains("loading")) return;

      // RESET + ROTATE
      this.classList.remove("rotate", "error");
      void this.offsetWidth;
      this.classList.add("rotate");

      this.classList.add("loading");

      try {
        const res = await fetch(`/favorites/add/${id}`, {
          method: "POST",
        });

        if (!res.ok) throw new Error("Server error");

        const data = await res.json();

        this.classList.remove("loading", "error", "success", "unfavorite");

        // =========================
        // TOGGLE LOGICA
        // =========================
        if (data.isFavorite) {
          this.classList.add("success");
          text.textContent = "❤️ Opgeslagen";
          showPopup("Toegevoegd aan favorieten", "success");
        } else {
          this.classList.add("unfavorite");
          text.textContent = "🤍 Bewaren";
          showPopup("Verwijderd uit favorieten", "error");
        }

      } catch (err) {
        console.error(err);

        this.classList.remove("loading");
        this.classList.add("error");

        showPopup("Er ging iets mis", "error");
      }
    });
  });
});

/* POPUP */
function showPopup(message, type) {
  const popup = document.createElement("div");
  popup.className = `popup ${type}`;
  popup.textContent = message;

  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 2500);
}