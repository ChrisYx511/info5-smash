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
        direction: "left",
        inAir: false
    }
    sprites = {
        std: getImage("assets/KDCol_Kirby_KDL.webp"),
    }
    characterMaxSpeed = 5
    
}

export class Sonic extends Player {
    sprites = {
        std: getImage("")
    }
}