// Copied from https://github.com/lostdecade/simple_canvas_game/blob/master/js/game.js
// Updates by Matthew and Preston Thorley
// TODO
// colision detection
// objects (with images and placement)
// global collision detection
// some kind of event passing/notification
// make game objects actors
// maps
//
// Game keeps a hash of game objects
//   each tick it iterates the objects
//   notifies each of global events
//   calls call/move/render? on each
//   detects any collisions
//   notifites affected parties of colisions
//   rise repeat
//
// Because each game actor has a fifo inbox
// it will process any collisions before rendering the next frame
//
// game = new Game()
// hero = Game.object("image", {'options':'etc'})
// hero.onEvent("upKey", function() { hero.y += 10 }
// hero.onEvent("enterKey", function() { // shoot fire ball }
// goblin = Game.object("image", {'options':'etc'})
// goblin.onEvent("colision", function(otherObject) { // die if otherObject is a fireball }
// game.add(hero)
// game.add(goblin)
// game.run()

function Game(width, height) {
  this.canvas = document.createElement("canvas");
  this.canvas.width = width;
  this.canvas.height = height;
  this.context = this.canvas.getContext("2d")
  document.body.appendChild(this.canvas);
}

function init() {
// changeFavicon("file:///Users/matthew.thorley/src/goblin-chase/images/icon.png")
var game = new Game(512,480)

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Fireball image
var fireballReady = false;
var fireballImage = new Image();
fireballImage.onload = function() {
  fireballReady = true;
}
fireballImage.src = "images/fireball.png"

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Monster image
var monsterDeadReady = false;
var monsterDeadImage = new Image();
monsterDeadImage.onload = function () {
	monsterDeadReady = true;
};
monsterDeadImage.src = "images/monster-dead.png";

var hero = {
	speed: 256 // movement in pixels per second
};
var fireball = {
  speed: 256,
  active: false
}

fireball.timeSinceLastMove = 0;
fireball.move = function(modifier) {
  fireball.timeSinceLastMove += modifier
  var fireballSpeed = 1024 * modifier

  if (fireball.timeSinceLastMove > 0.5) {
    fireball.x += fireballSpeed
    fireball.timeSinceLastMove = 0
  }
}

var monster = {};
monster.reset = function() {
  monster.alive = true
  monster.image = monsterImage
}
monster.kill = function() {
  monster.alive = false
  monster.image = monsterDeadImage
}
monster.timeSinceLastMove = 0;
monster.move = function(modifier) {
  if (monster.alive == false) {
    return
  }
  monster.timeSinceLastMove += modifier
  var monsterSpeed = 1024 * modifier

  if (monster.timeSinceLastMove > 0.5) {
    if (Math.random() > 0.5) {
      if (Math.random() > 0.5) {
        monster.y += monsterSpeed
      } else {
        monster.y -= monsterSpeed
      }
    } else {
      if (Math.random() > 0.5) {
        monster.x += monsterSpeed
      } else {
        monster.x -= monsterSpeed
      }
    }
    monster.timeSinceLastMove = 0
  }
}
var monstersShot = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

function enforceBoundaries(character) {
  if (character.y < 0) {
    character.y = 0
  }
  if (character.y > 448) {
    character.y = 448
  }
  if (character.x < 0) {
    character.x = 0
  }
  if (character.x > 480) {
    character.x =480
  }
}

var setup = function () {
  monster.reset()
	hero.x = game.canvas.width / 2;
	hero.y = game.canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (game.canvas.width - 64));
	monster.y = 32 + (Math.random() * (game.canvas.height - 64));
};

var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}
  if (13 in keysDown) {
    fireball.x = hero.x + 35
    fireball.y = hero.y
    fireball.active = true
  }

  fireball.move(modifier)
  monster.move(modifier)
  enforceBoundaries(hero)
  enforceBoundaries(monster)

	// Are they touching?
	if (
		fireball.x <= (monster.x + 16)
		&& monster.x <= (fireball.x + 16)
		&& fireball.y <= (monster.y + 16)
		&& monster.y <= (fireball.y + 16)
	) {
    fireball.x = -100
    fireball.y = -100
    fireball.active = false
    monster.kill()
		++monstersShot;
    setTimeout(setup, 1500)

	}
};

// Draw everything
var render = function () {
	if (bgReady) { game.context.drawImage(bgImage, 0, 0); }
	if (heroReady) { game.context.drawImage(heroImage, hero.x, hero.y); }
	if (monsterReady) { game.context.drawImage(monster.image, monster.x, monster.y); }
  if (fireball.active) { game.context.drawImage(fireballImage, fireball.x, fireball.y); }
	// Score
	game.context.fillStyle = "rgb(250, 250, 250)";
	game.context.font = "24px Helvetica";
	game.context.textAlign = "left";
	game.context.textBaseline = "top";
	game.context.fillText("Goblins Shot: " + monstersShot, 32, 32);
};

// The main game loop
requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

var then = Date.now();
var main = function () {
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	render();
	then = now;
	requestAnimationFrame(main);
};

setup();
main();
}
