const header = document.getElementById("header");
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");
const themeToggle = document.getElementById("themeToggle");
const backTop = document.getElementById("backTop");
const progressBar = document.getElementById("progressBar");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");

  menuToggle.innerHTML = nav.classList.contains("open")
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// Dark / Light mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");

  themeToggle.innerHTML = isLight
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';

  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Load saved theme
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

// Scroll effects
function handleScroll() {
  const scrollTop = window.scrollY;

  // Scroll progress
  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollPercentage =
    documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

  progressBar.style.width = `${scrollPercentage}%`;

  // Header effect
  if (scrollTop > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Back to top button
  if (scrollTop > 500) {
    backTop.classList.add("show");
  } else {
    backTop.classList.remove("show");
  }

  // Active navigation link
  const sections = document.querySelectorAll("main section[id]");
  let currentSection = "home";

  sections.forEach(section => {
    if (scrollTop >= section.offsetTop - 180) {
      currentSection = section.id;
    }
  });

  document.querySelectorAll(".nav a").forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentSection}`
    );
  });
}

window.addEventListener("scroll", handleScroll);

handleScroll();

// Back to top
backTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Scroll reveal animation
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});

// Current year
document.getElementById("year").textContent = new Date().getFullYear();