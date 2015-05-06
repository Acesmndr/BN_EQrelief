var sss;
var dist={};
var tempp;
var geocoder=new google.maps.Geocoder();
var distList=new Array();
function districtPercentage(){
		$.ajax({
			 url: "assets/house.json",
			 dataType: 'json',
        		 type: 'GET',
			 success: function (data) {
                    
					var popn=new Array();
					//var dist={};
					a=data;
					for(i=0;i<a.length;i++){
                            a[i][1]=parseInt(a[i][1]);
							a[i][0]=a[i][0].toUpperCase();//.slice(0,a[i][0].length-1);
                            popn.push(a[i][1]);
							//distList.push(a[i][0]);
							//dist.push(parseInt(a[i][1]));	
						}
					//var maxm=Math.max.apply(Array,popn);
					for(i=0;i<a.length;i++){
							dist[a[i][0]]=a[i][1];
							//console.log(dist[a[i][0]]);
					}
					sss=dist;
					map.data.setStyle(function(feature) {
                            var temp=feature.getProperty("DISTRICT");
                            tempp=feature;
							//console.log(temp, dist[temp]);
							if(dist[temp]>"-1"){
                                distList.push(feature.getId());
                                geocoder.geocode( { 'address': temp}, function(results, status) {
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
                                console.log(distList);
                  
                                 /*if (status == google.maps.GeocoderStatus.OK) {
                                                        var marker = new google.maps.Marker({
                                                        map: map,
                                                        position: results[0].geometry.location
                                                        });
                                    }*/
                                });  
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
        	url: "assets/nepal-district-headquarters.geojson",
    		dataType: 'json',
        	type: 'GET',
        	success: function (data) {
			    t2=data;
                for(i=0;i<distList.length;i++){
                     var marker = new MarkerWithLabel({
                                                        position: new google.maps.LatLng(t2.features[distList[i]].geometry.coordinates[1],t2.features[distList[i]].geometry.coordinates[0]),
                                                        map: map,
                                                        draggable: true,
                                                        raiseOnDrag: true,
                                                        labelContent: a[i][1],
                                                        labelAnchor: new google.maps.Point(10, 35),
                                                        labelClass: "labels", // the CSS class for the label
                                                        labelInBackground: false
                                                     });
                            
                      
                }
        }
        });
    });


















}

