<?php
include_once 'ObjectFILE.php';
include_once 'ObjectSTRING.php';

//DateInterface
interface DateInterface
{
	public function getToday();
	public function getJulian();
	public function setInterval($years, $months, $days, $hours, $minutes, $seconds);
	public function setToday();
	public function setDateToFuture();
	public function setDateToPast();
	public function setJulian();
	public function setJewish();
	public function getJewish();
}


//DateObject Class
class DateObject implements DateInterface
{
	private static $singleDate = False;
	/*
	 * Open...
	 */
		var $DtTime = "";
		var $FormattedDate = "";
		var $JulianDay = 0;
		var $JewishDay = "";
		var $TimeZone = "";
		var $Interval = "";

	 function DateObject($Zone = "UTC")
	{
		global $singleDate;
		date_default_timezone_set($Zone);
		$this->TimeZone = new DateTimeZone('America/New_York');

		/* only need to initialize one time... */
		if(!$singleDate){
			$singleDate = True;
			$this->setToday();
			$this->setJulian();
			$this->setJewish();
			}
	}

// sets a date interval
function setInterval($years=0, $months=0, $days=0, $hours=0, $minutes=0, $seconds=0){
	$arr = array('Y' => $years,
				 'M' => $months,
				 'D' => $days,
				 'H' => $hours,
				 'I' => $minutes,
				 'S' => $seconds);
	$s = "P";
	foreach ($arr as $e=>$v){
		if($v != 0){
			if($e == 'H'){
				$s .= "T" . $v . $e;
				}
			else if($e == 'I'){
				$s .= $v . "M";
				}
			else {
				$s .= $v . $e;
				}
			}
		}
	$this->Interval = new DateInterval($s);
	}
	
//setToday
function setToday(){
	$this->DtTime = new DateTime('now', $this->TimeZone);
	$this->FormattedDate = $this->DtTime->format('Y-m-d H:i:s');
	}

// add dateinterval to current date	
function setDateToFuture(){
	$this->DtTime = date_add($this->DtTime, $this->Interval);
	$this->FormattedDate = $this->DtTime->format('Y-m-d H:i:s');
	}

// subtract dateinterval from current date
function setDateToPast(){
	$this->DtTime = date_sub($this->DtTime, $this->Interval);
	$this->FormattedDate = $this->DtTime->format('Y-m-d H:i:s');
	}
	
//getToday
function getToday(){
	return $this->FormattedDate;
	}

//setJulian
function setJulian(){
	$dtArray = explode('-', $this->DtTime->format('m-d-Y'));
	$this->JulianDay = gregoriantojd($dtArray[0], $dtArray[1], $dtArray[2]); 
	}

//getJulian
function getJulian(){
	if($this->JulianDay == 0){
		setJulian();
		}
	return $this->JulianDay;
	}
//setJewish
function setJewish(){
	$dtArray = array();
	
	if($this->JulianDay == 0){
		setJulian();
		}
		
	$dtArray = explode("/", jdToJewish($this->JulianDay));
	$monthName = jdMonthName($this->JulianDay, 4);
	$this->JewishDay = $monthName . " " . $dtArray[1] . ", " . $dtArray[2];
	}
	
//getJewish
function getJewish(){
	if($this->JewishDay == ""){
		setJewish();
		}
	return $this->JewishDay;
	}	
//DateObject End Class
}



//dateObjectTest:
function dateObjectTest(){
	echo "<br>==================================";
	echo "<br>== D A T E   -   O B J E C T   -    T E S T ==";
	echo "<br>==================================";

	//printFunction("DateObject");

	$pO = new DateObject;
	echo "<br><font color=red>" . $pO->getToday() . "</font>";

	$pO->setInterval(1,2,3,4,5,6);
	$pO->setDateToFuture();
	echo "<br>" . $pO->getToday();
	$pO->setToday();
	//$pO = new DateObject;
	$pO->setInterval(1,2,3,4,5,6);
	$pO->setDateToPast();
	echo "<br>" . $pO->getToday();
	echo "<br><font color=red>" . $pO->getToday() . "</font><br>";
	
//	printFunction("setToday");
//	printFunction("getToday");
	$pO->setToday();
	echo "<br>Today: " . $pO->getToday();
	$pO->setInterval(0,0,23);
	$pO->setDateToFuture();
	echo "<br>23 days in the future: " . $pO->getToday();
	$pO->setToday();
	$pO->setInterval(0,0,0,34);
	$pO->setDateToPast();
	echo "<br>34 hours in the past: " . $pO->getToday();
	
//	printFunction("setJulian");
//	printFunction("getJulian");
	echo "<br>Notice - this is a number of days since January 1, 4714 BCE: {<font color=red>" . $pO->getJulian() . "</font>}";
	echo "<br><br>Evidently, this was the last time the 19-year lunar cycle, and the 28-year solar cycle, and the 15-year roman tax cycle ";
	echo " - right, go figure! - all coincided. This is called a 'Julian Period' by some guy named Joseph Justus Scaliger - born in ";
	echo "France in the late 1500's. Anyway - the period is 19 * 28 * 15 = 7980 years long. Now years can be 365 or 366 days long,";
	echo "so it gets a little more complicated.";
//	printFunction("setJewish");
//	printFunction("getJewish");
	echo "<br>Jewish Date: <font color=red>" . $pO->getJewish() . "</font>";
	echo "<br>===========================<br>";
}

dateObjectTest();
?>