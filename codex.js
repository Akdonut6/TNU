
// Character Data
const fighters = [
    {
        id: "moonshadow",
        name: "MOONSHADOW",
        portrait: "../images/MOONSHADOW.png",
        moves: [
            { name: "Eclipse Strike", input: "↓↘→ + P", startup: 8, active: 3, recovery: 15 },
            { name: "Lunar Dash", input: "→↓↘ + K", startup: 4, active: 6, recovery: 10 }
        ],
        lore: "Escaped facility experiment"
    },
    // ... other fighters
];

// DOM Elements
const characterGrid = document.getElementById('characterGrid');
const charSelect = document.getElementById('charSelect');
const moveDisplay = document.getElementById('moveDisplay');
const loreGrid = document.getElementById('loreGrid');

// Initialize Page
function initCodex() {
    renderCharacterGrid();
    populateCharacterSelect();
    setupLoreGrid();
    setupKonamiCode();
}

// Render Character Grid
function renderCharacterGrid() {
    characterGrid.innerHTML = fighters.map(fighter => `
        <div class="dossier-card" data-id="${fighter.id}">
            <img src="${fighter.portrait}" alt="${fighter.name}" class="character-portrait">
            <h3>${fighter.name}</h3>
            <p>${fighter.moves.length} TECHNIQUES LOADED</p>
        </div>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.dossier-card').forEach(card => {
        card.addEventListener('click', () => {
            const fighterId = card.dataset.id;
            const fighter = fighters.find(f => f.id === fighterId);
            displayMoveData(fighter.moves[0]);
        });
    });
}

// Populate Character Select
function populateCharacterSelect() {
    charSelect.innerHTML = '<option value="">SELECT COMBATANT</option>' + 
        fighters.map(fighter => `
            <option value="${fighter.id}">${fighter.name}</option>
        `).join('');

    charSelect.addEventListener('change', (e) => {
        const fighterId = e.target.value;
        if (fighterId) {
            const fighter = fighters.find(f => f.id === fighterId);
            displayMoveData(fighter.moves[0]);
        }
    });
}

// Display Move Data
function displayMoveData(move) {
    document.getElementById('startupFrames').textContent = move.startup;
    document.getElementById('activeFrames').textContent = move.active;
    document.getElementById('recoveryFrames').textContent = move.recovery;
}

// Setup Lore Grid
function setupLoreGrid() {
    loreGrid.innerHTML = Array(8).fill(0).map((_, i) => `
        <div class="lore-card ${i >= 2 ? 'locked' : ''}">
            ${i < 2 ? fighters[i].lore : ''}
        </div>
    `).join('');
}

// Konami Code Easter Egg
function setupKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                       'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let index = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[index]) {
            index++;
            if (index === konamiCode.length) {
                unlockAllLore();
                index = 0;
            }
        } else {
            index = 0;
        }
    });
}

function unlockAllLore() {
    document.querySelectorAll('.lore-card').forEach(card => {
        card.classList.remove('locked');
        // Add actual lore content here
    });
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', initCodex);