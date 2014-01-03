<?php
/*************************************************************
 * insertPerson.php:
 * 1) starts the session
 * 2) retrieves the values from html form
 * 4) post the record 
 * 5) send an e-mail
 *************************************************************
 *** 1) starts the session   */
session_start();
include 'DB2.php';
include 'ENVIRONMENT.php';
//foreach ($_POST as $k => $v){
//	echo "<br>" . $k . "//" . $v;
//	}

//echo "<br>-->>> " . $_POST['Email'];

$name = "";
$email = "";

if(isset($_POST['name'])){
		$name = htmlspecialchars($_POST['name']);
		}
if(isset($_POST['email'])){
		$email = htmlspecialchars($_POST['email']);
		$to = $email;
		}
		
$dbObject = DBFactory::getFactory()->getDB(ENVIRONMENT);
	$RSPersonID = 0;
	if($dbObject->insertPerson($name, $email))
	{
		$RSPersonID = $dbObject->getLastKey();
	}
	else
	{
		if($dbObject->getErrorNumber() < 0)
		{
			$RSPersonID = $dbObject->getHold("PersonID");
		}
		else 
		{
			echo "<html><head></head><body>";
			echo "<br>Database Error: " . $dbObject->displayError();
		}
	}
	
	$from = "efraim@efraimmkrug.com";
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$headers .= "From:" . $from;
	
	$subject = "ebay usage via 'www.efraimmkrug.com'";
	$message = "Thank you so much for doing all that you do... <br>Please note - I can automate emails in html! I'd be happy to work for you!";

	mail($to,$subject,$message,$headers);

	$dbObject->DBClose();
	//header("Location: '../ebay2.html'");   << for some reason that does not work on my www.domain server!
	echo "<script> window.location.replace('../ebay2.html#simple2') </script>";

?>