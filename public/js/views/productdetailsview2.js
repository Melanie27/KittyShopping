var ProductDetailsView2 = Backbone.View.extend({
	initialize: function() {
		
		//this.model = new SupplyCategory();
		//this.model.fetch({reset: true});
		this.listenTo(this.model, "change", this.render);


	
	},

	render: function() {		
		
		$(this.el).html(_.map([
			'<a href="#/shopping-cart">Back to Store</a>' +
			'<form>' +
			'<h3>' + this.model.get('title') + '</h3>'+
			'<img src="photos/kitty-store/' + this.model.attributes.imagepathsm + '" class="img-polaroid" style="width:150px; max-height:100px; overflow:hidden;"/>' +
			'<span class="label">' + 'Quantity: ' + '</span>' + 
			'<input class="quantity" name="quantity" value="' + this.model.get('quantity') + '">' +
			'<button type="button" class="btn btn-primary">Save Quantity</button><br/>' +
			'<span class="price">' + '$' + this.model.get('price') + '.00' + '</span><br/>' +
			'</form>' +
			'<span class="description">' + this.model.get('description') + '</span><br/>' +
			'<a href="#/orders/' + this.model.attributes._id + '">View shopping-cart</a>', this.model.calculateAmount(),

		], function(val, key) {
			return '<li class="shopping-item">' + val + '</li>';	

		}));

		this.delegateEvents({
			'click .btn-primary' : 'save'
		})

		return this;
	},

	save: function() {
		this.setModelData();

			this.model.save(this.model.attributes,
			{
				

				success: function (model) {
					
					app.productsOrderedCollection.add(model);
					
					
					//Post to the ordered Supplies Collection
					jQuery.post("/api/orders", {
						"title": title,  
  						"description": description, 
  						"quantity" : quantity,
  						"price" : price 
  						
					}, function (data, textStatus, jqXHR) { 
    					console.log("Post response:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
					});

				}

		})

			var description = this.model.get('description');
			var title = this.model.get('title');
			var quantity = this.model.get('quantity');
			var price = this.model.get('price');
	},

	setModelData: function() {
		this.model.set({
			
			quantity: this.$el.find('input[name="quantity"]').val(),


		})
		
	}
});