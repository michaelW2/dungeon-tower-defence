let grid, track, squareSize, gridX, gridY, gridXCheck, gridYCheck, highlighted, currentFrame, newFrame, enemyInterval, distance, initialArrowX, initialArrowY, controlsPage, towerClicked
let towerUpgradeCount, towerHighlightedNumber
let wave1Complete = false, wave1Started = false, wave2Complete = false, wave2Started = false, wave3Started = false, wave3Complete = false, wave4started = false, wave4complete = false
let enemiesEmptied
let towers = []
let playButton = []
let enemies = []
let arrows = []
let brutes = []
let moabs = []
let waveCount = 0
let enemiesRemoved = 0
let totalEnemiesPushed = 0
let currencyCount = 200
let closestEnemy = 100000000000000000000
let currentEnemy = 0
let d = 5
let arrowRadius = squareSize
let towerHighlighted = false
let mainMenuActive = true
let towerShootOffset = 0
let gameActive = false
let lifeCount = 10


//preloading all of the images in use
function preload() {
    track = loadImage("images/towerDefTrack.png")
    highlight = loadImage("images/highlight.png")
    play1 = loadImage("images/playButton1.png")
    play2 = loadImage("images/playButton2.png")
    waveCounter = loadImage("images/waveCounter.png")
    currencyCounter = loadImage("images/currency counter.png")
    startButton = loadImage("images/start button.png")
    controlsButton = loadImage("images/better controls button.png")
    exitButton = loadImage("images/exit button.png")
    backButton = loadImage("images/BACK BUTTON.png")
    title = loadImage("images/title.png")
    controls = loadImage("images/controls.png")
    upgradeWindow = loadImage("images/upgrade window.png")
    upgradeCounter = loadImage("images/upgrade counter.png")
    blimpUp = loadImage("images/moab up.png")
    blimpDown = loadImage("images/moab down.png")
    blimpLeft = loadImage("images/moab left.png")
    blimpRight = loadImage("images/moab right.png")
    lifeCounter = loadImage("images/lifeCounter.png")
    gameOver = loadImage("images/game over screen.png")
    newControls = loadImage("images/new new controls.png")
    enemyUp = loadImage("images/enemy up.png")
    enemyDown = loadImage("images/enemy down.png")
    enemyLeft = loadImage("images/enemy left.png")
    enemyRight = loadImage("images/enemy right.png")
}

//setting up the initial conditions of the game
function setup() {

    console.log(windowWidth, windowHeight)
    createCanvas(windowWidth, windowHeight)
    squareSize = windowWidth / 40
    initGame()

    playButton = [play1, play2]

    frameRate(60)

}

// the draw function 
function draw() {

    //if the main menu is active, draw it
    if (mainMenuActive == true) {
        background("#706F6A")
        mainMenu()
    }

    //if the controls page is active, draw it
    if (controlsPage == true) {
        controlsMenu()
    }


    // if the game is active, and the player has not lost, perform all the functions within the game
    if (gameActive == true && lifeCount > 0) {
        translate(squareSize, squareSize)
        background("grey")
        drawBoard()
        drawWaveCounter()
        drawCurrencyCounter()
        drawBackButton()
        translate(-squareSize, -squareSize)
        drawWaveText()
        drawCurrencyText()
        highlightSquare()
        inRangeLine()
        push()
        fill("grey")
        stroke("grey")
        rect(squareSize * 8, 0, squareSize * 6, squareSize)
        stroke("black")
        strokeWeight(2)
        line(squareSize, squareSize, squareSize * 21, squareSize)

        // if a tower has been highlighted, then draw the necessary information and images for it 
        if (towerHighlighted == true) {
            drawUpgradeWindow()
            drawUpgradeCounter()
            strokeWeight(1.5)
            line(squareSize * 19, 0, squareSize * 19, squareSize)
        }
        pop()
        drawLifeCounter()
        push()
        translate(squareSize, squareSize)
        drawPlayButton()
        enemiesOnScreen()
        pop()


    }

    // if the player has lost, then draw the game over screen
    if (lifeCount <= 0) {

        drawGameOver()
    }



    // if the game is active and the player has not lost
    if (gameActive == true && lifeCount > 0) {
        if (towers.length != 0) {
            doTowers()
        }
        if (enemies.length != 0) {
            doEnemies()
        }
        if (arrows.length != 0) {
            doArrows()
        }
        if (brutes.length != 0) {
            doBrutes()
        }
        if (moabs.length != 0) {
            doMoabs()
        }
    }





}

// the grid array that contains the contents of each square
function initGame() {
    grid = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]

}


function mouseClicked() {
    gridX = null
    gridY = null

    //start button
    if (floor((mouseX) / squareSize) > 2 && floor((mouseX) / squareSize) < 7 && floor((mouseY) / squareSize) > 2 && floor((mouseY) / squareSize) < 4 && mainMenuActive == true) {
        gameActive = true
        console.log("game started")
    }
    //exit button
    if (floor((mouseX) / squareSize) > 2 && floor((mouseX) / squareSize) < 7 && floor((mouseY) / squareSize) > 9 && floor((mouseY) / squareSize < 11) && mainMenuActive == true) {
        window.close()
    }
    //controls button
    if (floor((mouseX) / squareSize) > 2 && floor((mouseX) / squareSize) < 7 && floor((mouseY) / squareSize) > 5.5 && floor((mouseY) / squareSize < 8) && mainMenuActive == true) {
        noSmooth()
        mainMenuActive = false
        controlsPage = true

    }
    //back button from controls
    if (floor((mouseX) / squareSize) > 34.5 && floor((mouseX) / squareSize) < 36.5 && floor((mouseY) / squareSize) > 9.5 && floor((mouseY) / squareSize < 11.5) && controlsPage == true) {
        controlsPage = false
        mainMenuActive = true

    }
    //back button from game
    if (floor((mouseX) / squareSize) > 35.5 && floor((mouseX) / squareSize) < 37.5 && floor((mouseY) / squareSize) > 10.5 && floor((mouseY) / squareSize < 12.5) && gameActive == true) {
        gameActive = false
        mainMenuActive = true
        console.log("game back button pressed")
    }





    // finding whether the x coordinate of the mouse click is applicable
    if (floor((mouseX) / squareSize) <= 21 && floor((mouseX) / squareSize) > 0) {
        gridXCheck = true
        gridX = floor((mouseX) / squareSize) - 1
    } else {
        gridXcheck = false


    }

    //finding whether the y coordinate of the mouse click is applicable
    if (floor((mouseY) / squareSize) <= 12 && floor((mouseY) / squareSize) > 0) {
        gridYCheck = true
        gridY = floor((mouseY) / squareSize) - 1
    } else {
        gridYCheck = false



    }
    // finds whether the user clicked on the start button
    if (floor((mouseX) / squareSize) == 1 && floor(mouseY / squareSize) == 13) {
        console.log("playButton pressed")
        playButtonAnimation()

        // waves are only able to be started if the total number of enemies before it have been popped
        if (totalEnemiesPushed < 5 && wave1Started == false) {
            wave1()
            waveCount = 1
        }
        if (enemiesRemoved == 5 && wave1Complete == true) {
            waveCount = 2
            wave2()

        }
        if (enemiesRemoved == 15 && wave2Complete == true) {
            waveCount = 3
            wave3()
        }
        if (enemiesRemoved == 25 && wave3Complete == true) {
            waveCount = 4
            wave4()
        }





    }

}


//drawing the board outlines and image
function drawBoard() {
    push()
    noSmooth()
    strokeWeight(2)
    image(track, 0, 0, squareSize * 21, squareSize * 12)
    line(0, 0, squareSize * 21, 0)
    line(0, 0, 0, squareSize * 12)
    line(squareSize * 21, 0, squareSize * 21, squareSize * 12)
    line(0, squareSize * 12, squareSize * 21, squareSize * 12)
    pop()
}



//key presses
function keyPressed() {
    if (gridXCheck == true && gridYCheck == true) {
        //if the grid spot is empty and they press the space bar
        if (grid[gridY][gridX] == 0) {
            if (key == " " && currencyCount >= 100) {
                grid[gridY][gridX] = 2
                towers.push(new Tower())
                currencyCount -= 100

            }
        }
        if (towerHighlighted == true) {

            //if they press U while a tower is highlighted
            if (keyCode == 85 && currencyCount >= 50) {
                getTowerHighlighted()

                //running the upgrade function
                for (let t of towers) {
                    if (t == towerHighlightedNumber) {
                        t.upgrade()
                        console.log("upgrade ran")
                    }
                }
            }

        }


    }
}


//runs the tower upgrades
function doTowers() {
    for (let t of towers) {
        push()
        t.show()
        // tower shooting rates(depending on upgrades)
        if (t.upgradeCount == 0) {
            if (frameCount + t.towerShootOffset % 100 == 0 && enemiesEmptied == false) {
                initialArrowX = t.x
                initialArrowY = t.y

                arrows.push(new Arrow())
            }

        }
        if (t.upgradeCount == 1) {
            if ((frameCount + t.towerShootOffet) % 80 == 0 && enemiesEmptied == false) {
                initialArrowX = t.x
                initialArrowY = t.y

                arrows.push(new Arrow())
            }

        }
        if (t.upgradeCount == 2) {
            if ((frameCount + t.towerShootOffset) % 60 == 0 && enemiesEmptied == false) {
                initialArrowX = t.x
                initialArrowY = t.y

                arrows.push(new Arrow())
            }

        }
        if (t.upgradeCount == 3) {
            if ((frameCount + t.towerShootOffset) % 40 == 0 && enemiesEmptied == false) {
                initialArrowX = t.x
                initialArrowY = t.y

                arrows.push(new Arrow())

            }

        }



        pop()
    }
}


// highlighting a square
function highlightSquare() {
    if (gridXCheck == true && gridYCheck == true && grid[gridY][gridX] != null) {
        if (grid[gridY][gridX] != 1) {
            push()
            highlighted = true
            image(highlight, (gridX + 1) * squareSize, (gridY + 1) * squareSize, squareSize, squareSize)
            //drawing the upgrades menu
            if (grid[gridY][gridX] == 2) {
                towerHighlighted = true
            }
            if (grid[gridY][gridX] != 2) {
                towerHighlighted = false
            }
            pop()
        }


    }
}

function drawPlayButton() {
    push()
    noSmooth()

    image(play1, 0, squareSize * 12, squareSize, squareSize)
    pop()
}

//draws the first frame of the play button
function drawPlay1() {
    translate(squareSize, squareSize)
    image(play1, 0, squareSize * 12, squareSize, squareSize)

}


// plays the frames for the play button
function playButtonAnimation() {
    noSmooth()
    translate(squareSize, squareSize)
    image(play2, 0, squareSize * 12, squareSize, squareSize)
    setTimeout(drawPlay1, 100)
}


//waves

function wave1() {
    wave1Started = true
    console.log("wave started")
    let milli = 500
    // pushes a total of 5 enemies over the course of 2.5 seconds, and at equal intervals
    for (let i = 0; i < 5; i++) {
        setTimeout(pushEnemy, milli)
        milli += 500
    }
    wave1Complete = true

}
function wave2() {
    wave2Started = true
    let milli = 350
    for (let i = 0; i < 9; i++) {
        setTimeout(pushEnemy, milli)
        milli += 350
    }
    setTimeout(pushBrute, 3500)
    wave2Complete = true
}
function wave3() {
    wave3Started = true
    let milli = 350
    for (let i = 0; i < 10; i++) {
        setTimeout(pushBrute, milli)
        milli += 350
    }
    wave3Complete = true
}
function wave4() {
    waveStarted = true
    pushMoab()
    wave4Complete = true
}

//pushing an enemy

function pushEnemy() {
    enemies.push(new Enemy())
    console.log("enemy pushed")
    totalEnemiesPushed += 1

}
//

//running the enemy functions
function doEnemies() {
    for (let e of enemies) {
        e.show()
        e.move()
        e.kill()
        if (e.toKill == true) {
            enemies.splice(e, 1)
            enemiesRemoved += 1



        }
    }
}


//pushing a brute
function pushBrute() {
    brutes.push(new Brute())
    console.log("brute pushed")
    totalEnemiesPushed += 1

}


//running brute functions
function doBrutes() {
    for (let b of brutes) {
        b.show()
        b.move()
        b.kill()
    }
}


//running moab functions
function doMoabs() {
    for (let m of moabs) {
        m.show()
        m.move()
        m.kill()
    }
}


//pushing moabs
function pushMoab() {
    moabs.push(new Moab())
    totalEnemiesPushed += 1
    console.log("moab pushed")
}

//draws the wave counter image
function drawWaveCounter() {
    //w = 42
    //h = 16

    noSmooth()
    image(waveCounter, 0, -squareSize, squareSize * 3, squareSize)


}


//draws the wave text
function drawWaveText() {
    push()

    textSize(30)
    stroke("white")
    fill(255, 255, 255)
    rect(squareSize * 3 + squareSize / 4, squareSize / 4, squareSize / 2, squareSize / 2)
    stroke("black")
    fill("black")
    text(waveCount, squareSize * 3 + squareSize / 4, squareSize * 0.75 + squareSize * 0.1)

    pop()
}


// draws the currency counter image
function drawCurrencyCounter() {
    push()
    translate(squareSize, squareSize)
    image(currencyCounter, squareSize * 2, -squareSize * 2, squareSize * 4, squareSize)
    pop()

}


//draws the currency text
function drawCurrencyText() {
    push()

    textSize(15)
    stroke("white")
    fill(255, 255, 255)
    rect(squareSize * 6 + squareSize / 2, squareSize / 4, squareSize * 0.75, squareSize / 2)
    stroke("black")
    fill("black")
    text(currencyCount, squareSize * 6 + squareSize / 2, squareSize * 0.75)





    pop()
}
//drawing the upgrade window
function drawUpgradeWindow() {
    image(upgradeWindow, squareSize * 8, 0, squareSize * 6, squareSize)
}

//drawing the upgrade counter
function drawUpgradeCounter() {
    push()
    image(upgradeCounter, squareSize * 14, 0, squareSize * 5, squareSize)
    strokeWeight(4)
    stroke("black")
    fill("white")
    textSize(30)

    for (let t of towers) {

        // if the tower = the tower highlighted, and upgrade count for that tower < 4, then the text for the upgrade count will be drawn
        if (t == towerHighlightedNumber) {
            if (t.upgradeCount < 4) {
                text(t.upgradeCount, squareSize * 18, squareSize * 0.75 + squareSize / 10)
            }

        }
    }
    pop()
}




function inRangeLine() {
    if (towers.length != 0 && enemies.length != 0) {
        for (let i = 0; i < towers.length; i++) {
            push()
            stroke("yellow")
            strokeWeight(0.5)

            for (let j = 0; j < enemies.length; j++) {

                distance = dist(towers[i].x, towers[i].y, enemies[j].x, enemies[j].y)
                if (distance <= towers[i].range) {
                    line(towers[i].x, towers[i].y, enemies[j].x, enemies[j].y)


                }

            }



            pop()
        }
    }

}

function doArrows() {
    for (a of arrows) {
        a.show()


        // if there are enemies on the screen
        if (enemies.length != 0) {
            a.moveToEnemy()
        }

        //if there are no enemies, but brutes are on the screen
        else if (brutes.length != 0) {
            a.moveToBrute()
        }

        //if there are only moab class enemies on the screen
        else {
            a.moveToMoab()
        }

        a.hit()
        a.hitBrute()
        a.hitMoab()

        // the parameters that detect whether the arrow is either off the screen, or there are no enemies on the screen
        if (a.x < squareSize || a.y < squareSize || a.x > squareSize * 22 || a.y > squareSize * 13 || enemiesEmptied == true) {
            arrows.splice(a, 1)
        }
        if (a.toDelete == true) {
            arrows.splice(a, 1)
        }

    }

}


// finds if a tower has been highlighted, and which tower.
function getTowerHighlighted() {
    for (let t of towers) {
        // if the grid position of the tower is the same as the position of the highlighted square
        if (floor(t.x / squareSize) == gridX + 1 && floor(t.y / squareSize) == gridY + 1) {
            towerHighlightedNumber = t
            console.log(towerHighlightedNumber)
        }
    }
}

// draws the title and the start, controls, and exit buttons
function mainMenu() {
    noSmooth()
    image(startButton, squareSize * 2, squareSize * 2, squareSize * 5, squareSize * 2.5)
    image(controlsButton, squareSize * 2, squareSize * 5.5, squareSize * 5, squareSize * 2.5)
    image(exitButton, squareSize * 2, squareSize * 9, squareSize * 5, squareSize * 2.5)
    image(title, squareSize * 8, squareSize * 2, squareSize * 20, squareSize * 10)
}


// draws the controls page over the whole screen
function controlsMenu() {
    image(newControls, 0, 0, windowWidth, windowHeight)
    drawBackButton()
}


// draws the back button on the middle right hand side of the screen
function drawBackButton() {
    image(backButton, squareSize * 35, squareSize * 10, squareSize * 2, squareSize * 2)
}


// finds whether there are any enemies on the screen
function enemiesOnScreen() {
    if (enemies.length != 0 || brutes.length != 0 || moabs.length != 0) {
        enemiesEmptied = false
    }
    else {
        enemiesEmptied = true
    }
}


// draws the life counter in the top left of the grid
function drawLifeCounter() {
    push()
    textSize(30)
    image(lifeCounter, squareSize * 19, 0, squareSize * 3, squareSize)
    text(lifeCount, squareSize * 21 + squareSize / 5, squareSize * 0.75)
    pop()
}

// draws the game over image that covers the whole screen.
function drawGameOver() {
    image(gameOver, 0, 0, windowWidth, windowHeight)

}
