<?php
include 'ObjectSTRING.php';
//study in php standard functions:
//FileWorkBegin
interface FileInterface
{
	public function openFile();
	public function readLine();
	public function setFileName();
	public function getFileName();
}

//FileObject Class
class FileObject implements FileInterface
{
		var $FileName = "";
		var $FileHandle = 0;

	 function FileObject($fname = "ObjectFILE.php")
	{
		global $singleFile;
		$this->FileName = $fname;
		$this->openFile();
	}

//start the file over...
function rewindFile(){
	rewind($this->FileHandle);
}

//openFile
function openFile(){
	$this->FileHandle = fopen($this->FileName, "r") or exit("WHAT? You have GOT to be kidding!");
	return $this->FileHandle;
	}

//closeFile
function closeFile(){
	fclose($this->FileHandle);
	$this->FileHandle = 0;
	}
	
//readLine
function readLine(){
	if(!feof($this->FileHandle)){
		return fgets($this->FileHandle);
		}
	else {
		return False;
		}
	}

//setFileName
function setFileName($file = "PHPObject.php"){
	$this->FileName = $file;
	}
//getFileName
function getFileName(){
	return $this->FileName;
	}

function printFile(){
	$line = "";
	$sO = new StringObject;
	while($line = $this->readLine()){
		$sO->setString($line);
		$sO->setString($sO->change("/new mysqli\([\S]*\)/", "new mysqli('<i>database server</i>','<i>database name</i>', '<i>password</i>')"));		
		$sO->setString($sO->change("/select_db\([\'\"][\S]*[\'\"]\)/", "select_db(<i>database name</i>)"));		
		if($sO->match("/function\s*[A-Za-z0-9_]*ObjectTest()/")){
			exit;
			}
		echo $sO->getString() . "<br>";
		}
}
		
//printFunction
function printFunction($functionName){
	$sO = new StringObject;
	$this->rewindFile();
	
	$fName = "\/\/" . $functionName;
	$printSwitch = 0;
	echo "<table>";
	while ($line = $this->readLine()){
		$sO->setString($line);
		if($sO->match("/\/\//")){
			$printSwitch = 0;
			}
		if($sO->match("/^" . $fName . "/")){
			$printSwitch = 1;
			}
		if($printSwitch > 0){
			echo "<TR><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><TD><font color=green>" . $line . "</font></TD></TR>";
			}
		}
	echo "</table>";
	}
		
//FileObject End Class
}



//fileObjectTest
function fileObjectTest(){
	echo "<br>================================================";
	echo "<br>== F I L E   -   O B J E C T    -     T E S T ==";
	echo "<br>================================================";
	echo "<pre>";
	printFunction("FileObject");
	$fO = new FileObject;
	$sO = new StringObject;
	$targetList = array("<br>" => "{BR}");
	printFunction("openFile");
	printFunction("readLine");
	printFunction("closeFile");
	while($line = $fO->readLine()){
		$sO->setString($line);
		$line = $sO->replaceTargetList($targetList);
		echo "<br>" . $line;
		}
	$fO->closeFile();
	echo "</pre>";
	}
	
// begin 
//fileObjectTest();
?>