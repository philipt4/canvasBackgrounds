//setup
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);
var c = canvas.getContext('2d')

// //rectangle
// c.fillRect(100,100,100,100);


// //Line
// c.strokeStyle="blue";
// c.lineWidth = 4;

// c.beginPath();
// c.moveTo(40, 50);
// c.lineTo(60, 250);
// c.lineTo(50, 250);
// c.stroke();

// // Arc / Circle
// c.beginPath();
// c.arc(300,300,30,0,Math.PI*2,false);
// c.stroke();



function Circle(x,y,r,dx,dy) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.dx = dx;
	this.dy = dy;

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
		c.strokeStyle="black";
		c.fillStyle="purple";
		c.lineWidth = 1;
		c.fill();
		c.stroke();
	}

	this.update = function() {
		if (this.x + this.r > innerWidth || this.x - this.r <0) {
			this.dx = -this.dx;
		}
		if (this.y + this.r > innerHeight || this.y - this.r <0) {
			this.dy = -this.dy;
		}

		this.x+= this.dx;
		this.y+= this.dy;

		this.draw();

	}
}

var circleArray=[];

for (var i = 0; i <300; i++) {
	var x = Math.random() * (innerWidth - r*2) + r;
	var y = Math.random() * (innerHeight - r*2) + r;
	var r = (Math.random() * 5) + 2;
	var dx = (Math.random() -0.5) *3;
	var dy = (Math.random() -0.5) *3;
	circleArray.push(new Circle(x, y, r, dx, dy));

}

console.log(circleArray);

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	
	for (var i = 0; i <circleArray.length; i++) {
		circleArray[i].update();
	}


}

animate();