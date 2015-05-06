var sss;
var dist={};
var tempp;
var geocoder=new google.maps.Geocoder();
var distList=new Array();
var house={};
var house1={};
var markersArray=new Array();
var opaCT;
google.maps.Map.prototype.clearOverlays = function() {
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}
function districtPercentage(sel_opt){
		$.ajax({
			 url: "assets/TotalAnalytics.json",
			 dataType: 'json',
        		 type: 'GET',
			 success: function (data) {
                    var sel_list=["No. of Households served","Additional No. of Households","BN Non-Medical Volunteers","Medical Volunteers","Partner Volunteers","Tents","Noodles (in Cartons)","Biscuits (in Cartons)","Rice (in Sacks)","Beaten Rice (in Sacks)","Water (in Cartons)","Clothes (in Sacks)","Others"];
                    sel_opt=sel_list[sel_opt];
                    $("#info-box2").html(sel_opt);
                    map.clearOverlays();
                    house={};
					a=data;
					for(i=0;i<a["District"].length;i++){
                            house["a"+distNo[i]]=parseInt(a[sel_opt][i]);
                             house1["a"+distNo[i]]=parseInt(a[sel_opt][i]);
                            console.log("Hello");
                            }
					map.data.setStyle(function(feature) {
                    sss=dist;
                            var temp=feature.getProperty("DISTRICT");
                            console.log(house["a"+feature.getId()]);
                            tempp=feature;
							//console.log(temp, dist[temp]);
							if(house["a"+feature.getId()]!=undefined){
                                if(house["a"+feature.getId()]>100){     
                                            opaCT=0.8;
                                }else{
                                    if(house["a"+feature.getId()]>50){
                                            opaCT=0.6;
                                    }else{
                                        if(house["a"+feature.getId()]>30){
                                            opaCT=0.4;
                                            }else{
                                                if(house["a"+feature.getId()]>0){
                                                    opaCT=0.2;
                                                    }else{
                                                        opaCT=0;
                                                    }
                                            }
                                    }
                                }
                                //distList.push(feature.getId());
                                clr= "rgba(0,128,255,"+opaCT+")"//"+(0.6+house["a"+feature.getId()]/1000)+")";
                            }else{
                                clr="rgba(0,0,0,0)";
                                }
						    return /** @type {google.maps.Data.StyleOptions} */({
						      fillColor:clr,// feature.getProperty('color'),
                              fillOpacity:1,  
						      strokeWeight: 1.2,
						      strokeOpacity: 1	
						    });	
			});
        


		}
		}).done(function(){
        $.ajax({
        	url: "assets/DistrictHQ_Listbyaces.geojson",
    		dataType: 'json',
        	type: 'GET',
        	success: function (data) {
                t2=data;
                for(i=0;i<distNo.length;i++){
                    //console.log(t1.features[distNo[i]].properties["DISTRICT"]+" "+house[t1.features[distNo[i]].properties["DISTRICT"]])
                     var marker = new MarkerWithLabel({
                                                        position: new google.maps.LatLng(t2.features[distNo[i]].geometry.coordinates[1],t2.features[distNo[i]].geometry.coordinates[0]),
                                                        map: map,
                                                        draggable: true,
                                                        raiseOnDrag: true,
                                                        /*labelContent: t1.features[distNo[i]].properties["DISTRICT"].slice(0,3)+" S:"+house["a"+distNo[i]]+" R:"+house1["a"+distNo[i]],*/
                                                        labelContent:t1.features[distNo[i]].properties["DISTRICT"].slice(0,3)+" "+house["a"+distNo[i]],                    
                                                        labelAnchor: new google.maps.Point(55, 35),
                                                        labelClass: "labels", // the CSS class for the label
                                                        labelInBackground: false
                                                     });
                    markersArray.push(marker);
                            
                      
                }
        }
        });
    });


















}

