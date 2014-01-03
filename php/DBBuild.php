<!DOCTYPE html>
<html>
<body>
<?php
$sql = array(	
"CREATE DATABASE ebaysearch",

"DROP TABLE BSearch",
"DROP TABLE BPerson",
 
"CREATE TABLE BPerson  
(PERSONID smallint NOT NULL AUTO_INCREMENT,
NAME varchar(35),
EMAIL varchar(48),
PRIMARY KEY(PERSONID))",

"CREATE TABLE BSearch
(SEARCHID smallint NOT NULL AUTO_INCREMENT,
SEARCH_PARAM varchar(128),
DATE_TIME datetime,
SEARCH_PERSONID smallint,
FOREIGN KEY (SEARCH_PERSONID) references BPerson(PERSONID),
PRIMARY KEY (SEARCHID))",

);
/* 
 * added CONFIRMATION_FLAG
 */
include_once 'DB2.php';
include 'ENVIRONMENT.php';
$dbObject = DBFactory::getFactory()->getDB(ENVIRONMENT);

//for($i=0;$i<4;$i++)
for($i=1;$i<count($sql);$i++)
{
echo "<br>Executing: " . $sql[$i];
if ($dbObject->runRawSQL($sql[$i]))
  {
  echo "<br>" . stristr($sql[$i],"(", true) . " Successful<br>";
  }
else
  {
  echo "<br>Database Error: " . $dbObject->displayError();
  echo "<br>{{ $sql[$i] }}";
  }
}
$dbObject->DBClose();
?> 

</body>
</html>