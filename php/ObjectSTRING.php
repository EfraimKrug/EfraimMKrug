<?php
//StringObjectInterface
interface StringObjectInterface {
	public function getPosition();
	public function getTarget();
	public function setTarget($t);
	public function setString($s);
	public function getString();
	public function getLength();	
}

//StringObject Class
class StringObject implements StringObjectInterface {
	var $SO_String = "";
	var $SO_Target = "";
	
	function StringObject($target = "", $str = ""){
		$this->SO_Target = $target;
		$this->SO_String = $str;
	}
//setTarget	
	function setTarget($target){
		$this->SO_Target = $target;
	}
//getTarget	
	function getTarget(){
		return $this->SO_Target;
		}
//setString		
	function setString($str){
		$this->SO_String = $str;
		}
//getString	
	function getString(){
		return $this->SO_String;
		}
//getLength		
	function getLength(){
		return strlen($this->SO_String);
		}
//getPosition	
	function getPosition(){
		return strpos($this->SO_String, $this->SO_Target);
		}
//getLastPosition
	function getLastPosition(){
		return strrpos($this->SO_String, $this->SO_Target);
		}
//renderUpperCase
	function renderUpperCase(){
		return strToUpper($this->SO_String);
		}
//renderLowerCase
	function renderLowerCase(){
		return strToLower($this->SO_String);
		}
//renderCapitalizeWords
	function renderCapitalizeWords(){
		return UCWords($this->SO_String);
		}
//replaceTarget
	function replaceTarget($target, $replacement){
		return strtr($this->SO_String, $target, $replacement);
		}
//replaceTargetList
	function replaceTargetList($targetList){
		return strtr($this->SO_String, $targetList);
		}
//match
	function match($pattern){
		return preg_match($pattern, $this->SO_String);
		}
		
//change - the art of regex!
	function change($pattern, $newStuff){
		return preg_replace($pattern, $newStuff, $this->SO_String);
		}

//StringObject end Class
}



//stringObjectTest
function stringObjectTest(){
	echo "<br>==============================================";
	echo "<br>== S T R I N G  -  O B J E C T  -  T E S T ==";
	echo "<br>==============================================";
//	printFunction("StringObject");
	$sO = new StringObject;
//	printFunction("setString");
	$sO->setString("This is the string, and these are the people!");
//	printFunction("setTarget");
	$sO->setTarget("t");

//	printFunction("getLength");
	
	echo "<br>String Length: <font color=red>" . $sO->getLength() . "</font>";
//	printFunction("getPosition");
	echo "<br>String Position, Target: '" . $sO->getTarget() . "'<font color=red> " . $sO->getPosition() . "</font>";
//	printFunction("getLastPosition");
	echo "<br>String Position, Target: '" . $sO->getTarget() . "'<font color=red> " . $sO->getLastPosition() . "</font>";
//	printFunction("renderUpperCase");
	echo "<br>Upper Case: <font color=red>", $sO->renderUpperCase() . "</font>";
//	printFunction("renderLowerCase");
	echo "<br>Lower Case: <font color=red>", $sO->renderLowerCase() . "</font>";
//	printFunction("renderCapitalizeWords");
	echo "<br>Each word is capitalized: <font color=red>", $sO->renderCapitalizeWords() . "</font>";
//	printFunction("replaceTarget");
	echo "<br>Replacing parts: <font color=red>", $sO->replaceTarget("aeiou", "zyxwv") . "</font>";
	$targetList = array("This" => "That", "these" => "those", "people" => "animals");
//	printFunction("replaceTargetList");
	echo "<br>Replacing target list: <font color=red>", $sO->replaceTargetList($targetList) . "</font>";
	echo "<br><br>Regular Expressions, matching is true/false (1/0)";
//	printFunction("match");
	echo "<br>Matching 'ring'?: <font color=red>" . $sO->match("/ring/") . "</font>";
	echo "<br>Matching Beginning of line: '^is'?: <font color=red>" . $sO->match("/^is/") . "</font>";
	echo "<br>Matching End of line: 'people$'?: <font color=red>" . $sO->match("/people$/") . "</font>";
	echo "<br>Matching Beginning of line: '^This'?: <font color=red>" . $sO->match("/^This/") . "</font>";
	echo "<br>Matching Beginning of not case specific: '/^this/i'?: <font color=red>" . $sO->match("/^this/i") . "</font>";
	echo "<br>Matching End of line: 'people!$'?: <font color=red>" . $sO->match("/people!$/") . "</font>";
	echo "<br>Matching 'thought'?: <font color=red>" . $sO->match("/thought/") . "</font>";
//	printFunction("change");
	echo "<br>The line we are working on is: \"" . $sO->getString() . "\"";
	echo "<br><font color=blue\sO->change(\"/string/\",\"rubberband\")</font>";
	echo "<br>Change a word: <font color=red>" . $sO->change("/string/","rubberband") . "</font>";
	echo "<br><font color=blue>\$sO->change(\"/\st\S*/\",\" T-WORD\")</font>";
	echo "<br>Change every word that starts with 't': <font color=red>" . $sO->change("/\st\S*/"," T-WORD") . "</font>";
	echo "<br><font color=blue>\$sO->change(\"/,.*/\",\" and that is that.\")</font>";
	echo "<br>Change everything after the comma: <font color=red>" . $sO->change("/,.*/"," and that is that.") . "</font>";
	echo "<br><font color=blue>\$sO->change(\"/\s(a\S*)/\",\" NOT$1\")</font>";
	echo "<br>Add 'NOT' to every word beginning with 'a': <font color=red>" . $sO->change("/\s(a\S*)/"," NOT$1") . "</font>";
	echo "<br><font color=blue>\$sO->change(\"/e(\W)/\", \"X$1\")</font>";
	echo "<br>If 'e' is the last letter of a word - change it to 'X': <font color=red>" . $sO->change("/e(\W)/", "X$1") . "</font>";
	echo "<br><font color=blue>\$sO->change(\"/T.*\st/\", \"***\")</font>";
	echo "<br>Is this regex greedy? <font color=red>" . $sO->change("/T.*\st/", "***") . "</font> yes, i think so...";
	}
	
// begin
//stringObjectTest();