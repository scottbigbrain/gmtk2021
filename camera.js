class Camera {
	
	constructor() {
		this.loc = player.loc.copy();
		this.vel = createVector();
		this.acl = createVector();

		this.speed = 1;
		this.mu = 0.05;
	}

	update() {
		if (this.loc.dist(player.loc) > 10) {
			// this.acl.add(to.normalize().mult(this.speed));
			let steer = player.loc.copy().sub(this.loc.copy().add(this.vel));
			steer.normalize().mult(this.speed);
			this.acl.add(steer);
		} else if (abs(this.vel.mag()) > 2) {
			this.vel.mult(0);
			this.loc = player.loc.copy();
		}
		this.acl.add(this.vel.copy().normalize().mult(-this.mu));

		this.vel.add(this.acl);
		if (abs(this.vel.mag()) > 6) this.vel.normalize().mult(6);
		this.loc.add(this.vel);

		this.acl.mult(0);
	}

}