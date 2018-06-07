/*
	Code by: N. Parsons
	Copyright: N. Parsons (C) 2018
*/
class Particle {
	constructor(x, y, r, hex) {
		this.position = new Vector2d(x, y);
		this.r = r;
		
		this.color = "#" +hex;
		this.velocity = new Vector2d(0);
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
	}

	move(mx, my) {
		this.mouse = new Vector2d(mx, my);

		this.mouse.sub(this.position);
		this.mouse.setMag(1/2);
		this.acceleration = this.mouse;

		this.velocity.add(this.acceleration);
		// velocity.add(acceleration);
		this.velocity.mult(1.5);
		this.position.add(this.velocity);

		this.velocity.limit(2.5);
	}
}
