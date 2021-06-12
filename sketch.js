// Game for the GMTK Game Jam 2021. Author: Elijah Buchanan

let scaling = 1;

let player;
let ball;


function setup() {
	createCanvas(800, 600);
	frameRate(30);

	player = new Player();
	ball = new Ball();
}

function draw() {
	background(100);
	translate(width/2, height/2);
	scale(scaling);

	ball.update();
	player.update();

	ball.draw();
	player.draw();
}
