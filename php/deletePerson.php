<?php
/*************************************************************
 * deletePerson.php:
 * 1) starts the session
 * 2) retrieves the values from html form
 * 4) post the record 
 * 5) send an e-mail
 *************************************************************
 *** 1) starts the session   */
session_start();
include 'DB2.php';
include 'ENVIRONMENT.php';

$name = "";
if (isset($_GET['NAME'])){
	$name = $_GET['NAME'];
	}

$dbObject = DBFactory::getFactory()->getDB(ENVIRONMENT);
$personID = $dbObject->getPersonID($name);

$dbObject->deleteQueriesByPersonID($personID);
$errorValue = $dbObject->getErrorNumber();
if($errorValue > 0){
	echo "Sorry! We had a problem deleting the queries associated with " . $name;
	exit;
	}
	
$dbObject->deletePersonByPersonID($personID);
if($errorValue > 0){
	echo "Sorry! We had a problem deleting the person associated with the name " . $name;
	exit;
	}

$returnString = "I want you to know, '" . $name . "' is just not there any longer!";
echo $returnString;
?>