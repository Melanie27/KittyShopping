var UserMongooseModel = Backbone.Model.extend({
	urlRoot: '/test',
	idAttribute: "_id",
	defaults: {
		kittenType: '',
		url: 'colonel-meow',
		_id : '',
		__v: 0,
    	local: {
      		password: "$2a$08$aGl4FCFsWO9Nu97U3hgQtOf.YWBWmSTRbPYBWvriM9tELORwfpEWi",
      		email: "Default User Email",
      		petname: "Smeagol",
      		path: "",
      		winner: "Grumpy"
      	}

	} 



});