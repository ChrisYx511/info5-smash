export const canvas = document.createElement("canvas")
export const ctx = canvas.getContext("2d")
export const gameContainerMainCanvas = document.getElementById("gameContainerMainCanvas")

export function createCanvas() {
    canvas.setAttribute("id", "mainCanvas");
    gameContainerMainCanvas.appendChild(canvas)
    canvas.width = 1280
    canvas.height = 720
    canvas.style.margin = "auto"
    canvas.style.backgroundRepeat = "no-repeat"
    canvas.style.backgroundSize = "cover"
    canvas.style.position = "absolute"
}
