let xp = 0;
let health = 100;
let gold = 50;

const btn1 = document.querySelector('#button1');
const btn2 = document.querySelector('#button2');
const btn3 = document.querySelector('#button3');

const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterName');
const monsterHealth = document.querySelector('#monsterHealth');

const locations = [
    {
        name: 'town square',
        'button text': ['Go to store', 'Go to cave', 'Fight dragon'],
        'button function': [goStore, goCave, fightDragon],
        text: 'You are in the town square. You see a sign that says \"Store\".'
    },

    {
        name: 'store',
        'button text': ['Buy 10 health (10 gold)', 'Buy weapon (30 gold)', 'Go to town square'],
        'button function': [buyHealth, buyWeapon, goTown],
        text: 'You enter the store.'
    },

    {
        name: 'cave',
        'button text': ['Fight Slime', 'Fight fanged beast', 'Go to town square'],
        'button function': [fightSlime, fightFangedBeast, goTown],
        text: 'You enter the cave. You see some monsters.'
    },

    {
        name: 'fight dragon',
        'button text': ['Attack', 'Dodge', 'Run'],
        'button function': [attack, dodge, run],
        text: 'You are fighting a monster.'
    }
];

const monsters = [
    {name: 'slime', level: 2, health: 15},
    {name: 'fanged beast', level: 8, health: 60},
    {name: 'dragon', level: 20, health: 200}
];

const weapons = [
    {name: 'stick', power: 5},
    {name: 'dagger', power: 30},
    {name: 'claw hammer', power: 50},
    {name: 'divine knife', power: 100}
];

btn1.onclick = goStore;
btn2.onclick = goCave;
btn3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = 'none';
    
    btn1.innerText = location['button text'][0];
    btn2.innerText = location['button text'][1];
    btn3.innerText = location['button text'][2];

    btn1.onclick = location['button function'][0];
    btn2.onclick = location['button function'][1];
    btn3.onclick = location['button function'][2];

    text.innerHTML = location.text;
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

function fightDragon() {
    update(locations[3]);
}

function buyHealth() {

}

function buyWeapon() {

}

function fightSlime() {

}

function fightFangedBeast() {

}

function attack() {

}

function dodge() {

}

function run() {

}