
var minzoom = 12;
var marker;

function initMap() {
var centerOfMap = new google.maps.LatLng(18.516726, 73.856255);

var bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(18.431332520371555, 73.68113486387688), 
     new google.maps.LatLng(18.667249044338597, 74.09689703487106));

  var options = {
	center:centerOfMap ,
    zoom: 13,
  bounds: bounds,
streetViewControl: false,
//clickableIcons: false,
	mapTypeControl: false,
	strictBounds: true,
    componentRestrictions: {
      country: 'in'
    }
  };
  var map = new google.maps.Map(document.getElementById('map'), options );

var marker= new google.maps.Marker({
                //position: clickedLocation,
                map: map,
                draggable: true //make it draggable
            });


var input = document.getElementById('pac-input');

var myLatlng = new google.maps.LatLng(18.52282963635534,73.83887529373169);
      map.setCenter(myLatlng);
  
      var  jeocoder = new google.maps.Geocoder();
      jeocoder.geocode({ 'latLng': myLatlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            //alert("Location: " + results[1].formatted_address + "\r\nLatitude: " + event.latLng.lat() + "\r\nLongitude: " + event.latLng.lng());
                            document.getElementById("pac-input").value =results[1].formatted_address ;
			    document.getElementById("address").value = results[1].formatted_address;
      				
				}
                    }
                });



  if (navigator.geolocation) 
  { 
  navigator.geolocation.getCurrentPosition(function (p) 
  { 
   
  var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
  
  map.setCenter(LatLng);
  marker.setPosition(LatLng);

                var  jeocoder = new google.maps.Geocoder();
                jeocoder.geocode({ 'latLng': LatLng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            //alert("Location: " + results[1].formatted_address + "\r\nLatitude: " + event.latLng.lat() + "\r\nLongitude: " + event.latLng.lng());
                            document.getElementById("pac-input").value =results[1].formatted_address ;
		
			    document.getElementById("address").value =results[1].formatted_address ;
                        }
                    }
                });
   
  },showError);
  
  } 
  else 
  { 
  alert('Geo Location feature is not supported in this browser.'); 

   
  }
  
  
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
	  alert('Permission denied'); 
	
      var myLatlng = new google.maps.LatLng(18.52282963635534,73.83887529373169);
      map.setCenter(myLatlng);
      marker.setPosition(myLatlng);
      var  jeocoder = new google.maps.Geocoder();
      jeocoder.geocode({ 'latLng': myLatlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            //alert("Location: " + results[1].formatted_address + "\r\nLatitude: " + event.latLng.lat() + "\r\nLongitude: " + event.latLng.lng());
                            document.getElementById("pac-input").value =results[1].formatted_address ;
			    document.getElementById("address").value = results[1].formatted_address;
                        }
                    }
                });
      break;
    case error.POSITION_UNAVAILABLE:
      alert('Location information is unavailable.');
      break;
    case error.TIMEOUT:
     alert('The request to get user location timed out.');
      break;
    case error.UNKNOWN_ERROR:
      alert('An unknown error occurred.');
      break;
  }
}

  
var allowedBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(18.431332520371555, 73.68113486387688), 
     new google.maps.LatLng(18.667249044338597, 74.09689703487106)
);
var lastValidCenter = map.getCenter();

google.maps.event.addListener(map, 'center_changed', function() {
    if (allowedBounds.contains(map.getCenter())) {
        // still within valid bounds, so save the last valid position
        lastValidCenter = map.getCenter();
        return; 
    }
   
    // not valid anymore => return to last valid position
    map.panTo(lastValidCenter);
});
 google.maps.event.addListener(map, 'zoom_changed', function() {
     if (map.getZoom() < minzoom) map.setZoom(minzoom);
   });

  var autocomplete = new google.maps.places.Autocomplete(input, options);
  //autocomplete.bindTo('bounds', map);

 map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
 
 
 google.maps.event.addListener(map, 'click', function(event) {                
        //Get the location that the user clicked.
        var clickedLocation = event.latLng;
        
        //If the marker hasn't been added.
        if(marker === false){
            //Create the marker.
            marker = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true //make it draggable
            });
            
            //Listen for drag events!
            google.maps.event.addListener(marker, 'dragend', function(event){
                markerLocation();
            });
        } else{
            //Marker has already been added, so just change its location.
            marker.setPosition(clickedLocation);
        }
        //Get the marker's location.
        //markerLocation();
        var infoWindow = new google.maps.InfoWindow();
var latlngbounds = new google.maps.LatLngBounds();

        var latlng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
                var  geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            //alert("Location: " + results[1].formatted_address + "\r\nLatitude: " + event.latLng.lat() + "\r\nLongitude: " + event.latLng.lng());
                            document.getElementById("pac-input").value =results[1].formatted_address ;
				document.getElementById("address").value = results[1].formatted_address;
                        }
                    }
                });
    });
 var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  //infowindow.setContent(infowindowContent);
  //var geocoder = new google.maps.Geocoder;
  var marker = new google.maps.Marker({
   map: map
  });
  marker.addListener('click', function() {
      marker.setPosition(clickedLocation);
  });

google.maps.event.addListener(autocomplete,'place_changed', function() {
    //infowindow.close();
    var place = autocomplete.getPlace();
document.getElementById("address").value = document.getElementById("pac-input").value;
		var lat = place.geometry.location.lat();
    var long = place.geometry.location.lng();
    
    latlng = new google.maps.LatLng(lat,long);

      
      map.setZoom(14);
      
     map.setCenter(latlng);
      // Set the position of the marker using the place ID and location.
      marker.setPosition(latlng);
       
    });
  
function check(){
  return bounds.contains(new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng()));
}
function locate()
{
if (navigator.geolocation) 
  { 
  navigator.geolocation.getCurrentPosition(function (p) 
  { 
  var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
  map.setCenter(LatLng);
  marker.setPosition(LatLng);
    var  jeocoder = new google.maps.Geocoder();
                jeocoder.geocode({ 'latLng': LatLng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            //alert("Location: " + results[1].formatted_address + "\r\nLatitude: " + event.latLng.lat() + "\r\nLongitude: " + event.latLng.lng());
                            document.getElementById("pac-input").value =results[1].formatted_address ;
		
			    document.getElementById("address").value =results[1].formatted_address ;
                        }
                    }
                });
   
  },showError); 
  
  } 
  else 
  { 
  alert('Geo Location feature is not supported in this browser.'); 

   
  }
  
  
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
	  alert('Permission denied'); 
      var myLatlng = new google.maps.LatLng(18.52282963635534,73.83887529373169);
      map.setCenter(myLatlng);
      marker.setPosition(myLatlng);
      var  jeocoder = new google.maps.Geocoder();
      jeocoder.geocode({ 'latLng': myLatlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            //alert("Location: " + results[1].formatted_address + "\r\nLatitude: " + event.latLng.lat() + "\r\nLongitude: " + event.latLng.lng());
                            document.getElementById("pac-input").value =results[1].formatted_address ;
			    document.getElementById("address").value = results[1].formatted_address;
                        }
                    }
                });
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}

}
initMap.check=check;
initMap.locate=locate;
}

function myFunction() {
	var modal = document.getElementById("myModal");
	document.body.style.overflow = "visible";
	modal.style.display = "none";
    if(initMap.check())
    {
     document.getElementById("demo").value = "true" ;  
    }
    else
    {
    document.getElementById("demo").value = "false";
    }
   
}

function locatefunction(){

initMap.locate();

}