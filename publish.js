/* ============================================
   Lightbox — full-screen image viewer
   Works with publish.css to give content images
   a magnifying-glass cursor and click-to-expand
   behaviour on Obsidian Publish sites.
   ============================================ */

(function () {
  "use strict";

  /* --- Build the overlay once --- */
  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.innerHTML =
    '<img src="" alt="" /><span class="lightbox-close">ESC to close</span>';
  document.body.appendChild(overlay);

  const overlayImg = overlay.querySelector("img");

  function open(src, alt) {
    overlayImg.src = src;
    overlayImg.alt = alt || "";
    // Force reflow so the CSS transition plays
    void overlay.offsetWidth;
    overlay.classList.add("is-visible");
    document.body.style.overflow = "hidden"; // prevent background scroll
  }

  function close() {
    overlay.classList.remove("is-visible");
    document.body.style.overflow = "";
  }

  /* --- Click handler (delegated) --- */
  document.addEventListener("click", function (e) {
    // If the overlay is open, any click closes it
    if (overlay.classList.contains("is-visible")) {
      close();
      return;
    }

    // Check if a content image was clicked
    var img = e.target.closest(".markdown-rendered img");
    if (img) {
      e.preventDefault();
      open(img.src, img.alt);
    }
  });

  /* --- Keyboard: Escape closes --- */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("is-visible")) {
      close();
    }
  });
})();
