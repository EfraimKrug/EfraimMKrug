<html>
<head>
<title>Firing a php file via ajax</title>
</head>
<body>
<script>
function getConnection(){
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
}
</script>
<script>
function go(){
xmlhttp = getConnection();
xmlhttp.onreadystatechange=function(){
	if (xmlhttp.readyState==4 && xmlhttp.status==200){
		txt = xmlhttp.responseText;
		document.getElementById("myDiv").innerHTML=txt;
		}
	}

	//xmlhttp.open("GET","doit.php",true);
	//didn't work yet... keep trying later!
	xmlhttp.open("GET","//localhost/BusStop/php/testXML.php",true);
	xmlhttp.send();
	}

</script>
<div id='myDiv'></div>
<table width=30% align=center>
<tr><td>Cell 1</td><td>Cell 2</td></tr>
<tr><td></td><td>Cell 4</td></tr>
<tr><td>Cell 5</td><td>Cell 6</td></tr>
<tr><td>Cell 7</td><td><input type=button value="go" onclick="go();"></td></tr>
</table>

</body>
</html>