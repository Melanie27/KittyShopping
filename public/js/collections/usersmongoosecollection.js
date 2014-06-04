var UsersMongooseCollection = Backbone.Collection.extend ({
	idAttribute: "_id",
	url: '/users',
	model: UserMongooseModel
});