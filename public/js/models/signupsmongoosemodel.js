var SignupsMongooseModel = Backbone.Model.extend({
	urlRoot: '/test/signups',
	idAttribute: "_id",
	defaults: {
		name: "Meal Time",
    	courseDay: "Everyday",
    	time: "11am-2pm",
    	location: "All",
    	_id: "538ce54d73504c6c787213b3",
    	modified: "2014-06-02T15:50:23.396Z"
	}
});