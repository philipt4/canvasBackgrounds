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

var dank="#5314a9" //dank purple


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
		// //line
		// c.beginPath();
		// c.moveTo(0,0);
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
		// //draw lines
		// for (i=0 ; i<circleArray.length; i++) {
		// 	c.lineTo(this.x,this.y);
		// }
		// c.stroke()


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


//function creates coordinates for circles in a rough grid
var posx=[];
var posy=[];
var row_num=0;
var col_num=0;

var spacing_min=100
var spacing_max=150

var variationx = 30;  ////// set to -50 after testing to have off-screen circles
var variationy= 30;  ////// set to -50 after testing to have off-screen circles

function cposition() {
	posx=[];
	posy=[];

	col_num = Math.floor( innerWidth / spacing_max ) + 2; /////// set to 4 after testing to have off-screen circles
	row_num = Math.floor(innerHeight / spacing_max ) + 2; /////// set to 4 after testing to have off-screen circles

	for (i=0; i <row_num; i++) {
		for (j=0; j <col_num; j++) {
			var yi = randomrange(variationy,variationy+30); //so that the top row isnt alligned to have off-screen circles
			var xj = randomrange(variationx,variationx+30); //so that the left col isnt alligned to have off-screen circles
			posx[posx.length] = xj;
			posy[posy.length] = yi;
			variationx += randomrange(spacing_min,spacing_max);
		}
		variationy += randomrange(spacing_min,spacing_max);
		variationx = 30; ////// set to -50 after testing to have off-screen circles

	}
	//resetting counters
	variationx = 30; ////// set to -50 after testing to have off-screen circles
	variationy= 30;  ////// set to -50 after testing to have off-screen circles


	//console.log(posx);
	//console.log(posy);


}


//Initiate function. Adds circles to circle arrays
////uses cposition() function and randomized values for each circle
var circleArray=[];
var colArray = [];
var rowArray = [];

function init() {

	cposition();

	circleArray=[];
	for (var i = 0; i <posx.length; i++) {
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

//Function to create lines
function lines() {
	//horizontal lines
	c.beginPath();
	for (j = 0 ; j < row_num ; j++) {
		c.moveTo(circleArray[j*col_num].x,circleArray[j*col_num].y);
		for (i = 0 ; i < col_num ; i++) {
			c.lineTo(circleArray[i+col_num*j].x,circleArray[i+col_num*j].y);
		}
	}

	//vertical lines
	for (j = 0 ; j < col_num ; j++) {
		c.moveTo(circleArray[j].x,circleArray[j].y);
		for (i = 0 ; i < row_num ; i++) {
			c.lineTo(circleArray[j+col_num*i].x,circleArray[j+col_num*i].y);
		}
	}
	//diagonals
var co;
	for (j = 1 ; j < col_num ; j++) {
		for (i = 0 ; i < row_num-1 ; i++) {
			co=i+1;
			c.moveTo(circleArray[j+i*col_num].x,circleArray[j+i*col_num].y);
			c.lineTo(circleArray[j+co*col_num-1].x,circleArray[j+co*col_num-1].y);
		}
	}

	// for (j = 1 ; j < col_num ; j++) {
	// 	for (i = 0 ; i < col_num ; i++) {
	// 		c.moveTo(circleArray[j+i].x,circleArray[j+i].y);
	// 		c.lineTo(circleArray[j+col_num-1+i].x,circleArray[j+col_num-1+i].y);
	// 	}
	// }



	c.strokeStyle=dank;
	c.lineWidth = 1;
	c.stroke();
}

//animate loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	//background
	c.fillStyle = "#d1d1d1";
	c.fillRect(0, 0, canvas.width, canvas.height);

	//PLACING LINES
	lines();

	//Updating positioning of circles for movement
	for (var i = 0; i <circleArray.length; i++) {
		circleArray[i].update();
	}

}

init();
animate();
