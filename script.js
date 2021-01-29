var block = document.getElementById("cat");
var room = document.getElementById("room");

var random = Math.floor(Math.random() * 4) + 1;
var random2 = Math.floor(Math.random() * 10);
var i = 1;
var roomWidth = prompt("Print room size!")
var catSize = prompt("Print cat size!")
var catSpeed = prompt("Print cat speed!")

room.style.height = roomWidth + "px";
room.style.width = roomWidth + "px";

block.style.height = catSize/0.7 + "px";
block.style.width = catSize/0.7 + "px";
block.style.fontSize = catSize + "px";

setInterval(movement, 500/catSpeed);

 function movement(){

	function moveRight () {
		block.style.borderLeftWidth = (Number(block.style.borderLeftWidth.slice(0, -2)) + 8) + "px";
		i++;
	}

	function moveDown () {
		block.style.borderTopWidth = (Number(block.style.borderTopWidth.slice(0, -2)) + 8) + "px";
		i++;
	}

	function moveLeft () {
		block.style.borderLeftWidth = (Number(block.style.borderLeftWidth.slice(0, -2)) - 8) + "px";
		i++;
	}

	function moveUp () {
		block.style.borderTopWidth = (Number(block.style.borderTopWidth.slice(0, -2)) - 8) + "px";
		i++;
	}

	if (random === 1) {
		if (i>random2 || Number(block.style.borderLeftWidth.slice(0, -2)) > Number(roomWidth)-Number(catSize/0.7)-8 ) {
			random = Math.floor(Math.random() * 4) + 1;
			random2 = Math.floor(Math.random() * 10);
			i = 1;
		} else {moveRight();}
	} else if (random === 2) {
		if (i>random2 || Number(block.style.borderLeftWidth.slice(0, -2)) < 2 ) {
			random = Math.floor(Math.random() * 4) + 1;
			random2 = Math.floor(Math.random() * 10);
			i = 1;
		} else {moveLeft();}
	} else if (random === 3) {
		if (i>random2 || Number(block.style.borderTopWidth.slice(0, -2)) > Number(roomWidth)-Number(catSize/0.7)-8 ) {
			random = Math.floor(Math.random() * 4) + 1;
			random2 = Math.floor(Math.random() * 10);
			i = 1;
		} else {moveDown();}
	} else if (random === 4) {	
		if (i>random2 || Number(block.style.borderTopWidth.slice(0, -2)) < 2 ) {
			random = Math.floor(Math.random() * 4) + 1;
			random2 = Math.floor(Math.random() * 10);
			i = 1;
		} else {moveUp();}
	} else {
		alert("Something bad happned ;(");
	}

}

