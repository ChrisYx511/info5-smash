function getVideo(src) {
    let video = document.createElement('video')
    video.src = src
    video.width = 1280
    video.height = 720
    video.style.position = "absolute"
    video.loop = true
    return video
}

export const battlefield = {
    name: "Battlefield",
    bgPath: "./assets/SSBB_Battlefield_Stage.webp",
    music: new Audio("./assets/sound/music/battlefield.webm"),
    platforms: [
        {
            x: 192,
            y:484,
            w: 900,
            h: 30,
            basePlatform: true
        },
        {
            x: 209,
            y:514,
            w: 850,
            h: 20,
            basePlatform: true
        },
        {
            x: 227,
            y:534,
            w: 820,
            h: 20,
            basePlatform: true
        },
        {
            x: 250,
            y:554,
            w: 770,
            h: 20,
            basePlatform: true
        },
        {
            x: 284,
            y:574,
            w: 720,
            h: 10,
            basePlatform: true
        },
        {
            x: 336,
            y:584,
            w: 570,
            h: 20,
            basePlatform: true
        },
        {
            x: 527,
            y: 604,
            w: 350,
            h: 40,
            basePlatform: true
        },
        {
            x: 305,
            y: 345,
            w: 195,
            h: 15,
            basePlatform: false
        },
        {
            x: 783,
            y: 345,
            w: 195,
            h: 15,
            basePlatform: false
        },        {
            x: 543,
            y: 215,
            w: 195,
            h: 15,
            basePlatform: false
        },
    ],
    players: []
}

export const finaldestination = {
    name: "Final Destination",
    bgPath: "./assets/SSBB_Battlefield_Stage.webp",
    hasVideoBg: true,
    bgVideo: getVideo("./assets/bg/finalDestination/fdVideoBg.webm"),
    platforms: [
        {
            x: 239,
            y:444,
            w: 776,
            h: 20,
            basePlatform: true
        },
        {
            x: 263,
            y:464,
            w: 720,
            h: 20,
            basePlatform: true
        },
        {
            x: 303,
            y:484,
            w: 640,
            h: 20,
            basePlatform: true
        },
        {
            x: 328,
            y:504,
            w: 600,
            h: 40,
            basePlatform: true
        },
        {
            x: 378,
            y:544,
            w: 500,
            h: 30,
            basePlatform: true
        },
        {
            x: 368,
            y:574,
            w: 520,
            h: 40,
            basePlatform: true
        },

    ],
    players: []
}
