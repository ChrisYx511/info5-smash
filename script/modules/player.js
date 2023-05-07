// Super Smash eachother in the ass Brothers
// Player Definition

export let keysDown = []
export let keysBlocked = []
export const controlSets = [
    {
        up: "ArrowUp",
        down: "ArrowDown",
        left: "ArrowLeft",
        right: "ArrowRight"
    },
    {
        up: "w",
        down: "s",
        left: "a",
        right: "d"
    }
]
export const physicalConstants = {
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
    if (pos.y + pos.h >= 720) {
        moveY.speed = 0
        pos.y = 720 - pos.h
        moveY.jumpCount = 0
    }

}

export default class Player {
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
        accel: 0,
        jumpCount: 0
    }
    mass = 10
    characterMaxSpeed = 5
    percentage =  0
    maxJumpCount = 5
    controlSetNumber = 0
    handleMovement() {
        const self = this
        if(controlSets[self.controlSetNumber].left in keysDown) {
            if (self.movementX.speed <= -self.characterMaxSpeed) {
                self.movementX.accel = -physicalConstants.x_deceleration
            } else {
                self.movementX.accel = -0.8
            }
            
        } else if(controlSets[self.controlSetNumber].right in keysDown) {
            if (self.movementX.speed >= self.characterMaxSpeed) {
                self.movementX.accel = physicalConstants.x_deceleration
            } else {
                self.movementX.accel = 0.8
            }
        } else {
            self.movementX.accel = 0
        }        
        if (controlSets[self.controlSetNumber].up in keysDown) {
            if (typeof keysBlocked[controlSets[self.controlSetNumber].up] === 'undefined' && self.movementY.jumpCount < self.maxJumpCount) {
                self.movementY.speed = -6.5
                self.movementY.jumpCount++
            } 
            keysBlocked[controlSets[self.controlSetNumber].up] = true
        }

        getNewXPos(self.position, self.movementX)
        getNewYPos(self.position, self.movementY)

    
        
    }
    draw(contextObject, color = undefined) {
        let x = this.position.x
        let y = this.position.y
        let w = this.position.w
        let h = this.position.h
        if (color !== undefined) {
            contextObject.fillStyle = color
        }
        contextObject.fillRect(x, y, w, h)
    }
}