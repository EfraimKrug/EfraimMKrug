function getLocation()
  {
  var options = null;
  var patternCheckChrome = /Chrome/i;
  var browserChrome = navigator.userAgent.match(patternCheckChrome);
	if (navigator.geolocation)
	{
	if (browserChrome) //set this var looking for Chrome un user-agent header
        options={enableHighAccuracy: false, maximumAge: 15000, timeout: 30000};
	else
        options={maximumAge:Infinity, timeout:0};
		
	navigator.geolocation.getCurrentPosition(getPlace,errorPosition,options);	
	};
 }
 
function showPosition(position)
  {
  getPlace(position);
  }
  
function getPlace(pos)
{
	geocoder = new google.maps.Geocoder();
	lat = parseFloat(pos.coords.latitude).toFixed(7);
	lon = parseFloat(pos.coords.longitude).toFixed(7);
	var latlng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);	
	geocoder.geocode({'latLng': latlng}, function(results, status) {
		var result = results[0];
		document.getElementById("jsAddressText").innerHTML = result.formatted_address;
		});
}

function errorPosition()
{
	document.getElementById("jsAddressText").innerHTML = "No geo coordinates available";
}
