const wiiMenuVideo = document.querySelector("#gameContainerWiiMenu video")
const introVideo = document.querySelector('#gameContainerIntroVideo video')

function startWiiMenu() {
    document.getElementById('gameContainerWiiMenuSplash').style.display = 'none'
    document.getElementById('gameContainerWiiMenu').style.display = 'inherit'
    wiiMenuVideo.play()
    wiiMenuVideo.addEventListener("ended", ()=>{
        wiiMenuVideo.pause()
        wiiMenuVideo.style.display = "none"
    })
}

function loadIntroVideo() {
    document.getElementById('gameContainerWiiMenu').style.display = 'none'
    document.getElementById('gameContainerIntroVideo').style.display = 'inherit'
    introVideo.play()
    introVideo.addEventListener("ended", () => {
        introVideo.pause()
        introVideo.style.display = "none"
    })
}