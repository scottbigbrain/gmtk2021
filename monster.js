class Monster {
	
	constructor() {
		this.loc = createVector(random(-width/2, width/2), random(-height/2, height/2));

		this.speed = 5;
		this.size = 20;

		this.spiral = random([-1, 1]);
		this.wander_step = random(-0.5, 0.5);
	}

	update() {
		// if close enough move toward the player at a given speed
		if (this.loc.dist(player.loc) < 350 && this.loc.dist(player.loc) > 40) {
			let move = player.loc.copy().sub(this.loc).normalize().mult(this.speed);
			let ang = map(this.loc.dist(player.loc), 40, 350, this.spiral*PI/2, 0) + random(-0.05, 0.05);
			move.rotate(ang);
			this.loc.add(move);
		} else {
			let move = p5.Vector.fromAngle(noise(frameCount*this.wander_step)*2*PI, noise(frameCount*this.wander_step/2)*this.speed);
			this.loc.add(move);
		}
	}

	touchingBall() {
		return this.loc.dist(ball.loc) < this.size/2 + ball.size/2;
	}

	draw() {
		fill(200, 50, 10);
		stroke(150, 10, 0);
		strokeWeight(1);
		circle(this.loc.x, this.loc.y, this.size);
	}

}