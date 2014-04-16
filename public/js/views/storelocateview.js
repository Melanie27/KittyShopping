var StoreLocateView = Backbone.View.extend({

	template: Handlebars.compile (

		'<div id="store-locator-container">' +
			'<div id="page-header">' +
				'<h1>Yoga Kitten Locations</h1>' +
			'</div>'+
			'<div id="form-container">' +
				'<form id="user-location" method="post" action="#">'+
					'<div id="form-input">' +
						'<label for="address">Enter Address or Zip Code:</label>'+
						'<input type="text" id="address" name="address" />' +
					 '</div>' +
					 '<button id="submit" type="submit">Submit</button>' +
				'</form>' +
			'</div>' +
			'<div id="map-container">' +
        		'<div id="loc-list">' +
            		'<ul id="list"></ul>' +
        		'</div>' +
        		'<div id="map"></div>' +
      		'</div>' +
    	'</div>'

	),

	
	render: function() {
		
		this.$el.html(this.template);
		return this;
	}
	
});	