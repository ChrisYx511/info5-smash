// Super Smash eachother in the ass Brothers - Chris YANG et Felix WU
// Concentration Informatique - 2023-03-31

import Player, { physicalConstants, keysDown, keysBlocked} from "./modules/player.js"


const canvas = document.createElement("canvas")
canvas.setAttribute("id", "mainCanvas");
const ctx = canvas.getContext("2d")
document.body.prepend(canvas)
let debugMode = true
canvas.width = 1280
canvas.height = 720
canvas.style.backgroundColor = "lightblue"
canvas.style.border = "2px black solid"
canvas.style.display = "block"
canvas.style.margin = "auto"
// Movement and player
let activeArea = {}
/*deplacement du joueur*/


canvas.style.backgroundRepeat = "no-repeat"
canvas.style.backgroundSize = "cover"

document.addEventListener("keydown", (e) => {
    keysDown[e.key] = true
})

document.addEventListener("keyup", (e) => {
    delete keysDown[e.key] 
    delete keysBlocked[e.key]
})

const battefield = {
    name: "Battlefield",
    bgPath: "./assets/SSBB_Battlefield_Stage.webp",
    platforms: [
        {
            x: 192,
            y:484,
            w: 900,
            h: 70,
            basePlatform: true
        },
        {
            x: 305,
            y: 345,
            w: 195,
            h: 15,
            basePlatform: false
        },
        {
            x: 783,
            y: 345,
            w: 195,
            h: 15,
            basePlatform: false
        },        {
            x: 543,
            y: 215,
            w: 195,
            h: 15,
            basePlatform: false
        },
    ],
    players: []
}

function decomposeVector(norme, orientationInRad) {
    return {
        x: norme*Math.cos(orientationInRad),
        y: norme*Math.sin(orientationInRad)
    }
}

function handleCollision(character, platform) {
    if ( character.position.x + character.position.w > platform.x &&
         character.position.x < platform.x + platform.w) {
        if ( character.position.y < platform.y && character.position.y + character.position.h >= platform.y &&
             character.position.y + character.position.h < platform.y + platform.h ) {
            character.movementY.speed = 0
            character.movementY.jumpCount = 0
            character.position.y = platform.y - character.position.h

        }
        if ( character.position.y + character.position.h > platform.y + platform.h && character.position.y <= platform.y + platform.h &&
             platform.basePlatform === true) {
            if (character.movementY.speed < 0) {
                character.movementY.speed = -character.movementY.speed
            }
        }
    }
}


//




const player1 = new Player
const player2 = new Player
player2.position.x = 1000
player2.controlSetNumber = 1
loadStage(battefield)
activeArea.players.push(player1, player2)
//
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}

if (debugMode) {
    console.log("INFO5-SMASH running in DEBUG MODE. DEBUG TOOLS ARE AVAIL.")
    canvas.addEventListener('mousedown', function(e) {
        getCursorPosition(canvas, e)
    })
}

/**
 * Loads a stage in the game
 * @param {Object} areaContainer Objet containing the standard layout and parameters of a given area
 * @param {HTMLElement} targetCanvas Object containing the HTML Canvas element
 */
 function loadStage(areaContainer, targetCanvas = canvas) {
    activeArea = areaContainer
    targetCanvas.style.backgroundImage = `url(${areaContainer.bgPath})`
}


function main() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    for (let i = 0; i < activeArea.platforms.length; i++) {
        //ctx.fillRect(activeArea.platforms[i].x,activeArea.platforms[i].y,activeArea.platforms[i].w,activeArea.platforms[i].h)
        for (let j = 0; j < activeArea.players.length; j++) {
            handleCollision(activeArea.players[j], activeArea.platforms[i])
        }
    }
    player1.draw(ctx)
    player1.handleMovement()
    player2.draw(ctx)
    player2.handleMovement()
    requestAnimationFrame(main)

}
main()