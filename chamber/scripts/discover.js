// discover.js

// Load discover cards from JSON
async function loadDiscoverCards() {
  const container = document.getElementById('discover-cards');
  try {
    const response = await fetch('data/discoverplace.json');
    const items = await response.json();

    items.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.style.gridArea = `card${index + 1}`;

      card.innerHTML = `
        <h2>${item.title}</h2>
        <figure>
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button type="button" aria-label="Learn more about ${item.title}">Learn More</button>
      `;

      // "Learn More" button event
      const button = card.querySelector('button');
      button.addEventListener('click', () => {
        window.open(item.link, '_blank');
      });

      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = '<p>Sorry, failed to load items.</p>';
    console.error('Error loading JSON:', error);
  }
}

// Show visit message using localStorage
function showVisitMessage() {
  const visitEl = document.getElementById('visit-message');
  const now = Date.now();
  const lastVisit = Number(localStorage.getItem('lastVisit'));
  let message = '';

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysSince === 0) {
      message = "Back so soon! Awesome!";
    } else if (daysSince === 1) {
      message = "You last visited 1 day ago.";
    } else {
      message = `You last visited ${daysSince} days ago.`;
    }
  }

  visitEl.textContent = message;
  localStorage.setItem('lastVisit', now);
}

// Toggle mobile navigation menu
function setupMenuToggle() {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector(".navigation");

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");

    // Update ARIA attribute for accessibility
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !expanded);
  });
}

// Initialize all features on DOM load
document.addEventListener("DOMContentLoaded", () => {
  loadDiscoverCards();
  showVisitMessage();
  setupMenuToggle();
});
