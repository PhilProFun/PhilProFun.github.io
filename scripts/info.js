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
    
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    
    let th1 = document.createElement('th');
    th1.textContent = 'Наименование';
    tr.appendChild(th1);
    
    let th2 = document.createElement('th');
    th2.textContent = 'Стоимость';
    tr.appendChild(th2);
    
    let th3 = document.createElement('th');
    th3.textContent = 'Дополнительно';
    tr.appendChild(th3);
    
    thead.appendChild(tr);
    table.appendChild(thead);
    
    let tbody = document.createElement('tbody');
    table.appendChild(tbody);
    
    container.appendChild(table);
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

async function populateTable(mode) {
    let response = await fetch('data/prices.json');
    let data = await response.json();

    let tableBody = document.querySelector('.menuTable').getElementsByTagName("tbody")[0];

    if (mode === 'time') {
        data.time_items.forEach(item => addItemToTable(item, tableBody));
    }
    else if (mode === 'fix') {
        data.fix_items.forEach(item => addItemToTable(item, tableBody));
    };
    data.general_items.forEach(item => addItemToTable(item, tableBody));
}
