var OrderedSuppliesCollection = Backbone.Collection.extend({
	model: OrderSupplyModel,
	url: '/api/orders',

	initialize: function() {
		_.bindAll(this, "totalPrice");
	},

	// calculate total price
	totalPrice: function () {
	return this.reduce(function(memo, value) {
		return + memo +(value.get("price") * +(value.get("quantity")));
	}, 0);
	
	}

});