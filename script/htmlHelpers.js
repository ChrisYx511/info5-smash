const wiiMenuStartButton = document.getElementById("wiiMenuStartButton")
const gameContainerSplashMenu = document.getElementById('gameContainerSplashMenu')
const gameContainerBrawlMenu = document.getElementById("gameContainerBrawlMenu")
const gameContainerStageSelect = document.getElementById("gameContainerStageSelect")

const menuMusic = new Audio("./assets/sound/music/menu.m4a")

const wiiMenuVideo = document.querySelector("#gameContainerWiiMenu video")
const introVideo = document.querySelector('#gameContainerSplashMenu video')

let menuProgress = 0
let choosingPlayer = 0
let playerCharacterNames = []

const sfx = {
    startGame: new Audio("./assets/sound/sfx/StartGame.wav"),
    blastzone: new Audio("./assets/sound/sfx/blastzone.wav"),
    click: new Audio("./assets/sound/sfx/click.wav"),
    hover: new Audio("./assets/sound/sfx/hover.wav"),
    jabHit: new Audio("./assets/sound/sfx/jab-swing.wav"),
    jabSwing: new Audio("./assets/sound/sfx/jab-swing.wav"),
    specialHit: new Audio("./assets/sound/sfx/special-hit.wav"),
    specialSwing: new Audio("./assets/sound/sfx/special-swing.wav"),
    wiiClick: new Audio("assets/sound/sfx/wiiClick.wav")
}

const announcerVoices = {
    chooseYourCharacter: new Audio("./assets/sound/announcer/chooseYourCharacter.wav"),
    game: new Audio("./assets/sound/announcer/game.wav"),
    survival: new Audio("./assets/sound/announcer/survival.wav"),
}

function playSound(sound, volume = 0.5) {
    sound.volume = volume
    sound.play()
}

function startWiiMenu() {
    document.getElementById('gameContainerWiiMenuSplash').style.display = 'none'
    playSound(sfx.wiiClick)
    document.getElementById('gameContainerWiiMenu').style.display = 'inherit'
    wiiMenuVideo.play()
    wiiMenuStartButton.style.display = "none"
    setTimeout(() => {
        wiiMenuStartButton.style.display = "inherit"
    }, 4000)
    wiiMenuVideo.addEventListener("ended", ()=>{
        wiiMenuVideo.pause()
        wiiMenuVideo.style.display = "none"
    })
    menuProgress++
}
function loadIntroVideo() {
    menuProgress++
    document.getElementById('gameContainerWiiMenu').style.display = 'none'
    playSound(sfx.startGame)
    gameContainerSplashMenu.style.display = "inherit"
    const abortIntro = new AbortController
    setTimeout(() => {
        introVideo.play()
        gameContainerSplashMenu.addEventListener("click", () => {
            switch (menuProgress){
                case 2:
                    introVideo.pause()
                    introVideo.style.display = "none"
                    playSound(sfx.click)
                    menuProgress++
                    break;
                case 3: 
                    abortIntro.abort()
                    playSound(sfx.click)
                    loadMainMenu()
                    break;
            }
        }, {signal: abortIntro.signal})
        document.addEventListener("keydown", () => {
            switch (menuProgress){
                case 2:
                    introVideo.pause()
                    introVideo.style.display = "none"
                    playSound(sfx.click)
                    menuProgress++
                    break;
                case 3: 
                    abortIntro.abort()
                    playSound(sfx.click)

                    loadMainMenu()
                    break;
            }
        }, {signal: abortIntro.signal})
        introVideo.addEventListener("ended", () => {
            introVideo.pause()
            introVideo.style.display = "none"
        })
    })

}

const player1Box = document.getElementById("player1Box")
const player2Box = document.getElementById("player2Box")

function loadMainMenu() {
    gameContainerSplashMenu.style.display = "none"
    gameContainerBrawlMenu.style.display = "inherit"
    playSound(announcerVoices.chooseYourCharacter, 1)
    menuProgress++
    menuMusic.play()
    menuMusic.loop = true
    menuMusic.volume = 0.5
}

function changeCursor(cursor) {
    gameContainerBrawlMenu.style.cursor = `url(./assets/cursors/${cursor}.PNG), auto`
    playSound(sfx.click)
}

function loadStageSelect() {
    gameContainerBrawlMenu.style.display = "none"
    gameContainerStageSelect.style.display = "inherit"
    playSound(sfx.click)
    playSound(announcerVoices.survival, 1)
}

function skipToGame() {
    document.getElementById("gameContainerWiiMenuSplash").style.display = "none"
    loadStageSelect()
}

function defineCharacter(characterClass) {
    playerCharacterNames[choosingPlayer] = characterClass
    playSound(sfx.click)
    console.log(playerCharacterNames)
    switch (choosingPlayer) {
        case 0:
            document.getElementById("player1Box").style.backgroundImage = `url(./assets/characters/characterSelectSprites/${characterClass}.png)`
            break;
        case 1:
            document.getElementById("player2Box").style.backgroundImage = `url(./assets/characters/characterSelectSprites/${characterClass}.png)`
            break;
    }
    if (playerCharacterNames.length == 2 && !playerCharacterNames.includes(undefined)) {
        document.getElementById("readyToFight").style.display = "inherit"
    }
}
