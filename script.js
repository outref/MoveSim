var room = document.getElementById("room");
var roomWidth = prompt("Print room size! (pixels)");
room.style.height = roomWidth + "px";
room.style.width = roomWidth + "px";

var amountOfCats = prompt("How many crazy cats do you want?")

var cats = [];

function createCats() {

for (var i=0; i<amountOfCats; i++) {
	cats[i] = {
		catSize: Number(prompt("Print cat N" + (i+1) + " size! (pixels)")),
		indCatSpeed: Number(prompt("Print cat N" + (i+1) + " speed!"))
	};

	cats[i].catStep = cats[i].indCatSpeed;
	cats[i].catStepsMin = roomWidth/cats[i].catStep/4;
	cats[i].catStepsMax = roomWidth/cats[i].catStep/2;

	cats[i].random = Math.floor(Math.random() * 4) + 1;
	cats[i].random2 = Math.floor(Math.random() * (cats[i].catStepsMax-cats[i].catStepsMin)) + cats[i].catStepsMin;
	cats[i].j = 1;

	var div = document.createElement("div");
	div.setAttribute("id","cat" + i);
	div.style.width = cats[i].catSize/0.7 + "px";
	div.style.height = cats[i].catSize/0.7 + "px";
	div.style.fontSize = cats[i].catSize + "px";
	div.style.position = "absolute";
	div.innerHTML = "😺";

	document.getElementById("room").appendChild(div);

};
	return cats;
};

createCats();

setInterval(allCatsMovement, 20);

 function allCatsMovement(){

 	for (var i=0; i<amountOfCats; i++) {

 	var block = document.getElementById("cat" + i);

 	function move () {

	function moveRight () {
		block.style.left = (Number(block.style.left.slice(0, -2)) + cats[i].catStep) + "px";
		cats[i].j =cats[i].j + 1;
	}

	function moveDown () {
		block.style.top = (Number(block.style.top.slice(0, -2)) + cats[i].catStep) + "px";
		cats[i].j =cats[i].j + 1;
	}

	function moveLeft () {
		block.style.left = (Number(block.style.left.slice(0, -2)) - cats[i].catStep) + "px";
		cats[i].j =cats[i].j + 1;
	}

	function moveUp () {
		block.style.top = (Number(block.style.top.slice(0, -2)) - cats[i].catStep) + "px";
		cats[i].j =cats[i].j + 1;
	}

	if (cats[i].random === 1) {
		if (cats[i].j>cats[i].random2 || Number(block.style.left.slice(0, -2)) > Number(roomWidth)-Number(cats[i].catSize/0.7)-8 ) {
			cats[i].random = Math.floor(Math.random() * 4) + 1;
			cats[i].random2 = Math.floor(Math.random() * (cats[i].catStepsMax-cats[i].catStepsMin)) + cats[i].catStepsMin;
			cats[i].j = 1;
			move ();
		} else {moveRight();}
	} else if (cats[i].random === 2) {
		if (cats[i].j>cats[i].random2 || Number(block.style.left.slice(0, -2)) < 2 ) {
			cats[i].random = Math.floor(Math.random() * 4) + 1;
			cats[i].random2 = Math.floor(Math.random() * (cats[i].catStepsMax-cats[i].catStepsMin)) + cats[i].catStepsMin;
			cats[i].j = 1;
			move ();
		} else {moveLeft();}
	} else if (cats[i].random === 3) {
		if (cats[i].j>cats[i].random2 || Number(roomWidth)-Number(block.style.top.slice(0, -2))-Number(cats[i].catSize/0.7) + 3 < cats[i].catStep) {
			cats[i].random = Math.floor(Math.random() * 4) + 1;
			cats[i].random2 = Math.floor(Math.random() * (cats[i].catStepsMax-cats[i].catStepsMin)) + cats[i].catStepsMin;
			cats[i].j = 1;
			move();
		} else {moveDown();}
	} else if (cats[i].random === 4) {	
		if (cats[i].j>cats[i].random2 || Number(block.style.top.slice(0, -2)) < 2 ) {
			cats[i].random = Math.floor(Math.random() * 4) + 1;
			cats[i].random2 = Math.floor(Math.random() * (cats[i].catStepsMax-cats[i].catStepsMin)) + cats[i].catStepsMin;
			cats[i].j = 1;
			move ();
		} else {moveUp();}
	} else {
		alert("Something bad happned ;(");
	}

	}	
	move();
	}

}

