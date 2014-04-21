var YogaCoursesCollection = Backbone.Collection.extend({
	
	model:YogaCourseModel,
	url: '/courses',

	initialize: function () {
		//console.log(this.pluck('name'));
	}

});