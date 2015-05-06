//var distNo=[49,52,51,41,54,21,29,36,31,37,53,45,27,48] // district served
var distNo=[49,52,51,41,54,21,29,36,31,37,53,27,48] // district served

var flag=0,a
var map,t1,t2;
function initialize() {
	  map = new google.maps.Map(document.getElementById('map-canvas'), {
	  	mapTypeId: google.maps.MapTypeId.ROADMAP,	
	  	draggable: true,
	  	zoom: 9,
	  	scrollwheel: false,
	  	disableDoubleClickZoom: true,
	  	disableDefaultUI: true,	
	  	center: {lat: 27.837669, lng: 85.326476}
		});
	$.ajax({
        	url: "assets/nepal-district.geojson.packed",
		dataType: 'json',
        	type: 'GET',
        	success: function (data) {
			var minifyr=new GeojsonMinifier({precision:6});
			t1=minifyr.unpack(data);
			t1=$.parseJSON(t1);
			for(i=0;i<75;i++){
			t1.features[i].geometry.coordinates[0][0][0]=Math.floor(t1.features[i].geometry.coordinates[0][0][0] * 1000000) / 1000000;
			t1.features[i].geometry.coordinates[0][0][1]=Math.floor(t1.features[i].geometry.coordinates[0][0][1] * 1000000) / 1000000;
			}
        		map.data.addGeoJson(t1);
			districtPercentage(0);
  		}
       		});	
     var a=new Array();
}

google.maps.event.addDomListener(window, 'load', initialize);
 
