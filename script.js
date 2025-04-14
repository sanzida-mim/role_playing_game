let xp = 0;
let health = 100;
let gold = 50;
let fighting;
let monsterHealth;
let currentWeapon = 0;
let inventory = ["Sheild &#x1F6E1;"];

const btn1 = document.querySelector('#button1');
const btn2 = document.querySelector('#button2');
const btn3 = document.querySelector('#button3');

const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterNameText = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');

const locations = [
    {
        name: 'town square',
        'button text': ['Go to store', 'Go to cave', 'Fight dragon'],
        'button functions': [goStore, goCave, fightDragon],
        text: 'You are in the town square. You see a sign that says \"Store\".'
    },

    {
        name: 'store',
        'button text': ['Buy 10 health (10 gold)', 'Buy weapon (30 gold)', 'Go to town square'],
        'button functions': [buyHealth, buyWeapon, goTown],
        text: 'You enter the store.'
    },

    {
        name: 'cave',
        'button text': ['Fight Slime', 'Fight fanged beast', 'Go to town square'],
        'button functions': [fightSlime, fightFangedBeast, goTown],
        text: 'You enter the cave. You see some monsters.'
    },

    {
        name: 'fight',
        'button text': ['Attack', 'Dodge', 'Run'],
        'button functions': [attack, dodge, run],
        text: 'You are fighting a monster.'
    },

    {
        name: 'kill monster',
        'button text': ['Go to town square', 'Go to town square', 'Go to town square'],
        'button functions': [goStore, goStore, goStore],
        text: 'The monster screams \"Arg!\" as it dies. You gain experience points and find gold.'
    },

    {
        name: 'lose',
        'button text': ['REPLAY?', 'REPLAY?', 'REPLAY?'],
        'button functions': [restart, restart, restart],
        text: 'You die. &#x2620;'
    },

    {
        name: 'win',
        'button text': ['REPLAY?', 'REPLAY?', 'REPLAY?'],
        'button functions': [restart, restart, restart],
        text: 'You defeat the dragon! YOU WIN THE GAME! &#x1F389;'
    }     
];

const monsters = [
    {name: 'Slime', level: 2, health: 15},
    {name: 'Fanged Beast', level: 8, health: 60},
    {name: 'Dragon', level: 20, health: 300}
];

const weapons = [
    {name: 'Sheild &#x1F6E1;', power: 5},
    {name: ' Dagger &#128481;', power: 30},
    {name: ' Claw hammer &#xe116;', power: 50},
    {name: ' divine knife &#128481;', power: 100}
];

btn1.onclick = goStore;
btn2.onclick = goCave;
btn3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = 'none';
    
    btn1.innerText = location['button text'][0];
    btn2.innerText = location['button text'][1];
    btn3.innerText = location['button text'][2];

    btn1.onclick = location['button functions'][0];
    btn2.onclick = location['button functions'][1];
    btn3.onclick = location['button functions'][2];

    text.innerHTML = location.text;
}

function goFight() {
    update(locations[3]);
    monsterStats.style.display = 'block';
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealth = monsters[fighting].health;
    monsterHealthText.innerText = monsterHealth;
}

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightFangedBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function buyHealth() {
    if(gold > 0) {
        health += 10;
        gold -= 10;
        healthText.innerText = health;
        goldText.innerText = gold;
    } else {
        text.innerText = 'You do not have enough gold to buy health.';
    }
}

function buyWeapon() {
    if(currentWeapon < weapons.length-1) {
        if(gold >= 30) {
            gold -= 30;
            goldText.innerText = gold;
            currentWeapon++;

            let newWeapon = weapons[currentWeapon].name;

            text.innerHTML = 'You now have a new ' + newWeapon + '.';

            inventory.push(newWeapon);

            text.innerHTML += 'In your inventory you have: ' + inventory + '.';
        } else {
            text.innerHTML = 'You do not have enough gold to buy new weapon.';
        }
    } else {
        text.innerHTML = 'You already have the best weapons in your inventory. \n In your inventory you have: ' + inventory + '.';

        btn2.innerText = 'Sell weapon (15 gold)';
        btn2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    
}

function attack() {
    
}

function dodge() {
    
}

function run() {
    restart();
}

function restart() {
    xpText.innerText = 0;
    healthText.innerText = 100;
    goldText.innerText = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goTown();
}