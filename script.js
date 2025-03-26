// Wait for the page to load before running scripts
document.addEventListener("DOMContentLoaded", function () {
  // Load JSON data
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      loadDestinations(data.destinations);
      loadGallery(data.gallery);
    })
    .catch(error => console.error("Error loading JSON:", error));

  // Smooth Scrolling for Navigation Links
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 50,
          behavior: "smooth"
        });
      }
    });
  });

  // Back to Top Button
  const backToTopBtn = document.createElement("button");
  backToTopBtn.innerText = "⬆ Back to Top";
  backToTopBtn.id = "backToTop";
  document.body.appendChild(backToTopBtn);

  Object.assign(backToTopBtn.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "10px 15px",
    fontSize: "14px",
    background: "#1e3a8a",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "none",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
  });

  window.addEventListener("scroll", function () {
    backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Image Slideshow (initialized after loading JSON)
  let slideIndex = 0;
  function showSlide(index) {
    const slides = document.querySelectorAll(".slide");
    if (slides.length === 0) return;
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }

  function nextSlide() {
    const slides = document.querySelectorAll(".slide");
    if (slides.length === 0) return;
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }

  function prevSlide() {
    const slides = document.querySelectorAll(".slide");
    if (slides.length === 0) return;
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
  }

  function addSlideshowControls() {
    const slideshow = document.querySelector(".slideshow");
    if (!slideshow) return;

    const prevBtn = document.createElement("button");
    prevBtn.id = "prevSlide";
    prevBtn.textContent = "⬅";
    prevBtn.addEventListener("click", prevSlide);

    const nextBtn = document.createElement("button");
    nextBtn.id = "nextSlide";
    nextBtn.textContent = "➡";
    nextBtn.addEventListener("click", nextSlide);

    slideshow.prepend(prevBtn);
    slideshow.appendChild(nextBtn);
  }

  setInterval(nextSlide, 3000); // Auto-slide every 3 sec
  showSlide(slideIndex);
});

// Load destinations dynamically from JSON
function loadDestinations(destinations) {
  const section = document.getElementById("destinations");
  const list = document.createElement("div");

  destinations.forEach(dest => {
    const button = document.createElement("button");
    button.textContent = dest.name;
    button.onclick = () => window.location.href = dest.url;
    list.appendChild(button);
  });

  section.appendChild(list);
}

// Load gallery dynamically from JSON
function loadGallery(images) {
  const slideshow = document.querySelector(".slideshow");
  if (!slideshow) return;
  slideshow.innerHTML = ""; // Clear existing content

  images.forEach(imgData => {
    const img = document.createElement("img");
    img.classList.add("slide");
    img.src = imgData.image;
    img.alt = imgData.alt;
    slideshow.appendChild(img);
  });

  addSlideshowControls();
}
