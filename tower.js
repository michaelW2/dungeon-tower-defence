


class Tower {
    //contructs the tower
    constructor() {
        this.towerOffset = towerShootOffset
        towerShootOffset += 5
        this.x = squareSize * (gridX + 1) + squareSize / 2
        this.y = squareSize * (gridY + 1) + squareSize / 2
        this.range = windowWidth / 10
        this.r = windowWidth / 40
        initialArrowX = this.x
        initialArrowY = this.y
        this.upgradeCount = 0
    }
    //shows the tower as a brown ellipse
    show() {
        push()
        fill("brown")
        ellipse(this.x, this.y, this.r)
        pop()
    }

    // upgrades the tower
    upgrade() {


        if (this.upgradeCount < 3) {
            this.upgradeCount += 1
            currencyCount -= 50
            console.log("tower upgraded")

        }
    }



}