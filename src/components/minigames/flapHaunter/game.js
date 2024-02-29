import Phaser from "phaser";
import backgroundDayImg from "../../../assets/images/minigames/flapHaunter/background-day.png";
import backgroundNightImg from "../../../assets/images/minigames/flapHaunter/background-night.png";
import birdBlueImg from "../../../assets/images/minigames/flapHaunter/bird-blue-sprite.png";
import birdRedImg from "../../../assets/images/minigames/flapHaunter/bird-red-sprite.png";
import birdYellowImg from "../../../assets/images/minigames/flapHaunter/bird-yellow-sprite.png";
import gameoverImg from "../../../assets/images/minigames/flapHaunter/gameover.png";
import groundImg from "../../../assets/images/minigames/flapHaunter/ground-sprite.png";
import messageImg from "../../../assets/images/minigames/flapHaunter/message-initial.png";
import number0Img from "../../../assets/images/minigames/flapHaunter/number0.png";
import number1Img from "../../../assets/images/minigames/flapHaunter/number1.png";
import number2Img from "../../../assets/images/minigames/flapHaunter/number2.png";
import number3Img from "../../../assets/images/minigames/flapHaunter/number3.png";
import number4Img from "../../../assets/images/minigames/flapHaunter/number4.png";
import number5Img from "../../../assets/images/minigames/flapHaunter/number5.png";
import number6Img from "../../../assets/images/minigames/flapHaunter/number6.png";
import number7Img from "../../../assets/images/minigames/flapHaunter/number7.png";
import number8Img from "../../../assets/images/minigames/flapHaunter/number8.png";
import number9Img from "../../../assets/images/minigames/flapHaunter/number9.png";
import pipeGreenBottomImg from "../../../assets/images/minigames/flapHaunter/pipe-green-bottom.png";
import pipeGreenTopImg from "../../../assets/images/minigames/flapHaunter/pipe-green-top.png";
import pipeRedBottomImg from "../../../assets/images/minigames/flapHaunter/pipe-red-bottom.png";
import pipeRedTopImg from "../../../assets/images/minigames/flapHaunter/pipe-red-top.png";
import restartImg from "../../../assets/images/minigames/flapHaunter/restart-button.png";
import { game, handleScore } from "./FlapHaunter";

const gameWidth = 800;
const gameHeight = 500;

export const configurations = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
    parent: "phaser-game",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

const assets = {
    bird: {
        red: 'bird-red',
        yellow: 'bird-yellow',
        blue: 'bird-blue'
    },
    obstacle: {
        pipe: {
            green: {
                top: 'pipe-green-top',
                bottom: 'pipe-green-bottom'
            },
            red: {
                top: 'pipe-red-top',
                bottom: 'pipe-red-bo'
            }
        }
    },
    scene: {
        width: gameWidth,
        background: {
            day: 'background-day',
            night: 'background-night'
        },
        ground: 'ground',
        gameOver: 'game-over',
        restart: 'restart-button',
        messageInitial: 'message-initial'
    },
    scoreboard: {
        width: 25,
        base: 'number',
        number0: 'number0',
        number1: 'number1',
        number2: 'number2',
        number3: 'number3',
        number4: 'number4',
        number5: 'number5',
        number6: 'number6',
        number7: 'number7',
        number8: 'number8',
        number9: 'number9'
    },
    animation: {
        bird: {
            red: {
                clapWings: 'red-clap-wings',
                stop: 'red-stop'
            },
            blue: {
                clapWings: 'blue-clap-wings',
                stop: 'blue-stop'
            },
            yellow: {
                clapWings: 'yellow-clap-wings',
                stop: 'yellow-stop'
            }
        },
        ground: {
            moving: 'moving-ground',
            stop: 'stop-ground'
        }
    }
}


let gameOver
let gameStarted
let upButton
let restartButton
let gameOverBanner
let messageInitial
let player
let birdName
let framesMoveUp
let backgroundDay
let backgroundNight
let ground
let pipesGroup
let gapsGroup
let nextPipes
let currentPipe
let scoreboardGroup
let score


export function preload() {
    this.load.image(assets.scene.background.day, backgroundDayImg)
    this.load.image(assets.scene.background.night, backgroundNightImg)
    this.load.image(assets.scene.ground, groundImg)

    this.load.image(assets.obstacle.pipe.green.top, pipeGreenTopImg)
    this.load.image(assets.obstacle.pipe.green.bottom, pipeGreenBottomImg)
    this.load.image(assets.obstacle.pipe.red.top, pipeRedTopImg)
    this.load.image(assets.obstacle.pipe.red.bottom, pipeRedBottomImg)

    this.load.image(assets.scene.messageInitial, messageImg)

    this.load.image(assets.scene.gameOver, gameoverImg)
    this.load.image(assets.scene.restart, restartImg)

    this.load.spritesheet(assets.bird.red, birdRedImg, {
        frameWidth: 50,
        frameHeight: 50
    })
    this.load.spritesheet(assets.bird.blue, birdBlueImg, {
        frameWidth: 50,
        frameHeight: 50
    })
    this.load.spritesheet(assets.bird.yellow, birdYellowImg, {
        frameWidth: 50,
        frameHeight: 50
    })

    this.load.image(assets.scoreboard.number0, number0Img)
    this.load.image(assets.scoreboard.number1, number1Img)
    this.load.image(assets.scoreboard.number2, number2Img)
    this.load.image(assets.scoreboard.number3, number3Img)
    this.load.image(assets.scoreboard.number4, number4Img)
    this.load.image(assets.scoreboard.number5, number5Img)
    this.load.image(assets.scoreboard.number6, number6Img)
    this.load.image(assets.scoreboard.number7, number7Img)
    this.load.image(assets.scoreboard.number8, number8Img)
    this.load.image(assets.scoreboard.number9, number9Img)
}


export function create() {
    backgroundDay = this.add.image(gameWidth / 2, gameHeight / 2, assets.scene.background.day).setInteractive()
    backgroundDay.on('pointerdown', moveBird)
    backgroundNight = this.add.image(gameWidth / 2, gameHeight / 2, assets.scene.background.night).setInteractive()
    backgroundNight.visible = false
    backgroundNight.on('pointerdown', moveBird)

    gapsGroup = this.physics.add.group()
    pipesGroup = this.physics.add.group()
    scoreboardGroup = this.physics.add.staticGroup()

    ground = this.add.tileSprite(gameWidth / 2, gameHeight, gameWidth, 60, assets.scene.ground).setScrollFactor(0)
    this.physics.add.existing(ground, true);
    ground.setDepth(10)

    this.physics.world.setBoundsCollision(true, true, true, false);


    messageInitial = this.add.image(gameWidth / 2, gameHeight / 2, assets.scene.messageInitial)
    messageInitial.setDepth(30)
    messageInitial.visible = false

    upButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)

    this.anims.create({
        key: assets.animation.bird.red.clapWings,
        frames: this.anims.generateFrameNumbers(assets.bird.red, {
            start: 0,
            end: 2
        }),
        frameRate: 5,
        repeat: -1
    })
    this.anims.create({
        key: assets.animation.bird.red.stop,
        frames: [{
            key: assets.bird.red,
            frame: 3
        }],
        frameRate: 20
    })

    this.anims.create({
        key: assets.animation.bird.blue.clapWings,
        frames: this.anims.generateFrameNumbers(assets.bird.blue, {
            start: 0,
            end: 2
        }),
        frameRate: 5,
        repeat: -1
    })
    this.anims.create({
        key: assets.animation.bird.blue.stop,
        frames: [{
            key: assets.bird.blue,
            frame: 3
        }],
        frameRate: 20
    })

    this.anims.create({
        key: assets.animation.bird.yellow.clapWings,
        frames: this.anims.generateFrameNumbers(assets.bird.yellow, {
            start: 0,
            end: 1
        }),
        frameRate: 5,
        repeat: -1
    })
    this.anims.create({
        key: assets.animation.bird.yellow.stop,
        frames: [{
            key: assets.bird.yellow,
            frame: 2
        }],
        frameRate: 20
    })

    prepareGame(this)

    gameOverBanner = this.add.image(assets.scene.width / 2, gameHeight / 3, assets.scene.gameOver)
    gameOverBanner.setDepth(20)
    gameOverBanner.visible = false

    restartButton = this.add.image(assets.scene.width / 2, gameHeight / 2, assets.scene.restart).setInteractive()
    restartButton.on('pointerdown', restartGame)
    restartButton.setDepth(20)
    restartButton.visible = false
}

export function update(time) {
    if (gameOver || !gameStarted)
        return

    if (framesMoveUp > 0)
        framesMoveUp--
    else if (Phaser.Input.Keyboard.JustDown(upButton))
        moveBird()
    else {
        player.setVelocityY(120)
    }

    pipesGroup.children.iterate(function (child) {
        if (child == undefined)
            return

        if (child.x < -50)
            child.destroy()
        else
            child.setVelocityX(-100)
    })

    gapsGroup.children.iterate(function (child) {
        child.body.setVelocityX(-100)
    })

    nextPipes++
    if (nextPipes === 140) {
        makePipes(game.scene.scenes[0])
        nextPipes = 0
    }

    ground.tilePositionX = time * 0.1
}


function hitBird(player) {
    this.physics.pause()

    gameOver = true
    gameStarted = false

    player.anims.play(getAnimationBird(birdName).stop)

    gameOverBanner.visible = true
    restartButton.visible = true

    handleScore(score)
}


function updateScore(_, gap) {
    score++
    gap.destroy()

    if (score % 10 == 0) {
        backgroundDay.visible = !backgroundDay.visible
        backgroundNight.visible = !backgroundNight.visible

        if (currentPipe === assets.obstacle.pipe.green)
            currentPipe = assets.obstacle.pipe.red
        else
            currentPipe = assets.obstacle.pipe.green
    }

    updateScoreboard()
}


function makePipes(scene) {
    if (!gameStarted || gameOver) return

    const pipeTopY = Phaser.Math.Between(-120, 120)

    const gap = scene.add.line(800, pipeTopY + 210, 0, 0, 0, 98)
    gapsGroup.add(gap)
    gap.body.allowGravity = false
    gap.visible = false

    const pipeTop = pipesGroup.create(gameWidth, pipeTopY, currentPipe.top)
    pipeTop.body.setSize(25, 320)
    pipeTop.body.allowGravity = false

    const pipeBottom = pipesGroup.create(gameWidth, pipeTopY + 480, currentPipe.bottom)
    pipeBottom.body.setSize(25, 320)
    pipeBottom.body.allowGravity = false
}


function moveBird() {
    if (gameOver)
        return

    if (!gameStarted)
        startGame(game.scene.scenes[0])

    player.setVelocityY(-400)
    framesMoveUp = 5
}


function getRandomBird() {
    switch (Phaser.Math.Between(0, 2)) {
        case 0:
            return assets.bird.red
        case 1:
            return assets.bird.blue
        case 2:
        default:
            return assets.bird.yellow
    }
}


function getAnimationBird(birdColor) {
    switch (birdColor) {
        case assets.bird.red:
            return assets.animation.bird.red
        case assets.bird.blue:
            return assets.animation.bird.blue
        case assets.bird.yellow:
        default:
            return assets.animation.bird.yellow
    }
}


function updateScoreboard() {
    scoreboardGroup.clear(true, true)

    const scoreAsString = score.toString()
    if (scoreAsString.length == 1)
        scoreboardGroup.create(gameWidth / 2, 30, assets.scoreboard.base + score).setDepth(10)
    else {
        let initialPosition = gameWidth / 2 - ((score.toString().length * assets.scoreboard.width) / 2)

        for (let i = 0; i < scoreAsString.length; i++) {
            scoreboardGroup.create(initialPosition, 30, assets.scoreboard.base + scoreAsString[i]).setDepth(10)
            initialPosition += assets.scoreboard.width
        }
    }
}

function restartGame() {
    pipesGroup.clear(true, true)
    pipesGroup.clear(true, true)
    gapsGroup.clear(true, true)
    scoreboardGroup.clear(true, true)
    player.destroy()
    gameOverBanner.visible = false
    restartButton.visible = false

    const gameScene = game.scene.scenes[0]
    prepareGame(gameScene)

    gameScene.physics.resume()
}


function prepareGame(scene) {
    framesMoveUp = 0
    nextPipes = 0
    currentPipe = assets.obstacle.pipe.green
    score = 0
    gameOver = false
    backgroundDay.visible = true
    backgroundNight.visible = false
    messageInitial.visible = true

    birdName = getRandomBird()
    player = scene.physics.add.sprite(60, 265, birdName)
    player.setCollideWorldBounds(true)
    player.anims.play(getAnimationBird(birdName).clapWings, true)
    player.body.allowGravity = false

    scene.physics.add.collider(player, ground, hitBird, null, scene)
    scene.physics.add.collider(player, pipesGroup, hitBird, null, scene)

    scene.physics.add.overlap(player, gapsGroup, updateScore, null, scene)
}

function startGame(scene) {
    gameStarted = true
    messageInitial.visible = false

    const score0 = scoreboardGroup.create(gameWidth / 2, 30, assets.scoreboard.number0)
    score0.setDepth(20)

    makePipes(scene)
}