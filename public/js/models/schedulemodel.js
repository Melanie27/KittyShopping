var ScheduleModel = Backbone.Model.extend({
	idAttribute: "_id",
   defaults: {
      		name: "Nap Time",
			description: "time to rest",
			recommeded: "Recommended for all kittens",
			time: "8am-close",
			location: "Santa Monica",
			signup: "Sign up",
			rsvp: "false",
			courseDay: "Monday"
   	}

   


});