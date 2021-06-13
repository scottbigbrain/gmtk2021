class Ball {
	
	constructor() {
		this.loc = createVector(-80,0);
		this.vel = createVector(0,40);
		this.acl = createVector(0,0);


		this.mass = 1;
		this.size = 30;
		this.k_p = 0.05
		this.k = player.health*this.k_p;
		this.mu = 0.4;

		this.p_system = new Emitter(this.loc.x, this.loc.y);
	}

	update() {
		this.k = player.health*this.k_p;

		if (this.loc.dist(player.loc) > 20) this.elastic(); this.friction();

		this.atSide();

		this.vel.add(this.acl);
		this.loc.add(this.vel);

		this.acl.mult(0);

		this.p_system.position = this.loc.copy();
		this.p_system.emit(ceil(player.health*3));
		this.p_system.update();
	}

	elastic() {
		// attract to the player
		let f = player.loc.copy().sub(this.loc).mult(this.k)
		// f.mult(f.mag());
		this.applyForce(f);
	}

	friction() {
		// slow down that ball it is way to fast
		let f = this.vel.copy().normalize().mult(-this.mu)
		this.applyForce(f);
	}

	applyForce(f) {
		let force = f.copy().div(this.mass);
		this.acl.add(force);
	}

	atSide() {
		// if at left or right bounce off that side
		if (this.loc.x + xr < this.size/2 + wallr ||
			xr - this.loc.x < this.size/2 + wallr   ) {
			this.vel.x *= -wall_bounce;
		}

		// if at top or bottom bounce off that side
		if (this.loc.y + yr < this.size/2 + wallr ||
			yr - this.loc.y < this.size/2 + wallr   ) {
			this.vel.y *= -wall_bounce;
		}
	}

	draw() {
		for (let particle of this.p_system.particles) {
			if (particle.lifetime > 180) {
				fill(240, 146, 31, particle.lifetime);
			} else {
				fill(240, 177, 31, particle.lifetime);
			}
			noStroke();
			circle(particle.pos.x, particle.pos.y, particle.r);
		}

		stroke(250);
		strokeWeight(this.k*100);
		line(player.loc.x, player.loc.y, this.loc.x, this.loc.y);

		fill(255, 132, 10);
		strokeWeight(4);
		stroke(200, 100, 100);
		circle(this.loc.x, this.loc.y, this.size);
	}

}