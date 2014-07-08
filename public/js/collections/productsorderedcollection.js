var ProductsOrderedCollection = Backbone.Collection.extend({
	model: ProductsOrderedModel,
	url: '/test/orders',
	idAttribute: "_id",	

 calculateTotals: function () {
        return this.reduceRight(function(memo, value) { return memo + value.get("total") }, 0);
          
    }


});