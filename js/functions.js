var sss;
var dist={};
var tempp;
var geocoder=new google.maps.Geocoder();
var distList=new Array();
var house={};
function districtPercentage(){
		$.ajax({
			 url: "assets/TotalAnalytics.json",
			 dataType: 'json',
        		 type: 'GET',
			 success: function (data) {
                    
					a=data;
					for(i=0;i<a["District"].length;i++){
                            house[a["District"][i].toUpperCase()]=parseInt(a["No. of Households served"][i]);
                            console.log("Hello");
                            }
					map.data.setStyle(function(feature) {
                    sss=dist;
                            var temp=feature.getProperty("DISTRICT");
                            tempp=feature;
							//console.log(temp, dist[temp]);
							if(house[temp]>0){
                                //distList.push(feature.getId());
                                clr="Blue"
                            }else{
                                clr="White";
                                }
						    return /** @type {google.maps.Data.StyleOptions} */({
						      fillColor:clr,// feature.getProperty('color'),
						      strokeWeight: 1.2,
						      strokeOpacity: 1	
						    });	
			});
        


		}
		}).done(function(){
        console.log("This is",distList);
        $.ajax({
        	url: "assets/DistrictHQ_Listbyaces.geojson",
    		dataType: 'json',
        	type: 'GET',
        	success: function (data) {
                t2=data;
                for(i=0;i<distNo.length;i++){
                     var marker = new MarkerWithLabel({
                                                        position: new google.maps.LatLng(t2.features[distNo[i]].geometry.coordinates[1],t2.features[distNo[i]].geometry.coordinates[0]),
                                                        map: map,
                                                        draggable: true,
                                                        raiseOnDrag: true,
                                                        labelContent: t1.features[distNo[i]].properties["DISTRICT"],
                                                        labelAnchor: new google.maps.Point(10, 35),
                                                        labelClass: "labels", // the CSS class for the label
                                                        labelInBackground: false
                                                     });
                            
                      
                }
        }
        });
    });


















}

