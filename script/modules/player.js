// Super Smash eachother in the ass Brothers
// Player Definition

export let keysDown = []
export let keysBlocked = []
export const controlSets = [
    {
        up: "ArrowUp",
        down: "ArrowDown",
        left: "ArrowLeft",
        right: "ArrowRight",
        attack: ",",
        special: "."
    },
    {
        up: "w",
        down: "s",
        left: "a",
        right: "d",
        attack: "g",
        special: "h"
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
}

export default class Player {
    position = {
        x: 500,
        y:  0,
        w:  70,
        h:  85,
        direction: "left",
        inAir: false
    }

    movementX = {
        speed: 0,
        accel: 0

    }

    sprites = {
    }

    movementY = {
        speed: 0,
        accel: 0,
        jumpCount: 0
    }

    hitbox = {
        jab: {
            x: this.position.x + this.position.w/2,
            y: this.position.y + this.position.h/2,
            r: 25,
            dmg: 3,
            active: false
        },
        special: {
            x: this.position.x + this.position.w/2,
            y: this.position.y + this.position.h/2,
            r: 45,
            dmg: 15,
            active: false
        }
    }

    hurtbox = {
        x: this.position.x + this.position.w/2,
        y: this.position.y + this.position.h/2,
        r: this.position.w/2
    }

    totalStocks = 3
    stocksLost = 0
    mass = 10
    characterMaxSpeed = 5
    percentage =  0
    maxJumpCount = 3
    controlSetNumber = 0
    handleMovement(canvas) {
        const self = this
        if (controlSets[self.controlSetNumber].up in keysDown) {
            if (typeof keysBlocked[controlSets[self.controlSetNumber].up] === 'undefined' && self.movementY.jumpCount < self.maxJumpCount) {
                self.movementY.speed = -5.5
                self.movementY.jumpCount++
            } 
            keysBlocked[controlSets[self.controlSetNumber].up] = true
        }
        getNewXPos(self.position, self.movementX)
        getNewYPos(self.position, self.movementY)
        if(controlSets[self.controlSetNumber].left in keysDown) {
            if (self.movementX.speed <= -self.characterMaxSpeed) {
                self.movementX.accel = -physicalConstants.x_deceleration
            } else {
                self.movementX.accel = -0.6
            }
            self.position.direction = "left"
        } else if(controlSets[self.controlSetNumber].right in keysDown) {
            if (self.movementX.speed >= self.characterMaxSpeed) {
                self.movementX.accel = physicalConstants.x_deceleration
            } else {
                self.movementX.accel = 0.6
            }
            self.position.direction = "right"
        } else {
            self.movementX.accel = 0
        }        

        if (self.position.x + self.position.w < 0 || self.position.x > canvas.width) {
            self.position.x = 600
            self.position.y = 35
            self.percentage = 0
            self.movementY.speed = 0
            self.movementX.speed = 0
            self.stocksLost++
            console.log(self.totalStocks)
            console.log(self.stocksLost)
        }

        if (self.position.y + self.position.h < 0 || self.position.y > canvas.width) {
            self.position.x = 600
            self.position.y = 35
            self.percentage = 0
            self.movementY.speed = 0
            self.movementX.speed = 0
            self.stocksLost++
        }
    }

    handleHitboxes(){
        const self = this
        for (let move in self.hitbox) {
            if (self.position.direction == "left") {
                self.hitbox[move].x = self.position.x
            } else if (self.position.direction == "right") {
                self.hitbox[move].x = self.position.x + self.position.w
            }
            self.hitbox[move].y = self.position.y + self.position.h/2
            //console.log(self.hitbox[move])
        }
        self.hurtbox.x = self.position.x + self.position.w/2
        self.hurtbox.y = self.position.y + self.position.h/2
        if(controlSets[self.controlSetNumber].attack in keysDown) {
            if (typeof keysBlocked[controlSets[self.controlSetNumber].attack] === 'undefined') {
                self.hitbox.jab.active = true
                setTimeout(() => {
                    self.hitbox.jab.active = false
                }, 100)
            } 
            keysBlocked[controlSets[self.controlSetNumber].attack] = true
        } else {
            delete keysBlocked[controlSets[self.controlSetNumber].attack]
            self.hitbox.jab.active = false
        }
        if(controlSets[self.controlSetNumber].special in keysDown) {
            if (typeof keysBlocked[controlSets[self.controlSetNumber].special] === 'undefined') {
                self.hitbox.special.active = true
                setTimeout(() => {
                    self.hitbox.special.active = false
                }, 200)
            } 
            keysBlocked[controlSets[self.controlSetNumber].special] = true
        } else {
            delete keysBlocked[controlSets[self.controlSetNumber].special]
            self.hitbox.special.active = false
        }
    }

    draw(contextObject, color = undefined) {
        const self = this
        let x = this.position.x
        let y = this.position.y
        let w = this.position.w
        let h = this.position.h
        if (color !== undefined) {
            contextObject.fillStyle = color
        }
        if (self.sprites.std !== undefined) {
            contextObject.drawImage(self.sprites.std, x, y, w, h)

        } else {contextObject.fillRect(x, y, w, h)}
        contextObject.strokeStyle = "yellow"
        contextObject.beginPath()
        contextObject.arc(self.hurtbox.x, self.hurtbox.y, self.hurtbox.r, 0, Math.PI*2, true)
        contextObject.stroke()
        contextObject.fillStyle="black"
        for (let move in self.hitbox) {
            //console.log(self.hitbox[move])
            if (!self.hitbox[move].active) {
                contextObject.fillStyle="black"
                continue;
            }
            contextObject.fillStyle = "red"
            contextObject.beginPath()
            contextObject.arc(self.hitbox[move].x, self.hitbox[move].y, self.hitbox[move].r, 0, Math.PI*2, true)
            contextObject.stroke()
            contextObject.fill()
            contextObject.fillStyle="black"
        }
    }
}