/**
 * Box and Circle
 **/
var demoName = "javascript";

function showMessage(msg, pos){		
	var x = document.getElementById("messageBox");
	if(pos == 'left'){
		x.style.left = "-128px";
		x.style.height = "79px";
		}
	else {
		x.style.left = "859px";
		x.style.height = "138px";
		}
	x.innerHTML = msg;
	x.style.border = "2px solid red";
	}
function hideMessage(){
	var x = document.getElementById("messageBox");
	var CSSExplanations = document.getElementById("CSSExplanations");

	x.innerHTML = "";
	x.height = "0px";
	x.width = "0px";
	x.style.border = "0px";

	CSSExplanations.style.height = "0px";
	CSSExplanations.style.width = "0px";
	CSSExplanations.style.left = "2200px";
	CSSExplanations.style.innerText = "";
	CSSExplanations.style.border = "0px";

	}
	
function doWritingWork(){
//	clearMenu();
//	hideMessage();
	var CSSExplanations = document.getElementById("CSSExplanations");
	CSSExplanations.style.height = "275px";
	CSSExplanations.style.width = "248px";
	CSSExplanations.style.border = "2px solid green";

	$("#CSSExplanations").animate({opacity:'1.75',left:'417px'}, 500);
	CSSExplanations.innerHTML = "<br/><br/><br/><a href='ApacheInstallStory.html' target=_blank>How to install Apache</a><br/>";
	CSSExplanations.innerHTML += "<br/><br/><br/><a href='PERLPointers.html' target=_blank>Discussion of PERL pointers</a><br/>";
	CSSExplanations.innerHTML += "<br/><br/><br/><a href='MediocreKing.html' target=_blank>Just writing...</a>";
}

function showOff(step){
//	hideMessage();
	var innerHTML = "";
	$("#jsDemoText").css("height", "585px");
	$("#jsDemoText").css("width", "585px");
	$("#jsDemoText").css("top", "-350px");
	$("#jsDemoText").css("font-family", "arial");
	$("#jsDemoText").css("font-weight", "normal");
	$("#jsDemoText").css("border", "4px solid purple");
	$("#jsDemoText").html("");
	if(step == 1){
		$("#jsDemoText").css("left", "-205px");
		$("#jsDemoText").css("color", "black");
		innerHTML = "<pre>/* original CSS */";
		innerHTML += "<br>#messageBox {";
		innerHTML += "<br>	position: absolute;";
		innerHTML += "<br>	left: 859px;";
		innerHTML += "<br>	top:  176px;";
		innerHTML += "<br>	color: grey;";
		innerHTML += "<br>	size: 10px;";
		innerHTML += "<br>	height: 138px;";
		innerHTML += "<br>	width: 138px;";
		innerHTML += "<br>	border: 0px solid red;";
		innerHTML += "<br>	padding: 10px;";
		innerHTML += "<br>}";
		innerHTML += "<br>";
		innerHTML += "<br>//JavaScript follows";
		innerHTML += "<br>/**";
		innerHTML += "<br> * showMessage(msg, pos) : posts message in div id=messageBox";
		innerHTML += "<br> * @param msg: message to post";
		innerHTML += "<br> * @param pos: position - right or left of web page";
		innerHTML += "<br> **/";
		innerHTML += "<br>function showMessage(msg, pos){		";
		innerHTML += "<br>	var x = document.getElementById('messageBox');";
		innerHTML += "<br>	if(pos == 'left'){";
		innerHTML += "<br>		x.style.left = '-128px';";
		innerHTML += "<br>		x.style.height = '79px';";
		innerHTML += "<br>		}";
		innerHTML += "<br>	else {";
		innerHTML += "<br>		x.style.left = '859px';";
		innerHTML += "<br>		x.style.height = '138px';";
		innerHTML += "<br>		}";
		innerHTML += "<br>	x.innerHTML = msg;";
		innerHTML += "<br>	x.style.border = '2px solid red';";
		innerHTML += "<br>	}";
		innerHTML += "<br>";
		innerHTML += "<br>&lt;!-- HTML Following --&gt;";
		innerHTML += "<br>&lt;div id=&quot;messageBox&quot;&gt;&lt;/div&gt;";
		innerHTML += "<br></pre>";

		$("#jsDemoText").html(innerHTML);
	} else if(step == 2){
		$("#jsDemoText").css("left", "-195px");
		$("#jsDemoText").css("color", "red");
		innerHTML = "<pre>var DeckMoveTrack = [];";
		
		innerHTML += "<br>";
		innerHTML += "<br>/**";
		innerHTML += "<br> * utility function removeHold(hole)";
		innerHTML += "<br> * @param hole - index to array which spot should be removed";
		innerHTML += "<br> * @effect - make the DeckMoveTrack array is contiguous ";
		innerHTML += "<br> **/";
		innerHTML += "<br>function removeHole(hole){";
		innerHTML += "<br>for (i=hole; i<DeckMoveTrack.length-1; i++){";
		innerHTML += "<br>	DeckMoveTrack[i] = DeckMoveTrack[i+1];";
		innerHTML += "<br>	DeckMoveTrack[i+1] = 0;";
		innerHTML += "<br>	}";
		innerHTML += "<br>}";
		innerHTML += "<br>";
		innerHTML += "<br>/**";
		innerHTML += "<br> * utility function removeCard(card)";
		innerHTML += "<br> * @param card element from DOM";
		innerHTML += "<br> * @effect - finds the index of the card in question";
		innerHTML += "<br> * 			 calls removeHole";
		innerHTML += "<br> *			 pops the last element off structure";
		innerHTML += "<br> **/";
		innerHTML += "<br>function removeCard(card){";
		innerHTML += "<br>var flag = false;";
		innerHTML += "<br>for (i=0; i&gt;DeckMoveTrack.length; i++){";
		innerHTML += "<br>	if (card.innerHTML == DeckMoveTrack[i].innerHTML){";
		innerHTML += "<br>		removeHole(i);";
		innerHTML += "<br>		flag = true;";
		innerHTML += "<br>		}";
		innerHTML += "<br>	}";
		innerHTML += "<br>	if(flag){";
		innerHTML += "<br>		DeckMoveTrack.pop();";
		innerHTML += "<br>		}";
		innerHTML += "<br>}</pre>";
		$("#jsDemoText").html(innerHTML);
	} else if(step == 3){
		$("#jsDemoText").css("left", "-195px");
		$("#jsDemoText").css("color", "yellow");
		innerHTML = "<pre>";
		innerHTML =  "<br> #############";
		innerHTML += "<br> # this curl operation gets data from a url (api)";
		innerHTML += "<br> # you have to go to the url owners to find out ";
		innerHTML += "<br> # what you need for the api call... e.g. ebay has ";
		innerHTML += "<br> # extensive documentation (and I do mean extensive)";
		innerHTML += "<br> #############";
		innerHTML += "<br>	$ch = curl_init();";
		innerHTML += "<br>	$timeout = 5;";
		innerHTML += "<br>	curl_setopt($ch, CURLOPT_URL, $this->apicall);";
		innerHTML += "<br>	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);";
		innerHTML += "<br>	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);";
		innerHTML += "<br>	$data = curl_exec($ch);";
		innerHTML += "<br>";
		innerHTML += "<br>	curl_close($ch);";
		innerHTML += "<br>	$source = simplexml_load_string($data) or die(\"Something is wrong\");";
		innerHTML += "<br>	$this->file = $source;";
		innerHTML += "<br></pre>";
		$("#jsDemoText").html(innerHTML);
	} else if(step == 4){
		$("#jsDemoText").css("left", "-255px");
		$("#jsDemoText").css("color", "yellow");
		innerHTML = "<pre>";
		innerHTML += "function buildHTML(){";
		innerHTML += "<br>$LineCount = 0;";
		innerHTML += "<br>$results = '';";
		innerHTML += "<br>$file = $this->file;";
		
		innerHTML += "<br>if ($file->ack == 'Success') {";
		innerHTML += "<br>$results = '';";
		innerHTML += "<br>## If the response was loaded, parse it and build links";
		innerHTML += "<br>foreach($file->searchResult->item as $item) {";
		innerHTML += "<br>	$pic   = $item->galleryURL;";
		innerHTML += "<br>	$link  = $item->viewItemURL;";
		innerHTML += "<br>	$title = $item->title;";
		innerHTML += "<br>	$location = $item->location;";
		innerHTML += "<br>";
		innerHTML += "<br>	## For each SearchResultItem node, build a link";
		innerHTML += "<br>	## and append it to $results";
		innerHTML += "<br>	$results .= &quot;&lt;tr&gt;&lt;td class='boxLeft'&gt;&quot;";
		innerHTML += "<br>	$results .= &quot;&lt;img src=\'$pic\'&gt;&lt;/td&gt;&quot;";
		innerHTML += "<br>	$results .= &quot;&lt;td class='boxRight'&gt;&quot;";
		innerHTML += "<br>	$results .= &quot;&lt;a href=\'$link\'&gt;$title&lt;/a&gt;&quot;";
		innerHTML += "<br>	$results .= &quot;&lt;br&gt;&lt;br&gt;$location&lt;/td&gt;&lt;/tr&gt;&quot;;";

		innerHTML += "<br>	$LineCount++;";
		innerHTML += "<br>	}";
		innerHTML += "<br>}";
		innerHTML += "<br>## If the response is not 'Success,' print an error";
		innerHTML += "<br>else {";
		innerHTML += "<br>	$results .= &quot;&lt;h3&gt;Oops! The request was not &quot;;";
		innerHTML += "<br>	$results .= &quot;successful. Make sure you are using a &quot;;";
		innerHTML += "<br>	$results .= &quot;valid AppID for the Production &quot;;";
		innerHTML += "<br>	$results .= &quot;environment.&lt;/h3&gt;&quot;;";

		innerHTML += "<br>}";
		innerHTML += "<br>if($results == ''){";
		innerHTML += "<br>	$results = &quot;&lt;i&gt;I'm so sorry, my friend!&quot;;";
		innerHTML += "<br>	$results .= We couldn't find a single thing!&lt;/i&gt;&quot;;";
		innerHTML += "<br>	}";
		innerHTML += "<br>$this->htmlResponse = $results;";
		innerHTML += "<br>return $results;";
		innerHTML += "<br>}</pre>";
		$("#jsDemoText").html(innerHTML);
		}
}

function getCoolStuff(){
//	clearMenu();
//	hideMessage();
	var innerHTML;
	var CSSExplanations = document.getElementById("CSSExplanations");
	CSSExplanations.style.height = "665px";
	CSSExplanations.style.width = "348px";
	$("#CSSExplanations").css("top", "-125px");
	$("#CSSExplanations").css("background", "purple");
	$("#CSSExplanations").css("color", "cyan");
	$("#CSSExplanations").animate({opacity:'1.75',left:'417px'}, 500);
	
	innerHTML = "<div class='row'>";
	innerHTML += "<div class='four columns'>";
	innerHTML += "<p>JavaScript Demo</p>";
	innerHTML += "</div>";
	innerHTML += "<div class='six columns'>";
	innerHTML += "<p><div onmouseover='showOff(1);'>Moving elements by id</div></p>";
	innerHTML += "<p>Manipulating CSS</p>";
	innerHTML += "<p><div onmouseover='showOff(2);'>Array manipulation/comparison</div></p>";
	innerHTML += "<p>jQuery menus/CSS manipulations</p>";
	innerHTML += "</div>";
	innerHTML += "</div>";
	innerHTML += "<div class='row'>";
	innerHTML += "<div class='four columns'>";
	innerHTML += "<p>PHP Demo</p>";
	innerHTML += "</div>";
	innerHTML += "<div class='six columns'>";
	innerHTML += "<p>PHP form processing</p>";
	innerHTML += "<p><div onmouseover='showOff(3);'>PHP curl to ebay</div></p>";
	innerHTML += "<p><div onmouseover='showOff(4);'>Processing XML return from ebay</div></p>";
	innerHTML += "<p>PHP/Ajax form</p>";
	innerHTML += "<p>mysql SQL insert/delete</p>";
	innerHTML += "<p>mysql SQL database create/build/populate</p>";
	innerHTML += "</div>";
	innerHTML += "</div>";

	CSSExplanations.innerHTML = innerHTML;
}
	
function doCSSWork(version){
	//alert("dooCSS" + version);
	var jsDemoText = document.getElementById("jsDemoText");
	var CSSExplanations = document.getElementById("CSSExplanations");
//	if(version < 3){
//		clearMenu();
//		hideMessage();
//		}

	CSSExplanations.style.height = "365px";
	CSSExplanations.style.width = "248px";
	CSSExplanations.style.border = "2px solid green";
	var next = version + 1;
	var innerHTML = "<div onclick='doCSSWork(" + next + ");'><br><br><br>";

	if((version > 4) && (version < 8)){
		jsDemoText.innerHTML = "<div id='cssDemo1'><div id='cssDemo2'>What happens if I put a box inside a box? This is in the inside box.</div>This is in the outside box.</div>";
		var outsideBox = document.getElementById("cssDemo1");
		var insideBox = document.getElementById("cssDemo2");
		outsideBox.style.border = "4px solid green";
		insideBox.style.border = "2px solid red";
		}
	if((version > 5) && (version < 8) ){
		insideBox.style.padding = "5px";
		insideBox.style.background = "green";
		insideBox.style.color = "red";		
		outsideBox.style.padding = "10px";
		outsideBox.style.background = "blue";
		}

	if(version == 2){
		$("#CSSExplanations").animate({opacity:'1.75',left:'417px'}, 500);
		jsDemoText.innerHTML = "So this is obvious... I am just writing text via the 'innerHTML' attribute. I will use alert boxes to pause activity while I explain what I am doing";
		innerHTML += "Here we go...<br>Watch the green box to the left and click this panel when you are finished watching...</div>";
		CSSExplanations.innerHTML = innerHTML;
		}
	if(version == 3){
		jsDemoText.style.border = "4px solid red";
		innerHTML += "Let's add a red border<br><br>";
		innerHTML += "and we will scootch all the text inside away from the edges <br><br><br><br>Watch the green box to the left and click this panel when you are finished watching...</div>";
		CSSExplanations.innerHTML = innerHTML;
		jsDemoText.style.padding = "30px";
		}
	if(version == 4){
		jsDemoText.style.background = "yellow";
		jsDemoText.style.color = "purple";
		innerHTML += "We will make the background color yellow and the text purple.<br><br>";
		innerHTML += "<br><br><br><br>Watch the green box to the left and click this panel when you are finished watching...</div>";
		CSSExplanations.innerHTML = innerHTML;
		}
	if(version == 5){
		innerHTML  += "There are our boxes... what about some space between? Changing colors...";
		innerHTML += "<br><br><br><br>Watch the green box to the left and click this panel when you are finished watching...</div>";
		CSSExplanations.innerHTML = innerHTML;
		}
	if(version == 6){
		insideBox.style.padding = "5px";
		insideBox.style.background = "green";
		insideBox.style.color = "red";		
		outsideBox.style.padding = "10px";
		outsideBox.style.background = "blue";
		innerHTML += "And changing fonts/text color/shadowing one... - just to add some distiction...<br><br>";
		innerHTML += "<br><br><br><br>Watch the green box to the left and click this panel when you are finished watching...</div>";
		CSSExplanations.innerHTML = innerHTML;
		}
	if(version == 7){
		outsideBox.style.color = "white";
		outsideBox.style.fontFamily = "Cambria, Arial, Arimo";
		insideBox.style.fontFamily = "Comic Sans MS, Tahoma, David";
		insideBox.style.fontStyle = "italic"
		insideBox.style.textShadow = "2px 2px 2px #000";
		innerHTML += "And changing fonts/text color/shadowing one... - just to add some distiction...<br><br>";
		innerHTML += "<br><br><br><br>Watch the green box to the left and click this panel when you are finished watching...</div>";
		CSSExplanations.innerHTML = innerHTML;
		}
	if(version == 8){
		$("#CSSExplanations").animate({opacity:'0',left:'2417px'}, 200);
		showMessage("That's all, folks!", "right");
		}
		
	if(version == 1){
		var x = document.getElementById("jsDemoText");
		x.innerHTML = "So this is obvious... I am just writing text via the 'innerHTML' attribute. I will use alert boxes to pause activity while I explain what I am doing";
		alert("Here we go...");
		x.style.border = "4px solid red";
		alert("Let's add a red border");
		alert("and we will scootch all the text inside away from the edges");
		x.style.padding = "30px";
		alert("Background color to yellow");		
		x.style.background = "yellow";
		x.style.color = "purple";
		x.innerHTML = "<div id='cssDemo1'><div id='cssDemo2'>What happens if I put a box inside a box? This is in the inside box.</div>This is in the outside box.</div>";
		var outsideBox = document.getElementById("cssDemo1");
		var insideBox = document.getElementById("cssDemo2");
		outsideBox.style.border = "4px solid green";
		insideBox.style.border = "2px solid red";
		alert("There are our boxes... what about some space between? Changing colors...");
		insideBox.style.padding = "5px";
		insideBox.style.background = "green";
		insideBox.style.color = "red";		
		outsideBox.style.padding = "10px";
		outsideBox.style.background = "blue";
		alert("And changing fonts/text color/shadowing one... - just to add some distiction...");
		outsideBox.style.color = "white";
		outsideBox.style.fontFamily = "Cambria, Arial, Arimo";
		insideBox.style.fontFamily = "Comic Sans MS, Tahoma, David";
		insideBox.style.fontStyle = "italic"
		insideBox.style.textShadow = "2px 2px 2px #000";
		}
	}
	
function jsDemo(){
//	clearMenu();
//	hideMessage();

	if(demoName == "javascript"){
		document.getElementById("demoButton").style.backgroundImage = "url('img/backbone.jpg')";
		document.getElementById("demoButton").style.left = "53px";
		demoName = "backbone";
		window.open('shvatim.html');
	} else if(demoName == "backbone"){
		document.getElementById("demoButton").style.backgroundImage = "url('img/php.jpg')";
		document.getElementById("demoButton").style.left = "79px";
		demoName = "php";
		window.open('//localhost/RebSam01/index.html');
	} else if(demoName == "php"){
		document.getElementById("demoButton").style.backgroundImage = "url('img/css.jpg')";
		document.getElementById("demoButton").style.left = "105px";
		demoName = "css";
		window.open('ebay2.html');
	}  else if(demoName == "css"){
		doCSSWork(2);
		document.getElementById("demoButton").style.backgroundImage = "url('img/writing.jpg')";
		document.getElementById("demoButton").style.left = "217px";
		document.getElementById("demoButton").style.top = "95px";
		demoName = "writing";
	}   else if(demoName == "writing"){
		document.getElementById("demoButton").style.backgroundImage = "url('img/python.jpg')";
		document.getElementById("demoButton").style.left = "417px";
		document.getElementById("demoButton").style.top = "395px";
		demoName = "python";
		doWritingWork();
	}s
}
function filljsDemoText(){
	if(demoName == "javascript"){
		var x = document.getElementById("jsDemoText");
		x.innerHTML = "Click the circle: Go to a little game that I wrote. <br /><br />This game is all written in native JavaScript.<br /><br />There are array manipulations, and comparisons. Sometimes I delete elements from the array and then I move everything to make the array contiguous again. I move html divisions around.<br /><br />Take a look, play, enjoy!";
	} else if(demoName == "php"){
		var x = document.getElementById("jsDemoText");
		var txtAddress = document.getElementById("jsAddressText");
		x.style.padding = "30px";
		x.innerHTML = "When you click on the circle, behold, lo, a box and a button to search ebay (via api call))!";
		x.innerHTML += "<br/><br/>NO WAY! You're at <br/><br/><font color=red>" + txtAddress.innerHTML + "!?</font><br/><br/>That is so WILD!";
		showMessage("Yeah, I know... I'm accessing googles geoCoordinate api... impressive?<br/><br/> But wait! There's more!", "right");
	} else if(demoName == "css"){
		var x = document.getElementById("jsDemoText");
		x.style.padding = "30px";
		x.innerHTML = "When you click on the circle, I am going to present some css stuff... hmmm.";
	}
}
function emptyjsDemoText(){
//	clearMenu();
//	hideMessage();

	var x = document.getElementById("jsDemoText");
	x.innerHTML = "";
	if(demoName == "php") hideMessage();
}

