var SupplyCategoriesCollection = Backbone.Collection.extend({
	
	comparator: 'title',

	model: SupplyCategory,
	url: '/api/products/',
	idAttribute: "_id",
	//url: '/supplies'

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

	initialize: function() {
		
		this.listenTo(this, "add", this.addOne);
		this.listenTo(this, "remove", this.addOne);
		//console.log(OrderModel);
	},


	addOne: function(model) {
		//console.log('saving');
		//this.add(model);
		
	},

	/*comparator: function (product) {
		return product.get("product_id");
	},*/

	



		// initialization
	/*initialize: function () {
	
	

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