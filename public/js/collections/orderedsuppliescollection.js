var OrderedSuppliesCollection = Backbone.Collection.extend({
	
	model: OrderSupplyModel,
	url: '/api/orders',

	initialize: function() {
		_.bindAll(this, "totalPrice");
	},

	// calculate total price
	totalPrice: function () {

	// underscore.js's **reduce** function is used
	//return this.reduce(function(memo, value) { return memo + value.get("price") }, 1);

	return this.reduce(function(memo, value) {
		//console.log(+memo);
		return +memo +  +(value.get("price") * +(value.get("quantity")));
	}, 0);
	
	}

});