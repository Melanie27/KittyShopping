var SignupsMongooseModel = Backbone.Model.extend({
	urlRoot: '/test/signups',
	idAttribute: "_id",
	defaults: {
		name: "",
    	courseDay: "",
    	time: "",
    	location: "",
    	_id: "",
    	modified: ""
	}
});