const container = document.getElementById("members");
const gridBtn = document.getElementById("grid");
const listBtn = document.getElementById("list");
const menuToggle = document.getElementById("menu-toggle");
const navigation = document.querySelector(".navigation");

// Hamburger menu toggle
menuToggle.addEventListener("click", () => {
  navigation.classList.toggle("open");
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", !expanded);
});

// Fetch and display members
async function getMembers() {
  try {
    const response = await fetch("data/member.json");
    if (!response.ok) throw new Error("Failed to fetch members");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading member data:", error);
    container.innerHTML = `<p class="error">Unable to load members at this time.</p>`;
  }
}

// Render member cards
function displayMembers(members) {
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo">
      <div class="member-info">
        <h3>${member.name}</h3>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
        <p class="membership">Membership: ${["Member", "Silver", "Gold"][member.membership - 1]}</p>
        <p>${member.description}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

// View toggle handlers
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

getMembers();
