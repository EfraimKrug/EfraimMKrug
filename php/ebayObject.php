<?php
//ebayInterface
interface ebayInterface {
	public function buildURLArray();
	public function buildObject();
	public function getFile();
	public function getQuery();
}

//StringObject Class
class ebayObject implements ebayInterface {
// ebay API request variables
	var $endpoint = 'http://svcs.ebay.com/services/search/FindingService/v1';  // URL to call
	var $version = '1.0.0';  // API version supported by your application
	var $appid = 'EMK10ba5b-6f52-449b-a589-f3849eaca8c';  
	var $safequery = "jewish prayer";
	var $globalid = 'EBAY-US';  // Global ID of the eBay site you want to search (e.g., EBAY-DE)
	var $query = 'jewish prayer';  // You may want to supply your own query
	var $apicall = "";
	

	
// communication variables
	var $urlArray = "";
	var $file = "";
	var $htmlResponse = "";
	
	var $filterarray =
	array(
		array(
			'name' => 'MaxPrice',
			'value' => '25000',
			'paramName' => 'Currency',
			'paramValue' => 'USD'),
		array(
			'name' => 'FreeShippingOnly',
			'value' => 'true',
			'paramName' => '',
			'paramValue' => ''),
		array(
			'name' => 'ListingType',
			'value' => array('AuctionWithBIN','FixedPrice','StoreInventory'),
			'paramName' => '',
			'paramValue' => ''),
	);

	function setQuery($query){
		$this->query = $query;
		$this->safequery = urlencode($query);
		}
		
	function getQuery(){
		return $this->query;
		}
		
	function getFile(){
		return $this->htmlResponse;
		}
		
	// Construct the findItemsByKeywords HTTP GET call
	
	function buildObject(){
		$this->safequery = urlencode($this->query);  // Make the query URL-friendly
		$apicall = "";
		$apicall = $this->endpoint;
		$apicall .= "?OPERATION-NAME=findItemsByKeywords";
		$apicall .= "&SERVICE-VERSION=$this->version";
		$apicall .= "&SECURITY-APPNAME=$this->appid";
		$apicall .= "&GLOBAL-ID=$this->globalid";
		$apicall .= "&keywords=$this->safequery";
		$apicall .= "&paginationInput.entriesPerPage=100";
		$apicall .= $this->buildURLArray(); // Load the call and capture the document returned by eBay API
		$this->apicall = $apicall;
		}

	
	function buildURLArray(){
		$urlfilter = "";
		$i = 0;
		// Iterate through each filter in the array
		foreach($this->filterarray as $itemfilter) {
		// Iterate through each key in the filter
		foreach ($itemfilter as $key =>$value) {
		if(is_array($value)) {
			foreach($value as $j => $content) { // Index the key for each value
			$urlfilter .= "&itemFilter($i).$key($j)=$content";
			}
		}
		else {
			if($value != "") {
				$urlfilter .= "&itemFilter($i).$key=$value";
				}
			}
		  }
		$i++;
		}
	$this->urlArray = $urlfilter;
	$this->apicall .= $urlfilter;
	return "$urlfilter";
	} // End of buildURLArray function

	function readAPICall(){
		#echo 'Curl: ', function_exists('curl_version') ? 'Enabled' : 'Disabled';
		#echo "<br>" . var_dump(ini_get('allow_url_fopen')); 
		
		/* gets the data from a URL */
		$ch = curl_init();
		$timeout = 5;
		curl_setopt($ch, CURLOPT_URL, $this->apicall);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
		$data = curl_exec($ch);
		#print_r ($data);
		
		curl_close($ch);
		#echo "Before Source...";
		$source = simplexml_load_string($data) or die("Something is wrong");
		#echo "OK ALREADY";
		#print_r ($source);
		#echo "After Print_R";
		$this->file = $source;
		#$this->file = $source->Result;
		#return $data;
		#$this->file = simplexml_load_string($data);
		#$this->file = simplexml_load_file($this->apicall);
	}

	function buildHTML(){
		$LineCount = 0;
		$results = "";
		$file = $this->file;
		
		if ($file->ack == "Success") {
		$results = '';
		// If the response was loaded, parse it and build links
		foreach($file->searchResult->item as $item) {
			$pic   = $item->galleryURL;
			$link  = $item->viewItemURL;
			$title = $item->title;
			$location = $item->location;

			// For each SearchResultItem node, build a link and append it to $results
			$results .= "<tr><td class='boxLeft'><img src=\"$pic\"></td><td class='boxRight'><a href=\"$link\">$title</a><br><br>$location</td></tr>";
			$LineCount++;
			}
		}
		// If the response does not indicate 'Success,' print an error
		else {
			$results  = "<h3>Oops! The request was not successful. Make sure you are using a valid ";
			$results .= "AppID for the Production environment.</h3>";
		}
	if($results == ""){
		$results = "<i>I'm so sorry, my friend! We couldn't find a single thing!</i>";
		}
	$this->htmlResponse = $results;
	return $results;
	}
} // end ebayObject

?>