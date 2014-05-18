var ProductDetailsView = Backbone.View.extend({
	
	initialize: function() {
		this.listenTo(this.model, "change", this.render);
		 //this.listenTo(this.model, "reset", this.render);

	},

	render: function() {		
		
		$(this.el).html(_.map([
			'<a href="#/shopping-cart">Back to Store</a>' +
			'<form>' +
			'<h3>' + this.model.attributes.title + '</h3>'+
			'<img src="photos/kitty-store/' + this.model.attributes.imagepathsm + '" class="img-polaroid" style="width:150px; max-height:100px; overflow:hidden;"/>' +
			'<span class="label">' + 'Quantity: ' + '</span>' + 
			'<input class="quantity" value="' + this.model.get('quantity') + '">' +
			'<button class="save">Save Quantity to Cart</button><br/>' +
			'<span class="price">' + '$' + this.model.get('price') + '.00' + '</span><br/>' +
			'</form>' +
			'<span class="description">' + this.model.get('description') + '</span>', this.model.calculateAmount(),

		], function(val, key) {
			return '<li class="shopping-item">' + val + '</li>';	

		}));

		return this;
	}
	
});