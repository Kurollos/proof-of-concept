document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".save-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", async function () {
      const id = this.dataset.id;
      const text = this.querySelector(".btn-text");
      const favCountEl = document.querySelector(".fav-count");

      if (this.classList.contains("loading")) return;

      // =========================
      // LOADING + ROTATE
      // =========================
      this.classList.remove("rotate", "error", "success");
      void this.offsetWidth;
      this.classList.add("rotate", "loading");

      try {
        const res = await fetch(`/favorites/add/${id}`, {
          method: "POST",
        });

        if (!res.ok) throw new Error("Server error");

        const data = await res.json();

        this.classList.remove("loading");

        // =========================
        // FLY ANIMATIE
        // =========================
        flyHeart(this);

        setTimeout(() => {

          this.classList.remove("success", "error");

          // =========================
          // SUCCESS (toegevoegd)
          // =========================
          if (data.isFavorite) {

            this.classList.add("success");
            text.textContent = "❤️ Opgeslagen";

            // 🔥 SAFE COUNT UPDATE
            if (favCountEl) {
              const newCount =
                typeof data.count === "number"
                  ? data.count
                  : (parseInt(favCountEl.textContent) || 0) + 1;

              favCountEl.textContent = newCount;

              favCountEl.classList.remove("pop");
              void favCountEl.offsetWidth;
              favCountEl.classList.add("pop");
            }

            showPopup("Toegevoegd aan favorieten", "success");
          }

          // =========================
          // REMOVE
          // =========================
          else {
            this.classList.add("error");
            text.textContent = "🤍 Bewaren";

            // ❌ GEEN COUNT UPDATE (zoals jij wil)
            showPopup("Verwijderd uit favorieten", "error");
          }

        }, 800);

      } catch (err) {
        console.error(err);

        this.classList.remove("loading", "success");
        this.classList.add("error");

        showPopup("Er ging iets mis", "error");
      }
    });
  });
});

/* =========================
   POPUP
========================= */
function showPopup(message, type) {
  const popup = document.createElement("div");
  popup.className = `popup ${type}`;
  popup.textContent = message;

  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 2500);
}

/* =========================
   HEART FLY ANIMATION
========================= */
function flyHeart(startEl) {
  const targetEl = document.querySelector(".favorites-tab");
  if (!targetEl) return;

  const heart = document.createElement("div");
  heart.classList.add("flying-heart");
  heart.textContent = "❤️";

  document.body.appendChild(heart);

  const start = startEl.getBoundingClientRect();
  const target = targetEl.getBoundingClientRect();

  heart.style.position = "fixed";
  heart.style.left = start.left + start.width / 2 + "px";
  heart.style.top = start.top + start.height / 2 + "px";
  heart.style.fontSize = "18px";
  heart.style.zIndex = "9999";
  heart.style.transition = "all 0.8s ease-in-out";

  heart.offsetHeight;

  heart.style.left = target.left + target.width / 2 + "px";
  heart.style.top = target.top + target.height / 2 + "px";
  heart.style.opacity = "0";
  heart.style.transform = "scale(0.3)";

  setTimeout(() => {
    heart.remove();
  }, 800);
}