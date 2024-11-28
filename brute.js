class Brute {

    // constructs the brute
    constructor() {
        this.hits = 0
        this.velo = squareSize / 20
        this.x = squareSize + squareSize / 4
        this.y = squareSize * 9 + squareSize / 2
        this.r = squareSize / 2.5
    }


    // shows the brute as a blue ellipse
    show() {
        push()
        fill("blue")
        ellipse(this.x, this.y, this.r)
        pop()
    }

    //breaks down the movement of a brute into all of the different straight lines in the track
    move() {
        //line 1
        if (this.x < squareSize * 5 + squareSize / 2 && this.line0 != false) {
            this.x += this.velo
        }
        if (this.x >= squareSize * 5 + squareSize / 2 && this.y == squareSize * 9 + squareSize / 2) {
            this.line0 = false
            this.line1 = true
        }
        //line 2
        if (this.line1 == true && this.line2 != false) {
            if (this.y > squareSize * 6 + squareSize / 2) {
                this.y -= this.velo
            }
            if (this.y <= squareSize * 6 + squareSize / 2) {
                this.line1 = false
                this.line2 = true
            }
        }
        //line 3
        if (this.line2 == true && this.line3 != false) {
            if (this.x > squareSize * 2 + squareSize / 2) {
                this.x -= this.velo
            }
            if (this.x <= squareSize * 2 + squareSize / 2) {
                this.line2 = false
                this.line3 = true
            }
        }

        //line 4
        if (this.line3 == true && this.line4 != false) {
            if (this.y > squareSize * 3 + squareSize / 2) {
                this.y -= this.velo
            }
            if (this.y <= squareSize * 3 + squareSize / 2) {
                this.line3 = false
                this.line4 = true
            }
        }

        //line 5
        if (this.line4 == true && this.line5 != false) {
            if (this.x < squareSize * 10 + squareSize / 2) {
                this.x += this.velo
            }
            if (this.x >= squareSize * 10 + squareSize / 2) {
                this.line4 = false
                this.line5 = true
            }
        }

        //line 6
        if (this.line5 == true && this.line6 != false) {
            if (this.y < squareSize * 7 + squareSize / 2) {
                this.y += this.velo
            }
            if (this.y >= squareSize * 7 + squareSize / 2) {
                this.line5 = false
                this.line6 = true
            }
        }

        //line 7
        if (this.line6 == true && this.line7 != false) {
            if (this.x < squareSize * 12 + squareSize / 2) {
                this.x += this.velo
            }
            if (this.x >= squareSize * 12 + squareSize / 2) {
                this.line6 = false
                this.line7 = true

            }
        }

        //line8
        if (this.line7 == true && this.line8 != false) {
            if (this.y > squareSize * 2 + squareSize / 2) {
                this.y -= this.velo
            }
            if (this.y <= squareSize * 2 + squareSize / 2) {
                this.line7 = false
                this.line8 = true
            }
        }

        //line9
        if (this.line8 == true && this.line9 != false) {
            if (this.x < squareSize * 15 + squareSize / 2) {
                this.x += this.velo
            }
            if (this.x >= squareSize * 15 + squareSize / 2) {
                this.line8 = false
                this.line9 = true
            }
        }

        //line10
        if (this.line9 == true && this.line10 != false) {
            if (this.y < squareSize * 6 + squareSize / 2) {
                this.y += this.velo
            }
            if (this.y >= squareSize * 6 + squareSize / 2) {
                this.line9 = false
                this.line10 = true
            }
        }

        //line11
        if (this.line10 == true && this.line11 != false) {
            if (this.x > squareSize * 14 + squareSize / 2) {
                this.x -= this.velo
            }
            if (this.x <= squareSize * 14 + squareSize / 2) {
                this.line10 = false
                this.line11 = true
            }
        }

        //line12
        if (this.line11 == true && this.line12 != false) {
            if (this.y < squareSize * 9 + squareSize / 2) {
                this.y += this.velo
            }
            if (this.y >= squareSize * 9 + squareSize / 2) {
                this.line11 = false
                this.line12 = true
            }
        }

        //line13
        if (this.line12 == true && this.line13 != false) {
            if (this.x > squareSize * 10 + squareSize / 2) {
                this.x -= this.velo
            }
            if (this.x <= squareSize * 10 + squareSize / 2) {
                this.line12 = false
                this.line13 = true
            }
        }

        //line14
        if (this.line13 == true && this.line14 != false) {
            if (this.y < squareSize * 11 + squareSize / 2) {
                this.y += this.velo
            }
            if (this.y >= squareSize * 11 + squareSize / 2) {
                this.line13 = false
                this.line14 = true
            }
        }
        //line15
        if (this.line14 == true) {
            this.x += this.velo
        }


    }

    kill() {
        // if the brute reaches the end, or is off the grid
        if (this.x >= squareSize * 22 - 5 || this.x <= 0) {
            brutes.splice(this, 1)
            enemiesRemoved += 1
            lifeCount -= 3
        }

        // if the brute has been hit 3 times
        if (this.hits == 3) {
            brutes.splice(this, 1)
            enemiesRemoved += 1
            currencyCount += 20
        }
    }


}