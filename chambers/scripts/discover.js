const discoverContainer = document.getElementById('members');

async function getDiscoverItems() {
  try {
    const response = await fetch('data/discoverplace.json');
    const data = await response.json();
    displayCards(data);
  } catch (error) {
    console.error('Error fetching discover items:', error);
  }
}

function displayCards(items) {
  discoverContainer.innerHTML = ''; // clear previous content
  items.forEach((item, index) => {
    const card = document.createElement('section');
    card.classList.add('card');
    card.style.gridArea = `card${index + 1}`; // Named grid area for layout

    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <a href="${item.link}" class="learn-btn" target="_blank" rel="noopener">Learn More</a>
    `;
    discoverContainer.appendChild(card);
  });
}

getDiscoverItems();
