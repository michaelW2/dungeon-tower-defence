class Arrow {

    // the contstructor function
    constructor() {
        this.dmgRadius = squareSize / 10
        this.r = squareSize / 5
        this.vectorCreated = false

        this.x = initialArrowX
        this.y = initialArrowY
        console.log("arrow pushed")


    }


    // the show function
    show() {
        push()
        fill("green")
        ellipse(this.x, this.y, this.r)
        pop()
    }


    // the movement algorithm for arrows moving towards normal enemies
    moveToEnemy() {
        if (enemies.length != 0) {
            push()

            this.xComp = enemies[0].x - this.x
            this.yComp = enemies[0].y - this.y
            this.largerComp = sqrt(pow(this.xComp, 2) + pow(this.yComp, 2))
            this.xComp /= this.largerComp
            this.yComp /= this.largerComp
            this.veloX = this.xComp
            this.veloY = this.yComp
            this.angle = atan(this.yComp / this.xComp)
            this.rotation += this.angle
            rotate(this.rotation)
            this.x += this.xComp * (squareSize / 4)
            this.y += this.yComp * (squareSize / 4)

            pop()

        }





    }

    // the movement algorithm for arrows moving towards brute class enemies
    moveToBrute() {

        if (brutes.length != 0) {
            push()

            this.xComp = brutes[0].x - this.x
            this.yComp = brutes[0].y - this.y
            this.largerComp = sqrt(pow(this.xComp, 2) + pow(this.yComp, 2))
            this.xComp /= this.largerComp
            this.yComp /= this.largerComp
            this.veloX = this.xComp
            this.veloY = this.yComp
            this.angle = atan(this.yComp / this.xComp)
            this.rotation += this.angle
            rotate(this.rotation)
            this.x += this.xComp * (squareSize / 4)
            this.y += this.yComp * (squareSize / 4)

            pop()
        }
    }


    // the movement algorithm for arrows moving towards moab class enemies
    moveToMoab() {

        if (moabs.length != 0) {
            push()

            this.xComp = moabs[0].x - this.x
            this.yComp = moabs[0].y - this.y
            this.largerComp = sqrt(pow(this.xComp, 2) + pow(this.yComp, 2))
            this.xComp /= this.largerComp
            this.yComp /= this.largerComp
            this.veloX = this.xComp
            this.veloY = this.yComp
            this.angle = atan(this.yComp / this.xComp)
            this.rotation += this.angle
            rotate(this.rotation)
            this.x += this.xComp * (squareSize / 4)
            this.y += this.yComp * (squareSize / 4)

            pop()
        }
    }


    // the hit detection function for normal enemies
    hit() {
        for (let i = 0; i < enemies.length; i++) {
            if (dist(this.x, this.y, enemies[i].x, enemies[i].y) < this.dmgRadius) {
                this.toDelete = true
                enemies[i].toKill = true
                currencyCount += 10

            }
        }
    }

    // the hit detection for brute enemy classes
    hitBrute() {
        for (let i = 0; i < brutes.length; i++) {
            if (dist(this.x, this.y, brutes[i].x, brutes[i].y) < this.dmgRadius) {
                this.toDelete = true
                brutes[i].hits += 1
            }
        }
    }


    // the hit detection function for moab enemy class
    hitMoab() {
        for (let i = 0; i < moabs.length; i++) {
            if (dist(this.x, this.y, moabs[i].x, moabs[i].y) < this.dmgRadius) {
                this.toDelete = true
                moabs[i].hits += 1
            }
        }
    }
}