var SupplyCategoriesCollection = Backbone.Collection.extend({
	
	comparator: 'title',

	model: SupplyCategory,
	url: '/api/products/',
	idAttribute: "_id",
	//url: '/supplies'

	

	/*comparator: function (product) {
		return product.get("product_id");
	},

		// initialization
	initialize: function () {
	
	

	// bind customized method to this view
	_.bindAll(this, "totalPrice");

	//add a reset function that calls the total price function any time some quantity is updated - see tuts video nested collections

	},

	// calculate total price
	totalPrice: function () {

	// underscore.js's **reduce** function is used
	//return this.reduce(function(memo, value) { return memo + value.get("price") }, 1);

	return this.reduce(function(memo, value) {
		//console.log(+memo);
		return +memo +  +(value.get("price") * +(value.get("quantity")));
	}, 0);
	
	}*/



}); 