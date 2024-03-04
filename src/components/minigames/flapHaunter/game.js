import Phaser from "phaser";
import backgroundDayImg from "../../../assets/images/minigames/flapHaunter/background-day.png";
import backgroundNightImg from "../../../assets/images/minigames/flapHaunter/background-night.png";
import gastlySpriteImg from "../../../assets/images/minigames/flapHaunter/gastly-sprite.png";
import haunterSpriteImg from "../../../assets/images/minigames/flapHaunter/haunter-sprite.png";
import gengarSpriteImg from "../../../assets/images/minigames/flapHaunter/gengar-sprite.png";
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
import treeDayBottomImg from "../../../assets/images/minigames/flapHaunter/tree-day-bottom.png";
import treeDayTopImg from "../../../assets/images/minigames/flapHaunter/tree-day-top.png";
import treeNightBottomImg from "../../../assets/images/minigames/flapHaunter/tree-night-bottom.png";
import treeNightTopImg from "../../../assets/images/minigames/flapHaunter/tree-night-top.png";
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
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 300,
      },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const assets = {
  ghost: {
    haunter: "haunter",
    gastly: "gastly",
    gengar: "gengar",
  },
  obstacle: {
    tree: {
      day: {
        top: "tree-day-top",
        bottom: "tree-day-bottom",
      },
      night: {
        top: "tree-night-top",
        bottom: "tree-night-bottom",
      },
    },
  },
  scene: {
    width: gameWidth,
    background: {
      day: "background-day",
      night: "background-night",
    },
    ground: "ground",
    gameOver: "game-over",
    restart: "restart-button",
    messageInitial: "message-initial",
  },
  scoreboard: {
    width: 30,
    base: "number",
    number0: "number0",
    number1: "number1",
    number2: "number2",
    number3: "number3",
    number4: "number4",
    number5: "number5",
    number6: "number6",
    number7: "number7",
    number8: "number8",
    number9: "number9",
  },
  animation: {
    ghost: {
      haunter: {
        idle: "haunter-idle",
        stop: "haunter-stop",
      },
      gastly: {
        idle: "gastly-idle",
        stop: "gastly-stop",
      },
      gengar: {
        idle: "gengar-idle",
        stop: "gengar-stop",
      },
    },
  },
};

let gameOver;
let gameStarted;
let upButton;
let restartButton;
let gameOverBanner;
let messageInitial;
let player;
let ghostName;
let framesMoveUp;
let backgroundDay;
let backgroundNight;
let ground;
let treesGroup;
let gapsGroup;
let nextTrees;
let currentTree;
let scoreboardGroup;
let score;

export function preload() {
  this.load.image(assets.scene.background.day, backgroundDayImg);
  this.load.image(assets.scene.background.night, backgroundNightImg);
  this.load.image(assets.scene.ground, groundImg);

  this.load.image(assets.obstacle.tree.day.top, treeDayTopImg);
  this.load.image(assets.obstacle.tree.day.bottom, treeDayBottomImg);
  this.load.image(assets.obstacle.tree.night.top, treeNightTopImg);
  this.load.image(assets.obstacle.tree.night.bottom, treeNightBottomImg);

  this.load.image(assets.scene.messageInitial, messageImg);

  this.load.image(assets.scene.gameOver, gameoverImg);
  this.load.image(assets.scene.restart, restartImg);

  this.load.spritesheet(assets.ghost.haunter, haunterSpriteImg, {
    frameWidth: 50,
    frameHeight: 50,
  });
  this.load.spritesheet(assets.ghost.gastly, gastlySpriteImg, {
    frameWidth: 50,
    frameHeight: 50,
  });
  this.load.spritesheet(assets.ghost.gengar, gengarSpriteImg, {
    frameWidth: 50,
    frameHeight: 50,
  });

  this.load.image(assets.scoreboard.number0, number0Img);
  this.load.image(assets.scoreboard.number1, number1Img);
  this.load.image(assets.scoreboard.number2, number2Img);
  this.load.image(assets.scoreboard.number3, number3Img);
  this.load.image(assets.scoreboard.number4, number4Img);
  this.load.image(assets.scoreboard.number5, number5Img);
  this.load.image(assets.scoreboard.number6, number6Img);
  this.load.image(assets.scoreboard.number7, number7Img);
  this.load.image(assets.scoreboard.number8, number8Img);
  this.load.image(assets.scoreboard.number9, number9Img);
}

export function create() {
  backgroundDay = this.add
    .image(gameWidth / 2, gameHeight / 2, assets.scene.background.day)
    .setInteractive();
  backgroundDay.on("pointerdown", moveGhost);
  backgroundNight = this.add
    .image(gameWidth / 2, gameHeight / 2, assets.scene.background.night)
    .setInteractive();
  backgroundNight.visible = false;
  backgroundNight.on("pointerdown", moveGhost);

  gapsGroup = this.physics.add.group();
  treesGroup = this.physics.add.group();
  scoreboardGroup = this.physics.add.staticGroup();

  ground = this.add
    .tileSprite(gameWidth / 2, gameHeight, gameWidth, 60, assets.scene.ground)
    .setScrollFactor(0);
  this.physics.add.existing(ground, true);
  ground.setDepth(10);

  this.physics.world.setBoundsCollision(true, true, true, false);

  messageInitial = this.add.image(
    gameWidth / 2,
    gameHeight / 2,
    assets.scene.messageInitial
  );
  messageInitial.setDepth(30);
  messageInitial.visible = false;

  upButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

  this.anims.create({
    key: assets.animation.ghost.haunter.idle,
    frames: this.anims.generateFrameNumbers(assets.ghost.haunter, {
      start: 0,
      end: 2,
    }),
    frameRate: 5,
    repeat: -1,
  });
  this.anims.create({
    key: assets.animation.ghost.haunter.stop,
    frames: [
      {
        key: assets.ghost.haunter,
        frame: 3,
      },
    ],
    frameRate: 20,
  });

  this.anims.create({
    key: assets.animation.ghost.gastly.idle,
    frames: this.anims.generateFrameNumbers(assets.ghost.gastly, {
      start: 0,
      end: 2,
    }),
    frameRate: 5,
    repeat: -1,
  });
  this.anims.create({
    key: assets.animation.ghost.gastly.stop,
    frames: [
      {
        key: assets.ghost.gastly,
        frame: 3,
      },
    ],
    frameRate: 20,
  });

  this.anims.create({
    key: assets.animation.ghost.gengar.idle,
    frames: this.anims.generateFrameNumbers(assets.ghost.gengar, {
      start: 0,
      end: 1,
    }),
    frameRate: 5,
    repeat: -1,
  });
  this.anims.create({
    key: assets.animation.ghost.gengar.stop,
    frames: [
      {
        key: assets.ghost.gengar,
        frame: 2,
      },
    ],
    frameRate: 20,
  });

  prepareGame(this);

  gameOverBanner = this.add.image(
    assets.scene.width / 2,
    gameHeight / 3,
    assets.scene.gameOver
  );
  gameOverBanner.setDepth(20);
  gameOverBanner.visible = false;

  restartButton = this.add
    .image(assets.scene.width / 2, gameHeight / 2, assets.scene.restart)
    .setInteractive();
  restartButton.on("pointerdown", restartGame);
  restartButton.setDepth(20);
  restartButton.visible = false;
}

export function update(time) {
  if (gameOver || !gameStarted) return;

  if (framesMoveUp > 0) framesMoveUp--;
  else if (Phaser.Input.Keyboard.JustDown(upButton)) moveGhost();
  else {
    player.setVelocityY(120);
  }

  treesGroup.children.iterate(function (child) {
    if (child == undefined) return;

    if (child.x < -50) child.destroy();
    else child.setVelocityX(-100);
  });

  gapsGroup.children.iterate(function (child) {
    child.body.setVelocityX(-100);
  });

  nextTrees++;
  if (nextTrees === 140) {
    makeTrees(game.scene.scenes[0]);
    nextTrees = 0;
  }

  ground.tilePositionX = time * 0.1;
}

function hitGhost(player) {
  this.physics.pause();

  gameOver = true;
  gameStarted = false;

  player.anims.play(getAnimationGhost(ghostName).stop);

  gameOverBanner.visible = true;
  restartButton.visible = true;

  handleScore(score);
}

function updateScore(_, gap) {
  score++;
  gap.destroy();

  if (score % 20 == 0) {
    backgroundDay.visible = !backgroundDay.visible;
    backgroundNight.visible = !backgroundNight.visible;

    if (currentTree === assets.obstacle.tree.day)
      currentTree = assets.obstacle.tree.night;
    else currentTree = assets.obstacle.tree.day;
  }

  updateScoreboard();
}

function makeTrees(scene) {
  if (!gameStarted || gameOver) return;

  const treeTopY = Phaser.Math.Between(-120, 120);

  const gap = scene.add.line(800, treeTopY + 210, 0, 0, 0, 98);
  gapsGroup.add(gap);
  gap.body.allowGravity = false;
  gap.visible = false;

  const treeTop = treesGroup.create(gameWidth, treeTopY, currentTree.top);
  treeTop.body.setSize(25, 320);
  treeTop.body.allowGravity = false;

  const treeBottom = treesGroup.create(
    gameWidth,
    treeTopY + 480,
    currentTree.bottom
  );
  treeBottom.body.setSize(25, 320);
  treeBottom.body.allowGravity = false;
}

function moveGhost() {
  if (gameOver) return;

  if (!gameStarted) startGame(game.scene.scenes[0]);

  player.setVelocityY(-400);
  framesMoveUp = 5;
}

function getRandomGhost() {
  switch (Phaser.Math.Between(0, 2)) {
    case 0:
      return assets.ghost.haunter;
    case 1:
      return assets.ghost.gastly;
    case 2:
    default:
      return assets.ghost.gengar;
  }
}

function getAnimationGhost(ghost) {
  switch (ghost) {
    case assets.ghost.haunter:
      return assets.animation.ghost.haunter;
    case assets.ghost.gastly:
      return assets.animation.ghost.gastly;
    case assets.ghost.gengar:
    default:
      return assets.animation.ghost.gengar;
  }
}

function updateScoreboard() {
  scoreboardGroup.clear(true, true);

  const scoreAsString = score.toString();
  if (scoreAsString.length == 1)
    scoreboardGroup
      .create(gameWidth / 2, 30, assets.scoreboard.base + score)
      .setDepth(10);
  else {
    let initialPosition =
      gameWidth / 2 - (score.toString().length * assets.scoreboard.width) / 2;

    for (let i = 0; i < scoreAsString.length; i++) {
      scoreboardGroup
        .create(initialPosition, 30, assets.scoreboard.base + scoreAsString[i])
        .setDepth(10);
      initialPosition += assets.scoreboard.width;
    }
  }
}

function restartGame() {
  treesGroup.clear(true, true);
  treesGroup.clear(true, true);
  gapsGroup.clear(true, true);
  scoreboardGroup.clear(true, true);
  player.destroy();
  gameOverBanner.visible = false;
  restartButton.visible = false;

  const gameScene = game.scene.scenes[0];
  prepareGame(gameScene);

  gameScene.physics.resume();
}

function prepareGame(scene) {
  framesMoveUp = 0;
  nextTrees = 0;
  currentTree = assets.obstacle.tree.day;
  score = 0;
  gameOver = false;
  backgroundDay.visible = true;
  backgroundNight.visible = false;
  messageInitial.visible = true;

  ghostName = getRandomGhost();
  player = scene.physics.add.sprite(60, 265, ghostName);
  player.setCollideWorldBounds(true);
  player.anims.play(getAnimationGhost(ghostName).idle, true);
  player.body.allowGravity = false;

  scene.physics.add.collider(player, ground, hitGhost, null, scene);
  scene.physics.add.collider(player, treesGroup, hitGhost, null, scene);

  scene.physics.add.overlap(player, gapsGroup, updateScore, null, scene);
}

function startGame(scene) {
  gameStarted = true;
  messageInitial.visible = false;

  const score0 = scoreboardGroup.create(
    gameWidth / 2,
    30,
    assets.scoreboard.number0
  );
  score0.setDepth(20);

  makeTrees(scene);
}
