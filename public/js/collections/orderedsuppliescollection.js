var OrderedSuppliesCollection = Backbone.Collection.extend({
	model: OrderSupplyModel,
	url: '/api/orders'
});