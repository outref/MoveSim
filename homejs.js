var rowNum = 1; // row counter
var rowAm; // items in one row
var totalAm = 0; //total amount of items
var largestBlockSize = 0;

function pasteEmoji(emoji) { //regex pizdec
	var str = emoji.source;
	document.getElementById("emo" + (rowNum-1)).value = str.replace(/\//g, '');
};

function addItem() {
	var div = document.createElement("div"); //addind rows for items
	div.setAttribute("id","list" + rowNum);
	div.setAttribute("class","input-group");
	div.setAttribute("style","margin-top:3vh");
	div.innerHTML = "<input id = \"am" + rowNum + "\" type=\"text\" aria-label=\"Amount\" class=\"form-control\" style=\"width:10%; padding:2px 2px\" value=\"1\">\
  					<input id = \"size" + rowNum + "\" type=\"text\" aria-label=\"Size\" class=\"form-control\" style=\"width:15%\" placeholder=\"Size\">\
  					<input id= \"speed" + rowNum + "\" type=\"text\" aria-label=\"Speed\" class=\"form-control\" style=\"width:20%\" placeholder=\"Speed\">\
  					<input id= \"emo" + rowNum + "\" type=\"text\" aria-label=\"Emo\" class=\"form-control\" style=\"width:20%\" placeholder=\"Emodji\">\
  					<select class=\"form-select\" id=\"behavior" + rowNum + "\" style=\"width:35%\">\
    					<option selected value=\"random\">Random</option>\
    					<option value=\"crazy\">Crazy</option>\
    					<option value=\"physicalCons\">Physical(constant speed)</option>\
    					<option value=\"physicalFade\">Physical(fading speed)</option>\
    					<option value=\"player\">Player</option>\
  					</select>";
	document.getElementById("list").appendChild(div);
	rowNum++;
};

function begin () {
	localStorage.clear();

	if (document.getElementById("fullscreen").checked) { //saving room sizes
	localStorage.setItem("fullscreen", "on");
	}	
	localStorage.setItem("width", document.getElementById("width").value);
	localStorage.setItem("height", document.getElementById("height").value);

	localStorage.setItem("colorInput", document.getElementById("colorInput").value); //saving color

	for (var i=0;i<rowNum;i++) { //saving all items
		rowAm = document.getElementById("am"+i).value; //amount of items in a row
		for (var j=0;j<rowAm;j++) {
			localStorage.setItem("size"+totalAm, document.getElementById("size"+i).value);
			localStorage.setItem("speed"+totalAm, document.getElementById("speed"+i).value);
			localStorage.setItem("emo"+totalAm, document.getElementById("emo"+i).value.replace(/\s/g, '') );
			localStorage.setItem("behavior"+totalAm, document.getElementById("behavior"+i).value);
			totalAm = totalAm + 1;
			if (document.getElementById("size"+i).value>largestBlockSize) { //finding the largest block
				largestBlockSize = document.getElementById("size"+i).value;
			};
		};
	};

	localStorage.setItem("amountOfBlocks",totalAm);
	localStorage.setItem("largestBlockSize",largestBlockSize);

	location.href ="game.html";
};
