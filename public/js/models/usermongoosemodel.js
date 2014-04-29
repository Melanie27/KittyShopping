var UserMongooseModel = Backbone.Model.extend({
	urlRoot: '/test',
	//idAttribute: "_id",
	defaults: {
		
		_id : '535947a52400be56922359c7',
		__v: 0,
    	local: {
      		password: "$2a$08$aGl4FCFsWO9Nu97U3hgQtOf.YWBWmSTRbPYBWvriM9tELORwfpEWi",
      		email: "melmcganney@gmail.com",
      		petName: "Smeagol"
      	}


	}

});