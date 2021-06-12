class Player {
	
	constructor() {
		this.loc = createVector(60,0);
		this.vel = createVector(0,0);
		this.acl = createVector(0,0);

		this.thrust = 5;
		this.dash = 25;
		this.dash_vec = createVector();
		this.dash_time = 5;
		this.dash_count = this.dash_time;
		this.dash_running = false;
		this.dash_ready = true;
		this.dash_recharge = 0;
	}

	update() {
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
		if (keyIsDown(87)) {
			this.loc.y -= this.thrust;
		}
		// S is down
		if (keyIsDown(83)) {
			this.loc.y += this.thrust;
		}
		// A is left
		if (keyIsDown(65)) {
			this.loc.x -= this.thrust;
		}
		// D is down
		if (keyIsDown(68)) {
			this.loc.x += this.thrust;
		}

		// dash when you click
		if (mouseIsPressed && this.dash_ready==true && !this.dash_running && this.dash_recharge<0) {
			let m = createVector(-(width/2-mouseX), -(height/2-mouseY));
			let ang = m.sub(this.loc).heading();
			this.dash_vec = p5.Vector.fromAngle(ang, this.dash);
			this.dash_count = this.dash_time;
			this.dash_running = true;
			this.dash_recharge = 30;
		}
	}

	dash() {

	}

	draw() {
		fill(220);
		stroke(200);
		circle(this.loc.x, this.loc.y, 20);
	}

}
