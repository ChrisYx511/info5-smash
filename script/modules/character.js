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
        std: getImage("assets/KDCol_Kirby_KDL.webp"),
        left: getImage("assets/SSBB_Battlefield_Stage.webp"),
        right: getImage("assets/SSBB_Battlefield_Stage.webp"),
        jabLeft: getImage("assets/SSBB_Battlefield_Stage.webp"),
        jabRight: getImage("assets/SSBB_Battlefield_Stage.webp"),
        special: getImage(""),
        jump: getImage(""),
//        smash: getImage(""),
        active: "std"
    }
    hitbox = {
        jab: [
            {
            x: this.position.x + this.position.w/2,
            y: this.position.y + this.position.h/2,
            xOffset: 0,
            yOffset:0,
            r: 25,
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
            r: 35,
            dmg: 10,
            active: false
        },
        {
            x: this.position.x + this.position.w/2,
            y: this.position.y + this.position.h/2,
            xOffset: 60,
            yOffset: 20,
            r: 25,
            dmg: 10,
            active: false
        }
    ]
    }
    characterMaxSpeed = 5
    maxJumpCount= 6
    mass = 1
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
        std: getImage("assets/characterSprites/sanic/sanic-std.png"),
        left: getImage(""),
        right: getImage(""),
        jabLeft: getImage(""),
        jabRight: getImage(""),
        specialLeft: getImage(""),
        specialRight: getImage(""),
        jump: (""),
    }
    hurtbox = {
        x: this.position.x + this.position.w/2,
        y: this.position.y + this.position.h/2,
        r: 32
    }
    characterMaxSpeed = 10
    maxJumpCount = 2
    mass = 2
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
        std: getImage("assets/characterSprites/lonk/lonk-std.PNG"),
        left: getImage(""),
        right: getImage(""),
        jabLeft: getImage(""),
        jabRight: getImage(""),
        specialLeft: getImage(""),
        specialRight: getImage(""),
        jump: (""),
    }
    hitbox = {
        jab: [
        {
            x: this.position.x + this.position.w/2,
            y: this.position.y + this.position.h/2,
            xOffset: 0,
            yOffset:0,
            r: 15,
            dmg: 3,
            active : false
        },
        {
            x: this.position.x + this.position.w/2,
            y: this.position.y + this.position.h/2,
            xOffset: 30,
            yOffset:0,
            r: 15,
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
                r: 35,
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
    characterMaxSpeed = 3
    maxJumpCount = 2
    mass = 3
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
        std: getImage("assets/characterSprites/crewmate/crewmate-std.PNG"),
        left: getImage("assets/characterSprites/crewmate/crewmate-left.PNG"),
        right: getImage("assets/characterSprites/crewmate/crewmate-right.PNG"),
        jabLeft: getImage("assets/characterSprites/crewmate/crewmate-jabLeft.PNG"),
        jabRight: getImage("assets/characterSprites/crewmate/crewmate-jabRight.PNG"),
        specialLeft: getImage(""),
        specialRight: getImage(""),
        //jump: getImage(""),
        active: "std"
    }
    hitbox = {
        jab: [
            {
                x: this.position.x + this.position.w/2,
                y: this.position.y + this.position.h/2,
                xOffset: 0,
                yOffset:0,
                r: 25,
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
                r: 35,
                dmg: 10,
                active: false
            },
            {
                x: this.position.x + this.position.w/2,
                y: this.position.y + this.position.h/2,
                xOffset: 60,
                yOffset: 20,
                r: 25,
                dmg: 10,
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
    mass = 2
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
        std: getImage("assets/characterSprites/sans/sans-std.PNG"),
        left: getImage(""),
        right: getImage(""),
        jabLeft: getImage(""),
        jabRight: getImage(""),
        specialLeft: getImage(""),
        specialRight: getImage(""),
        jump: (""),
    }
    hurtbox = {
        x: this.position.x + this.position.w/2,
        y: this.position.y + this.position.h/2,
        r: 35
    }
    characterMaxSpeed = 3
    maxJumpCount = 2
    mass = 1
}