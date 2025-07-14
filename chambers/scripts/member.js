const container = document.getElementById("members");
const gridBtn = document.getElementById("grid");
const listBtn = document.getElementById("list");

async function getMembers() {
  try {
    const response = await fetch("data/member.json");
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error("Failed to fetch members:", error);
  }
}

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
        <p><a href="${member.website}" target="_blank">Visit Website</a></p>
        <p class="membership">Level: ${["Member", "Silver", "Gold"][member.membership - 1]}</p>
        <p>${member.description}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

// Toggle view buttons
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
