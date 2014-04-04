var ShoppingCartFullPageView = Backbone.View.extend ({

	
	initialize: function () {
		
		this.listenTo(this.collection, "reset", this.render);

		//this.listenTo({collection: this.collections.supplyCategoriesCollection });


	},

	render: function() {
		$(this.el).html(new ShoppingCartListView ({
			collection: this.collections.supplyCategoriesCollection
			//collection: this.collection
		}).render().el);

		$(this.el).append(new ShoppingCartListControlsView ({
			collection: this.collections.orderedSuppliesCollection
		}).render().el);

		$(this.el).append(new TotalPriceView ({
			collection: this.collections.orderedSuppliesCollection
		}).render().el);

		$(this.el).append(new OrderedSupplyListView ({
			collection: this.collections.orderedSuppliesCollection
			//collection: this.collection
			//collection: OrderedSuppliesCollection
		}).render().el);

	return this;

	}
});