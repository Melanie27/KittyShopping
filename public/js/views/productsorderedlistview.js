var ProductsOrderedListView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "reset", this.render);
		this.listenTo(this.collection, "remove", this.render);
		this.listenTo(this.collection, "add", this.render);	
	},

	render: function() {
		$(this.el).empty();

		$(this.el).append(
			_.map(this.collection.models, function(model, key) {
				return new ProductsOrderedSingleView({ model: model }).render().el
			})
		);

		return this;
	}

});