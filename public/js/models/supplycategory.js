var SupplyCategory = Backbone.Model.extend({
	url: '/api/products',
	idAttribute: "_id",
	//urlRoot: '/supplies',
	defaults: {
		
		        "product_id": 3,
                "category": "supplies",
		        "title": "Big Max Fountain",
		        "id": "big-max-fountain",
		        "url" : "big-max-fountain",
		        "name": "Big Max Fountain",
		        "keyword" : "Hydration",
		        "description" : "Large capacity drinking fountain",
		        "price" : "400",
		        "quantity" : "2",
		        "imagepathsm" : "big-max-fountain.jpg" 
		            
        		
			},

		validate: function (attrs) {
			if (attrs.quantity < 0 ) {

				return "Quantity cannot be negative"

				}
			},

		calculateAmount: function () {
			return '<p class="total">' + 'Total: $' + this.get('price') * this.get('quantity') + '.00';
		}

});

