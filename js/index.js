import { default as images } from "./gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");

const imagesArr = images
	.map(element => {
		return `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${element.original}
  >
    <img
      class="gallery__image"
      src=${element.preview}
      data-source=${element.original}
      alt=${element.description}
    />
  </a>
</li>`;
	})
	.join("");
galleryRef.insertAdjacentHTML("beforeend", imagesArr);

const modalWindowRef = document.querySelector(".js-lightbox");
const closeButtonRef = document.querySelector("button[data-action=close-lightbox]");
const modalImageRef = document.querySelector(".lightbox__image");
const backdropRef = document.querySelector(".lightbox__content");

galleryRef.addEventListener("click", openModal);
closeButtonRef.addEventListener("click", closeModal);
backdropRef.addEventListener("click", closeByBackdrop);

function openModal() {
	event.preventDefault();
	window.addEventListener("keydown", closeOnEscape);

	if (event.target.nodeName === "IMG") {
		modalImageRef.src = event.target.dataset.source;
		modalImageRef.alt = event.target.alt;
		modalWindowRef.classList.add("is-open");
	}
}

function closeModal() {
	modalWindowRef.classList.remove("is-open");
	window.removeEventListener("keydown", closeOnEscape);

	modalImageRef.src = "";
}

function closeByBackdrop() {
	if (event.target === event.currentTarget) {
		closeModal();
	}
}

function closeOnEscape() {
	if (event.code === "Escape") {
		closeModal();
	}
}
