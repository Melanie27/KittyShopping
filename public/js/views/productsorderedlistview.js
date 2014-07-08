var ProductsOrderedListView = Backbone.View.extend({
	initialize: function() {
		//this.listenTo(this.collection, "add", this.render);	
		//this.listenTo(this.collection, "change",  this.render);
		this.listenTo(this.collection, "reset", this.render);
		this.listenTo(this.collection, "remove", this.render);
		this.bind('change', this.setCalculations, this.render, this);
		this.setCalculations();
		
	},

	setCalculations: function() {
		_.map(this.collection.models, function(model, key) {
				return value.get("total").render().el
			});

		//return this.reduce(function(memo, value) { return memo + value.get("total") }, 0);
	},
	
	render: function() {
		
		$(this.el).empty();
		$(this.el).append('<h1 class="keep-shopping"><a href="#/shopping-cart" class="keep-shopping">Continue Shopping</a></h1>');
		$(this.el).append(
			_.map(this.collection.models, function(model, key) {
				return new ProductsOrderedSingleView({ model: model }).render().el
			})
		);
		
		
		$(this.el).append(
			_.map([
				
				 this.collection.calculateTotals(),

				], function(val, key) {
					return '<div class="container container-cart">'+ '<hr/><li class="shopping-item total" style="font-size:20px;">' + 'Grand Total: $' + val + '.00' + '</li></div>';	

			})
		);


		//console.log(this.calculateAmount());

		return this;
	}

});