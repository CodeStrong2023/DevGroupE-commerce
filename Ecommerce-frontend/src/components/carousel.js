export function crearCarrusel(images) {
  
  if (images.length === 0) {
    console.error("No se obtuvieron imágenes.");
    return;
  }

  const carousel = document.createElement("div");
  carousel.classList.add("carousel");

  const imagesContainer = document.createElement("div");
  imagesContainer.classList.add("carousel-images");

  images.forEach(url => {
    if (typeof url === "string" && url.trim()) {
      const img = document.createElement("img");
      img.src = url;
      img.alt = "Imagen de juego";
      imagesContainer.appendChild(img);
    } else {
      console.warn("URL de imagen no válida:", url);
    }
  });

  carousel.appendChild(imagesContainer);

  const prevBtn = document.createElement("button");
  prevBtn.classList.add("carousel-btn", "prev-btn");
  prevBtn.innerHTML = "&#10094;";

  const nextBtn = document.createElement("button");
  nextBtn.classList.add("carousel-btn", "next-btn");
  nextBtn.innerHTML = "&#10095;";

  carousel.appendChild(prevBtn);
  carousel.appendChild(nextBtn);

  let currentIndex = 0;
  const totalImages = images.length;

  function updateCarousel() {
    imagesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
    updateCarousel();
  });

  return carousel;
}
