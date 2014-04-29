var UsersMongooseCollection = Backbone.Collection.extend ({
	url: '/users',
	model: UserMongooseModel
});