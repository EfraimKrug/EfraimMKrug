<?php
/*************************************************************
 * getPerson.php:
 * 1) starts the session
 * 2) retrieves the values from html form
 * 4) post the record 
 * 5) send an e-mail
 *************************************************************
 *** 1) starts the session   */
session_start();
include 'DB2.php';
include 'ENVIRONMENT.php';

$personID = 0;
if (isset($_GET['PERSONID'])){
	$personID = $_GET['PERSONID'];
	}
$name = "";
if (isset($_GET['NAME'])){
	$name = $_GET['NAME'];
	}

/*
 * A general record dump of the database
 * Now working with DB2.php
 * 
 */
$returnString = "<h5><div id='AJAXDeleteName' onclick='AJAXDeleteName(\"" . $name . "\");'>" . $name . "</div></h5>";
$returnString .= "<table><tr><th align=center>Search</th><th align=center>Date/Time</th></tr>";
$dbObject = DBFactory::getFactory()->getDB(ENVIRONMENT);
$dbObject->getQueriesByPersonID($personID);

#echo $dbObject->getErrorNumber();
#echo "<br>============<br>";
#echo $dbObject->getRowCount();

while($row = $dbObject->getNextRecord())
{
$returnString .= "<tr><td><font color=blue>"; 
$returnString .= $row['SEARCH_PARAM']; 
$returnString .= "</font></td><td><font color=orange>";
$returnString .= $row['DATE_TIME'];
$returnString .= "</font></td></tr>";
}


$returnString .= "</table>";
echo $returnString;
#return $returnString;
?>