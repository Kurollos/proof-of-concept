document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // FAVORIETEN
  // =========================

  const forms = document.querySelectorAll(".favorite-form");

  forms.forEach((form) => {
    form.addEventListener("submit", async function (event) {

      // Progressive Enhancement:
      // Zonder JavaScript werkt het normale formulier.
      // Met JavaScript krijgen we extra feedback en animaties.
      event.preventDefault();

      const btn = this.querySelector(".save-btn");
      const text = btn.querySelector(".btn-text");
      const feedback = this.querySelector(".favorite-feedback");
      const favCountEl = document.querySelector(".fav-count");

      if (btn.classList.contains("loading")) return;

      // =========================
      // LOADING + ROTATE
      // =========================

      btn.classList.remove("rotate", "error", "success");

      void btn.offsetWidth;

      btn.classList.add("rotate", "loading");

      try {

        // JavaScript vraagt om JSON.
        const res = await fetch(form.action, {
          method: "POST",
          headers: {
            Accept: "application/json"
          }
        });

        if (!res.ok) {
          throw new Error("Server error");
        }

        const data = await res.json();

        btn.classList.remove("loading");

        // =========================
        // FLY ANIMATIE
        // =========================

        flyHeart(btn);

        setTimeout(() => {

          btn.classList.remove("success", "error");

          // =========================
          // TOEGEVOEGD
          // =========================

          if (data.isFavorite) {

            btn.classList.add("success");

            text.textContent = "❤️ Opgeslagen";

            if (feedback) {
              feedback.textContent =
                "Woning is opgeslagen als favoriet.";
            }

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

            showPopup(
              "Toegevoegd aan favorieten",
              "success"
            );

          }

          // =========================
          // VERWIJDERD
          // =========================

          else {

            btn.classList.add("error");

            text.textContent = "🤍 Bewaren";

            if (feedback) {
              feedback.textContent =
                "Woning is verwijderd uit favorieten.";
            }

            showPopup(
              "Verwijderd uit favorieten",
              "error"
            );
          }

        }, 800);

      } catch (err) {

        console.error(err);

        btn.classList.remove(
          "loading",
          "success"
        );

        btn.classList.add("error");

        if (feedback) {
          feedback.textContent =
            "Het opslaan is niet gelukt. Probeer het opnieuw.";
        }

        showPopup(
          "Er ging iets mis",
          "error"
        );
      }
    });
  });


  // =========================
  // HAMBURGER MENU
  // =========================

  const menuToggle =
    document.querySelector(".menu-toggle");

  const menuContent =
    document.querySelector("#main-menu");

  if (menuToggle && menuContent) {

    menuToggle.addEventListener("click", () => {

      const isOpen =
        menuContent.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Menu sluiten"
          : "Menu openen"
      );

      menuToggle.textContent =
        isOpen ? "✕" : "☰";
    });
  }
});


/* =========================
   POPUP
========================= */

function showPopup(message, type) {

  const popup = document.createElement("div");

  popup.className = `popup ${type}`;

  popup.textContent = message;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 2500);
}


/* =========================
   HEART FLY ANIMATION
========================= */

function flyHeart(startEl) {

  const targetEl =
    document.querySelector(".favorites-tab");

  if (!targetEl) return;

  const heart = document.createElement("div");

  heart.classList.add("flying-heart");

  heart.textContent = "❤️";

  document.body.appendChild(heart);

  const start =
    startEl.getBoundingClientRect();

  const target =
    targetEl.getBoundingClientRect();

  heart.style.position = "fixed";

  heart.style.left =
    start.left + start.width / 2 + "px";

  heart.style.top =
    start.top + start.height / 2 + "px";

  heart.style.fontSize = "18px";

  heart.style.zIndex = "9999";

  heart.style.transition =
    "all 0.8s ease-in-out";

  heart.offsetHeight;

  heart.style.left =
    target.left + target.width / 2 + "px";

  heart.style.top =
    target.top + target.height / 2 + "px";

  heart.style.opacity = "0";

  heart.style.transform =
    "scale(0.3)";

  setTimeout(() => {
    heart.remove();
  }, 800);
}