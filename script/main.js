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
let keysDown = []
let keysBlocked = false

canvas.style.backgroundRepeat = "no-repeat"
canvas.style.backgroundSize = "cover"

document.addEventListener("keydown", (e) => {
    keysDown[e.key]=true
})

document.addEventListener("keyup", (e) => {
    delete keysDown[e.key] 
})

const battefield = {
    name: "Battlefield",
    bgPath: "./assets/SSBB_Battlefield_Stage.webp",
    basePlatforms: [
        {
            x: 192,
            y:484,
            w: 900,
            h: 70
        }
    ]
}

//
class Player {
    x =  500
    y =  0
    w =  70
    h =  85
    speedX =  6
    speedY = 0
    kinectics = {
        accelY: 0.1
    }
    percentage =  0
    jump 
    handleMovement(canvasObject = canvas, contextObject = ctx) {
        let self = this
        if("ArrowLeft" in keysDown && self.x > 0) {
            self.x -= self.speedX
            console.log("test")
        }

        if("ArrowRight" in keysDown && self.x+self.w < canvasObject.width) {
            self.x += self.speedX
        }
    
        if("ArrowUp" in keysDown && self.y > 0) {
            self.y -= 1
            self.speedY -= 1
        }

        if (self.y + self.h <= canvasObject.height) {
            self.speedY = self.speedY + self.kinectics.accelY

            self.y += self.speedY
        } else {
            self.y = canvasObject.height - self.h
            self.speedY = 0
        }
        
    }
    draw(contextObject = ctx) {
        let x = this.x
        let y = this.y
        let w = this.w
        let h = this.h
        contextObject.fillRect(x, y, w, h)
    }
}

const player1 = new Player
//
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
    activeArea = areaContainer
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
    ctx.clearRect(0,0, canvas.width, canvas.height)
    for (let i = 0; i < activeArea.basePlatforms.length; i++) {
        ctx.fillRect(activeArea.basePlatforms[i].x,activeArea.basePlatforms[i].y,activeArea.basePlatforms[i].w,activeArea.basePlatforms[i].h)
    }
    player1.draw(ctx)
    player1.handleMovement()
    requestAnimationFrame(main)

}
main()