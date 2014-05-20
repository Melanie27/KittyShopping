var ScheduleModel = Backbone.Model.extend({
	//urlRoot: '/courses',
   defaults: {
      		name: "Nap Time",
			description: "time to rest",
			recommeded: "Recommended for all kittens",
			time: "8am-close",
			studio: "Santa Monica",
			signup: "Sign up",
			rsvp: "true",
			courseDay: "Monday"
   }

});