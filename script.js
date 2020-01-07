let game = {
    coppers: 0,
    copperGrowth: 1,
    coppersUpgCost: 10,
    coppersUpgLevel: 1,
    error: '',
    winCondition: 20000,
    silvers: 0,
    silversGrowth: 1,
    silversUpgCost: 1,
    silversUpgLevel: 0,
    silverMineBasePrice: 1,
    countdown: 30,
    showExport: 0
};

let gameError = document.querySelector('.game-error');
let spnCoppersValue = document.getElementById('spnCoppersValue');
let btnUpgCopperMine = document.getElementById('btnUpgCopperMine');
let spnCoppersRate = document.getElementById("spnCoppersRate");
let btnSaveGame = document.getElementById("btnSaveGame");
let btnLoadGame = document.getElementById("btnLoadGame");
// spnSilverValue
let spnSilverValue = document.getElementById("spnSilverValue");
let btnUpgSilverMine = document.getElementById("btnUpgSilverMine");
let btnBuyCoppers = document.getElementById("btnBuyCoppers");
let btnBuySilvers = document.getElementById("btnBuySilvers");
let spnCoppersLevel = document.getElementById("spnCoppersLevel");
let spnSilversLevel = document.getElementById("spnSilversLevel");
let divLblExport = document.getElementById("divLblExport");

mytimer = setInterval(endOfTurnCalc, 2000);


function updateUI(){
    spnCoppersValue.textContent = game.coppers;
    spnSilverValue.textContent = game.silvers;
    btnUpgCopperMine.textContent = 'Улучшить медную шахту, ' + game.coppersUpgCost.toString() + ' медных монет';
    spnCoppersRate.textContent = game.copperGrowth * game.coppersUpgLevel;
    spnCoppersLevel.textContent = game.coppersUpgLevel;
    spnSilversLevel.textContent = game.silversUpgLevel;

    if(game.silversUpgLevel === 0){
        btnUpgSilverMine.textContent =  'Построить серебряную шахту, ' + game.silversUpgCost.toString() + ' серебряная';
    }else {
        btnUpgSilverMine.textContent =  'Улучшить серебряную шахту, ' + game.silversUpgCost.toString() + ' серебряная';

    }

    if(game.showExport === 1){
        divLblExport.style.display = "block";
    }else {
        divLblExport.style.display = "none";
    }
}

function endOfTurnCalc(){
    if(game.coppers < game.winCondition || game.silvers < game.winCondition) {
        game.coppers = game.coppers + game.copperGrowth * game.coppersUpgLevel;
        // game.silvers = game.silvers + game.silversGrowth * game.silversUpgLevel;

        // обновление ресурсов
        // spnCoppersValue.textContent = game.coppers;
        // spnSilverValue.textContent = game.silvers;
        updateUI();
    }else {
        clearTimeout(mytimer);
        gameError.textContent = 'Вы выиграли! накоплено больше' + game.winCondition + 'монет';
    }
    
}

function upgCopperMine(e){
    e.preventDefault();
    if(game.coppers >= game.coppersUpgCost ){
        game.coppers = game.coppers - game.coppersUpgCost;
        game.coppersUpgLevel = game.coppersUpgLevel + 1;
        game.coppersUpgCost = coppersUpgCost();
        gameError.textContent = '';
        updateUI();
    }else {
        gameError.textContent = 'У вас не хватает монет.';
    }
}

function upgSilverMine(e){
    e.preventDefault();
    if(game.silvers >= game.silversUpgCost ){
        game.silvers = game.silvers - game.silversUpgCost;
        game.silversUpgLevel = game.silversUpgLevel + 1;
        game.silversUpgCost = silversUpgCost();
        gameError.textContent = '';
        updateUI();
    }else {
        gameError.textContent = 'У вас не хватает монет.';
    }
}

function coppersUpgCost() {
    return game.coppersUpgLevel * 10 + 5;
}

function silversUpgCost() {
    return game.silversUpgLevel * 1 + 2;
}


function buySilvers(){
    if(game.coppers >= 100){
        game.coppers = game.coppers - 100;
        game.silvers = game.silvers + 1;
        updateUI();
    }else {
        gameError.textContent = 'У вас не хватает монет для покупки серебра.';
    }
   
}


function buyCoppers(){
    if(game.silvers >= 1){
        game.coppers = game.coppers + 100;
        game.silvers = game.silvers - 1;
        updateUI();
    }else {
        gameError.textContent = 'У вас не хватает монет для продажи серебра.';
    }    
}

function saveGame(){
    try {
        localStorage.setItem('game', JSON.stringify(game));
    }catch(e){
        if(e === QUOTA_EXCEEDED_ERR) {
            console.log('Превышен лимит в LocalStorage');
        }
    }
    
}

function loadGame(){
    let gameSave = JSON.parse(localStorage.getItem('game'));
    for(let propertyName in gameSave){
        game[propertyName] = gameSave[propertyName];
    }
    updateUI();
}

//экспорт игры

function exportGame() {
    exportTimer = setInterval(exportCountdown, 1000);
    divLblExport.innerHTML = btoa(JSON.stringify(game));
    game.showExport = 1;
    updateUI();
    gameError.textContent = 'Игра экспортирована';
}
function exportCountdown() {
    if (game.countdown > 0) {
        game.countdown = game.countdown - 1;
    } else {
        clearTimeout(exportTimer);
        game.countdown = 30;
        game.showExport = 0;
        updateUI();
    }
}
function importGame() {
    let importString = prompt('Введите длинную строку экспорта');
    gameSave = JSON.parse(atob(importString));
    for (var propertyName in gameSave) { game[propertyName] = gameSave[propertyName]; }
    updateUI();
    gameError.textContent = 'Игра загружена';
}


btnUpgCopperMine.onclick = upgCopperMine;
btnUpgSilverMine.onclick = upgSilverMine;
btnSaveGame.onclick = saveGame;
btnLoadGame.onclick = loadGame;
btnBuyCoppers.onclick = buyCoppers;
btnBuySilvers.onclick = buySilvers;
