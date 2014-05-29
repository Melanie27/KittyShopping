var YourCoursesView = Backbone.View.extend({
	template: Handlebars.compile(
		
		'<h4>{{local.petname}} is a busy beast!</h4>'+
		'<h2>Upcoming Courses: </h2>' +
		'<ul>'+
			'{{#each signup}}' +
				'<li><h3>{{name}}</h3>{{coursDay}}{{time}}{{location}}</li>' +
				'<a href="/api/unsign" class="btn btn-danger confirm-delete">Remove Course</a><br/><br/>' +
			'{{/each}}'+
		'</ul>'
		
	),

	initialize: function() {
		this.model = new UserMongooseModel();
		this.model.fetch({reset: true});
		this.listenTo(this.model, "change", this.render );
	},

	deleteItem: function(event) {
		event.preventDefault();
		console.log(this.model.get('signup'));
		this.model.destroy(
			{
				success: function (model) {

					console.log( this.model + 'destroyed!!');
					/*jQuery.ajax({
    					url: "/api/unsign", 
    					type: "DELETE",
				    success: function (data, textStatus, jqXHR) { 
				        console.log("Delete response:"); 
				        console.dir(data); 
				        console.log(textStatus); 
				        console.dir(jqXHR); 
				    }
					});*/
				}
			});

		var name = this.model.get('name');
      	var courseDay = this.model.get('courseDay');
      	var time = this.model.get('time');
      	var location = this.model.get('location');
        var rsvp = this.model.get('rsvp');
	},

	render: function() {

		this.delegateEvents({
			'click .btn-danger' : 'deleteItem'
		});

		this.$el.html(this.template(this.model.attributes));
		return this;

	}

});