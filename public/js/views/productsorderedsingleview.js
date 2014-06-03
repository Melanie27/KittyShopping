var ProductsOrderedSingleView = Backbone.View.extend({
	template:Handlebars.compile(
		'<h2>{{title}}</h2>' +
		'<label>Quantity :  </label><span class="quantity" style="font-size:16px;">{{quantity}}</span><br/>' +
		'<img src="photos/kitty-store/{{imagepathsm}}" class="img-polaroid" style="width:150px;"/>' +
		'<button type="button" data-id="{{_id}}" class="btn btn-secondary">Remove from Cart</button><br/>'
	),

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
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

});