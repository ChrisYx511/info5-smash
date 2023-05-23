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
        jab: [{
            x: this.position.x + this.position.w/2,
            y: this.position.y + this.position.h/2,
            xOffset: 0,
            yOffset: 0,
            r: 25,
            dmg: 3,
            active: false
        }],
        special: [{
            x: this.position.x + this.position.w/2,
            y: this.position.y + this.position.h/2,
            xOffset: 0,
            yOffset: 0,
            r: 45,
            dmg: 15,
            active: false
        },
    
        ]
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
                self.movementY.speed = -6.5
                self.movementY.jumpCount++
            } 
            keysBlocked[controlSets[self.controlSetNumber].up] = true
        }
        getNewXPos(self.position, self.movementX)
        getNewYPos(self.position, self.movementY)
        if(controlSets[self.controlSetNumber].left in keysDown) {
            if (self.movementX.speed <= -self.characterMaxSpeed) {
                self.movementX.accel = -physicalConstants.x_deceleration
            } else if (self.position.inAir) {
                self.movementX.accel = -0.2
            } else {
                self.movementX.accel = -0.8
            }
            self.position.direction = "left"
            self.sprites.active = "left"
        } else if(controlSets[self.controlSetNumber].right in keysDown) {
            if (self.movementX.speed >= self.characterMaxSpeed) {
                self.movementX.accel = physicalConstants.x_deceleration
            } else if (self.position.inAir) {
                self.movementX.accel = 0.2
            } else {
                self.movementX.accel = 0.8
            }
            self.position.direction = "right"
            self.sprites.active = "right"
        } else {
            self.movementX.accel = 0
            self.sprites.active = "std"
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
            for (let i = 0; i < self.hitbox[move].length; i++) {
                if (self.position.direction == "left") {
                    self.hitbox[move][i].x = self.position.x - self.hitbox[move][i].xOffset
                } else if (self.position.direction == "right") {
                    self.hitbox[move][i].x = self.position.x + self.position.w + self.hitbox[move][i].xOffset
                }
                self.hitbox[move][i].y = self.position.y + self.position.h/2 - self.hitbox[move][i].yOffset    
            }
            //console.log(self.hitbox[move])
        }
        self.hurtbox.x = self.position.x + self.position.w/2
        self.hurtbox.y = self.position.y + self.position.h/2
        if(controlSets[self.controlSetNumber].attack in keysDown) {
            if (typeof keysBlocked[controlSets[self.controlSetNumber].attack] === 'undefined') {
                for (let i = 0; i < self.hitbox.jab.length; i++) {
                    self.hitbox.jab[i].active = true
                    switch (self.position.direction) {
                        case "left":
                            self.sprites.active = "jabLeft"
                            break;
                        case "right":
                            self.sprites.active = "jabRight"
                            break;
                    }
                    setTimeout(() => {
                        self.hitbox.jab[i].active = false
                        self.sprites.active = "std"
                    }, 100)
                }
            } 
            keysBlocked[controlSets[self.controlSetNumber].attack] = true
        } else {
            delete keysBlocked[controlSets[self.controlSetNumber].attack]
            for (let i = 0; i < self.hitbox.jab.length; i++) {
                self.hitbox.jab[i].active = false
            }
        }

        if(controlSets[self.controlSetNumber].special in keysDown) {
            if (typeof keysBlocked[controlSets[self.controlSetNumber].special] === 'undefined') {
                for (let i = 0; i < self.hitbox.special.length; i++) {
                    self.hitbox.special[i].active = true
                    setTimeout(() => {
                        self.hitbox.special[i].active = false
                    }, 200)
                }
            } 
            keysBlocked[controlSets[self.controlSetNumber].special] = true
        } else {
            delete keysBlocked[controlSets[self.controlSetNumber].special]
            for (let i = 0; i < self.hitbox.special.length; i++) {
                self.hitbox.special[i].active = false
            }
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
        if (self.sprites[self.sprites.active] !== undefined) {
            contextObject.drawImage(self.sprites[self.sprites.active], x, y, w, h)

        } else {contextObject.fillRect(x, y, w, h)}
        contextObject.strokeStyle = "yellow"
        contextObject.beginPath()
        contextObject.arc(self.hurtbox.x, self.hurtbox.y, self.hurtbox.r, 0, Math.PI*2, true)
        contextObject.stroke()
        contextObject.fillStyle="black"
        for (let move in self.hitbox) {
            //console.log(self.hitbox[move])
            for (let i = 0; i < self.hitbox[move].length; i++) {
                console.log(self.hitbox[move][i])
                if (!self.hitbox[move][i].active) {
                    contextObject.fillStyle="black"
                    continue;
                }
                contextObject.fillStyle = "red"
                contextObject.beginPath()
                contextObject.arc(self.hitbox[move][i].x, self.hitbox[move][i].y, self.hitbox[move][i].r, 0, Math.PI*2, true)
                contextObject.stroke()
                contextObject.fill()
                contextObject.fillStyle="black"
            }

        }
    }
}