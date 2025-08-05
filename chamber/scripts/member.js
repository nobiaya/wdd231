// Elements for directory toggle
const container = document.getElementById("members");
const gridBtn = document.getElementById("grid");
const listBtn = document.getElementById("list");

// Elements for mobile nav toggle
const menuToggle = document.getElementById("menu-toggle");
const navigation = document.querySelector(".navigation");

// Fetch member data
async function getMembers() {
  try {
    const response = await fetch("data/member.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error("Failed to fetch members:", error);
  }
}

// Display members
function displayMembers(members) {
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo">
      <div>
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
        <p class="membership">Level: ${["Member", "Silver", "Gold"][member.membership - 1]}</p>
        <p>${member.description}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

// Toggle between Grid and List views
gridBtn.addEventListener("click", () => {
  container.classList.remove("list-view");
  container.classList.add("grid-view");
  gridBtn.setAttribute("aria-pressed", "true");
  listBtn.setAttribute("aria-pressed", "false");
});

listBtn.addEventListener("click", () => {
  container.classList.remove("grid-view");
  container.classList.add("list-view");
  gridBtn.setAttribute("aria-pressed", "false");
  listBtn.setAttribute("aria-pressed", "true");
});

// Toggle mobile navigation menu
menuToggle.addEventListener("click", () => {
  navigation.classList.toggle("open");
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", !expanded);
});

getMembers();
