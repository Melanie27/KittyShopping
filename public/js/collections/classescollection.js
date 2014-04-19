var CoursesCollection = Backbone.Collection.extend({
	model: CourseModel,

	//what will happen whenever we create a new classes collection
	initialize: function(models, options) {
		//reference to the day that these classes belong to
		this.day = options.day
	},
	url: function() {
		return this.day.url() + '/courses';
	}
	
});