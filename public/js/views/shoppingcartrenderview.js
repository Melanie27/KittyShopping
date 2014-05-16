var ShoppingCartRenderView = Backbone.View.extend({

	tagName: 'tr',

	className: 'ui-widget-content draggable',

	bindings: {
		'#quantity' : {observe: 'quantity'},
		'#price' : {observe: 'price'},
		'#total' : {observe: 'total'},

	},

	events: {

		'click button.save' : 'save',
	},


	initialize: function() {
		this.listenTo(this.model, "change", this.render);

		$(this.el).draggable({
			helper:'clone',
			opacity: 0.65
		});

		$(this.el).data("item-view", this);

		//this.listenTo(this.model, 'destroy', this.destroy, this);
	},

	/*destroy: function() {
		this.remove();
	},*/

	save: function() {
		
		this.model.set({
			quantity: $(this.el).find('input.quantity').val()
		});

		
	},

	render: function() {		
		
		$(this.el).html(_.map([
			
			'<img src="photos/kitty-store/' + this.model.attributes.imagepathsm + '" class="img-polaroid" style="width:150px; max-height:100px; overflow:hidden;"/>' +
			'<span class="label">' + 'Quantity: ' + '</span>' + 
			'<input class="quantity" value="' + this.model.get('quantity') + '">' +
			'<button class="save">Save Quantity</button><br/>' +
			
			'<span class="price">' + '$' + this.model.get('price') + '.00' + '</span><br/>' +
			'<span class="description">' + this.model.get('description') + '</span>', this.model.calculateAmount(),

		], function(val, key) {
			return '<li class="shopping-item">' + val + '</li>';	

		}));

		
		return this;
	}
	
});