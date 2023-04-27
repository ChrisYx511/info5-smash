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
    keysDown[e.key] = true
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
const physicalConstants = {
    x_deceleration: 0.2, 
    y_gravity: 0.198
}

function getNewXPos(pos, moveX, constants = physicalConstants) {
    moveX.speed += moveX.accel
    pos.x += moveX.speed
    if ((moveX.speed + constants.x_deceleration <= 0 )) {
        moveX.speed += constants.x_deceleration
        console.log(moveX)
    } else if ((moveX.speed - constants.x_deceleration >= 0)) {
        moveX.speed -= constants.x_deceleration
        console.log(moveX)
    } else {
        moveX.speed = 0
    }
    
}
function getNewYPos(pos, moveY, constants = physicalConstants) {
    moveY.speed += moveY.accel
    pos.y += moveY.speed
    moveY.speed += constants.y_gravity
    if (pos.y + pos.h >= canvas.height) {
        moveY.speed = 0
    }
}


//
class Player {
    position = {
        x: 500,
        y:  0,
        w:  70,
        h:  85
    }

    movementX = {
        speed: 0,
        accel: 0

    }

    movementY = {
        speed: 0,
        accel: 0
    }
    mass = 10
    characterMaxSpeed = 5
    percentage =  0

    handleMovement(canvasObject = canvas, contextObject = ctx) {
        const self = this
        if("ArrowLeft" in keysDown) {
            if (self.movementX.speed <= -self.characterMaxSpeed) {
                self.movementX.accel = -physicalConstants.x_deceleration
            } else {
                self.movementX.accel = -0.8
            }
            
            console.log(self.movementX)
        } else if("ArrowRight" in keysDown) {
            if (self.movementX.speed >= self.characterMaxSpeed) {
                self.movementX.accel = physicalConstants.x_deceleration
            } else {
                self.movementX.accel = 0.8
            }
            console.log(self.movementX)
        } else {
            self.movementX.accel = 0
        }


        getNewXPos(self.position, self.movementX)
        getNewYPos(self.position, self.movementY)

    
        
    }
    draw(contextObject = ctx) {
        let x = this.position.x
        let y = this.position.y
        let w = this.position.w
        let h = this.position.h
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