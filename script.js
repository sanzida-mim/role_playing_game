let xp = 0;
let health = 100;
let gold = 50;

const btn1 = document.querySelector('#button1');
const btn2 = document.querySelector('#button2');
const btn3 = document.querySelector('#button3');

const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');

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

btn1.onclick = goStore;
btn2.onclick = goCave;
btn1.onclick = fightDragon;

function goStore() {

}

function goCave() {

}

function fightDragon() {

}

function buyHealth() {

}

function buyWeapon() {

}

function goTown() {

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