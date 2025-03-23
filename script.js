// Wait for the page to load before running scripts
document.addEventListener("DOMContentLoaded", function () {
  
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

  backToTopBtn.style.position = "fixed";
  backToTopBtn.style.bottom = "20px";
  backToTopBtn.style.right = "20px";
  backToTopBtn.style.padding = "10px 15px";
  backToTopBtn.style.fontSize = "14px";
  backToTopBtn.style.background = "#1e3a8a";
  backToTopBtn.style.color = "white";
  backToTopBtn.style.border = "none";
  backToTopBtn.style.borderRadius = "5px";
  backToTopBtn.style.cursor = "pointer";
  backToTopBtn.style.display = "none";
  backToTopBtn.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Dark Mode Toggle
  const darkModeBtn = document.createElement("button");
  darkModeBtn.innerText = "🌙 Dark Mode";
  darkModeBtn.id = "darkModeToggle";
  document.body.prepend(darkModeBtn);

  darkModeBtn.style.position = "fixed";
  darkModeBtn.style.top = "20px";
  darkModeBtn.style.right = "20px";
  darkModeBtn.style.padding = "10px 15px";
  darkModeBtn.style.fontSize = "14px";
  darkModeBtn.style.background = "#333";
  darkModeBtn.style.color = "white";
  darkModeBtn.style.border = "none";
  darkModeBtn.style.borderRadius = "5px";
  darkModeBtn.style.cursor = "pointer";

  // Load Theme from Local Storage
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeBtn.innerText = "☀ Light Mode";
  }

  darkModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
      darkModeBtn.innerText = "☀ Light Mode";
    } else {
      localStorage.setItem("darkMode", "disabled");
      darkModeBtn.innerText = "🌙 Dark Mode";
    }
  });

  // Image Slideshow
  let slideIndex = 0;
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.getElementById("nextSlide");
  const prevBtn = document.getElementById("prevSlide");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }

  function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }

  function prevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  setInterval(nextSlide, 3000); // Auto-slide every 3 sec

  showSlide(slideIndex);
});
