// join.js

// Set timestamp on join.html page only
const timestampInput = document.getElementById("timestamp");
if (timestampInput) {
  const now = new Date().toISOString();
  timestampInput.value = now;
}

// Populate footer details
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

const lastModifiedSpan = document.getElementById("lastModified");
if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;

// Display submitted data on thankyou.html
const params = new URLSearchParams(window.location.search);
if (document.getElementById("firstName")) {
  document.getElementById("firstName").textContent = params.get("firstname") || "N/A";
  document.getElementById("lastName").textContent = params.get("lastname") || "N/A";
  document.getElementById("email").textContent = params.get("email") || "N/A";
  document.getElementById("phone").textContent = params.get("phone") || "N/A";
  document.getElementById("business").textContent = params.get("business") || "N/A";
  document.getElementById("timestamp").textContent = params.get("timestamp") || "N/A";
}

// Hamburger menu toggle for join.html and thankyou.html
const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector("nav ul.navigation");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !expanded);
  });
} 
