var ProductsOrderedSingleView = Backbone.View.extend({

	initialize: function() {
		this.listenTo(this.model, "reset", this.render);	
		this.listenTo(this.model, "change", this.render);
	},

	events: {
		'click .btn-secondary' : 'deleteItem'
	},

	deleteItem: function(event) {
		this.model.destroy( 
			{
				succcess:function(model) {
					app.productsOrderedCollection.remove(model.get('_id'));
					console.log('destroyed');
				}
			}

		);
		event.preventDefault();
	},

	render: function () {
		//this.$el.html(this.template(this.model.attributes));
		$(this.el).html(_.map([
			
			'<form>' +
			'<div class="container-cart products-ordered">' +
				'<section class="row">'+
				'<hr>'+
					'<div class="col-lg-2">'+
						'<h1>' + this.model.get('title')  + '</h1>' +
						'<img src="photos/kitty-store/' + this.model.attributes.imagepathsm + '" class="cart-list pull-left" style="width:150px;"/>' +
					'</div>' +
					'<div class="col-lg-3">'+
						'<label>Quantity:</label>'+
						'<span class="quantity">' + this.model.get('quantity') + '</span><br/>' +
						'<span class="description">' + this.model.get('description') + '</span><br/>' +
					'</div>'+
					'<div class="col-lg-3">'+
						/*'<label>Total:</label>'+
						'<span class="total pull-right">' + this.model.get('total') + '</span><br/>' +*/
					'</div>'+
				'<button id="back-cart" class="btn-secondary btn"><a href="#/shopping-cart">Remove From Cart</button></a>'+
			'</div>'+
			'</form>' + this.model.calculateAmount(),

		], function(val, key) {
			return '<div class="container container-cart">'+ '<li class="shopping-item">' + val + '</li></div>';	

		}));
		return this;
	},

});