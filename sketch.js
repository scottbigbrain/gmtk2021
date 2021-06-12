// Game for the GMTK Game Jam 2021. Author: Elijah Buchanan

let scaling = 1;

let player;
let ball;
let monsters = [];


function setup() {
	createCanvas(800, 600);
	frameRate(30);

	player = new Player();
	ball = new Ball();
	for (let i = 0; i < 50; i++) {
		monsters.push(new Monster);
	}
}

function draw() {
	background(100);
	translate(width/2-player.loc.x, height/2-player.loc.y);
	scale(scaling);

	ball.update();
	for (let monster of monsters) {
		monster.update();
	}
	player.update();

	ball.draw();
	player.draw();
	for (let monster of monsters) {
		monster.draw();
	}

	// fill(200);
	// stroke(180);
	// strokeWeight(0.5);
	// textSize(32);
	// textAlign(CENTER);
	// text("Health: " + player.health, 20, 20);

	// kill monsters touched by the ball
	let dead = monsters.filter(m => m.touchingBall());
	monsters = monsters.filter(m => !m.touchingBall());
}
