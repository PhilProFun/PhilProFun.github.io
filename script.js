let container = document.querySelector('.container');

function showInfo(mode) {
    let infoText = document.createElement('div', id='info');
    if (mode === 'time') {
        infoText.innerHTML = 'Режим "По тайму": информация о режиме по тайму.';
    } else if (mode === 'fix') {
        infoText.innerHTML = 'Режим "По фиксу": информация о режиме по фиксу.';
    }
    container.innerHTML = '';
    container.appendChild(infoText);
}
