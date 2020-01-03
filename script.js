let coppers = 0;
let copperGrowth = 1;
let coppersUpgCost  = 10;
let coppersUpgLevel = 1;
let error = '';
let btnUpg = document.getElementById('btnUpgCopperMine');

mytimer = setInterval(endOfTurnCalc, 2000);

function endOfTurnCalc(){
    coppers = coppers + copperGrowth * coppersUpgLevel;
    document.getElementById('spnCoppersValue').innerHTML = coppers;
}

function upgCopperMine (e){
    e.preventDefault();
    if(coppers >= coppersUpgCost ){
        coppers = coppers - coppersUpgCost;
        coppersUpgLevel = coppersUpgLevel + 1;
        coppersUpgCost = coppersUpgCost * 2;
        document.querySelector('.game-error').innerHTML = '';
        document.getElementById('spnCoppersValue').innerHTML = coppers;
        document.getElementById('btnUpgCopperMine').innerHTML = 'Улучшить медную шахту, ' + coppersUpgCost.toString() + ' медных монет';
    }else {
        document.querySelector('.game-error').innerHTML = 'У вас не хватает монет.';
    }
}



btnUpg.onclick = upgCopperMine;
