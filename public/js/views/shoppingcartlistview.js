//defining a view to render the collection of shoppingcartrenderview models
var ShoppingCartListView = Backbone.View.extend({
	
	tagName: 'table',

	className: 'single-supply-view',

	initialize: function() {
		this.listenTo(this.collection, 'reset', this.render);
	},

	render: function() {
		
		$(this.el).empty();

		//Append table with a table header
		$(this.el).append($('<h4><div><tr></tr></div></h4>').html(
			_.map(['Quantity', 'Description', 'Price', 'Total'],
				function(val, key) {
					return '<th style="padding:5px; clear:both;">' + val + '</th>'
				} 
			) 
		));


		//append the table with rows
		$(this.el).append(
			_.map(this.collection.models, function(model, key) {
				return new ShoppingCartRenderView ({
					model: model
				}).render().el;
			})
		);




		/*_.each(this.collection.models, function(model, key) {
			this.append(model);
		}, this);*/

		//list of all available supplies from supplycategoriescollection
		console.log(this.collection.toJSON());

		//$(this.el).html('checkout');

		//this.stickit();
		return this;


	},

	//add invoice item row to table
	/*append: function(model) {
		$(this.el).append(new ShoppingCartRenderView ({model: model}).render().el);
	}*/

});