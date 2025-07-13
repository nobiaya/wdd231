const container = document.getElementById("members");
const gridBtn = document.getElementById("grid");
const listBtn = document.getElementById("list");

async function getMembers() {
  try {
    const response = await fetch("data/member.json");
    if (!response.ok) {
      throw new Error("Failed to fetch member data.");
    }
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error("Error fetching member data:", error);
    container.innerHTML = "<p>Unable to load member directory at this time.</p>";
  }
}

function displayMembers(members) {
  container.innerHTML = ""; // Clear existing content

  members.forEach(member => {
    const section = document.createElement("section");
    section.classList.add("member-card");

    section.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
      <p><strong>Membership:</strong> ${getMembershipLevel(member.membership)}</p>
      <p>${member.description}</p>
    `;

    container.appendChild(section);
  });
}

function getMembershipLevel(level) {
  switch (level) {
    case 1:
      return "Member";
    case 2:
      return "Silver";
    case 3:
      return "Gold";
    default:
      return "Unknown";
  }
}

// Toggle View
gridBtn.addEventListener("click", () => {
  container.classList.add("grid-view");
  container.classList.remove("list-view");
  gridBtn.setAttribute("aria-pressed", "true");
  listBtn.setAttribute("aria-pressed", "false");
});

listBtn.addEventListener("click", () => {
  container.classList.add("list-view");
  container.classList.remove("grid-view");
  listBtn.setAttribute("aria-pressed", "true");
  gridBtn.setAttribute("aria-pressed", "false");
});

// Load members
getMembers();