// Game for the GMTK Game Jam 2021. Author: Elijah Buchanan

let scaling = 1;
let xr = 800;
let yr = 600;
let wallr = 15;
let wall_bounce = 0.6;

let back;

let player;
let camera;
let ball;
let monsters = [];
let shots = [];

// function preload() {
// 	back = loadImage("images/background.png");
// }


function setup() {
	createCanvas(xr, yr);
	frameRate(30);

	player = new Player();
	camera = new Camera();
	ball = new Ball();

	for (let i = 0; i < 10; i++) {
		monsters.push(new Monster());
	}
}

function draw() {
	background(100);
	translate(width/2-camera.loc.x, height/2-camera.loc.y);
	scale(scaling);

	// push();
	// scale(4);
	// image(back, -xr, -yr);
	// pop();

	ball.update();
	for (let monster of monsters) {
		monster.update();
	}
	for (let shot of shots) {
		shot.update();
	}
	player.update();
	camera.update();

	ball.draw();
	player.draw();
	for (let monster of monsters) {
		monster.draw();
	}
	for (let shot of shots) {
		shot.draw();
	}

	stroke(10);
	strokeWeight(wallr*2);
	line(-xr, -yr,  xr, -yr);
	line( xr, -yr,  xr,  yr);
	line( xr,  yr, -xr,  yr);
	line(-xr,  yr, -xr, -yr);

	rectMode(RIGHT);
	fill(250, 50, 50);
	noStroke();
	rect(camera.loc.x-60, camera.loc.y+yr/2-40, player.health*120, 20);
	stroke(20);
	strokeWeight(1);
	line(camera.loc.x+60, camera.loc.y+yr/2-40, camera.loc.x+60, camera.loc.y+yr/2-20);

	// kill monsters touched by the ball
	monsters = monsters.filter(m => !m.touchingBall());
	// get rid of shots touching the walls or ball or player
	shots = shots.filter(s => !s.atSide() && !s.touchingBall() && !s.touchingPlayer());

	// if (player.health <= 0) noLoop();

}
