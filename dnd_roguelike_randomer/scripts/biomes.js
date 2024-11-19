function renderBiomes() {
    let biomeList = document.createElement('div');
    biomeList.id = 'biome-list';
    biomeList.innerHTML = '';
    
    biomes.forEach(biome => {
        let button = document.createElement('button');
        button.textContent = biome;
        button.className = 'biome-button';
        button.addEventListener('click', () => {
            currentBiome = biome;
            loadBiomeData();
        });
        biomeList.appendChild(button);
    });
    
    document.body.appendChild(biomeList);
};

async function loadBiomeData() {
    await fetch(`./data/${currentBiome}/rooms.json`)
       .then(response => response.json())
       .then(data => rooms.push(...data))
       .catch(error => console.error('Error:', error));

    await fetch(`./data/${currentBiome}/merchants.json`)
       .then(response => response.json())
       .then(data => merchants = data)
       .catch(error => console.error('Error:', error));
    
    await fetch(`./data/${currentBiome}/interiors.json`)
       .then(response => response.json())
       .then(data => interiors = data)
       .catch(error => console.error('Error:', error));

    await fetch(`./data/${currentBiome}/items.json`)
       .then(response => response.json())
       .then(data => items = data)
       .catch(error => console.error('Error:', error));

    await fetch(`./data/${currentBiome}/villagers.json`)
       .then(response => response.json())
       .then(data => villagers = data)
       .catch(error => console.error('Error:', error));

    await fetch(`./data/${currentBiome}/rewards.json`)
       .then(response => response.json())
       .then(data => rewards = data)
       .catch(error => console.error('Error:', error));

    await fetch(`./data/${currentBiome}/tests.json`)
       .then(response => response.json())
       .then(data => tests = data)
       .catch(error => console.error('Error:', error));

    await fetch(`./data/${currentBiome}/extra_room_data.json`)
       .then(response => response.json())
       .then(data => extraRoomData = data)
       .catch(error => console.error('Error:', error));

    renderCurrentBiome()
}

function renderCurrentBiome() {
    document.body.innerHTML = '';

    let biomeNameContainer = document.createElement('div');
    biomeNameContainer.className = 'biome-name-container';
    document.body.appendChild(biomeNameContainer);

    let biomeNameElement = document.createElement('div');
    biomeNameElement.className = 'biome-name';
    biomeNameElement.innerText = `Биом: ${currentBiome}`;
    biomeNameContainer.appendChild(biomeNameElement);

    let roomList = document.createElement('div');
    roomList.className = 'room-list';
    
    rooms.forEach((room, i) => {
        const button = document.createElement('button');
        button.textContent = room;
        button.dataset.index = i;
        button.className = 'room-button';
        button.addEventListener('click', renderCurrentRoom);
        roomList.appendChild(button);
    })

    document.body.appendChild(roomList);
};
