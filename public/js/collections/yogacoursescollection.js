var YogaCoursesCollection = Backbone.Collection.extend({
	
 
	


	/*comparator: function(a, b) {
		if(a.get('location') < b.get('location')) {
			return 1;
		} else if(b.get('location') < a.get('location')) {
			return -1;
		}
		console.log(a.get('location'));
	},*/
	model:YogaCourseModel,
	url: '/courses',

	initialize: function () {
		console.log(this.pluck('name'));
	}

});