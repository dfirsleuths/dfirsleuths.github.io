// Opens tool screenshots in a native <dialog>. Without this script the
// links still work and simply open the full-size image.
(function () {
  "use strict";

  var dialog = document.getElementById("lightbox");
  if (!dialog || typeof dialog.showModal !== "function") {
    return;
  }

  var caption = dialog.querySelector("figcaption");
  var image = document.createElement("img");
  caption.parentNode.insertBefore(image, caption);
  var closeButton = dialog.querySelector(".lightbox-close");

  function open(link) {
    var thumb = link.querySelector("img");
    image.src = link.getAttribute("href");
    image.alt = thumb ? thumb.alt : "";
    if (link.dataset.width && link.dataset.height) {
      image.width = Number(link.dataset.width);
      image.height = Number(link.dataset.height);
    } else {
      image.removeAttribute("width");
      image.removeAttribute("height");
    }
    caption.textContent = link.dataset.caption || "";
    dialog.showModal();
  }

  document.querySelectorAll("a[data-lightbox]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      // Leave modified clicks alone so "open in new tab" keeps working.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      event.preventDefault();
      open(link);
    });
  });

  closeButton.addEventListener("click", function () {
    dialog.close();
  });

  // A click on the backdrop lands on the dialog element itself.
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener("close", function () {
    image.removeAttribute("src");
  });
})();
