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
				'<div class="price" style="font-size:18px; color:purple;">' + '$' + this.model.get('price') + '.00' + '</div><br/>' +
				'<div class="description">' + this.model.get('description') + '</div><br/>' +
				'<span class="label">' + 'Quantity: ' + '</span>' + 
				'<input class="quantity" name="quantity" value="' + this.model.get('quantity') + '"><br/>' +
				'<button type="button" style="background-color:purple; color:white; width:30%; margin-top:30px; margin-bottom:30px;" class="btn btn-save">Save Quantity to Cart</button><br/>' +
				'<button style="color:#666; background-color:green; font-size:14px;"><a class="details-link" href="#/view-cart">View shopping-cart</a></button>'+
				'<button id="back-cart"><a href="#/shopping-cart">Back to Store</button></a>'+
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
		$('.total').append('#back-cart');
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
		})
		
	}

	
});