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

$returnString = "<table><tr><th align=center>Name</th><th align=center>Email</th></tr>";

function fillRows($dbObj, $table){
global $returnString;
$dbObj->dumpTable($table);

while($row = $dbObj->getNextRecord())
	{
	$returnString .= "<tr><td><font color=blue>";
	$returnString .= "<div onclick=\"fireAJAX('AJAXTarget2',";
	$returnString .= "http://www.efraimmkrug.com/php/getQueries.php?PERSONID=";
	$returnString .= $row['PERSONID'] . "&NAME=";
	$returnString .= $row['NAME'] . "')\">";
	$returnString .= $row['NAME'] . "</div></font></td><td><font color=orange>";
	$returnString .= $row['EMAIL'] . "</font></td></tr>";
	}
}

$dbObject = DBFactory::getFactory()->getDB(ENVIRONMENT);
$dbObject->dumpTable("BPerson");
fillRows($dbObject, "BPerson");
$returnString .= "</table>";
echo $returnString;
#return $returnString;
?>