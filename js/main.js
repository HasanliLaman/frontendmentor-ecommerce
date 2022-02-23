//Open navbar when hamburger menu is clicked
const openNavbar = function () {
  const navClose = document.querySelector("#nav-close");
  const hamburger = document.querySelector("#hamburger");
  const navMobile = document.querySelector(".navbar__mobile");
  const overlay = document.querySelector(".overlay");

  hamburger.addEventListener("click", function () {
    navMobile.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });

  navClose.addEventListener("click", function () {
    navMobile.classList.add("hidden");
    overlay.classList.add("hidden");
  });
};

//Slider in gallery for mobile version
const galleryMobile = function () {
  const [btnPrevious, btnNext] = document.querySelectorAll(".gallery__icon");
  const images = document.querySelectorAll(".hero-img");

  let curSlide = 0;
  const maxSlide = images.length;

  const goToSlide = function (slide) {
    images[slide].style.opacity = 0;
    images.forEach((s) => s.classList.add("hidden"));
    images[slide].classList.remove("hidden");
    setTimeout(function () {
      images[slide].style.opacity = 1;
    }, 100);
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  btnNext.addEventListener("click", nextSlide);
  btnPrevious.addEventListener("click", prevSlide);
};

//Slider in gallery for desktop version
const galleryDesktop = function () {
  const thumbnails = document.querySelectorAll(".gallery__thumbnail");
  const currentImg = document.querySelectorAll(".gallery__active");
  const prevDesktop = document.querySelector("#prev-desktop");
  const nextDesktop = document.querySelector("#next-desktop");

  thumbnails.forEach(function (img) {
    img.addEventListener("click", function () {
      const num = img.getAttribute("data-num");
      currentImg.forEach(
        (cur) => (cur.src = `images/image-product-${num}.jpg`)
      );

      thumbnails.forEach((t) =>
        t.classList.remove("gallery__thumbnail--active")
      );
      img.classList.add("gallery__thumbnail--active");
    });
  });

  let curSlide = 1;
  const maxSlide = 4;

  const goToSlide = function (slide) {
    currentImg.forEach(
      (cur) => (cur.src = `images/image-product-${slide}.jpg`)
    );

    thumbnails.forEach((img) =>
      img.classList.remove("gallery__thumbnail--active")
    );

    thumbnails.forEach(function (img) {
      img.classList.remove("gallery__thumbnail--active");
      if (img.getAttribute("data-num") == slide) {
        img.classList.add("gallery__thumbnail--active");
      }
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 1;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 1) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  nextDesktop.addEventListener("click", nextSlide);
  prevDesktop.addEventListener("click", prevSlide);
};

//Event handler for -,+ butons in hero section
const quantity = document.querySelector(".quantity");
const quantityHandler = function () {
  const increase = document.querySelector(".increase");
  const decrease = document.querySelector(".decrease");
  let current = 1;

  decrease.addEventListener("click", function () {
    current--;
    if (current <= 1) {
      current = 1;
    }
    quantity.textContent = current;
  });

  increase.addEventListener("click", function () {
    current++;
    quantity.textContent = current;
  });
};

//Event handler to open/close overlay gallery
const overlayGalleryHandler = function () {
  const overlay = document.querySelector(".overlay");
  const gallery = document.querySelector(".gallery__overlay-container");
  const btnClose = document.querySelector(".gallery__close");
  const [curImg] = document.querySelectorAll(".gallery__active");

  curImg.addEventListener("click", function () {
    gallery.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });

  btnClose.addEventListener("click", function () {
    gallery.classList.add("hidden");
    overlay.classList.add("hidden");
  });
};

// Open card section & checkout
const cartHandler = function () {
  const basket = document.querySelector("#cart");
  const cartSection = document.querySelector(".cart");

  basket.addEventListener("click", function () {
    cartSection.classList.toggle("hidden");
  });
};

// Clear items in cart
const emptyCart = function (cartContent) {
  const btnDelete = document.querySelector(".btn__delete");

  btnDelete?.addEventListener("click", function () {
    cartContent.innerHTML = "";
    cartContent.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="cart__empty">
           <p>Your cart is empty.</p>
        </div>
    `
    );
  });
};

// Add to cart when button is clicked
const addToCart = function () {
  const btnAdd = document.querySelector(".btn__add");
  const cartContent = document.querySelector(".cart__content");

  btnAdd.addEventListener("click", function () {
    cartContent.innerHTML = "";
    cartContent.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="cart__product">
        <img
          src="images/image-product-1-thumbnail.jpg"
          alt="Sneaker image"
        />
        <div>
          <p>Autumn limited edition sneakers</p>
          <p>
            $125.00 x <span>${quantity.textContent}</span>
            <span class="cart__amount">$${
              Number(quantity.textContent) * 125
            }.00</span>
          </p>
        </div>
        <img src="images/icon-delete.svg" class="btn__delete" alt="Delete" />
      </div>
      <button class="cart__checkout">Checkout</button>
    `
    );

    emptyCart(cartContent);
  });
};

const init = () => {
  openNavbar();
  galleryDesktop();
  galleryMobile();
  quantityHandler();
  overlayGalleryHandler();
  cartHandler();
  addToCart();
};

init();
