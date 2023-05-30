// Super Smash eachother in the ass Brothers - Chris YANG et Felix WU
// Concentration Informatique - 2023-03-31

import * as characters from "./modules/character.js"
import Player,{ keysBlocked, keysDown } from "./modules/player.js"
import {canvas, ctx, createCanvas, gameContainerMainCanvas} from "./modules/canvas.js"
import * as stages from "./modules/stages.js"
import { hitboxCollision } from "./modules/helpers.js"

const battlefieldSelect = document.getElementById("battlefieldSelect")
const fdSelect = document.getElementById("fdSelect")
const gameContainerStageSelect = document.getElementById("gameContainerStageSelect")


battlefieldSelect.onmouseover = () => {
    gameContainerStageSelect.style.backgroundImage = "url(./assets/bg/stageSelect/battlefieldSelect.png)"
    playSound(sfx.hover)
}
fdSelect.onmouseover = () => {
    gameContainerStageSelect.style.backgroundImage = "url(./assets/bg/stageSelect/fdSelect.png)"
    playSound(sfx.hover)
}
battlefieldSelect.onclick = () => {
    createCanvas()
    loadStage(stages.battlefield)
    menuMusic.pause()
    stages.battlefield.music.play()
    stages.battlefield.music.volume = 0.5
    stages.battlefield.music.loop = true
    document.getElementById("gameContainerStageSelect").style.display = "none"
    gameContainerMainCanvas.style.display = "inherit"
    const player1 = new characters[playerCharacterNames[0]]
    const player2 = new characters[playerCharacterNames[1]]
    player2.position.x = 375
    player1.position.x = 845
    player2.controlSetNumber = 1
    activeArea.players.push(player1, player2)
    main()
}

fdSelect.onclick = () => {
    createCanvas()
    loadStage(stages.finaldestination)
    menuMusic.pause()
    document.getElementById("gameContainerStageSelect").style.display = "none"
    gameContainerMainCanvas.style.display = "inherit"
    const player1 = new characters[playerCharacterNames[0]]
    const player2 = new characters[playerCharacterNames[1]]
    player2.position.x = 375
    player1.position.x = 845
    player2.controlSetNumber = 1
    activeArea.players.push(player1, player2)
    main()
}



let debugMode = true

let gameOver = false

// Movement and player
let activeArea = {}

document.addEventListener("keydown", (e) => {
    keysDown[e.key] = true
    console.log(e.key)
})

document.addEventListener("keyup", (e) => {
    delete keysDown[e.key] 
    delete keysBlocked[e.key]
})





function handleAttacks(attackingPlayer, defendingPlayer) {
    for (let move in attackingPlayer.hitbox){
        if (!attackingPlayer.hitbox[move].active){
            continue;
        }
        console.log(move)
        if (hitboxCollision(attackingPlayer.hitbox[move], defendingPlayer.hurtbox)) {
            defendingPlayer.percentage += attackingPlayer.hitbox[move].dmg/6
            defendingPlayer.percentage = Math.round(defendingPlayer.percentage * 10) / 10
            switch (attackingPlayer.position.direction) {
                case "left":
                    defendingPlayer.movementX.accel = -0.2 * (defendingPlayer.percentage/20) - 0.9
                    console.log(defendingPlayer.movementX.accel )
                    setTimeout(() => {
                        defendingPlayer.movementX.accel = 0
                    }, 100)
                    break;
                case "right":
                    defendingPlayer.movementX.accel = 0.2 * (defendingPlayer.percentage/10)
                    setTimeout(() => {
                        defendingPlayer.movementX.accel = 0
                    }, 100)
                    break;
            }

            defendingPlayer.movementY.accel = -0.4
            setTimeout(() => {
                defendingPlayer.movementY.accel = 0
            }, 100)
            console.log(defendingPlayer.percentage)
            playSound(sfx.jabHit)
        } else {
            playSound(sfx.jabSwing)
        }
    }
}

function handleCollision(character, platform) {
    if ( character.position.x + character.position.w > platform.x &&
         character.position.x < platform.x + platform.w) {
        if ( character.position.y <= platform.y && character.position.y + character.position.h >= platform.y &&
             character.position.y + character.position.h <= platform.y + platform.h ) {
            character.movementY.speed = 0
            character.movementY.jumpCount = 0
            character.position.y = platform.y - character.position.h
        }
        if (character.position.y < platform.y && character.position.y + character.position.h > platform.y + platform.h &&
            character.position.x + character.position.w > platform.x + platform.w && platform.basePlatform === true) {
            if (character.movementY.speed < 0) {
                character.movementY.speed = -character.movementY.speed
            }
            if (character.movementX.speed < 0) {
                character.movementX.speed = -character.movementX.speed
            }
        }
        if (character.position.y < platform.y && character.position.y + character.position.h > platform.y + platform.h &&
            character.position.x < platform.x && platform.basePlatform === true) {
            if (character.movementY.speed < 0) {
                character.movementY.speed = -character.movementY.speed
            }
            if (character.movementX.speed > 0) {
                character.movementX.speed = -character.movementX.speed
            }
        }
        if ( character.position.y + character.position.h > platform.y + platform.h && character.position.y <= platform.y + platform.h &&
             platform.basePlatform === true) {
                if (character.movementY.speed < 0) {
                    character.movementY.speed = -character.movementY.speed
                }
        }
                
    }
}


function drawPercentages() {
    for (let i = 0; i < activeArea.players.length; i++) {
        let d = 30*i + 86
        ctx.font = "24px Arial"
        switch (i) {
            case 0:
                ctx.fillStyle = "red"
                break;
            case 1:
                ctx.fillStyle = "blue"
                break;
            default:
                ctx.fillStyle = "orange"
                break;
        }
        ctx.fillText(`Player ${(i + 1).toString()}: ${activeArea.players[i].percentage.toString()}% Stocks: ${(activeArea.players[i].totalStocks - activeArea.players[i].stocksLost).toString()}`, 1000, d)
        ctx.fillStyle = "black"
    }

}

function drawEndgame(){
    ctx.font = "350px Arial"
    ctx.fillStyle = "green"
    ctx.fillText("GAME", 140, 480)
    ctx.font = "50px Arial"
    ctx.fillText("(Click anywhere to reset...)", 200, 600)
}


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
    if (areaContainer.hasVideoBg) {
        document.getElementById("gameContainerMainCanvas").prepend(areaContainer.bgVideo)
        areaContainer.bgVideo.play()
        areaContainer.bgVideo.volume = 0.5
    } else {
        targetCanvas.style.backgroundImage = `url(${areaContainer.bgPath})`
    }
}

function handleGameOver(){
    for (let i = 0; i < activeArea.players.length; i++){
        if (activeArea.players[i].totalStocks === activeArea.players[i].stocksLost){
            gameOver = true
            console.log(gameOver)
            if (activeArea.hasVideoBg) {
                activeArea.bgVideo.pause()
            }
            playSound(announcerVoices.game, 1)
        }
    }
}

function main() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    for (let i = 0; i < activeArea.platforms.length; i++) {
        //ctx.fillRect(activeArea.platforms[i].x,activeArea.platforms[i].y,activeArea.platforms[i].w,activeArea.platforms[i].h)
        for (let j = 0; j < activeArea.players.length; j++) {
            handleCollision(activeArea.players[j], activeArea.platforms[i])
        }
    }

    for (let i = 0; i < activeArea.players.length; i++) {
        activeArea.players[i].handleHitboxes()  
        activeArea.players[i].draw(ctx)
        activeArea.players[i].handleMovement(canvas)
        
        for (let j = 0; j < activeArea.players.length; j++){
            if (i == j){
                continue;
            }
            handleAttacks(activeArea.players[i], activeArea.players[j])
        }
    } 
    drawPercentages()
    handleGameOver()
    if (gameOver == false){
        requestAnimationFrame(main)
    } else {
        drawEndgame()
        canvas.addEventListener("click", () => {
            location.reload()
        })
    }
    
}