<?php
include 'ebayObject.php';
include 'DB2.php';
include 'ENVIRONMENT.php';

error_reporting(E_ALL);  // Turn on all errors, warnings and notices for easier debugging
$query = "small white box";
$name = "";
$email = "";

if(isset($_POST['query'])){
	$query = $_POST['query'];
	}

if(isset($_POST['name'])){
	$name = $_POST['name'];
	}

if(isset($_POST['email'])){
	$email = $_POST['email'];
	}
	
# set up ebay object/api call...

$ebayObject = new ebayObject;
$ebayObject->setQuery($query);
$ebayObject->buildObject();
$ebayObject->readAPICall();
$ebayObject->buildHTML();

# set up database storage...
$dbObject = DBFactory::getFactory()->getDB(ENVIRONMENT);
if(($name != "") && ($email != "")){
	$dbObject->insertPerson($name, $email);
	$personID = $dbObject->getPersonID($name);
	$dbObject->insertSearch($query, $personID);
	}
	

$stuff = $ebayObject->getFile();
$query = $ebayObject->getQuery();

?>
<!-- Build the HTML page with values from the call response -->
<html>
<head>
<title><?php echo "$query"; ?></title>
<style type="text/css">body { font-family: arial,sans-serif;} </style>
<style>
.boxLeft {
	height: 128px;
	width: 165px;
	color: white;
	background: black;
	padding: 20px;
	border: 4px solid yellow;
}
.boxRight {
	height: 128px;
	width: 365px;
	color: red;
	background: yellow;
	padding: 5px;
	border: 4px solid black;
}
</style>
</head>
<body>

<h1>And this is: <?php echo "$query"; ?></h1>

<table>
<tr>
  <td>
    <?php echo "$stuff";?>
  </td>
</tr>
</table>

</body>
</html>