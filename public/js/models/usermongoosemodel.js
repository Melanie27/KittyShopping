var UserMongooseModel = Backbone.Model.extend({
	//urlRoot: '/users',
	urlRoot: '/test',
	//idAttribute: "_id",

	/*relations:[{
		type: Backbone.One,
		key: 'result',
		relatedModel: 'ResultsModel'
		
	}],*/

	defaults: {
		
		_id : '535947a52400be56922359c7',
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