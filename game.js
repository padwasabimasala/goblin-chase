// Copied from https://github.com/lostdecade/simple_canvas_game/blob/master/js/game.js
// Updates by Matthew and Preston Thorley
function init() {

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

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

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var fireball = {
  speed: 256,
  active: false
}
// fireball.x = 100
// fireball.y = 100

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
monster.timeSinceLastMove = 0;
monster.move = function(modifier) {
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

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

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

// Update game objects
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
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersShot;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

  if (fireball.active) {
		ctx.drawImage(fireballImage, fireball.x, fireball.y);
  }


	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins Shot: " + monstersShot, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
}
