
var Prowpexpert;

( function($) {"use strict";

Prowpexpert = window.Prowpexpert || {};
	
	
		if (/webkit.*mobile/i.test(navigator.userAgent)) {
			$('.lightbox').nivoLightbox({
				effect : 'nonexistent',
				afterHideLightbox : function() {
					$('.nivo-lightbox-content').empty();
				}
			});
		} else {
			$('.lightbox').nivoLightbox({
				effect : 'fall'
			});
		}


Prowpexpert.map = function (options){


		var settings = $.extend({
            type		: 	"color",
            selector	: 	"map-container"
        }, options);

		var mapSelector = settings.selector;

		var mapOptions = {
			location : $("#" + mapSelector).attr("data-location"),
			infoBoxText : $("#" + mapSelector).attr("data-text"),
			zoomLevel : $("#" + mapSelector).attr("data-zoom"),
			mapType : $("#" + mapSelector).attr("data-mapType"),
			
		}

		initmap(mapSelector, mapOptions);

		function initmap(selector, mapOptions) {

			var address = mapOptions.location;
			
			if(settings.type != "color"){
				//black and white
			var mapStyleOptions = [{
				featureType : "all",
				elementType : "all",
				stylers : [{
					saturation : -100,
					invert_lightness : true
				}]
			}];
			}else{
				//color
				var mapStyleOptions = [{
				featureType : "all",
				elementType : "all"
				}]
			}

			var map = new google.maps.Map(document.getElementById(selector), {
				mapTypeId : google.maps.MapTypeId.mapType,
				scrollwheel : false,
				draggable : true,
				disableDefaultUI : true,
				zoom : parseInt(mapOptions.zoomLevel),
				styles :mapStyleOptions
			});

			//responsive center
			google.maps.event.addDomListener(window, "resize", function() {
				var center = map.getCenter();
				google.maps.event.trigger(map, "resize");
				map.setCenter(center);
			});
			
			var map_pin = wp_plugin_dir +'/map/js/map-marker.png';
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				'address' : address
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var marker = new google.maps.Marker({
						position : results[0].geometry.location,
						map : map,
						icon : map_pin
					});

					map.setCenter(results[0].geometry.location);

					/*CREATE INFOBOX*/
					
					var boxText = document.createElement("div");
					boxText.innerHTML = "<div class='infoBox'>" + "<div class='content'>" + mapOptions.infoBoxText + "</div>" + "</div>";
					var myOptions1 = {
						content : boxText,
						disableAutoPan : false,
						pixelOffset : new google.maps.Size(30, 0),
						boxClass : 'map-box',
						alignBottom : true,
						pane : "floatPane"
					};
					var ib = new InfoBox(myOptions1);
					ib.open(map, marker);
					google.maps.event.addListener(marker, "click", function() {
						ib.open(map, marker);
					});

				}
			});
		}
		
		
}		





}(jQuery)); 
			
Prowpexpert.map({"type":"color","selector":"map-container"});