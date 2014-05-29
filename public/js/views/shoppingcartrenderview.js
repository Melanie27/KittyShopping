var ShoppingCartRenderView = Backbone.View.extend({

	tagName: 'tr',

	className: 'ui-widget-content draggable',


	events: {

		'click button.save' : 'save',
	},


	initialize: function() {
		
		this.model.fetch();
		//this.listenTo(this.model, "change", this.render);

	},

	

	save: function() {
		this.setModelData();

			this.model.save(this.model.attributes, {
				success: function (model) {
					app.orderedSuppliesCollection.add(model);
					console.log('success yes');
				}
			}

		);
	},

	setModelData: function() {
		
		this.model.set({
			quantity: $(this.el).find('input.quantity').val()
		});

		
	},

	render: function() {		
		
		$(this.el).html(_.map([
			'<form>' +
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