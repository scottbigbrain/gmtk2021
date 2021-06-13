class Monster {
	
	constructor() {
		this.loc = createVector(random(-xr, xr), random(-yr, yr));
		this.vel = createVector();

		this.speed = 5;
		this.size = 20;

		this.spiral = random([-1, 1]);
		this.wander_step = random(-0.5, 0.15);
	}

	update() {
		// if close enough move toward the player at a given speed
		if (this.loc.dist(player.loc) < 350 && this.loc.dist(player.loc) > 150) {
			let move = player.loc.copy().sub(this.loc).normalize().mult(this.speed);
			let ang = map(this.loc.dist(player.loc), 150, 350, this.spiral*PI/2, 0) + random(-0.05, 0.05);
			move.rotate(ang);
			this.vel = move;

			let chance = 0.018;
			if (random() < chance) this.shoot();

		} else if (this.loc.dist(player.loc) <= 150) {
			this.vel = p5.Vector.fromAngle(this.spiral*5*PI/8, this.speed*0.8);
			let chance = 0.012;
			if (random() < chance) this.shoot();

		} else {
			let move = p5.Vector.fromAngle(noise(frameCount*this.wander_step+this.spiral)*2*PI, this.speed*2);
			this.vel = move;
		}

		if (this.atSide()) {
			this.vel = createVector().sub(this.loc).normalize().mult(this.speed/5);
		}

		this.loc.add(this.vel);
	}

	touchingBall() {
		return this.loc.dist(ball.loc) < this.size/2 + ball.size/2;
	}

	shoot() {
		let to = player.loc.copy().sub(this.loc);
		shots.push(new Shot(this.loc.x, this.loc.y, to.heading()+random(-0.25, 0.25)));
	}

	atSide() {
		// check right and left
		if (this.loc.x + xr < this.size/2 + wallr ||
			xr - this.loc.x < this.size/2 + wallr   ) {
			return true;
		}

		// check top and bottom
		if (this.loc.y + yr < this.size/2 + wallr ||
			yr - this.loc.y < this.size/2 + wallr   ) {
			return true;
		}
	}

	draw() {
		fill(200, 50, 10);
		stroke(150, 10, 0);
		strokeWeight(1);
		circle(this.loc.x, this.loc.y, this.size);
	}

}