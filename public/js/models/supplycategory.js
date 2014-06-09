var SupplyCategory = Backbone.Model.extend({
	urlRoot: '/api/products',
	idAttribute: "_id",
	defaults: {
		
		"product_id": 3,
        "category": "supplies",
		"title": "Default Product",
		"id": "big-max-fountain",
		"url" : "big-max-fountain",
		"name": "Big Max Fountain",
		"keyword" : "Hydration",
		"description" : "Large capacity drinking fountain",
		"price" : "500",
		"quantity" : "0",
		"total" : "",
		"imagepathsm" : "big-max-fountain.jpg",
		"imagepathmenu" : "menu-big-max-fountain.jpg"

	},

	calculateAmount: function () {
		return '<p class="total col-lg-6 pull-right" style="font-size:18px;">' + 'Total: $' + this.get('price') * this.get('quantity') + '.00';
		
	}


});

