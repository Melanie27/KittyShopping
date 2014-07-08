var ProductsOrderedModel = Backbone.Model.extend({
	urlRoot: '/test/orders',
	idAttribute: "_id",
	defaults: {
		title: "Zen Perch",
    	description: "The world calms down from atop this meditative perch",
    	quantity: "2",
    	price: "500",
        total: "",
    	imagepathsm: "zen-perch.jpg",
        imagepathmenu : "menu-cat-shelf.jpg", 
    	_id: "538e38fb4a7a1d1c90214678",
    	modified: "2014-06-03T21:11:02.390Z"
	},

    calculateAmount: function () {
        return  '<div class="total cart-tots">' + 'Total: $' + this.get('price') * this.get('quantity') + '.00' + '</div>';
          
    }

});