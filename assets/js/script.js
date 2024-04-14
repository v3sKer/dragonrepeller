let xp = 0
let health = 100
let gold = 50
let currentWeapon = 0
let fighting
let monseterHealth
let inventory = ['stick']

const button1 = document.querySelector("#button1")
const button2 = document.querySelector("#button2")
const button3 = document.querySelector("#button3")
const text = document.querySelector("#text")
const xpText = document.querySelector("#xpText")
const healthText = document.querySelector("#healthText")
const goldText = document.querySelector("#goldText")
const monsterStats = document.querySelector("#monsterStats")
const monsterNameText = document.querySelector("#monsterNameText")
const monsterHealthText = document.querySelector("#monsterHealthtext")

function statsUpdate() {
    healthText.innerText = health
    goldText.innerText = gold
    xpText.innerText = xp
}

function inventoryText() {
    text.innerText += "\n\nInventory: " + inventory
}

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "clawhammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];

const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button function": [goStore, goCave, fightDragon],
        text: "You are at the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health\n(10 gold)", "Weapons", "Exit shop"],
        "button function": [buyHealth, weaponsMenu, town],
        text: "You entered the store. What are you going to buy?"
    },
    {
        name: "weapons section",
        "button text": ["Buy new weapon\n(30 gold)", "Sell weapon\n(15 gold)", "Go back"],
        "button function": [buyWeapon, sellWeapon, backToShop],
        text: "Available weapons: \nStick, 5 damage \nDagger, 30 damage \nClawhammer, 50 damage \nSword, 100 damage \n\nYou can buy only the next weapon after yours.\nYou can also sell your previous weapon."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fang beast", "Exit cave"],
        "button function": [fightSlime, fightBeast, town],
        text: "You entered the cave.\n In front you see some monsters. What are you going to do?"
    }  
]

// Initializing buttons
button1.onclick = goStore
button2.onclick = goCave
button3.onclick = fightDragon

// Locations section
function update(location) {
    button1.innerText = location["button text"][0]
    button2.innerText = location["button text"][1]
    button3.innerText = location["button text"][2]
    text.innerText = location.text;

    button1.onclick = location["button function"][0]
    button2.onclick = location["button function"][1]
    button3.onclick = location["button function"][2] 
}

function town() {
    update(locations[0])
}

function goStore() {
    update(locations[1])
    inventoryText()
}

function weaponsMenu() {
    update(locations[2])
    inventoryText()
}

function backToShop() {
    update(locations[1])
    inventoryText()
}

function goCave() {
    update(locations[3])
}// End locations section

// Store section
function buyHealth() {
    if (gold >= 10) {
        gold -= 10
        health += 10
        statsUpdate()
    } else {
        text.innerText = "Not enough gold to buy more health."
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

// Cave section 
function fightSlime() {

}

function fightBeast() {

}

// Dragon section
function fightDragon() {
    console.log("Fighting dragon.")
}// End dragon section