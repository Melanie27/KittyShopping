var TotalPriceView = Backbone.View.extend({

		// define HTML element destination
//el: "#totalPrice",

className: 'total-price',

// HTML template for total price
//template: $('#total-price-tmpl').template(),

// initialization
initialize: function () {
this.listenTo(this.collection, 'add', this.render);
// bind customized method to this view
_.bindAll(this, 'removeTotalPrice');
},

// remove total price from screen
removeTotalPrice: function () {
$(this.el).empty();
},

// render total price view
render: function () {

// get the total price from order collection
//var _totalPrice = this.collection.totalPrice;
//console.log(_totalPrice);
//this.collection.totalPrice();
// start from clean slate
$(this.el).empty();

	var html = '<div>' +
	'<h2>'+ 'Total Due: ' + '$' + this.collection.totalPrice(); + '</h2>' +
	'</div>';

	$(this.el).html(html);
		//return '<h2>'+ '$' + val + '</h2>';

	// render and append total price based on newly created model
	
	return this;
}
	
});