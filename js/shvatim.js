/*********************************************************************
 * The following code controls the array of cards
 *********************************************************************/
 
var DeckState = 0; /* 0: nothing; 1:stacked; 2:dealt; 3:parabala; 4:hyperbole; 5: circle */
//var DeckOrder = 0; /* 0: nothing; 1:shuffled */

/*
 * DeckArray is the deck this routine manipulates
 * evidently - when js accesses document.element 
 * we are only accessing a copy and it does not get
 * updated (as though it were pass by reference.. alas!)
 */
 
 
var DeckArray = [];
var DeckMoveTrack = [];

/**
 * utility function removeHold(hole)
 * @param hole - index into the array which spot should be removed
 * @effect - make the DeckMoveTrack array is contiguous 
 **/
function removeHole(hole){
for (i=hole; i<DeckMoveTrack.length-1; i++){
	DeckMoveTrack[i] = DeckMoveTrack[i+1];
	DeckMoveTrack[i+1] = 0;
	}
}

/**
 * utility function removeCard(card)
 * @param card element from DOM
 * @effect - finds the index of the card in question
 * 			 calls removeHole
 *			 pops the last element off the structure
 **/
function removeCard(card){
var flag = false;
for (i=0; i<DeckMoveTrack.length; i++){
	if (card.innerHTML == DeckMoveTrack[i].innerHTML){
		removeHole(i);
		flag = true;
		}
	}
	if(flag){
		DeckMoveTrack.pop();
		}
}

/**
 * function displayTracking()
 * for debugging
 **/
function __displayTracking(){
for (i=0; i<DeckMoveTrack.length; i++){
	alert("displayTracking: [" + i + "]" + DeckMoveTrack[i].innerHTML);
	}
}


/*********************************************************************
 * the following code manipulates the DOM elements and visuals
 *********************************************************************/
 
/**
 * Global variables - to track DOM element cards
 * lastZ makes sure we place next card on top
 * lastTop allows us to get the y-axis
 * lastLeft allows us to get the x-axis
 **/
var lastZ = 0;
var lastTop = 0;
var lastLeft = 0;

/**
 * utility - centralize z-index / lastTop / lastLeft
 **/
 
function increaseZIndex(card){
	card.style.zIndex = ++lastZ;
	}

function increaseLeft(value){
	lastLeft += value;
	return lastLeft;
	}

function increaseTop(value){
	lastTop += value;
	return lastTop;
	}
	
function resetMovement(){
	lastTop = 0;
	lastLeft = 0;
	lastZ = 0;
	}
/**
 * function moveCard
 * @parm: card object
 * @effect: tracks cards to move them so they fan out
 * native javascript animation
 **/
function moveCard(card){
	function moveIt(){
		t = increaseTop(15);
		increaseZIndex(card);
		card.style.top = t + 'px'; 
		l = increaseLeft(15);
		
		card.style.left = l + 'px'; 

		if (l > 348){  
			removeCard(card);
			DeckMoveTrack.push(card);
			
			clearInterval(id);
			}
		}
  var id = setInterval(moveIt, 10); // draw every 10ms
}

/**
 * function growCard
 * @parm: card object
 * @effect: grows card to the "large size"
 * native javascript animation
 **/
function growCard(card, sz){
	var left = 0;
	increaseZIndex(card);
	sz = typeof sz !== 'undefined' ? sz : 148;
	var w = 135;
	var h = 145;

	function growIt(){
		w = w + 5;
		h = h + 7;
		card.style.height = h + 'px'; // show frame
		card.style.width = w + 'px'; // show frame
		if (w > sz){  // check finish condition
			clearInterval(id2);
			}
		}
  var id2 = setInterval(growIt, 10); // draw every 10ms
}

/**
 * function copyDeck copies html deck to working array
 * set up listeners for individual  cards...
 * borderControl tracks border color
 **/
function copyDeck(){
var CardList = document.getElementsByClassName("card");
for(i=0; i<CardList.length; i++){
	DeckArray[i] = CardList[i];
	DeckArray[i].addEventListener("mouseover", blinkItOver, false);
	DeckArray[i].addEventListener("click", blinkItOver, false);
	DeckArray[i].addEventListener("mouseout", blinkItOut, false);
	DeckArray[i].style.borderControl = 0; // borderControl - 0:Red;1:Yellow;2:Blue;3:Green
	}
}

//*******************************************************************************//
//* THE GAME: MENU CHOICES TO DECK OF CARDS - IMAGE MANIPULATIONS
//*******************************************************************************//

function startGame(){
	copyDeck();
	stackDeck();
	shuffleDeck();
	dealDeck(true);
	resetButtons();
}
/********************************************************************
 * the following structures & code is used for quantifying results
 ********************************************************************/
/**
 * Set up datastructures to track the game...
 * one structure for each mother
 **/
var BirthOrder = ["R'euven","Shimon","Levi","Yehudah","Dan","Naftali","Gad","Asher","Yissachar","Zevulun","Yosef","Binyamin"]
var LeahOrder = ["R'euven","Shimon","Levi","Yehudah","Yissachar","Zevulun"];
LeahOrder.name = "Leah";
LeahOrder.track = [];
var RachelOrder = ["Yosef","Binyamin"];
RachelOrder.name = "Rachel";
RachelOrder.track = [];
var BilhahOrder = ["Dan","Naftali"];
BilhahOrder.name = "Bilhah";
BilhahOrder.track = [];
var ZilpahOrder = ["Gad","Asher"];
ZilpahOrder.name = "Zilpah";
ZilpahOrder.track = [];


/**
 * utility function checkTribe (tribe, Mother)
 * returns true or false if mother goes with tribe
 **/
function checkTribe(tribe, mother){
	for(i=0;i<mother.length;i++){
		if(mother[i] == tribe){
			mother.track[i] = true;
			}
		}
	}
	
/** 
 * function checkMother(motherArray)
 * @effects division gameResults
 * writes results after the user presses "Finished button"
 **/
function checkMother(motherArray){
	var flag = true;
	var checkFlag = true;
	var pieceHold1 = "";
	var pieceHold2 = "";
	var tribeMatchRegex = /(R'euven|Shimon|Levi|Yehudah|Yissachar|Zevulun|Yosef|Binyamin|Dan|Naftali|Gad|Asher)/g;
	
	motherArray.track = [];
	for(i=0; i<motherArray.length; i++){
		motherArray.track.push(false);
		}
	if(DeckMoveTrack.length != motherArray.length){
		document.getElementById("gameResults").innerHTML = motherArray.name + " had " + motherArray.length + " tribes, not " + DeckMoveTrack.length;
		return;
		}
	for (j=0;j<motherArray.length;j++){
		// since Binyamin, Levi, and Zuvulun are made up of 
		// multiple parts/colors - we need to regex the names
		pieceHold1 = "" + DeckMoveTrack[j].innerHTML.match(tribeMatchRegex);
		pieceHold2 = "" + motherArray[j].match(tribeMatchRegex);
		if(pieceHold1 !== pieceHold2){	
				flag = false;
			}	
			
		checkTribe(pieceHold1, motherArray);
		}

	for(k=0; k<motherArray.length; k++){
		if(!motherArray.track[k]){
			checkFlag = false;
			}
		}
	
	if(flag){
		document.getElementById("gameResults").innerHTML = "YES! CORRECT ORDER!";
		document.getElementById("gameResults").style.height = "39px";
		}
	else if(checkFlag){
		document.getElementById("gameResults").innerHTML = "Correct tribes, not in order - try putting them in order!";
		document.getElementById("gameResults").style.height = "105px";
		}
	else {
		document.getElementById("gameResults").innerHTML = "oops! not so much...";
		document.getElementById("gameResults").style.height = "39px";
		}	
}

/**
 * function: writeDirections ( "which button" )
 * @called: from 'mouseover' on the buttons
 * @effect : writes correct message to the division msgSpot
 **/
function writeDirections(x){
	msgSpot = document.getElementById("instruct");
	if(x == 'stack'){
		msgSpot.innerHTML = "Stack the cards!";
		resetButtons();
		document.getElementById("command01").style.color = "red";
		}
	else if(x == 'shuffle'){
		msgSpot.innerHTML = "Shuffle the cards!";
		resetButtons();
		document.getElementById("command02").style.color = "red";
		}
	else if(x == 'deal'){
		msgSpot.innerHTML = "Deal the cards!";
		resetButtons();
		document.getElementById("command03").style.color = "red";
		}
	else if(x == 'fan'){
		msgSpot.innerHTML = "Fan the deck!";
		resetButtons();
		document.getElementById("command04").style.color = "red";
		}
	else if(x == 'rainbow'){
		msgSpot.innerHTML = "Color the cards!";
		resetButtons();
		document.getElementById("command05").style.color = "red";
		}
	else if(x == 'leah'){
		msgSpot.innerHTML = "Choose Leah's tribes... then press 'Finished?'";
		resetButtons();
		document.getElementById("command06").style.color = "red";
		}
	else if(x == 'rachel'){
		msgSpot.innerHTML = "Choose Rachel's tribes... then press 'Finished?'";
		resetButtons();
		document.getElementById("command07").style.color = "red";
		}
	else if(x == 'bilhah'){
		msgSpot.innerHTML = "Choose Bilhah's tribes... then press 'Finished?'";
		resetButtons();
		document.getElementById("command08").style.color = "red";
		}
	else if(x == 'zilpah'){
		msgSpot.innerHTML = "Choose Zilpah's tribes... then press 'Finished?'";
		resetButtons();
		document.getElementById("command09").style.color = "red";
		}
	}

/**
 * we also need to flash the directions and then return them to previous
 * in case the user only 'mouseovers' but does not 'click' and choose the
 * other mother
 **/

function flashDirections(mother){
	var holdMother = mother;
	var instructElement = document.getElementById("instruct");
	var holdDirections = instructElement.innerHTML;
	msgSpot = document.getElementById("instruct");
	if(mother == 'leah'){
		resetButtons();
		document.getElementById("command06").style.color = "red";
		}
	else if(mother == 'rachel'){
		resetButtons();
		document.getElementById("command07").style.color = "red";
		}
	else if(mother == 'bilhah'){
		resetButtons();
		document.getElementById("command08").style.color = "red";
		}
	else if(mother == 'zilpah'){
		resetButtons();
		document.getElementById("command09").style.color = "red";
		}
}

/**
 * global variable 'currentMotherOrder' 
 * @used: setupMother() and finished()
 **/ 
var currentMotherOrder = "";

/**
 * setupMother(motherOrder)
 * @effect identifies order being played - four possible orders
 **/
 
function setupMother(motherOrder){
	currentMotherOrder = motherOrder;
	writeDirections(motherOrder.name.toLowerCase() );
	dealDeck(false);
	}

/**
 *  function: finished
 *  @effect: handles the button the user presses at the end of the game
 *  @side-effects: divisions - gameResults & finished
 **/
function finished(){
	if(document.getElementById("finished").innerHTML == "Try again?"){
		document.getElementById("gameResults").style.background = "grey";
		document.getElementById("gameResults").style.color = "red";
		document.getElementById("gameResults").innerHTML = "Here we go!"
		document.getElementById("finished").innerHTML = "Finished? Click here!";
		document.getElementById("gameResults").style.height = "39px";
		shuffleDeck();
		dealDeck(true);
	} else {
		document.getElementById("gameResults").style.background = "pink";
		document.getElementById("gameResults").style.color = "blue";
		document.getElementById("finished").innerHTML = "Try again?";
		checkMother(currentMotherOrder);
	}
}

/**
 * function dealDeck()
 * @param chgMessage - true/false flag - change the instruction message or not?
 * @effect: resets everything and deals the deck out 2 rows of 6 cards
 * @side-effect: writes to 'instruct' division
 * MENU: DEAL
 **/
function dealDeck(chgMessage){ 
	resetMovement();
	DeckState = 2;
	stack(DeckArray);
	deal(DeckArray);
	resetButtons();
	if(chgMessage){
		document.getElementById("instruct").innerHTML = "Now they have been dealt!";
		document.getElementById("command03").style.color = "red";
		}
	DeckMoveTrack = [];
	}

/**
 * function deal(myArray)
 * @effect: deal out the cards in even rows of 8 cards...
 * MENU: DEAL utility
 **/

function deal(myArray){
resetMovement();
i_top = 45;
i_left = 37;
cardCounter = 0;

for(i=0; i < myArray.length; i++){
	if(cardCounter > 5){
		cardCounter = 0;
		i_top += 151;
		i_left = 37;
		}
	myArray[i].style.left = i_left + "px";
	myArray[i].style.top = i_top + "px";
	i_left += 143;
	cardCounter++;
	}
}

/**
 * function shuffleDeck()
 * @effect: shuffles the deck randomly... then puts them back into position
 * MENU: SHUFFLE
 **/
function shuffleDeck(){
	resetMovement();
	var DeckStateHold = DeckState;
	stackDeck(DeckArray);
	doShuffle(DeckArray);
	resetButtons();
	document.getElementById("instruct").innerHTML = "Now they have been shuffled!";
	document.getElementById("command02").style.color = "red";
	DeckState = DeckStateHold;
	paintDeckState();
}

/**
 * utility function used by shuffleDeck(): doShuffle(array)
 * @effect: orders according to random number / sqapping with order
 * MENU: SHUFFLE utility
 **/

function doShuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;
  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  
  return array;
}


/**
 * function stackDeck()
 * @effect: stacks deck in top left hand corner
 * @effect: changes settings on DeckArray (global data structure)
 * MENU: STACK
 **/
function stackDeck(){
	resetMovement();
	DeckState = 1;
	stack(DeckArray);
	resetButtons();
	document.getElementById("instruct").innerHTML = "Now they have been stacked!";
	document.getElementById("command01").style.color = "red";
	}
	
/** 
 * function stack(myArray)
 * untility for function stackDeck()
 * @effect: changes settings on the array of cards
 * MENU: STACK utility
 **/
function stack(myArray){
for(i=0; i < myArray.length; i++){
	sz = 90 + (i * 27);
	myArray[i].style.top = sz + "px";
	myArray[i].style.left = sz + "px";
	myArray[i].style.width = "135px";
	myArray[i].style.height = "145px";
	increaseZIndex(myArray[i]);
	}
}


/**
 * function rainbowDeck()
 * @effect: sets all the card borders to different colors
 * fan the deck as parabola with all colors.
 */
function rainbowDeck(){
	resetMovement();
	for (i=0;i < DeckArray.length; i++){
		DeckArray[i].style.borderControl = i%4; // borderControl - 0:Red;1:Yellow;2:Blue;3:Green
		getBorder(DeckArray[i]);
		}
	fan2(DeckArray);
	DeckState = 3;
	resetButtons();
	document.getElementById("instruct").innerHTML = "Now they have been... well... rainbowed!";
	document.getElementById("command05").style.color = "red";
}

/**
 * utility function: getBorder(card)
 * @effect: sets border color - alternating 
 * MENU: RAINBOW utility
 **/
	
function getBorder(card){
	if(card.style.borderControl == 0){
		card.style.borderControl = 1;
		card.style.border = "4px solid purple";
		}
	else if(card.style.borderControl == 1){
		card.style.borderControl = 2;
		card.style.border = "4px solid blue";
		}
	else if(card.style.borderControl == 2){
		card.style.borderControl = 3;
		card.style.border = "4px solid green";
		}
	else {
		card.style.borderControl = 0;
		card.style.border = "4px solid red";
		}
}

/**
 * fanDeck
 * @effect: changes between different fans
 * parabala, hyperbole, circle..
 * MENU: FAN DECK
 **/
function fanDeck(){
	stack(DeckArray);
	resetMovement();
	if(DeckState == 4){
		fan4(DeckArray);
		DeckState = 5;
		}
	else {
		if(DeckState == 3){
			fan3(DeckArray);
			DeckState = 4;
			}
		else {
			fan2(DeckArray);
			DeckState = 3;
			}
		}
	resetButtons();
	document.getElementById("instruct").innerHTML = "Now they have been fanned and flashed!";
	document.getElementById("command04").style.color = "red";
	}

/**
 * fanning the deck according to different equation
 * function fan2(myArray)
 * @effect: fans in a parabala
 * MENU: FAN DECK
 **/
function fan2(myArray){
for(i=0; i < myArray.length; i++){
	sz = 42 + (i * 15);
	tp = 30 + (getParabala((i-15)));
	
	myArray[i].style.top = tp + "px";
	myArray[i].style.left = sz + "px";
	increaseZIndex(myArray[i]);
	}
}

/**
 * fanning the deck according to different equation
 * function fan2(myArray)
 * @effect: fans in a y = 1/x hyperbolic function
 * MENU: FAN DECK
 **/

function fan3(myArray){
for(i=0; i < myArray.length; i++){
	sz = 42 + (i * 15);
	tp = 20 + (getHyper(i+2));
	
	myArray[i].style.top = tp + "px";
	myArray[i].style.left = sz + "px";
	increaseZIndex(myArray[i]);
	}
}

/**
 * fanning the deck according to different equation
 * function fan4(myArray)
 * @effect: fans in a different shape
 * MENU: FAN DECK
 **/
	
function fan4(myArray){
for(i=0; i < myArray.length; i++){
	sz = 42 + (i * 15);
	tp = 20 + (getOther(i+2));
	
	myArray[i].style.top = tp + "px";
	myArray[i].style.left = sz + "px";
	increaseZIndex(myArray[i]);
	}
}


/**
 * utility function so I can shuffle and then put them back on the board
 * 0: nothing; 1:stacked; 2:dealt; 3:parabala; 4:hyperbole; 5: circle 
 **/
function paintDeckState(){

	if(DeckState == 1){
		stackDeck();
	}
	else if(DeckState == 2){
		dealDeck(true);
	}
	else if(DeckState == 3){
		fan2(DeckArray);
	} 
	else if(DeckState == 4){
		fan3(DeckArray);
	} 
	else if(DeckState == 5){
		fan4(DeckArray);
	}
}

/*****************************************************
 * utility functions for fanning - 
 *****************************************************/
/**
 * utility function -
 * fan deck as parabala (y = x*x)
 **/
function getParabala(x){
	return (x * x);
	}


/**
 * utility function -
 * fan deck as a hyperbole (y = 1/x)
 **/
function getHyper(x){
	if(x == 0){ return 350;}
	return (200/x);
	}

/**
 * fanning the deck according to different equation
 **/
function getOther(x){
	return Math.sqrt((x * x) + (4000 * x));
	}



/**********************************************************************
 * The following variables/code are tracking the time the mouse
 * pointer spends in any one card. This way, the user can
 * move the mouse over cards and the 'mouseover' reaction
 * is tested across time. If the time is too short, the
 * user is just going to a different card. Otherwise,
 * the card has been identified
 **********************************************************************/
 
var timeIn = 0;
var timeOut = 0;
var timeDiff;
var currentCard; 
var timeInterval;

var chk_function;

/**
 * function checkTime()
 * @effect: this function is used to check if I have just crossed
 * over a card or if I am actually stopping there
 **/
	
function checkTime(){
	timeDiff = timeOut - timeIn;
	/**
	 * timeOut: time the mouse moved out of the previous card
	 * timeIn: time the mouse moved into the current card
	 **/
	if(timeDiff < 0){
		if(currentCard.style.borderControl == 0){
			currentCard.style.borderControl = 1;
			currentCard.style.border = "4px solid purple";
			}
		else if(currentCard.style.borderControl == 1){
			currentCard.style.borderControl = 2;
			currentCard.style.border = "4px solid blue";
			}
		else if(currentCard.style.borderControl == 2){
			currentCard.style.borderControl = 3;
			currentCard.style.border = "4px solid green";
			}
		else {
			currentCard.style.borderControl = 0;
			currentCard.style.border = "4px solid red";
			}
			growCard(currentCard);
			moveCard(currentCard);
			}
}

/**
 * function: blinkItOver()
 * fired when mouse is over a card
 * @effect: sets 'timeIn' to time the mouse enters the card
 **/
function blinkItOver(){
	currentCard = this;
	d = new Date();
	timeIn = d.getTime();
	chk_function = function(){window.setTimeout(checkTime,500);};
	chk_function();
	}
	
/**
 * function: blinkItOut()
 * fired when mouse leaves a card
 * @effect: sets 'timeOut' to time the mouse leaves the card
 **/
 
function blinkItOut(){
	chk_function = 0;
	d = new Date();
	timeOut = d.getTime();
	}


/**
 * function: resetButtons()
 * @effect: removes highlight from previous choice
 **/
function resetButtons(){
	//document.getElementById("instruct").innerHTML = "Don't just do something...  push buttons!";
	document.getElementById("command01").style.color = "black";
	document.getElementById("command02").style.color = "black";
	document.getElementById("command03").style.color = "black";
	document.getElementById("command04").style.color = "black";
	document.getElementById("command05").style.color = "black";
	document.getElementById("command06").style.color = "black";
	document.getElementById("command07").style.color = "black";
	document.getElementById("command08").style.color = "black";
	document.getElementById("command09").style.color = "black";
	}

