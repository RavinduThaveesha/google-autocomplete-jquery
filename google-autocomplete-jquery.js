(function ($) {
	var that = this;
	
	this.autocompleteObj = {
		html: '<input type="text" name="address" id="auto-input">'+
			  '<div id="map"></div>',
			  
		options : {
			apiKey: '',
			lat: -33.8688,
            lng: 151.2195,
            zoom: 12,
            map: undefined,
            marker: undefined,
			mapOptions: undefined
		},
		
		loadScripts: function () {
			var scriptMapUrl = 'https://maps.googleapis.com/maps/api/js?libraries=places' + '&language=en&callback=window.easyLocatorMethods.loadMap';
			
			if(typeof google === 'object' && typeof google.maps === 'object') {
				this.loadMap();
			} else {
				if(typeof this.options.apiKey === 'undefined') {
					console.log('Undefined API key');
				} 
				scriptMapUrl = 'https://maps.googleapis.com/maps/api/js?libraries=places' + '&language=en&key=' + autocompleteObj.options.apiKey + '&callback=window.autocompleteObj.loadMap';				
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = scriptMapUrl
				script.setAttribute('defer','');
				script.setAttribute('async','');
				document.body.appendChild(script);            
			}          
		},
		
		loadMap: function () {
		
			if(typeof this.options.mapOptions == 'undefined') {
				mapOptions = {
				   zoom: 8,
				   center: new google.maps.LatLng(-33.8688, 151.2195),
				};
			} else {
				mapOptions = this.options.mapOptions;
			}
			
			//console.log(document.getElementById('map'));
		 
			this.options.map = new google.maps.Map(document.getElementById('map'), mapOptions);     
			

		}
	}
	
	$.fn.googleAutocomplete = function (options) {
		that.autocompleteObj.options = $.extend(that.autocompleteObj.options, options);
		this.html(autocompleteObj.html);
		that.autocompleteObj.loadScripts();
		
		return that.autocompleteObj;
	};
}(jQuery));