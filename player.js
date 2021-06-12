class Player {
	
	constructor() {
		this.loc = createVector(60,0);
		this.vel = createVector(0,0);
		this.acl = createVector(0,0);

		this.size = 20;
		this.health = 0.6;

		this.thrust = 6;
		this.moving = false;
		this.dash = 25;
		this.dash_vec = createVector();
		this.dash_time = 5;
		this.dash_count = this.dash_time;
		this.dash_running = false;
		this.dash_ready = true;
		this.dash_recharge = 0;
	}

	update() {
		this.moving = false;
		this.controls();

		if (this.dash_count > 0) {
			this.dash_count--;
			if (this.dash_count == 0) this.dash_running = false;
			this.loc.add(this.dash_vec);
		}
		this.dash_recharge--;
	}

	controls() {
		// W is up
		if (keyIsDown(87) && !this.atTop()) {
			this.loc.y -= this.thrust;
			this.moving = true;
		}
		// S is down
		if (keyIsDown(83) && !this.atBottom()) {
			this.loc.y += this.thrust;
			this.moving = true;
		}
		// A is left
		if (keyIsDown(65) && !this.atLeft()) {
			this.loc.x -= this.thrust;
			this.moving = true;
		}
		// D is down
		if (keyIsDown(68) && !this.atRight()) {
			this.loc.x += this.thrust;
			this.moving = true;
		}

		// dash when you click
		if (mouseIsPressed && this.dash_ready==true && !this.dash_running && this.dash_recharge<0) {
			let m = createVector(-(width/2-mouseX), -(height/2-mouseY));
			let ang = m.heading();
			this.dash_vec = p5.Vector.fromAngle(ang, this.dash);
			this.dash_count = this.dash_time;
			this.dash_running = true;
			this.dash_recharge = 30;
			this.moving = true;
		}
	}

	atLeft() {
		return this.loc.x + xr < this.size/2 + wallr;
	}
	atRight() {
		return xr - this.loc.x < this.size/2 + wallr;
	}
	atTop() {
		return this.loc.y + yr < this.size/2 + wallr;
	}
	atBottom() {
		return yr - this.loc.y < this.size/2 + wallr;
	}

	touchingShot() {
		for (let shot of shots) {
			return this.loc.dist(shot.loc) < this.size/2 + shots.size/2;
		}
	}

	draw() {
		fill(220);
		stroke(200);
		strokeWeight(1);
		circle(this.loc.x, this.loc.y, 20);
	}

}
