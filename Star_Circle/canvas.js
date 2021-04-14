//setup
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);
var c = canvas.getContext('2d')

////////MAIN CUSTOMIZE VARIABLES HERE


var backg = "rgba(18,18,18)"				//background colour
var rgba_backg = "rgba(18,18,18,0.1)"  		//change last value for opacity/trail length
var innermost=100; 							//smallest circle range
var velocityBoostHold = 0.01;

var colours = [
"#7EC8E3",
"#0000FF",
"#000C66",
"#050A30",
"#dcce8e"
]

var dank="#5314a9" 							//dank purple

/////// END CUSTOMIZE

var holding = 0;
//var backgroundStateRE = "rgba(18,18,18,0.5)";	//Opacity when returning to original speed
var velocityBoost=0;
var opacity = 1;
var backgroundState = "rgba(18,18,18,"+String(opacity)+")";
//Mouse movement
var mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('mousemove',function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
})

window.addEventListener('mousedown',function(e) {
	holding = 1;

	window.addEventListener('mouseup',function(e) {
       		holding = 0;
		})
})


//resizing browser size event
window.addEventListener('resize',function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init(); //calling init function
})

function rcolour() {
	return colours[Math.floor(randomrange(0,colours.length))];
}


//function to make a random range between two #s
function randomrange(min, max) {
  return Math.random() * (max - min) + min;
}

//Circles
function Particle(x,y,r,velocity, colour) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.velocity = velocity;
	this.radians = Math.random() * Math.PI *2;
	this.colour = colour;
	this.distanceFromCenter = randomrange(innermost,canvas.width);;


	this.update = function() {

		//Adding velocity and changing backg opacity deppending on if Mouse is held
		if (holding==1) {
			velocityBoost+=0.0001;
			if (opacity>0.05) {
				opacity-=0.00001;
			}
		} else {
			if (opacity<1) {
				opacity +=0.00001;
			}
			if (velocityBoost>0) {					//stops direction reverse when boost hits 0
				velocityBoost-=0.0001;
			}

		}
		backgroundState = "rgba(18,18,18,"+String(opacity)+")";


		//Move points over time
		this.radians += this.velocity +velocityBoost*this.velocity; //if MB held, velocity increases (non-uniformely)
		this.x = x + Math.cos(this.radians)*this.distanceFromCenter; 
		this.y = y + Math.sin(this.radians)*this.distanceFromCenter;

		//interactive 


		this.draw();

	}

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
		c.fillStyle=this.colour;
		c.fill();
		c.closePath();
		
	}
}


//Implementation
let particles =[];

function init() {
	//setting background colour
	opacity=1;
	backgroundState= backg;
	c.fillStyle = backg;
	c.fillRect(0, 0, canvas.width, canvas.height);

	//adding particles to array
	particles= [];

	for ( let i = 0; i < 500; i++) {
		var velocity = randomrange(0.0001,0.001); //I like 0.001, 0.01
		var r = randomrange(1,7);
		var colour = rcolour();
		particles.push(new Particle(canvas.width/2, canvas.height/2, r, velocity,rcolour()))
	}

}

//animate loop
function animate() {
	requestAnimationFrame(animate);

	//trailing effect
	c.fillStyle = backgroundState;
	c.fillRect(0,0,canvas.width, canvas.height);

	//Updating positioning of circles for movement
	for (var i = 0; i <particles.length; i++) {
		particles[i].update();
	}
//console.log(opacity);
}

init();
animate();
