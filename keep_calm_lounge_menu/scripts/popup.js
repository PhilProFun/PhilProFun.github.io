const showPopupBtn = document.getElementById('showPopupBtn');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const copyBtn = document.getElementById('copyBtn');
const popupText = document.getElementById('popupText');

showPopupBtn.addEventListener('click', () => {
    popup.classList.add('active');
    overlay.classList.add('active');
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('len12345');
    copyBtn.innerText = "Пароль скопирован!";
    copyBtn.style.backgroundColor = "4caf50";
});

overlay.addEventListener('click', () => {
    popup.classList.remove('active');
    overlay.classList.remove('active');
});