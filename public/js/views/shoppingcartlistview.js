//defining a view to render the collection of shoppingcartrenderview models
var ShoppingCartListView = Backbone.View.extend({
	
	tagName: 'table',

	className: 'single-supply-view',

	initialize: function() {
		//this.collection.fetch();
		//this.listenTo(this.collection, 'reset', this.render);
	},

	render: function() {
		
		$(this.el).empty();
		
		//append the table with rows
		$(this.el).append(
			_.map(this.collection.models, function(model, key) {
				return new ShoppingCartRenderView ({
					model: model
				}).render().el;
			})
		);


		//list of all available supplies from supplycategoriescollection
		//console.log(this.collection.toJSON());

		return this;

	},


});