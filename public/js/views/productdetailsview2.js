var ProductDetailsView2 = Backbone.View.extend({
	initialize: function() {	
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model, "set", this.saveOrder);
	},

	render: function() {		
		
		$(this.el).html(_.map([
			'<a href="#/shopping-cart">Back to Store</a>' +
			'<form>' +
			'<h3>' + this.model.get('title') + '</h3>'+
			'<img src="photos/kitty-store/' + this.model.attributes.imagepathsm + '" class="img-polaroid" style="width:150px; max-height:100px; overflow:hidden;"/>' +
			'<span class="label">' + 'Quantity: ' + '</span>' + 
			'<input class="quantity" name="quantity" value="' + this.model.get('quantity') + '">' +
			'<button type="button" class="btn btn-save">Save Quantity</button><br/>' +
			'<span class="price">' + '$' + this.model.get('price') + '.00' + '</span><br/>' +
			'</form>' +
			'<span class="description">' + this.model.get('description') + '</span><br/>' +
			'<a href="#/view-cart">View shopping-cart</a>', this.model.calculateAmount(),

		], function(val, key) {
			return '<li class="shopping-item">' + val + '</li>';	

		}));

		this.delegateEvents({
			'click .btn-save' : 'save'
		});

		return this;
	},

	saveOrder: function(model) {
        alert('order');
        app.productsOrderedCollection.add(model);
    },

	save: function() {
		this.setModelData();
			var description = this.model.get('description');
			var title = this.model.get('title');
			var quantity = this.model.get('quantity');
			var price = this.model.get('price');
			var imagepathsm = this.model.get('imagepathsm');
			jQuery.post("/test/orders", {
				"title": title,  
  				"description": description, 
  				"quantity" : quantity,
  				"price" : price,
  				"imagepathsm" : imagepathsm,	
  						
				}, function (data, textStatus, jqXHR) { 
    				console.log("Post response:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
			});	

			this.saveOrder();

		
	},

	

	resetModelData: function() {
		//this would be a put request when I have the time
		this.model.set({
			quantity: '0',
		})
	},

	setModelData: function() {
		this.model.set({
			quantity: this.$el.find('input[name="quantity"]').val(),
		})
		
	}

	
});