//////
// Slider Movement codes
//////
const wrapper = document.querySelector(".slides-wrapper");
const slides = document.querySelectorAll(".mySlides");
const miniImages = document.querySelectorAll(".mini-images");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");


let slideIndex = 0;

function showSlides(index) {
  if (index >= slides.length) slideIndex = 0;
  else if (index < 0) slideIndex = slides.length - 1;
  else slideIndex = index;
  wrapper.style.transform = `translateX(-${slideIndex * 100}%)`;

  // Make mini images active
  miniImages.forEach(() => {
    miniImages[i].classList.remove("active");
  })
  miniImages[slideIndex].classList.add("active");
}

function plusSlides(n) {
  showSlides(slideIndex + n);
}

function currentSlide(n) {
  showSlides(n);
}

nextBtn.onclick = () => plusSlides(1);
prevBtn.onclick = () => plusSlides(-1);

miniImages.forEach((slide, index) => {
  slide.addEventListener("click", () => currentSlide(index));
});

//////
// Opening/Closing cart dropdown Codes
//////
const cartBtn = document.querySelector(".cart-btn");
const menu = document.querySelector(".cart-menu");
const dropdown = document.querySelector(".dropdown");

cartBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// Close when clicking outside
document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) {
    menu.classList.remove("active");
  }
});

//////
// Add to cart codes
//////
const cartContent = document.querySelector(".cart-content");
const cartCount = document.querySelector(".cart-count");
const addToCartButton = document.querySelector(".add-to-cart");
const quantityElement = document.querySelector(".quantity");

const product = {
  name: "Fall Limited Edition Sneakers",
  price: 125,
  thumbnail: "./assets/images/image-product-1-thumbnail.jpg",
};

let productQuantity = 0;
let cartQuantity = 0;

const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

function renderCart() {
  cartCount.textContent = cartQuantity;
  cartCount.classList.toggle("active", cartQuantity > 0);

  if (cartQuantity === 0) {
    cartContent.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    return;
  }

  const total = product.price * cartQuantity;

  cartContent.innerHTML = `
    <div class="cart-item">
      <img src="${product.thumbnail}" alt="${product.name}" class="cart-product-img" />
      <div class="cart-item-detail">
        <p>${product.name}</p>
        <p>${formatCurrency(product.price)} x ${cartQuantity} <strong>${formatCurrency(total)}</strong></p>
      </div>
      <button class="delete-cart-item" type="button" aria-label="Remove item from cart">
        <img src="./assets/images/icon-delete.svg" alt="" />
      </button>
    </div>
    <button class="checkout-btn" type="button">Checkout</button>
  `;

  document
    .querySelector(".delete-cart-item")
    .addEventListener("click", clearCart);
}

function clearCart() {
  cartQuantity = 0;
  renderCart();
}

function addToQuantity(number) {
  if (productQuantity + number < 0) {
    return;
  }
  productQuantity += number;
  quantityElement.textContent = productQuantity;
}

function addToCart() {
  if (productQuantity === 0) {
    return;
  }

  cartQuantity += productQuantity;
  productQuantity = 0;
  quantityElement.textContent = productQuantity;
  renderCart();
}

addToCartButton.addEventListener("click", addToCart);
