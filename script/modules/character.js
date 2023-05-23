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
//        smash: getImage(""),
        active: "std"
    }
    hitbox = {
        jab: [{
            x: this.position.x + this.position.w/2,
            y: this.position.y + this.position.h/2,
            xOffset: 0,
            yOffset:0,
            r: 25,
            dmg: 3,
            active : false
        }],
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
        std: getImage("assets/sanic.png")
    }
    characterMaxSpeed = 10
    maxJumpCount = 2
}

export class Lonk extends Player {
    position = {
        x: 500,
        y:  0,
        w:  85,
        h:  110,
        direction: "left",
        inAir: false
    }
    sprites = {
        std: getImage("assets/KDCol_Kirby_KDL.webp")
    }
    hurtbox = {
        x: this.position.x + this.position.w/2,
        y: this.position.y + this.position.h/2,
        r: 35
    }
    characterMaxSpeed = 3
    maxJumpCount = 2
}