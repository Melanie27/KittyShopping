var ProductsOrderedCollection = Backbone.Collection.extend({
	model: ProductsOrderedModel,
	url: '/test/orders',
	idAttribute: "_id",	
});