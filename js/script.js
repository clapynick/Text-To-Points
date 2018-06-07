$(function(){
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');

	var r = 4; // 4
	var accuracy = 2; // 2
	ctx.font = "100px Georgia";
	var text = prompt("Enter some text:");
	var txtWidth = ctx.measureText(text).width;
	txtWidth = txtWidth > canvas.width ? canvas.width : txtWidth;
	var txtHeight = ctx.measureText('M').width; 
	txtHeight += (txtHeight * 0.30)
	txtHeight = txtHeight > canvas.height ? canvas.height : txtHeight;
	
	var points = getTextPoints(text, canvas, ctx, accuracy);

	var mouseX = null;
	var mouseY = null;

	var onCanvas = false;
   	$("#myCanvas").mousemove(function(e) {
   		onCanvas = true;
		mouseX = getMousePos(canvas, e).x;
		mouseY = getMousePos(canvas, e).y;
	});

	$("#myCanvas").mouseleave(function(){
		onCanvas = false;
	});


	function getTextPoints(text, canvas, ctx, accuracy){
		function translatePoints(points, width, height, scl) {
			width *= scl; // Multiply the width by the scale to use in translations later
			height *= scl; // Multiply the height by the scale to use in transations later

			var points = points.map((elem) => { // Use map to modify each partical's vector
				elem.position.mult(scl); // Scale the vector the passed scale
				elem.position.setX(elem.position.getX() + (canvas.width/2 - width/2)); // Move all x positions so they are anchored around the center x pos
				elem.position.setY(elem.position.getY() + (canvas.height/2 - height/2)); // Move all y positions so they are anchored around the center y pos
				return elem;
			});
			return points;
		}

		function getPointHex(x, y, ctx){
			var rbg = ctx.getImageData(x, y, 1, 1).data;
			return ("#" + ("000000" + rgbToHex(rbg[0], rbg[1], rbg[2])).slice(-6));
		}

		ctx.beginPath();
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'black';
	
		ctx.fillText(text, 0, (txtHeight/2) + (txtHeight * 0.30));

		var points = [];

		for(var x = 0; x < txtWidth; x+=accuracy){
			for(var y = 0; y < txtHeight; y+=accuracy){
				if(getPointHex(x, y, ctx) == "#000000"){ // If the pixle is black then add it to the points
					points.push(new Particle(x, y, r, color(x/txtWidth))); // Add a particle at the found position
				}
			}
		}

		// Set bg color
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		translatePoints(points, txtWidth, txtHeight, 2);

		return points;
	}

	var originalPoints = points.slice();

	setInterval(function() {
		clearCanvas(canvas, ctx);
		for(var i in points) {
			points[i].draw(ctx);
			if(onCanvas) {
				points[i].move(mouseX, mouseY);
			} /*else if(!onCanvas){
				points[i].velocity = new Vector2d(0); 
				points[i].acceleration = new Vector2d(0);
				if(points === originalPoints) console.log("hm");
				points[i].move(originalPoints[i].position.x, originalPoints[i].position.y);
				console.log("Point x :" + points[i].position.x);
			}*/
		}
	});
});