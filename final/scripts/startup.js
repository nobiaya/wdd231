const memberContainer = document.getElementById("member-container");
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");

// Check if we are on index.html by looking for a unique element or path
const isHomePage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";

async function getMembers() {
  try {
    const response = await fetch("data/startup.json");
    if (!response.ok) throw new Error("Data fetch failed");
    const members = await response.json();

    // If on home page, only show 3 featured startups
    if (isHomePage) {
      displayMembers(members.slice(0, 3));
    } else {
      displayMembers(members);
    }
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

function displayMembers(members) {
  if (!memberContainer) return;
  memberContainer.innerHTML = "";
  members.forEach(member => {
    const section = document.createElement("section");
    section.classList.add("member");

    section.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" />
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.url}" target="_blank">Visit Website</a>
    `;

    memberContainer.appendChild(section);
  });
}

// Enable view toggle only if buttons exist (directory.html)
if (gridBtn && listBtn) {
  gridBtn.addEventListener("click", () => {
    memberContainer.classList.add("grid-view");
    memberContainer.classList.remove("list-view");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
  });

  listBtn.addEventListener("click", () => {
    memberContainer.classList.add("list-view");
    memberContainer.classList.remove("grid-view");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
  });
}

// Load members on any page that has the container
if (memberContainer) {
  getMembers();
}
