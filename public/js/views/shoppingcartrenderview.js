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
			
			'<img src="photos/kitty-store/' + this.model.attributes.imagepathsm + '" class="img-polaroid" style="Width:150px;"/>' +
			'<span>' + 'Quantity: ' + '</span>' + 
			'<input class="quantity" value="' + this.model.get('quantity') + '">' +
			this.model.get('description') +
			+ '<span class="total">' + this.model.get('price') + '</span>', this.model.calculateAmount(),
			'<button class="save">Save Quantity</button>',
		], function(val, key) {
			return '<li style="padding:1px; clear:both; display:block; list-style-type:none; float:none;">' + val + '</li>';	

		}));

		//console.log(this.model.toJSON());

		//$(this.el).html(html);

		this.stickit();

		return this;
	}
	
});