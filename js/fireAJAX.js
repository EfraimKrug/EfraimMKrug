function getConnection(){
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
	alert("in else");
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
}

/**
 * fireAJAX - fires off an AJAX call to a php routine
 * @param target: the division ID the response should go to e.g. "myDiv"
 * @param engine: the full url for the php routine e.g. "//localhost/BusStop/php/testXML.php"
 **/
function fireAJAX(target, engine){
xmlhttp = getConnection();
xmlhttp.onreadystatechange=function(){
	if (xmlhttp.readyState==4 && xmlhttp.status==200){
		txt = xmlhttp.responseText;
		document.getElementById(target).innerHTML=txt;
		}
	}
xmlhttp.open("GET", engine, true);
xmlhttp.send();
}
