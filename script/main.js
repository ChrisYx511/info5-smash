// Super Smash eachother in the ass Brothers - Chris YANG et Felix WU
// Concentration Informatique - 2023-03-31


const canvas = document.createElement("canvas")
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
let keysDown = {}
let keysBlocked = false

let activeStage = {}
canvas.style.backgroundRepeat = "no-repeat"
canvas.style.backgroundSize = "cover"


ctx.fillRect(50,50,69,69)
let deez = 0

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}
if (debugMode) {
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
    activeStage = areaContainer
    targetCanvas.style.backgroundImage = `url(${areaContainer.bgPath})`
}

/**
 * Collision between objects
 * @param {Object} objet1 
 * @param {Object} objet2 
 * @returns 
 */
 function collision(objet1 = null, objet2 = null){
    if (!objet1 || !objet2) {
        return null
    }
	if (objet1.x + objet1.w >= objet2.x &&
        objet1.x <= objet2.x + objet2.w && 
        objet1.y + objet1.h >= objet2.y && 
        objet1.y <= objet2.y + objet2.h) {
		return true
	}
}

loadStage(battefield)

function main() {
    for (let i = 0; i < activeStage.basePlatforms.length; i++) {
        ctx.fillRect(activeStage.basePlatforms[i].x,activeStage.basePlatforms[i].y,activeStage.basePlatforms[i].w,activeStage.basePlatforms[i].h)
    }
    ctx.fillRect(50,50,69,69)

    requestAnimationFrame(main)

}

main()