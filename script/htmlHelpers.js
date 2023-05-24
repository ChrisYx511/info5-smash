const wiiMenuStartButton = document.getElementById("wiiMenuStartButton")
const gameContainerSplashMenu = document.getElementById('gameContainerSplashMenu')
const gameContainerBrawlMenu = document.getElementById("gameContainerBrawlMenu")

const menuMusic = new Audio("./assets/sound/music/menu.m4a")

const wiiMenuVideo = document.querySelector("#gameContainerWiiMenu video")
const introVideo = document.querySelector('#gameContainerSplashMenu video')

let menuProgress = 0

function startWiiMenu() {
    document.getElementById('gameContainerWiiMenuSplash').style.display = 'none'
    document.getElementById('gameContainerWiiMenu').style.display = 'inherit'
    wiiMenuVideo.play()
    wiiMenuStartButton.style.display = "none"
    wiiMenuVideo.addEventListener("ended", ()=>{
        wiiMenuVideo.pause()
        wiiMenuVideo.style.display = "none"
        wiiMenuStartButton.style.display = "inherit"
    })
    menuProgress++
}

function loadIntroVideo() {
    menuProgress++
    document.getElementById('gameContainerWiiMenu').style.display = 'none'
    gameContainerSplashMenu.style.display = "inherit"
    const abortIntro = new AbortController
    setTimeout(() => {
        introVideo.play()
        gameContainerSplashMenu.addEventListener("click", () => {
            switch (menuProgress){
                case 2:
                    introVideo.pause()
                    introVideo.style.display = "none"
                    menuProgress++
                    break;
                case 3: 
                    abortIntro.abort()
                    loadMainMenu()
                    break;
            }
        }, {signal: abortIntro.signal})
        document.addEventListener("keydown", () => {
            switch (menuProgress){
                case 2:
                    introVideo.pause()
                    introVideo.style.display = "none"
                    menuProgress++
                    break;
                case 3: 
                    abortIntro.abort()
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

function loadMainMenu() {
    gameContainerSplashMenu.style.display = "none"
    gameContainerBrawlMenu.style.display = "inherit"
    menuProgress++
    menuMusic.play()
    menuMusic.loop = true
}