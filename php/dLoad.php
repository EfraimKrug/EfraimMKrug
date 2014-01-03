<?php
include 'ObjectFILE.php';

$fileName = "**FILE_NAME";
if(isset($_GET['FNAME'])){
	$fileName = $_GET['FNAME'];
	}
if($fileName == "**FILE_NAME"){
	echo "<br>dLoad needs a parameter 'FNAME=<i>FileName</i>'";
	exit;
	}
	
$fO = new FileObject($fileName);
$sO = new StringObject;
$fO->printFile();
$fO->closeFile();
$fO = 0;
?>