var flag=0,a
var map,t1,t2;
function initialize() {
	  map = new google.maps.Map(document.getElementById('map-canvas'), {
	  	mapTypeId: google.maps.MapTypeId.ROADMAP,	
	  	draggable: false,
	  	zoom: 8,
	  	scrollwheel: false,
	  	disableDoubleClickZoom: true,
	  	disableDefaultUI: true,	
	  	center: {lat: 28.05259082333986, lng: 84.1552734375}
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
			districtPercentage();
  		}
       		});	
     var a=new Array();
     /*$.ajax({
        	url: "assets/nepal-district-headquarters.geojson",
		dataType: 'json',
        	type: 'GET',
        	success: function (data) {
			    t2=data;
                for(i=0;i<75;i++){
                    var marker = new MarkerWithLabel({
                        position: new google.maps.LatLng(t2.features[i].geometry.coordinates[1],t2.features[i].geometry.coordinates[0]),
                        map: map,
                        draggable: true,
                        raiseOnDrag: true,
                        labelContent: "100",
                        labelAnchor: new google.maps.Point(10, 35),
                        labelClass: "labels", // the CSS class for the label
                        labelInBackground: false
                     });
                   }
			}			
            });	*/   
	
}

google.maps.event.addDomListener(window, 'load', initialize);
 
