let inputElement = document.getElementById('dice-count');
let diceContainerElement = document.getElementById('dice-container');
let checkboxElement = document.getElementById('sort-checkbox');

inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        rollDice();
    };
});

function rollDice() {
    let sortCheckbox = checkboxElement.checked;
    let diceCount = inputElement.value;
    let diceResults = [];
    let criticalSuccessCount = 0;

    diceContainerElement.innerHTML = '';

    for (let i = 0; i < diceCount; i++) {
        let result = Math.floor(Math.random() * 10) + 1;
        diceResults.push(result);
        if (result === 10) {
            criticalSuccessCount++;
        };
    };

    if (sortCheckbox) {
        diceResults.sort((a, b) => {
            if (b === 10) return 1;
            if (a === 10) return -1;
            if (b >= 6 && b <= 9) return 1;
            if (a >= 6 && a <= 9) return -1;
            return 0;
        });
    };

    diceResults.forEach(result => {
        let dice = document.createElement('div');
        dice.className = 'dice';

        if (result >= 6 && result <= 9) {
            let img = document.createElement('img');
            img.src = 'success.png';
            dice.appendChild(img);
        } else if (result === 10) {
            let img = document.createElement('img');
            img.src = 'critical_success.png';
            dice.appendChild(img);
        };
        dice.classList.add('roll');
        diceContainerElement.appendChild(dice);
    });

    let criticalSuccessDice = document.querySelectorAll('.dice img[src="critical_success.png"]');
    for (let i = 0; i < Math.floor(criticalSuccessCount / 2) * 2; i++) {
        criticalSuccessDice[i].parentElement.classList.add('bounce');
    }
}
