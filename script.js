
var room = document.getElementById("room");
var roomWidth;
var roomHeight;

if (localStorage.getItem("fullscreen") === "on") {             //adding fullscreen option
	roomWidth = screen.width - Number(localStorage.getItem("largestBlockSize"))*0.36; // substracting border size to accomodate room with borders
	roomHeight = screen.height*0.802 - Number(localStorage.getItem("largestBlockSize"))*0.36;

	room.style.width = roomWidth + "px";
	room.style.height = roomHeight + "px";
} else {
	roomWidth = localStorage.getItem("width");
	roomHeight = localStorage.getItem("height");
	room.style.height = roomHeight + "px";
	room.style.width = roomWidth + "px";
	room.style.border = "6px solid black";
}
room.style.backgroundColor = localStorage.getItem("colorInput");
room.style.border = Number(localStorage.getItem("largestBlockSize"))*0.18 + "px double white"; //making borders for border collisions

var amountOfBlocks = localStorage.getItem("amountOfBlocks");

var blocks = []; //declaration of array of objects(blocks)

var availPosLeft = 0; // available positions for addElement()
var availPosTop = 0;
var availPosTopNext = 0;

//Determining movement direction of user with keydown - keyup
var upPressed = false; var downPressed = false; var leftPressed = false; var rightPressed = false;
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowUp") {
    upPressed=true;
  } else if (event.key === "ArrowDown") {
    downPressed=true;
  } else if (event.key === "ArrowLeft") {
    leftPressed=true;
  } else if (event.key === "ArrowRight") {
    rightPressed=true;
  };
});
document.addEventListener("keyup", function(event) {
  if (event.key === "ArrowUp") {
    upPressed=false;
  } else if (event.key === "ArrowDown") {
    downPressed=false;
  } else if (event.key === "ArrowLeft") {
    leftPressed=false;
  } else if (event.key === "ArrowRight") {
    rightPressed=false;
  };
});

createBlocks();

setInterval(allBlocksMovement, 20);


function position (i) {
	blocks[i].x = Number(document.getElementById("block" + i).style.left.slice(0, -2)) + Number(blocks[i].blockSize)/2; //gets position of block's center on x-axis
	blocks[i].y = Number(document.getElementById("block" + i).style.top.slice(0, -2)) + Number(blocks[i].blockSize)/2; //gets position of block's center on y-axis	
}

function randomizer (i) { 
	blocks[i].randomDir = Math.floor(Math.random() * 8) + 1; //random number for direction
	blocks[i].randomSteps = Math.floor(Math.random() * (blocks[i].blockStepsMax-blocks[i].blockStepsMin)) + blocks[i].blockStepsMin; //random number for amount of steps in one direction (between min and max)
	blocks[i].j = 1; // counter for amount of steps in one direction
}

function addElement (i) { //creates block in HTML

	var div = document.createElement("div");
	div.setAttribute("id","block" + i);
	div.style.width = blocks[i].blockSize + "px";
	div.style.height = blocks[i].blockSize + "px";
	div.style.fontSize = blocks[i].blockSize*0.7 + "px";
	div.style.margin = "0px 0px 0px 0px";
	div.style.padding = "0px 0px 0px 0px";
	div.style.position = "absolute";
	div.innerHTML = localStorage.getItem("emo"+i);

	// div.style.background = "blue";  //for collision testing
	// if (i===1) {div.style.background = "red"};

	if (availPosLeft + blocks[i].blockSize > roomWidth) { //blocks positioning inside the room without overlaping 
		if (availPosTopNext + blocks[i].blockSize > roomHeight) { //problems can occur in non-rectangular rooms
			alert("Too many or too large items in the room!");
			location.href ="index.html";
		};

		div.style.top = availPosTopNext + blocks[i].blockStep + 1 + "px"; //new row
		div.style.left = "0px";

		availPosLeft = blocks[i].blockSize;
		availPosTop = availPosTopNext;
		availPosTopNext = availPosTop + blocks[i].blockSize;

	} else {
		div.style.top = availPosTop + blocks[i].blockStep + 1 + "px"; //old row
		div.style.left = availPosLeft + blocks[i].blockStep + 1 + "px";

		availPosLeft = availPosLeft + blocks[i].blockSize;
		if (availPosTop + blocks[i].blockSize > availPosTopNext) { //finding highest block for the next row
			availPosTopNext = availPosTop + blocks[i].blockSize;
		};
	};

	document.getElementById("room").appendChild(div); //appends block to the "room" div
}

function createBlocks() {

	for (var i=0; i<amountOfBlocks; i++) {

		blocks[i] = {}; // declaration of object insde of the array

		blocks[i].blockSize = Number(localStorage.getItem("size"+i)); // size of the object
		blocks[i].blockStep = Number(localStorage.getItem("speed"+i)); // length oh single object's step: changes it's individual speed
		blocks[i].behavior = localStorage.getItem("behavior"+i);

		var min; var max; //minimum and maximum steps divider
		if (blocks[i].behavior==="random") {min=6;max=3;} else if (blocks[i].behavior==="crazy") {min=10;max=5;} else {min=1;max=1;};
		blocks[i].blockStepsMin = ((Number(roomWidth)+Number(roomHeight))/2)/blocks[i].blockStep/min; // minimal part of the room in one direction -- average of room's width and height used, important for non-rectangular rooms
		blocks[i].blockStepsMax = ((Number(roomWidth)+Number(roomHeight))/2)/blocks[i].blockStep/max; // maximal part of the room in one direction

		if (blocks[i].behavior==="physicalCons" || blocks[i].behavior==="physicalFade" || blocks[i].behavior==="player") { //not increasing j for physical objects(no random turns)
			blocks[i].jBehavior = "off";
		} else {blocks[i].jBehavior = "on";};

		randomizer (i); //randomizes numbers for the first move

		addElement (i);
	};
};

function allBlocksMovement(){

 	for (var i=0; i<amountOfBlocks; i++) { //moving every block

	 	var block = document.getElementById("block" + i);

	 	if (blocks[i].behavior==="player") {//moving player
	 		if (upPressed || downPressed || leftPressed || rightPressed) {
	 			switch (true) {
	 				case upPressed: blocks[i].randomDir=4; break;
	 				case downPressed: blocks[i].randomDir=3; break;
	 				case leftPressed: blocks[i].randomDir=2; break; 
	 				case rightPressed: blocks[i].randomDir=1; break;
	 			};
	 			switch (true) {
	 				case upPressed && leftPressed: blocks[i].randomDir=6; break;
	 				case downPressed && leftPressed: blocks[i].randomDir=7; break;
	 				case rightPressed && upPressed: blocks[i].randomDir=8; break; 
	 				case rightPressed && downPressed: blocks[i].randomDir=5; break;
	 			};
	 			move();
	 		};
	 	} else {move();}; //moving everything else

		position(i);

		for (var z=0; z<amountOfBlocks; z++) {  // collision detection with all blocks
			if (z !== i) { 						// aviodind detecting collision with itself
				if (blocks[i].x - (blocks[i].blockSize/2)*0.66 < blocks[z].x + (blocks[z].blockSize/2)*0.66 && //0.66 is used to ajust emojis collision model
   				blocks[i].x + (blocks[i].blockSize/2)*0.66 > blocks[z].x - (blocks[z].blockSize/2)*0.66 && 
  				blocks[i].y - (blocks[i].blockSize/2)*0.66 < blocks[z].y + (blocks[z].blockSize/2)*0.66 && 
   				blocks[i].y + (blocks[i].blockSize/2)*0.66 > blocks[z].y - (blocks[z].blockSize/2)*0.66) { 

					blocks[z].randomDir = blocks[i].randomDir; //bumping victim block to the current block movement direction

					if (blocks[i].randomDir === 1 || blocks[i].randomDir === 3 || blocks[i].randomDir === 5 || blocks[i].randomDir === 7) { //reversing current block movement direction
						blocks[i].randomDir = blocks[i].randomDir + 1;
					} else {
						blocks[i].randomDir = blocks[i].randomDir - 1;
					};

					//randomizing amount of steps for both
					blocks[i].randomSteps = Math.floor(Math.random() * (blocks[i].blockStepsMax-blocks[i].blockStepsMin)) + blocks[i].blockStepsMin; 
					blocks[i].j = 1;

					blocks[z].randomSteps = Math.floor(Math.random() * (blocks[i].blockStepsMax-blocks[i].blockStepsMin)) + blocks[i].blockStepsMin; 
					blocks[z].j = 1;

					if (blocks[z].behavior==="physicalFade") {blocks[z].blockStep=blocks[i].blockStep}; //accelerating fading speed object back

					move(); // move twice to get out of the collision situation
					move();
				};
			};
		};


	 	function move () {

	 		if (blocks[i].jBehavior === "off") {blocks[i].j=0}; //stopping j count for physical objects

	 		if (blocks[i].behavior==="physicalFade") {blocks[i].blockStep=blocks[i].blockStep*0.997}; //fading speed

			position(i);

			switch (blocks[i].randomDir) {

			case 1 : //right
				if (blocks[i].j>blocks[i].randomSteps) { //end of one direction move
					randomizer (i);
				} else if (blocks[i].x + (blocks[i].blockSize/2)*0.62 + blocks[i].blockStep > Number(roomWidth)) {
					randomizer (i);
					blocks[i].randomDir = 2;
					moveLeft(); // wall bump
				} else {moveRight()};
			break;

			case 2 : //left
				if (blocks[i].j>blocks[i].randomSteps) {
					randomizer (i);
				} else if (blocks[i].x - (blocks[i].blockSize/2)*0.62 - blocks[i].blockStep < 0) {
					randomizer (i);
					blocks[i].randomDir = 1;
					moveRight(); 
				} else {moveLeft()};
			break;

			case 3 : //down
				if (blocks[i].j>blocks[i].randomSteps) {
					randomizer (i);
				} else if (blocks[i].y + (blocks[i].blockSize/2)*0.62 + blocks[i].blockStep > Number(roomHeight)) {
					randomizer (i);
					blocks[i].randomDir = 4;
					moveUp();
				} else {moveDown()};
			break;

			case 4 : //up
				if (blocks[i].j>blocks[i].randomSteps) {
					randomizer (i);
				} else if (blocks[i].y - (blocks[i].blockSize/2)*0.62 - blocks[i].blockStep < 0 ) {
					randomizer (i);
					blocks[i].randomDir = 3;
					moveDown();
				} else {moveUp()};
			break;

			case 5 : //right-down
				if (blocks[i].j>blocks[i].randomSteps) { //end of one direction move
					randomizer (i);
				} else if (blocks[i].x + (blocks[i].blockSize/2)*0.62 + blocks[i].blockStep > Number(roomWidth)) { // right wall bump
					randomizer (i);
					blocks[i].randomDir = 7;
					moveLeftDown();
				} else if (blocks[i].y + (blocks[i].blockSize/2)*0.62 + blocks[i].blockStep > Number(roomHeight)) {//bottom wall bump
					randomizer (i);
					blocks[i].randomDir = 8;
					moveRightUp();
				} else {moveRightDown()};
			break;

			case 6 : //left - up
				if (blocks[i].j>blocks[i].randomSteps) {
					randomizer (i);
				} else if (blocks[i].x - (blocks[i].blockSize/2)*0.62 - blocks[i].blockStep < 0) { //left wall bump
					randomizer (i);
					blocks[i].randomDir = 8;
					moveRightUp(); 
				} else if (blocks[i].y - (blocks[i].blockSize/2)*0.62 - blocks[i].blockStep < 0 ) {//top wall bump
					randomizer (i);
					blocks[i].randomDir = 7;
					moveLeftDown();
				} else {moveLeftUp()};
			break;

			case 7 : //left-down
				if (blocks[i].j>blocks[i].randomSteps) {
					randomizer (i);
				} else if (blocks[i].y + (blocks[i].blockSize/2)*0.62 + blocks[i].blockStep > Number(roomHeight)) { //bottom wall bump
					randomizer (i);
					blocks[i].randomDir = 6;
					moveLeftUp();
				} else if (blocks[i].x - (blocks[i].blockSize/2)*0.62 - blocks[i].blockStep < 0 ) {//left wall bump
					randomizer (i);
					blocks[i].randomDir = 5;
					moveRightDown();
				} else {moveLeftDown()};
			break;

			case 8 : //right-up	
				if (blocks[i].j>blocks[i].randomSteps) {
					randomizer (i);
				} else if (blocks[i].y - (blocks[i].blockSize/2)*0.62 - blocks[i].blockStep < 0 ) { //top wall bump
					randomizer (i);
					blocks[i].randomDir = 5;
					moveRightDown();
				} else if (blocks[i].x + (blocks[i].blockSize/2)*0.62 + blocks[i].blockStep > Number(roomWidth)) { // right wall bump
					randomizer (i);
					blocks[i].randomDir = 6;
					moveLeftUp();
				} else {moveRightUp()};
			break;

			default :
				alert("Something bad happned ;(");
			};


			function moveRight () {
				block.style.left = (Number(block.style.left.slice(0, -2)) + blocks[i].blockStep) + "px";
				block.style.transform = "scale(-1, 1)"; //flippin
				blocks[i].j =blocks[i].j + 1;
			};

			function moveDown () {
				block.style.top = (Number(block.style.top.slice(0, -2)) + blocks[i].blockStep) + "px";
				blocks[i].j =blocks[i].j + 1;
			};

			function moveLeft () {
				block.style.left = (Number(block.style.left.slice(0, -2)) - blocks[i].blockStep) + "px";
				block.style.transform = "scale(1, 1)";
				blocks[i].j =blocks[i].j + 1;
			};

			function moveUp () {
				block.style.top = (Number(block.style.top.slice(0, -2)) - blocks[i].blockStep) + "px";
				blocks[i].j =blocks[i].j + 1;
			};

			function moveRightDown () {
				block.style.left = (Number(block.style.left.slice(0, -2)) + blocks[i].blockStep/2) + "px"; //right
				block.style.top = (Number(block.style.top.slice(0, -2)) + blocks[i].blockStep/2) + "px"; //down
				block.style.transform = "scale(-1, 1)";
				blocks[i].j =blocks[i].j + 1;
			};

			function moveLeftDown () {
				block.style.left = (Number(block.style.left.slice(0, -2)) - blocks[i].blockStep/2) + "px"; //left
				block.style.top = (Number(block.style.top.slice(0, -2)) + blocks[i].blockStep/2) + "px"; //down
				block.style.transform = "scale(1, 1)";
				blocks[i].j =blocks[i].j + 1;
			};

			function moveLeftUp () {
				block.style.left = (Number(block.style.left.slice(0, -2)) - blocks[i].blockStep/2) + "px"; //left
				block.style.top = (Number(block.style.top.slice(0, -2)) - blocks[i].blockStep/2) + "px"; //up
				block.style.transform = "scale(1, 1)";
				blocks[i].j =blocks[i].j + 1;
			};

			function moveRightUp () {
				block.style.left = (Number(block.style.left.slice(0, -2)) + blocks[i].blockStep/2) + "px"; //right
				block.style.top = (Number(block.style.top.slice(0, -2)) - blocks[i].blockStep/2) + "px"; //up
				block.style.transform = "scale(-1, 1)";
				blocks[i].j =blocks[i].j + 1;
			};
		};
	};
};