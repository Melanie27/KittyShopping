var ProductDetailsView2 = Backbone.View.extend({
	initialize: function() {	
		this.listenTo(this.model, "change", this.render, this.moveTotal);
		//this.listenTo(this.model, "set", this.saveOrder);
	},

	render: function() {		
		
		$(this.el).html(_.map([
			
			'<form>' +
			'<div class="row">' +
				'<section class="col-lg-8">'+
				'<img src="photos/kitty-store/' + this.model.attributes.imagepathsm + '" class="img-responsive"/>' +
				'</section>'+
				'<h3 style="text-align:left;">' + this.model.get('title') + '</h3>'+
				'<div class="price">' + '$' + this.model.get('price') + '.00' + '</div><br/>' +
				'<div class="description">' + this.model.get('description') + '</div><br/>' +
				'<span class="label">' + 'Quantity: ' + '</span>' + 
				'<input class="quantity" name="quantity" value="' + this.model.get('quantity') + '"><br/>' +
				'<button type="button" class="btn btn-primary btn-save">Save Quantity to Cart</button><br/>' +
				'<a class="details-link" href="#/view-cart">View shopping-cart</a>'+
				'<button id="back-cart" class="btn-secondary btn"><a href="#/shopping-cart">Back to Store</button></a>'+
			'</div>'+
			'</form>' + this.model.calculateAmount(),

		], function(val, key) {
			return '<div class="container container-cart">'+ '<li class="shopping-item">' + val + '</li></div>';	

		}));

		this.delegateEvents({
			'click .btn-save' : 'save'
		});

		return this;
	},

	/*saveOrder: function(model) {
        alert('order');
        app.productsOrderedCollection.add(model);
    },*/

    moveTotal: function() {
		console.log('move');
		
	},


	save: function() {
		this.setModelData();
			var description = this.model.get('description');
			var title = this.model.get('title');
			var quantity = this.model.get('quantity');
			var price = this.model.get('price');
			var imagepathsm = this.model.get('imagepathsm');
			var imagepathmenu = this.model.get('imagepathmenu');
			console.log(imagepathmenu);
			jQuery.post("/test/orders", {
				"title": title,  
  				"description": description, 
  				"quantity" : quantity,
  				"price" : price,
  				"imagepathsm" : imagepathsm,
  				"imagepathmenu" : imagepathmenu	
  						
				}, function (data, textStatus, jqXHR) { 
    				console.log("Post response:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
					 var notLogged = data;
            
            if (notLogged == 'You must be logged in for this') {
              	alert(notLogged);
              	//redirect the user here??
             	app.navigate("#/login", {trigger: true});
            } else {

            }

			});	

			//this.saveOrder();

		
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

			//total: this.$el.find(total),

		})
		
	}

	
});