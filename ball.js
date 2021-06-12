class Ball {
	
	constructor() {
		this.loc = createVector(0,0);
		this.vel = createVector(0,20);
		this.acl = createVector(0,0);


		this.mass = 1;
		this.size = 30;
		this.k_p = 0.066
		this.k = player.health*this.k_p;
		this.mu = 0.4;
	}

	update() {
		this.k = player.health*this.k_p;

		if (this.loc.dist(player.loc) > 20) this.elastic(); this.friction();

		this.vel.add(this.acl);
		this.loc.add(this.vel);

		this.acl.mult(0);
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

	draw() {
		stroke(250);
		strokeWeight(2);
		line(player.loc.x, player.loc.y, this.loc.x, this.loc.y);

		fill(255, 132, 10);
		strokeWeight(1);
		stroke(200, 100, 100);
		circle(this.loc.x, this.loc.y, this.size);
	}

}