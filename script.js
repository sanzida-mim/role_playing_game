let xp = 0;
let health = 100;
let gold = 50;
let fighting;
let monsterHealth;
let currentWeapon = 0;
let inventory = ["Stick"];

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
        'button functions': [attack, dodge, goTown],
        text: 'You are fighting a monster.'
    },

    {
        name: 'defeat monster',
        'button text': ['Go to town square', 'Go to town square', 'Easter Egg'],
        'button functions': [goStore, goStore, easterEgg],
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
    },

    {
        name: 'easter egg',
        'button text': ['2', '8', 'Go to town square?'],
        'button functions': [pickTwo, pickEight, goTown],
        text: 'You found a secret bonus game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If lucky enough and the number you choose matches one of the random numbers, you win!!!'
    }
];

const monsters = [
    {name: 'Slime', level: 2, health: 15},
    {name: 'Fanged Beast', level: 8, health: 60},
    {name: 'Dragon', level: 20, health: 300}
];

const weapons = [
    {name: 'Stick', power: 5},
    {name: ' Dagger', power: 30},
    {name: ' Claw hammer', power: 50},
    {name: ' Divine Sword', power: 100}
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

            text.innerText = 'You now have a new ' + newWeapon + '.';

            inventory.push(newWeapon);

            text.innerText += '\n\nIn your inventory you have: ' + inventory + '.';
        } else {
            btn2.innerText = 'Sell weapon (15 gold)';
            btn2.onclick = sellWeapon;

            text.innerText = 'You do not have enough gold to buy new weapon.';
        }
    } else {
        text.innerText = 'You already have the best weapons in your inventory.\n\nIn your inventory you have: ' + inventory + '.';
    }
}

function sellWeapon() {
    if(inventory.length > 1) {
        let soldWeapon = inventory.pop();
        text.innerText = 'You sold your ' + soldWeapon + '.' + '\n\nIn inventory now you have: ' + inventory + '.';
        gold += 15;
        goldText.innerText = gold;
    } else {
        text.innerText = 'You can not sell your only weapon.'
        text.style.color = 'red';
    }
}

function attack() {
    text.innerText = 'The ' + monsters[fighting].name + ' attacks.'
    text.innerText += ' You attack it with your ' + weapons[currentWeapon].name + '.';

    health -= getMonsterAttackValue(monsters[fighting].level);

    if(isMonsterHit()) {
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;

        monsterHealthText.innerText = monsterHealth;
    } else {
        text.innerText = ' Ugh! You missed.';
    }

    healthText.innerText = health;

    if(health <= 0) {
        loseGame();
    } else if(monsterHealth <= 0) {
        if(fighting === 2) {
            winGame();
        } else {
            defeatMonster();
        }
    }

    if(Math.random() <= .1 && inventory.length !== 1) {
        text.innerText = 'Your ' + inventory.pop() + 'breaks.';
        currentWeapon--;
    }
}

function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.random() * xp);
    return hit > 0? hit:0;
}

function isMonsterHit() {
    return Math.random() > 0.2 || health < 20;
}

function dodge() {
    text.innerText = 'The ' + monsters[fighting].name + ' attacks.'
    text.innerText += ' But you skillfully dodge the attack from this man eating ' + monsters[fighting].name;
}

function loseGame() {
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 5);
    xp += monsters[fighting].level;

    goldText.innerText = gold;
    xpText.innerText = xp;

    update(locations[4]);
}

function easterEgg() {
    update(locations[7]);
}

function pickTwo() {
    pick(2);
}

function pickEight() {
    pick(8);
}

function pick(guess) {
    const numbers = [];

    while(number.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }

    text.innerText = 'You picked ' + guess + '. Here are the random numbers list:\n';

    for(let i = 0; i <= 10; i++) {
        text.innerText += numbers[i] + ' ';
    }
}

function restart() {
    xpText.innerText = 0;
    healthText.innerText = 100;
    goldText.innerText = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goTown();
}