document.addEventListener("DOMContentLoaded", function () {
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxVideoWrap = document.getElementById("lightboxVideoWrap");
  var lightboxCaption = document.getElementById("lightboxCaption");
  var closeBtn = document.getElementById("lightboxClose");

  // ---------- Fotos: abrem em popup ao clicar ----------
  var photoTiles = document.querySelectorAll(".media-tile[data-full]");

  photoTiles.forEach(function (tile) {
    tile.addEventListener("click", function () {
      var full = tile.getAttribute("data-full");
      var title = tile.getAttribute("data-title") || "";
      var year = tile.getAttribute("data-year") || "";

      lightboxImg.src = full;
      lightboxImg.alt = title;
      lightboxImg.classList.add("is-active");
      lightboxVideoWrap.classList.remove("is-active");
      lightboxVideoWrap.innerHTML = "";
      lightboxCaption.textContent = year ? title + " — " + year : title;
      lightbox.classList.add("is-open");
    });
  });

  // ---------- Vídeos: preview sem som ao passar o rato, popup com som ao clicar ----------
  var videoTiles = document.querySelectorAll(".media-tile--video[data-vimeo]");

  videoTiles.forEach(function (tile) {
    var vimeoId = tile.getAttribute("data-vimeo");
    var embedBox = tile.querySelector(".video-embed");

    tile.addEventListener("mouseenter", function () {
      embedBox.innerHTML =
        '<iframe src="https://player.vimeo.com/video/' + vimeoId +
        '?background=1&autoplay=1&muted=1&loop=1" allow="autoplay; fullscreen" loading="lazy"></iframe>';
      tile.classList.add("is-previewing");
    });

    tile.addEventListener("mouseleave", function () {
      embedBox.innerHTML = "";
      tile.classList.remove("is-previewing");
    });

    tile.addEventListener("click", function () {
      var title = tile.getAttribute("data-title") || "";
      var year = tile.getAttribute("data-year") || "";

      lightboxVideoWrap.innerHTML =
        '<iframe src="https://player.vimeo.com/video/' + vimeoId +
        '?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
      lightboxVideoWrap.classList.add("is-active");
      lightboxImg.classList.remove("is-active");
      lightboxImg.src = "";
      lightboxCaption.textContent = year ? title + " — " + year : title;
      lightbox.classList.add("is-open");
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightboxImg.src = "";
    lightboxImg.classList.remove("is-active");
    lightboxVideoWrap.innerHTML = ""; // pára o vídeo ao fechar
    lightboxVideoWrap.classList.remove("is-active");
  }

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  // Botão flutuante de "voltar ao topo"
  var floatBtn = document.getElementById("backToTopFloat");
  var footerEl = document.querySelector(".site-footer");

  function toggleFloatBtn() {
    if (window.scrollY > 500) {
      floatBtn.classList.add("is-visible");
    } else {
      floatBtn.classList.remove("is-visible");
    }
  }
  window.addEventListener("scroll", toggleFloatBtn);
  toggleFloatBtn();

  // Quando o footer entra no ecrã, esconde o botão flutuante -
  // o footer já tem o link "Voltar ao topo" por extenso.
  if (footerEl && "IntersectionObserver" in window) {
    var footerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          floatBtn.classList.add("is-hidden-footer");
        } else {
          floatBtn.classList.remove("is-hidden-footer");
        }
      });
    }, { threshold: 0.15 });
    footerObserver.observe(footerEl);
  }
});
