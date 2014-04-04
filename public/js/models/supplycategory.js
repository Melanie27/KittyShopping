var SupplyCategory = Backbone.Model.extend({
	urlRoot: '/supplies',
	defaults: {
		
		        "product_id": 3,
                "category": "supplies",
		        "title": "Big Max Fountain",
		        "id": "big-max-fountain",
		        "url" : "big-max-fountain",
		        "name": "Big Max Fountain",
		        "keyword" : "Hydration",
		        "description" : "Large capacity drinking fountain",
		        "price" : "200",
		        "quantity" : "2",
		        "imagepathsm" : "big-max-fountain.jpg" 
		            
        		
			},

		validate: function (attrs) {
			if (attrs.quantity < 0 ) {

				return "Quantity cannot be negative"

				}
			},

		calculateAmount: function () {
			return '$' + this.get('price') * this.get('quantity') + '.00';
		}

});