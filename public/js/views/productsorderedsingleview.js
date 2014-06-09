var ProductsOrderedSingleView = Backbone.View.extend({
	template:Handlebars.compile(
		'<div class="container-cart products-ordered">'+
			'<hr>'+
			'<section class="row">'+
			
			'<hr>'+
			'<div class="col-lg-2">'+
				'<h1>{{title}}</h1>' +
				'<img src="photos/kitty-store/{{imagepathmenu}}" class="cart-list pull-left" style="width:150px;"/>' +
			'</div>'+
			'<div class="col-lg-3">'+
				'<label>Quantity:</label>'+
				'<span class="quantity">{{quantity}}</span><br/>' +
				'<span class="description">{{description}}</span><br/>' +
			'</div>'+
			'<div class="col-lg-7 pull-right">'+
			'<div class="total">Total: $</div>' +
			'<button type="button" data-id="{{_id}}" class="btn btn-secondary">Remove from Cart</button><br/>'+
			'</div>'+
		'</section>'+
		'</div>'
	),

	initialize: function() {
		this.listenTo(this.model, "reset", this.render);	
		this.listenTo(this.model, "change", this.render);
		var total = this.model.calculateAmount();
		console.log(total);	
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
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

});