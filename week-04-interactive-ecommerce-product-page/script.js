const wrapper = document.querySelector(".slides-wrapper");
const slides = document.querySelectorAll(".mySlides");

let slideIndex = 0;

function showSlides(index) {
  if (index >= slides.length) slideIndex = 0;
  else if (index < 0) slideIndex = slides.length - 1;
  else slideIndex = index;
  wrapper.style.transform = `translateX(-${slideIndex * 100}%)`;

  // Make mini images active
  let miniImages = document.getElementsByClassName("mini-images");
  for (i = 0; i < miniImages.length; i++) {
    miniImages[i].className = miniImages[i].className.replace(" active", "");
  }
  miniImages[slideIndex].className += " active";
}

function plusSlides(n) {
  showSlides(slideIndex + n);
}

function currentSlide(n) {
  showSlides(n);
}

const cartBtn = document.querySelector(".cart-btn");
const menu = document.querySelector(".cart-menu");
const dropdown = document.querySelector(".dropdown");

cartBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// // Optional: close when clicking outside
document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) {
    menu.classList.remove("active");
  }
});
