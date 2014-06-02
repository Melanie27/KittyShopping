var SupplyCategoriesCollection = Backbone.Collection.extend({
	
	comparator: 'title',
	model: SupplyCategory,
	url: '/api/products/',
	idAttribute: "_id",
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
	},

}); 