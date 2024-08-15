let container = document.querySelector('.container');

async function showInfo(mode) {
    container.innerHTML = '';

    await populateInfo(mode);

    createTable();
    await populateTable(mode);
}

async function populateInfo(mode) {
    let response = await fetch('data/texts.json');
    let data = await response.json();
    
    let infoText = document.createElement('div', id = 'info');

    if (mode === 'time') {
        infoText.innerHTML = data.time;
    } else if (mode === 'fix') {
        infoText.innerHTML = data.fix;
    }
    container.appendChild(infoText);
}
function createTable() {
    let table = document.createElement('table');
    table.classList.add('menuTable');
    
    let tbody = document.createElement('tbody');
    table.appendChild(tbody);
    
    container.appendChild(table);
}

function addCategorySeparator(tableBody, category) {
    let row = document.createElement('tr');
    let cell = document.createElement('th');
    cell.colSpan = 3;
    cell.classList.add('categorySeparator');
    cell.textContent = category;
    row.appendChild(cell);
    tableBody.appendChild(row);
}

function addItemToTable(item, tableBody) {
    let row = document.createElement('tr');

    let nameCell = document.createElement('th');
    nameCell.innerHTML = item.name;
    row.appendChild(nameCell);

    let priceCell = document.createElement('th');
    priceCell.innerHTML = item.price || "бесплатно";
    row.appendChild(priceCell);

    if (item.additionals.length > 0) {
        let additionalsCell = document.createElement('th');

        let ul = document.createElement('ul');

        item.additionals.forEach(additional => {
            let li = document.createElement('li');
            li.textContent = additional;
            ul.appendChild(li);
        });

        additionalsCell.appendChild(ul);
        row.appendChild(additionalsCell);
    };

    tableBody.appendChild(row);
}

let separators = {
    "non_alcohol": "Безалкогольное",
    "alcohol": "Алкогольное",
    "hookahs": "Кальяны",
    "food": "Перекус"
}

async function populateTable(mode) {
    let response = await fetch('data/prices.json');
    let data = await response.json();

    let tableBody = document.querySelector('.menuTable').getElementsByTagName("tbody")[0];

    let combinedNonAlcohol = [...data.general_items.non_alcohol];
    
    if (mode === 'time') {
        combinedNonAlcohol.unshift(...data.time_items.non_alcohol);
        Object.keys(data.time_items).forEach(category => {
            if (category !== 'non_alcohol') {
                addCategorySeparator(tableBody, separators[category]);
                data.time_items[category].forEach(item => addItemToTable(item, tableBody));
            }
        });
    }
    if (mode === 'fix') {
        combinedNonAlcohol.unshift(...data.fix_items.non_alcohol);
        Object.keys(data.fix_items).forEach(category => {
            if (category !== 'non_alcohol') {
                addCategorySeparator(tableBody, separators[category]);
                data.fix_items[category].forEach(item => addItemToTable(item, tableBody));
            }
        });
    }

    addCategorySeparator(tableBody, separators['non_alcohol']);
    combinedNonAlcohol.forEach(item => addItemToTable(item, tableBody));

    Object.keys(data.general_items).forEach(category => {
        if (category !== 'non_alcohol') {
            addCategorySeparator(tableBody, separators[category]);
            data.general_items[category].forEach(item => addItemToTable(item, tableBody));
        }
    });
}
