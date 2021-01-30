var room = document.getElementById("room");
var roomWidth = prompt("Print room width! (pixels)");
var roomHeight;

if (roomWidth === "fullscreen") {             //adding fullscreen option
	room.style.width = screen.width + "px";
	room.style.height = screen.height + "px";

	roomWidth = screen.width;
	roomHeight = screen.height;
} else {
	roomHeight = prompt("Print room height! (pixels)");
	room.style.height = roomHeight + "px";
	room.style.width = roomWidth + "px";
	room.style.border = "6px solid black";
}


var amountOfBlocks = prompt("How many crazy blocks do you want?");

var blocks = []; //declaration of array of objects

var availPosLeft = 0; // available positions for addElement()
var availPosTop = 0;
var availPosTopNext = 0;

createBlocks();

setInterval(allBlocksMovement, 20);


function position (i) {
	blocks[i].x = Number(document.getElementById("block" + i).style.left.slice(0, -2)) + Number(blocks[i].blockSize)/2; //gets position of block's center on x-axis
	blocks[i].y = Number(document.getElementById("block" + i).style.top.slice(0, -2)) + Number(blocks[i].blockSize)/2; //gets position of block's center on y-axis	
}

function randomizer (i) { 
	blocks[i].randomDir = Math.floor(Math.random() * 4) + 1; //random number for direction
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
	div.innerHTML = "😺";

	// div.style.background = "blue";  //for collision testing
	// if (i===1) {div.style.background = "red"};

	if (availPosLeft + blocks[i].blockSize > roomWidth) { //blocks positioning inside the room without overlaping 
		if (availPosTopNext + blocks[i].blockSize > roomHeight) { //problems can occur in non-rectangular rooms
			alert("Too many or too large items in the room!");
			location.reload();
		};

		div.style.top = availPosTopNext + 1 + "px";
		div.style.left = "0px";

		availPosLeft = blocks[i].blockSize;
		availPosTop = availPosTopNext;
		availPosTopNext = availPosTop + blocks[i].blockSize;

	} else {
		div.style.top = availPosTop + 1 + "px";
		div.style.left = availPosLeft + 1 + "px";

		availPosLeft = availPosLeft + blocks[i].blockSize;
		if (availPosTop + blocks[i].blockSize > availPosTopNext) {
			availPosTopNext = availPosTop + blocks[i].blockSize;
		};
	};

	document.getElementById("room").appendChild(div); //appends block to the "room" div
}

function createBlocks() {

	for (var i=0; i<amountOfBlocks; i++) {

		blocks[i] = {}; // declaration of object insde of the array

		blocks[i].blockSize = Number(prompt("Print block N" + (i+1) + " size! (pixels)")); // size of the object
		blocks[i].blockStep = Number(prompt("Print block N" + (i+1) + " speed!")); // length oh single object's step: changes it's individual speed
		blocks[i].blockStepsMin = ((Number(roomWidth)+Number(roomHeight))/2)/blocks[i].blockStep/4; // minimal part of the room in one direction -- average of room's width and height used, important for non-rectangular rooms
		blocks[i].blockStepsMax = ((Number(roomWidth)+Number(roomHeight))/2)/blocks[i].blockStep/2; // maximal part of the room in one direction

		randomizer (i); //randomizes numbers for the first move

		addElement (i);
	};
};

function allBlocksMovement(){

 	for (var i=0; i<amountOfBlocks; i++) { //moving every block

	 	var block = document.getElementById("block" + i);

		move();

		position(i);

		for (var z=0; z<amountOfBlocks; z++) {  // collision detection with all blocks
			if (z !== i) { 						// aviodind detecting collision with itself
				if (blocks[i].x - blocks[i].blockSize/3 < blocks[z].x + blocks[z].blockSize/3 && //left collision
   				blocks[i].x + blocks[i].blockSize/3 > blocks[z].x - blocks[z].blockSize/3 && // right collision
  				blocks[i].y - blocks[i].blockSize/3 < blocks[z].y + blocks[z].blockSize/3 && // top collision
   				blocks[i].y + blocks[i].blockSize/3 > blocks[z].y - blocks[z].blockSize/3) { // bottom collision

					blocks[z].randomDir = blocks[i].randomDir; //bumping victim block

					if (blocks[i].randomDir === 1 || blocks[i].randomDir === 3) { //reversing current block movement direction
						blocks[i].randomDir = blocks[i].randomDir + 1;
					} else {
						blocks[i].randomDir = blocks[i].randomDir - 1;
					};

					//randomizing amount of steps for both
					blocks[i].randomSteps = Math.floor(Math.random() * (blocks[i].blockStepsMax-blocks[i].blockStepsMin)) + blocks[i].blockStepsMin; 
					blocks[i].j = 1;

					blocks[z].randomSteps = Math.floor(Math.random() * (blocks[i].blockStepsMax-blocks[i].blockStepsMin)) + blocks[i].blockStepsMin; 
					blocks[z].j = 1;

					move(); // move twice to get out of the collision situation
					move();
				};
			};
		};


	 	function move () {

			position(i);

			switch (blocks[i].randomDir) {

			case 1 :
				if (blocks[i].j>blocks[i].randomSteps || blocks[i].x + (blocks[i].blockSize/2) + blocks[i].blockStep > Number(roomWidth) ) {
					randomizer (i);
				} else {moveRight()};
			break;

			case 2 : 
				if (blocks[i].j>blocks[i].randomSteps || blocks[i].x - (blocks[i].blockSize/2) - blocks[i].blockStep < 0 ) {
					randomizer (i);
				} else {moveLeft()};
			break;

			case 3 :
				if (blocks[i].j>blocks[i].randomSteps || blocks[i].y + (blocks[i].blockSize/2) + blocks[i].blockStep > Number(roomHeight) ) {
					randomizer (i);
				} else {moveDown()};
			break;

			case 4 : 	
				if (blocks[i].j>blocks[i].randomSteps || blocks[i].y - (blocks[i].blockSize/2) - blocks[i].blockStep < 0 ) {
					randomizer (i);
				} else {moveUp()};
			break;

			default :
				alert("Something bad happned ;(");
			}


			function moveRight () {
				block.style.left = (Number(block.style.left.slice(0, -2)) + blocks[i].blockStep) + "px";
				blocks[i].j =blocks[i].j + 1;
			}

			function moveDown () {
				block.style.top = (Number(block.style.top.slice(0, -2)) + blocks[i].blockStep) + "px";
				blocks[i].j =blocks[i].j + 1;
			}

			function moveLeft () {
				block.style.left = (Number(block.style.left.slice(0, -2)) - blocks[i].blockStep) + "px";
				blocks[i].j =blocks[i].j + 1;
			}

			function moveUp () {
				block.style.top = (Number(block.style.top.slice(0, -2)) - blocks[i].blockStep) + "px";
				blocks[i].j =blocks[i].j + 1;
			}
		}	
	}
}





