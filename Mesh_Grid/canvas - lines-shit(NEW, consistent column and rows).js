//setup
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);
var c = canvas.getContext('2d')

//Mouse movement
var mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('mousemove',function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
})


//resizing browser size event
window.addEventListener('resize',function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init(); //calling init function
})

//initializing some variables
var maxradius=35;
var minr;
var eventrange = 70;

var dank="#5314a9" //discreet purple


//function to make a random range between two #s
function randomrange(min, max) {
  return Math.random() * (max - min) + min;
}

//Circles
function Circle(x,y,r,dx,dy,offset,homex,homey) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.dx = dx;
	this.dy = dy;
	this.offset = offset;
	this.homex = homex;
	this.homey = homey;
	this.minr = minr;

	this.draw = function() {
		//line
		c.beginPath();
		c.moveTo(0,0);
		//circle
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
		c.strokeStyle=dank;
		c.fillStyle="black";
		c.lineWidth = 1;
		c.fill();
		c.stroke();
		
	}

	this.update = function() {

		//draw lines
		for (i=0 ; i<circleArray.length; i++) {
			c.lineTo(this.x,this.y);
		}
		c.stroke()


		//change direction of circle movement
		if (this.x + this.r > this.homex+offset || this.x - this.r <this.homex-offset) {
			this.dx = -this.dx;
		}
		if (this.y + this.r > this.homey+offset || this.y - this.r <this.homey-offset) {
			this.dy = -this.dy;
		}

		this.x+= this.dx;
		this.y+= this.dy;

		//interactive 
		if (mouse.x - this.x <eventrange && mouse.x - this.x > -eventrange && mouse.y - this.y <eventrange && mouse.y - this.y > -eventrange) {
			
			if (this.r <maxradius) {
				this.r += 1;
			}
		} else if (this.r >this.minr) {
			this.r -= 0.1;
		}


		this.draw();

	}
}

//lines
function Lines(linespan) {
	this.linespan = linespan;

	this.draw = function() {
		c.beginPath();

		for (i=0 ; i<linespan.length ; i++) {

		}


	}

	this.update = function() {


		this.draw()
	}


}



//function creates coordinates for circles in a rough grid
var posx=[];
var posy=[];
var row_num=0;
var col_num=0;

var spacing_min=100
var spacing_max=150

var variationx = -50;
var variationy= -50;

function cposition() {
	posx=[];
	posy=[];

	col_num = Math.floor( innerWidth / spacing_max ) + 5;
	row_num = Math.floor(innerHeight / spacing_max ) + 4;

	for (i=0; i <row_num; i++) {
		for (j=0; j <col_num; j++) {
			var yi = randomrange(variationy,variationy+30); //so that the top row isnt alligned
			var xj = randomrange(variationx,variationx+30); //so that the left col isnt alligned
			posx[posx.length] = xj;
			posy[posy.length] = yi;
			variationx += randomrange(spacing_min,spacing_max);
		}
		variationy += randomrange(spacing_min,spacing_max);
		variationx = -50;

	}
	//resetting counters
	variationx = -50;
	variationy= -50;


	console.log(posx);
	console.log(posy);
}

//mapping circles
function gridaz() {
	


}

//Initiate function. Adds circles to circle arrays
////uses cposition() function and randomized values for each circle
var circleArray=[];

function init() {

	cposition();

	circleArray=[];
	for (var i = 0; i <posx.length; i++) {
		// var x = Math.random() * (innerWidth - r*2) + r;
		// var y = Math.random() * (innerHeight - r*2) + r;
		var x = posx[i];
		var y = posy[i];
		var r = (Math.random() * 4) + 2;
		var dx = (Math.random() -0.5) *0.1;
		var dy = (Math.random() -0.5) *0.1;
		var offset = randomrange(10,30); //the amound circles can shift
		var homex = x; //default x pos of the circle
		var homey = y; //default y pos of the circle
		minr = r;
		circleArray.push(new Circle(x, y, r, dx, dy, offset, homex, homey));
		
	}

	console.log("# of Rows: "+row_num);
	console.log("# of Columns: "+col_num);
}

//animate
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	//background
	c.fillStyle = "#d1d1d1";
	c.fillRect(0, 0, canvas.width, canvas.height);

	//circles
	for (var i = 0; i <circleArray.length; i++) {
		circleArray[i].update();
	}



}

init();
animate();
// console.log(circleArray.length);
// console.log(posx.length);
// console.log(posy.length);

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
