export const canvas = document.createElement("canvas")
export const ctx = canvas.getContext("2d")

export function createCanvas() {
    canvas.setAttribute("id", "mainCanvas");
    document.body.prepend(canvas)
    canvas.width = 1280
    canvas.height = 720
    canvas.style.backgroundColor = "lightblue"
    canvas.style.border = "2px black solid"
    canvas.style.display = "block"
    canvas.style.margin = "auto"
    canvas.style.backgroundRepeat = "no-repeat"
    canvas.style.backgroundSize = "cover"

}
