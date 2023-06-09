import Player from "./player.js"

function getImage(src) {
    let img = new Image()
    img.src = src
    return img
}

export class Kirby extends Player {
    position = {
        x: 500,
        y:  0,
        w:  90,
        h:  85,
        direction: "right",
        inAir: false
    }
    sprites = {
        left: getImage("assets/characterSprites/kirby/kirby-left.PNG"),
        right: getImage("assets/characterSprites/kirby/kirby-right.PNG"),
        runLeft: getImage("assets/characterSprites/kirby/kirby-jumpLeft.PNG"),
        runRight: getImage("assets/characterSprites/kirby/kirby-jumpRight.PNG"),
        jabLeft: getImage("assets/characterSprites/kirby/kirby-jabLeft.PNG"),
        jabRight: getImage("assets/characterSprites/kirby/kirby-jabRight.PNG"),
        specialLeft: getImage("assets/characterSprites/kirby/kirby-specialLeft.PNG"),
        specialRight: getImage("assets/characterSprites/kirby/kirby-specialRight.PNG"),
        //jumpLeft: getImage("assets/characterSprites/kirby/kirby-jumpLeft.PNG"),
        //jumpRight: getImage("assets/characterSprites/kirby/kirby-jumpRight.PNG"),
        active: "left"
    }
    hitbox = {
        jab: [
            {
            x: this.position.x + this.position.w/2,
            y: this.position.y + this.position.h/2,
            xOffset: 0,
            yOffset:0,
            r: 20,
            dmg: 3,
            active : false
        }
    ],
        special: [
            {
            x: this.position.x + this.position.w/2,
            y: this.position.y + this.position.h/2,
            xOffset: 0,
            yOffset: 0,
            r: 30,
            dmg: 7,
            active: false
        }
    ]
    }
    characterMaxSpeed = 5
    maxJumpCount= 6
    mass = 3
}

export class Sanic extends Player {
    position = {
        x: 500,
        y:  0,
        w:  110,
        h:  90,
        direction: "left",
        inAir: false
    }
    sprites = {
        left: getImage("assets/characterSprites/sanic/sanic-left.png"),
        right: getImage("assets/characterSprites/sanic/sanic-right.PNG"),
        runLeft: getImage("assets/characterSprites/sanic/sanic-runLeft.PNG"),
        runRight: getImage("assets/characterSprites/sanic/sanic-runRight.PNG"),
        jabLeft: getImage("assets/characterSprites/sanic/sanic-jabLeft.PNG"),
        jabRight: getImage("assets/characterSprites/sanic/sanic-jabRight.PNG"),
        specialLeft: getImage("assets/characterSprites/sanic/sanic-specialLeft.PNG"),
        specialRight: getImage("assets/characterSprites/sanic/sanic-specialRight.PNG"),
        active: "left"
    }
    hitbox = {
        jab: [
        {
            x: this.position.x + this.position.w/2,
            y: this.position.y + this.position.h/2,
            xOffset: -10,
            yOffset:0,
            r: 20,
            dmg: 3,
            active : false
        }
        ],
        special: [
            {
                x: this.position.x + this.position.w/2,
                y: this.position.y + this.position.h/2,
                xOffset: -50,
                yOffset: 0,
                r: 45,
                dmg: 7,
                active: false
            }
        ]
    }
    hurtbox = {
        x: this.position.x + this.position.w/2,
        y: this.position.y + this.position.h/2,
        r: 32
    }
    characterMaxSpeed = 6
    maxJumpCount = 2
    mass = 3
}

export class Lonk extends Player {
    position = {
        x: 500,
        y:  0,
        w:  100,
        h:  120,
        direction: "left",
        inAir: false
    }
    sprites = {
        left: getImage("assets/characterSprites/lonk/lonk-left.PNG"),
        right: getImage("assets/characterSprites/lonk/lonk-right.PNG"),
        runLeft: getImage("assets/characterSprites/lonk/lonk-runLeft.PNG"),
        runRight: getImage("assets/characterSprites/lonk/lonk-runRight.PNG"),
        jabLeft: getImage("assets/characterSprites/lonk/lonk-jabLeft.PNG"),
        jabRight: getImage("assets/characterSprites/lonk/lonk-jabRight.PNG"),
        specialLeft: getImage("assets/characterSprites/lonk/lonk-specialLeft.PNG"),
        specialRight: getImage("assets/characterSprites/lonk/lonk-specialRight.PNG"),
        active: "left"
    }
    hitbox = {
        jab: [
        {
            x: this.position.x + this.position.w/2,
            y: this.position.y + this.position.h/2,
            xOffset: -15,
            yOffset:0,
            r: 15,
            dmg: 1,
            active : false
        },
        {
            x: this.position.x + this.position.w/2,
            y: this.position.y + this.position.h/2,
            xOffset: 0,
            yOffset:0,
            r: 15,
            dmg: 4,
            active : false
        }
        ],
        special: [
            {
                x: this.position.x + this.position.w/2,
                y: this.position.y + this.position.h/2,
                xOffset: -50,
                yOffset: 0,
                r: 50,
                dmg: 10,
                active: false
            },
        ]
    }
    hurtbox = {
        x: this.position.x + this.position.w/2,
        y: this.position.y + this.position.h/2,
        r: 22
    }
    characterMaxSpeed = 4
    maxJumpCount = 2
    mass = 4
}

export class Crewmate extends Player {
    position = {
        x: 500,
        y:  0,
        w:  95,
        h:  95,
        direction: "left",
        inAir: false
    }
    sprites =  {
        left: getImage("assets/characterSprites/crewmate/crewmate-left.PNG"),
        right: getImage("assets/characterSprites/crewmate/crewmate-right.PNG"),
        runLeft: getImage("assets/characterSprites/crewmate/crewmate-runLeft.PNG"),
        runRight: getImage("assets/characterSprites/crewmate/crewmate-runRight.PNG"),
        jabLeft: getImage("assets/characterSprites/crewmate/crewmate-jabLeft.PNG"),
        jabRight: getImage("assets/characterSprites/crewmate/crewmate-jabRight.PNG"),
        specialLeft: getImage("assets/characterSprites/crewmate/crewmate-specialLeft.PNG"),
        specialRight: getImage("assets/characterSprites/crewmate/crewmate-specialRight.PNG"),
        active: "left"
    }
    hitbox = {
        jab: [
            {
                x: this.position.x + this.position.w/2,
                y: this.position.y + this.position.h/2,
                xOffset: 0,
                yOffset: 20,
                r: 25,
                dmg: 3,
                active : false
                }
            ],
            special: [
                {
                x: this.position.x + this.position.w/2,
                y: this.position.y + this.position.h/2,
                xOffset: -30,
                yOffset: 10,
                r: 20,
                dmg: 2,
                active: false
            },
            {
                x: this.position.x + this.position.w/2,
                y: this.position.y + this.position.h/2,
                xOffset: 0,
                yOffset: 25,
                r: 15,
                dmg: 9,
                active: false
            }
        ]
    } 
    hurtbox = {
        x: this.position.x + this.position.w/2,
        y: this.position.y + this.position.h/2,
        r: 35
    }
    characterMaxSpeed = 5
    maxJumpCount = 3
    mass = 3
}

export class Sans extends Player {
    position = {
        x: 500,
        y:  0,
        w:  95,
        h:  100,
        direction: "left",
        inAir: false
    }
    sprites = {
        left: getImage("assets/characterSprites/sans/sans-left.PNG"),
        right: getImage("assets/characterSprites/sans/sans-right.PNG"),
        runLeft: getImage("assets/characterSprites/sans/sans-runLeft.PNG"),
        runRight: getImage("assets/characterSprites/sans/sans-runRight.PNG"),
        jabLeft: getImage("assets/characterSprites/sans/sans-jabLeft.PNG"),
        jabRight: getImage("assets/characterSprites/sans/sans-jabRight.PNG"),
        specialLeft: getImage("assets/characterSprites/sans/sans-specialLeft.PNG"),
        specialRight: getImage("assets/characterSprites/sans/sans-specialRight.PNG"),
        jump: getImage(""),
        active: "left"
    }
    hitbox = {
        jab: [
            {
                x: this.position.x + this.position.w/2,
                y: this.position.y + this.position.h/2,
                xOffset: -10,
                yOffset: -10,
                r: 15,
                dmg: 3,
                active : false
                },
            {
                x: this.position.x + this.position.w/2,
                y: this.position.y + this.position.h/2,
                xOffset: -10,
                yOffset: -35,
                r: 15,
                dmg: 3,
                active : false
                }
            ],
            special: [
                {
                x: this.position.x + this.position.w/2,
                y: this.position.y + this.position.h/2,
                xOffset: -25,
                yOffset: -15,
                r: 25,
                dmg: 2,
                active: false
            },
            {
                x: this.position.x + this.position.w/2,
                y: this.position.y + this.position.h/2,
                xOffset: 10,
                yOffset: -15,
                r: 20,
                dmg: 18,
                active: false
            }
        ]
    }
    hurtbox = {
        x: this.position.x + this.position.w/2,
        y: this.position.y + this.position.h/2,
        r: 28
    }
    characterMaxSpeed = 6
    maxJumpCount = 2
    mass = 2
}

export class Bowser extends Player {
    position = {
        x: 500,
        y:  0,
        w:  130,
        h:  130,
        direction: "left",
        inAir: false
    }
    sprites = {
        left: getImage("assets/characterSprites/bowser64/bowser-left.PNG"),
        right: getImage("assets/characterSprites/bowser64/bowser-right.PNG"),
        runLeft: getImage("assets/characterSprites/bowser64/bowser-runLeft.PNG"),
        runRight: getImage("assets/characterSprites/bowser64/bowser-runRight.PNG"),
        jabLeft: getImage("assets/characterSprites/bowser64/bowser-jabLeft.PNG"),
        jabRight: getImage("assets/characterSprites/bowser64/bowser-jabRight.PNG"), 
        specialLeft: getImage("assets/characterSprites/bowser64/bowser-specialLeft.PNG"),
        specialRight: getImage("assets/characterSprites/bowser64/bowser-specialRight.PNG"),
        active: "left"
    }
    hitbox = {
        jab: [
            {
                x: this.position.x + this.position.w/2,
                y: this.position.y + this.position.h/2,
                xOffset: -10,
                yOffset: -10,
                r: 25,
                dmg: 5,
                active : false
                }
            ],
            special: [
                {
                x: this.position.x + this.position.w/2,
                y: this.position.y + this.position.h/2,
                xOffset: -15,
                yOffset: -20,
                r: 40,
                dmg: 10,
                active: false
            }
        ]
    } 
    hurtbox = {
        x: this.position.x + this.position.w/2,
        y: this.position.y + this.position.h/2,
        r: 42
    }
    characterMaxSpeed = 3
    maxJumpCount = 2
    mass = 5
}