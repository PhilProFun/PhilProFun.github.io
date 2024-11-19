let currentBiome;

let rooms = [];
let biomes = [];

let merchants = []; // для команты "Торговец"
let villagers = []; // для комнаты "Житель"
let rewards = []; // для комнаты "Монеты"
let items = []; // для комнаты "Предметы"

let interiors = []; // обязательный параметр любой комнаты

let tests = []; // параметр испытаний для некоторых основных и всех дополнительных комнат биома

let extraRoomData = []; // параметр с любыми данными одной из двух дополнительных комнат биома

async function start() {
    await loadBiomes();
    await loadMainRooms();
    renderBiomes();
};

async function loadBiomes() {
    await fetch('./data/biomes.json')
       .then(response => response.json())
       .then(data => biomes = data)
       .catch(error => console.error('Error:', error));
}

async function loadMainRooms() {
    await fetch('./data/main_rooms.json')
       .then(response => response.json())
       .then(data => rooms = data)
       .catch(error => console.error('Error:', error));
}

window.onload = start