export function decomposeVector(norme, orientationInRad) {
    return {
        x: norme*Math.cos(orientationInRad),
        y: norme*Math.sin(orientationInRad)
    }
}

/**
 * Collision between objects
 * @param {Object} objet1 
 * @param {Object} objet2 
 * @returns 
 */
export function collision(objet1 = null, objet2 = null){
    if (!objet1 || !objet2) {
        return null
    }
	if (objet1.x + objet1.w >= objet2.x &&
        objet1.x <= objet2.x + objet2.w && 
        objet1.y + objet1.h >= objet2.y && 
        objet1.y <= objet2.y + objet2.h) {
		return true
	}
}

export function hitboxCollision(hitbox1, hitbox2){
    let a = hitbox2.y - hitbox1.y
    let b = hitbox2.x - hitbox1.x
    let distance = Math.sqrt(a * a + b * b)
    let sumOfRadii = hitbox1.r + hitbox2.r 
    if (distance < sumOfRadii){
        return true
    }
    return false

}