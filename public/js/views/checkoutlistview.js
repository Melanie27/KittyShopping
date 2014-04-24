var CheckoutListView = Backbone.View.extend ({


	initialize: function() {
		this.listenTo(this.collection, "reset", this.render);
	},


	render: function() {

		$(this.el).append(new OrderedSupplyListView ({
			collection: this.orderedSuppliesCollection
		}).render().el);

		return this;
	}
	
});