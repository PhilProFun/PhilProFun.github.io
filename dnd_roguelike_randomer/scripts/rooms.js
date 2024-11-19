function renderCurrentRoom(e) {
    document.body.innerHTML = '';

    renderRoomName(e.target.textContent);

    let mainInfoElement = document.createElement('div');
    mainInfoElement.className = 'main-info-container';
    document.body.appendChild(mainInfoElement);

    renderDoorsAmount();
    renderInterior();

    let detailInfoElement = document.createElement('div');
    detailInfoElement.className = 'detail-info-container';
    document.body.appendChild(detailInfoElement);

    let roomNumber = e.target.dataset.index;

    switch (roomNumber) {
        case '0':
            renderMerchant();
            break;
        case '1':
            renderVillager();
            break;
        case '2':
            renderItem();
            renderTest();
            break;
        case '3':
            renderReward();
            renderTest();
            break;
        // ниже кастомные комнаты биомов:
        case '4':
            renderTest();
            break;
        case '5':
            renderTest();
            renderExtraData();
            break;
        default:
            break;
    }

    renderBackButton();
};

function renderRoomName(roomName) {
    let roomNameContainer = document.createElement('div');
    roomNameContainer.className = 'room-name-container';
    document.body.appendChild(roomNameContainer);

    let roomNameElement = document.createElement('div');
    roomNameElement.className = 'room-name';
    roomNameElement.innerText = `Комната: ${roomName}`;
    roomNameContainer.appendChild(roomNameElement);
}

function renderBackButton() {
    let backButtonContainer = document.createElement('div');
    backButtonContainer.className = 'back-button-container';
    document.body.appendChild(backButtonContainer);

    let backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.innerText = 'К комнатам биома';
    backButtonContainer.appendChild(backButton);

    backButton.addEventListener('click', renderCurrentBiome)
};

function renderDoorsAmount() {
    let doorsAmountElement = document.createElement('div')
    doorsAmountElement.className = 'block-container';

    let doorsAmountTitle = document.createElement('div');
    doorsAmountTitle.className = 'title';
    doorsAmountTitle.innerText = 'Количество дверей'
    doorsAmountElement.appendChild(doorsAmountTitle);

    let doorsAmountInfo = document.createElement('div');
    doorsAmountInfo.className = 'info';
    doorsAmountInfo.innerText = rollD4();
    doorsAmountElement.appendChild(doorsAmountInfo);

    document.querySelector(".main-info-container").appendChild(doorsAmountElement);
};

function renderInterior() {
    let itemsAmount = rollD4() - 2;

    if (itemsAmount < 1) {
        return;
    };

    for (let i = 0; i < itemsAmount; i++) {
        let itemElement = document.createElement('div');
        itemElement.className = 'block-container';

        let item = randomChoice(interiors);
        let itemType = randomChoice(item.types);

        let itemTitle = document.createElement('div');
        itemTitle.className = 'title';
        itemTitle.innerText = `Антураж: ${item.name}`;
        itemElement.appendChild(itemTitle);

        let itemInfo = document.createElement('div');
        itemInfo.className = 'info';
        itemInfo.innerText = itemType;
        itemElement.appendChild(itemInfo);

        document.querySelector(".main-info-container").appendChild(itemElement);
    };
};

function renderMerchant() {
    let merchantElement = document.createElement('div');
    merchantElement.className = 'block-container';

    let merchant = randomChoice(merchants);

    let merchantTitleName = document.createElement('div');
    merchantTitleName.className = 'title';
    merchantTitleName.innerText = `Торговец: ${merchant.name}`;
    merchantElement.appendChild(merchantTitleName);

    let merchantDescription = document.createElement('div');
    merchantDescription.className = 'info';
    merchantDescription.innerText = merchant.description;;
    merchantElement.appendChild(merchantDescription);

    document.querySelector('.detail-info-container').appendChild(merchantElement);
};

function renderVillager() {
    let villagerElement = document.createElement('div');
    villagerElement.className = 'block-container';

    let villager = randomChoice(villagers);

    let villagerTitleName = document.createElement('div');
    villagerTitleName.className = 'title';
    villagerTitleName.innerText = `Житель: ${villager.name}`;
    villagerElement.appendChild(villagerTitleName);

    let villagerDescription = document.createElement('div');
    villagerDescription.className = 'info';
    villagerDescription.innerText = villager.description;;
    villagerElement.appendChild(villagerDescription);

    document.querySelector('.detail-info-container').appendChild(villagerElement);
};

function renderItem() {
    let itemElement = document.createElement('div')
    itemElement.className = 'block-container';

    let itemTitle = document.createElement('div');
    itemTitle.className = 'title';
    itemTitle.innerText = 'Предмет'
    itemElement.appendChild(itemTitle);

    let itemInfo = document.createElement('div');
    itemInfo.className = 'info';
    itemInfo.innerText = randomChoice(items);
    itemElement.appendChild(itemInfo);

    document.querySelector(".detail-info-container").appendChild(itemElement);
};

function renderReward() {
    let rewardElement = document.createElement('div');
    rewardElement.className = 'block-container';

    let rewardTitle = document.createElement('div');
    rewardTitle.className = 'title';
    rewardTitle.innerText = 'Количество монет';
    rewardElement.appendChild(rewardTitle);

    let rewardDescription = document.createElement('div');
    rewardDescription.className = 'info';
    rewardDescription.innerText = randomChoice(rewards);
    rewardElement.appendChild(rewardDescription);

    document.querySelector('.detail-info-container').appendChild(rewardElement);
};

function renderTest() {
    let testElement = document.createElement('div');
    testElement.className = 'block-container';

    let test = randomChoice(tests);

    let testTitle = document.createElement('div');
    testTitle.className = 'title';
    testTitle.innerText = `Испытание: ${test.name}`;
    testElement.appendChild(testTitle);

    if (test.types.length > 0) {
        let testDescription = document.createElement('div');
        testDescription.className = 'info';
        testDescription.innerText = randomChoice(test.types);
        testElement.appendChild(testDescription);
    }
    
    document.querySelector('.detail-info-container').appendChild(testElement);
}

function renderExtraData() {
    let extraDataElement = document.createElement('div');
    extraDataElement.className = 'block-container';

    let extra = randomChoice(extraRoomData);

    let extraDataTitle = document.createElement('div');
    extraDataTitle.className = 'title';
    extraDataTitle.innerText = `Дополнительно: ${extra.name}`;
    extraDataElement.appendChild(extraDataTitle);

    let extraDataDescription = document.createElement('div');
    extraDataDescription.className = 'info';
    extraDataDescription.innerText = extra.description;
    extraDataElement.appendChild(extraDataDescription);

    document.querySelector('.detail-info-container').appendChild(extraDataElement);
}