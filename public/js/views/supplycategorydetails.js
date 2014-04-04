var SupplyCategoryDetails = Backbone.View.extend({
	
	className: 'shopping-cart-update-view',

	bindings: {
		'#description' : { observe: 'description'},
		'#price' : { observe: 'price'},
		'#quantity' : { observe: 'quantity'},
	},

	initialize: function () {
		this.listenTo(this.model, "change", this.render);
	},

	renderEditMode: function() {
		$(this.el).html(_.map([
			'<div>' +
			'<h1>' + this.model.attributes.title + '<h1>' +
			'<h1>' + this.model.attributes.keyword + '<h1>' +
			'<img src="photos/kitty-store/' + this.model.attributes.imagepathsm + '" class="img-polaroid" />' +
			'</div>'+ 

			'<input class="quantity" id="quantity" value="' +
			this.model.get('quantity') + '">',
		'<button class="save">Save</button>',
		'<button class="cancel">Cancel</button>'
		], function(val, key) {
			return '<td>' + val + '</td>'
		}));
	//alert('callback');
	},

	renderViewMode: function() {
		var markup = '<div>' +
		'<h1>' + this.model.attributes.title + '<h1>' +
		'<h1>' + this.model.attributes.keyword + '<h1>' +
		'<h1>' + '<h2 style="color:blue;"> Price: $' + this.model.attributes.price + '</h2>' + '<h1>' +
		'<img src="photos/kitty-store/' + this.model.attributes.imagepathsm + '" class="img-polaroid" />' +
		'</div>'+
		'<div>' + this.model.attributes.description + '</div>' +

		'<ul class="links">' + this.model.attributes.url + '</ul>'+
		'<button class="add">Add to Cart</button>' +
		'<input class="quantity" id="quantity" value="' +
			this.model.get('quantity') + '">'
		

		this.$el.html(markup).append(new ShoppingCartListControlsView ({
			collection: this.collection
		}).render().el);

		//this.stickit();

		return this;
	},

	renderCallback: 'renderViewMode',

	events: {

			'click button.add' : 'add',
			'click button.save' : 'save',
			'click button.cancel' : 'cancel'
	},

	add: function() {
		alert('editing');
		this.renderCallback = 'renderEditMode';
		this.render();
	},

	save: function() {
		alert('saving');
		this.model.set({
			quantity: $(this.el).find('input.quantity').val(),
		});
		this.renderCallback = 'renderViewMode';
		this.render();

	},

	cancel: function() {
		this.renderCallback = 'renderViewMode';
		this.render();
	},

	render: function () {
		var opt = this.model.attributes.subsupply;
		var bigUrl = this.model.attributes.url;
		//console.log(bigUrl);
		var output = "";
		for (number in opt) {
			var subsupplies = opt[number];
			var supplyUrl = subsupplies.url;
			//console.log(supplyUrl);
			var names = subsupplies.name
				output += '<li>' + '<a href= "#/kitty-supplies/' + bigUrl + '/' + supplyUrl + '">' +
			 names  + '</a>' + '</li>';
		}



		var markup = '<div>' +
		'<h1>' + this.model.attributes.title + '<h1>' +
		'<h1>' + this.model.attributes.keyword + '<h1>' +
		'<img src="photos/kitty-store/' + this.model.attributes.imagepathsm + '" class="img-polaroid" />' +
		'</div>'+
		'<div>' + this.model.attributes.description + '</div>' +

		'<ul class="links">' + this.model.attributes.url + '</ul>'+
		'<button class="add">Add to Cart</button>' +
		'<input class="quantity" value="' +
			this.model.get('quantity') + '">'
		

		this.$el.html(markup);

		this[this.renderCallback] ();

		return this;
	}
	

});	