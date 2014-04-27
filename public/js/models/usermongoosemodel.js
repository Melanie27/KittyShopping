var UserMongooseModel = Backbone.Model.extend({
	urlRoot: '/users',
	idAttribute: "_id",
	defaults: {
		
		_id : '535816cf0b68b95a059de5ce',
		__v: 0,
    	local: {
      		password: "$2a$08$aGl4FCFsWO9Nu97U3hgQtOf.YWBWmSTRbPYBWvriM9tELORwfpEWi",
      		email: "melmcganney@gmail.com",
      		petName: "Smeagol"
      	}


	}

});