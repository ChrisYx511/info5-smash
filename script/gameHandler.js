


class Player {
    x =  0
    y =  0
    w =  70
    h =  85
    speed =  6
    health =  10
    collisionObject(wall) {
        let self = this
            if (!collision(self, wall)) {
                return null
            }
            if ("ArrowLeft" in keysDown || "ArrowRight" in keysDown) {
                if (self.x < wall.x + self.w/2){
                    self.x-=self.speed
                } else {
                    self.x+=self.speed
                }
            }	
            if ("ArrowUp" in keysDown || "ArrowDown" in keysDown) {
                if (self.y < wall.y + wall.h/2){
                    self.y-=self.speed
                } else {
                    self.y+=self.speed
            }
        }   
    }
    handleMovement(canvasObject = canvas, contextObject = ctx) {
        let self = this
        if("ArrowLeft" in keysDown && self.x > 0) {
            self.x-=self.speed
        }
        if("ArrowRight" in keysDown && self.x+self.w < canvasObject.width) {
            self.x += self.speed
        }
    
        if("ArrowUp" in keysDown && self.y > 0) {
            self.y -= self.speed
        }
        if("ArrowDown" in keysDown && self.y + self.h < canvasObject.height) {
            self.y += self.speed
        }
        // Collide with invisible objects
        for (let i = 0; i < activeArea.layout.length; i++) {
            if (!activeArea.layout[i]) {
                return null
            }
            if (activeArea.layout[i] && activeArea.layout[i].hide) {
                continue;
            }
            if ("oncontact" in activeArea.layout[i] && collision(self,activeArea.layout[i]) && !activeArea.layout[i].hasMadeContact) {
                activeArea.layout[i].hasMadeContact = true
                activeArea.layout[i].oncontact(activeArea.layout[i])
            }
            if (activeArea.layout[i] && activeArea.layout[i].sprite) {
                contextObject.drawImage(activeArea.layout[i].sprite, activeArea.layout[i].x, activeArea.layout[i].y, activeArea.layout[i].w, activeArea.layout[i].h)
            }
            if (activeArea.layout[i] && activeArea.layout[i].nocollide == true) {
                continue;
            }
            self.collisionObject(activeArea.layout[i])
            if (!collision(self,activeArea.layout[i])) {
                if (!activeArea.layout[i]) {
                    return null
                }
                activeArea.layout[i].hasMadeContact = false
            }
        } 
    }
    draw(contextObject = ctx) {
        let x = this.x
        let y = this.y
        let w = this.w
        let h = this.h
        contextObject.drawImage(characterSprites.mcBoy, x, y, w, h)
    }
}






const player1 = new Player
