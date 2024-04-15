let xp = 0
let health = 100
let gold = 20
let currentWeapon = 0
let fighting
let monsterHealth
let monsterName
let inventory = ['stick']
let monsterDamage
let playerDamage

const button1 = document.querySelector("#button1")
const button2 = document.querySelector("#button2")
const button3 = document.querySelector("#button3")
const text = document.querySelector("#text")
const xpText = document.querySelector("#xpText")
const healthText = document.querySelector("#healthText")
const goldText = document.querySelector("#goldText")
const monsterStats = document.querySelector("#monsterStats")
const monsterNameText = document.querySelector("#monsterName")
const monsterHealthText = document.querySelector("#monsterHealth")

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 20
    },
    {
        name: "clawhammer",
        power: 35
    },
    {
        name: "sword",
        power: 50
    }
];

const locations = [
    {
        name: "town square",
        "button text": ["Go to Linella", "Go to Posta Veche", "Fight dragon"],
        "button function": [goStore, goCave, fightDragon],
        text: "You are at the town square. You see a sign that says \"Linella\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health\n(10 gold)", "Weapons", "Exit shop"],
        "button function": [buyHealth, weaponsMenu, town],
        text: "You entered Linella. What are you going to buy?"
    },
    {
        name: "weapons section",
        "button text": ["Buy new weapon\n(30 gold)", "Sell weapon\n(15 gold)", "Go back"],
        "button function": [buyWeapon, sellWeapon, backToShop],
        text: "Available weapons:\n\nStick, 5 damage\nDagger, 30 damage\nClawhammer, 50 damage\nSword, 100 damage\n\nYou can buy only the next weapon after yours.\nYou can also sell your previous weapon."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Exit cave"],
        "button function": [fightSlime, fightBeast, town],
        text: "You entered Posta Veche.\n In front you see some monsters. What are you going to do?"
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button function": [attack, dodge, town],
        text: "You are fighting the "
    },
    {
        name: "killed monster",
        "button text": ["Fight\nanother slime", "Fight fanged beast", "Exit cave"],
        "button function": [fightSlime, fightBeast, town],
        text: 'The monster screams "Băga-mi-aș p**a in zadrotu ista" as it dies.'
    },
    {
        name: "player death",
        "button text": ["Rebirth", "Close the game", "Rebirth"],
        "button function": [rebirth, gameExit, rebirth],
        text: 'You died! You scream "Nezaregalo, razrab mudak" as you die..\n\nYou can restart the game, or give up and exit.'
    },
    {
        name: "game won",
        "button text": ["Rebirth", "Close the game", "Rebirth"],
        "button function": [rebirth, gameExit, rebirth],
    }
]

const monsters = [
    {
        name: "slime",
        level: 5,
        health: 15
    },
    {
        name: "fanged beast",
        level: 15,
        health: 80
    },
    {
        name: "dragon",
        level: 30,
        health: 300
    }
]

function statsUpdate() {
    healthText.innerText = health
    goldText.innerText = gold
    xpText.innerText = xp
}

function inventoryText() {
    text.innerText += "\n\nInventory: " + inventory
}

// Initializing buttons
button1.onclick = goStore
button2.onclick = goCave
button3.onclick = fightDragon

// Locations section
function update(location) {
    monsterStats.style.display = "none"
    button1.innerText = location["button text"][0]
    button2.innerText = location["button text"][1]
    button3.innerText = location["button text"][2]
    text.innerText = location.text;
    button1.onclick = location["button function"][0]
    button2.onclick = location["button function"][1]
    button3.onclick = location["button function"][2] 
}

function town() {update(locations[0])}
function goStore() {update(locations[1]);inventoryText()}
function weaponsMenu() {update(locations[2]);inventoryText()}
function backToShop() {update(locations[1]);inventoryText()}
function goCave() {update(locations[3])}// End locations section

// Store section
function buyHealth() {
    if (gold >= 10) {
        gold -= 10
        health += 10
        statsUpdate()
        text.innerText = "You bought a bottle of Bifidoc.\nAfter you drank it, you feel stronger, just like you got more health."
        inventoryText()
    } else {
        text.innerText = "Not enough gold to buy more health."
        inventoryText()
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30
            statsUpdate()
            currentWeapon++
            let newWeapon = weapons[currentWeapon].name
            inventory.push(newWeapon)
            text.innerText = "You bought new weapon: " + newWeapon + "!"
            inventoryText()
        } else {
            text.innerText = "Not enough gold to buy new weapon."
        }
    } else {
        text.innerText = "You already have the best weapon in the store!"
        inventoryText()
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15
        statsUpdate()
        let soldWeapon = inventory.shift()
        text.innerText = "You have selled your " + soldWeapon + "."
        inventoryText()
    } else {
        text.innerText = "Sorry, we will not buy your only weapon." 
    }
}// End store section

// Fighting section
function monsterStatsUpdate() {
    monsterNameText.innerText = monsterName
    monsterHealthText.innerText = monsterHealth
}

function fightSlime() {fighting = 0;goFight()}
function fightBeast() {fighting = 1;goFight()}
function fightDragon() {
    if (xp >= 100) {
        fighting = 2
        goFight()
    } else {
        text.innerText = "Not so fast! Gain at least 100 XP to try your powers with the dragon.\n\nTip: XP can be earned by killing monsters at Posta Veche!"
    }
}

function goFight() {
    update(locations[4])
    text.innerText += " " + monsters[fighting].name + "!"
    monsterHealth = monsters[fighting].health
    monsterName = monsters[fighting].name
    monsterStats.style.display = "block"
    monsterStatsUpdate()
}

function attack() {
    text.innerText = "The " + monsterName + " attacks."
    text.innerText += "\nYou attack " + monsterName +  " with your " + weapons[currentWeapon].name + "."
    monsterDamage = getMonsterAttackValue(monsters[fighting].level)
    health -= monsterDamage

    if (weaponBroke() === false){
        if (isMonsterHit() === true ){
            monsterHealth -= getPlayerAttackValue()
            playerDamage = getPlayerAttackValue()
        } else {
            text.innerText += "\n\nYour hand slips and you miss your hit!"
            playerDamage = 'no'
        }
    } else {
        if (inventory.length > 1) {
            checkIfBrokeStick()
            text.innerText += "\n\nYour " + inventory.pop() + " broke! You will use your last weapon."
            playerDamage = 'no'
        } else {
            checkIfBrokeStick()
            text.innerText += "\n\nYour " + inventory.pop() + " broke! You found a stick on the floor and can continue the fight with it."
            inventory.push('stick')
            playerDamage = 'no'
        }
    }
    text.innerText += "\n\nPlayer gets: " + monsterDamage + " damage. Monster gets: " + playerDamage + " damage."
    statsUpdate()
    monsterStatsUpdate()

    if (health <= 0){
        health = '-'
        gold = '-'
        xp = '-'
        statsUpdate()
        playerDeath()
    } else if (monsterHealth <= 0) {
        fighting !== 2 ? monsterDeath() : gameEnd()
    }
}

function getMonsterAttackValue(level){
    let hit = (level) - (Math.floor(Math.random() * 6))
    if (hit >= 0) {return hit} else {hit = 0;return hit}
}

function getPlayerAttackValue() {
    let damage = weapons[currentWeapon].power + Math.floor(Math.random() * 10) + 1
    return damage
}

// Randomizers
function isMonsterHit() {return Math.random() > .2 || health < 20}
function weaponBroke() {return Math.random() < 0.05}// End radnomizers

function checkIfBrokeStick() {
    if (currentWeapon === 0) {
        currentWeapon = 0
    } else {
        currentWeapon--
    }
}

function dodge() {
    text.innerText = "The " + monsterName + " attacks, but you dodge it."
    text.innerText += "\n\nPlayer gets: no damage. Monster gets: no damage."
}

// Victory/defeat
function monsterDeath() {
    gold += Math.floor(monsterDamage * 3)
    xp += Math.floor(monsterDamage * 3)
    statsUpdate()
    update(locations[5])
    text.innerText += "\n\nYou gain " + monsterDamage + " experience and loot " + monsterDamage + " gold!" 
}

function playerDeath() {
    update(locations[6])
}

function rebirth(){
    xp = 0
    health = 100
    gold = 20
    currentWeapon = 0
    inventory = ['stick']
    statsUpdate()
    town()
}

function gameExit() {close()}

function gameEnd() {
    update(locations[7])
    text.innerText = 'Congratulations, you won!\n\nChisinau was eliberated from the dragon, and now everyone can emigrate to Germany until NATO helps Moldova clean Chisinau from monsters, and shadow money gang wizards from Israel to close the portal.'
    text.innerText += 'Maia Sandu gifted you a penthouse in Bacioii Noi for your achievments in eliberating of Chisinau'
}