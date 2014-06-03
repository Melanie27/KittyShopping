var YourCourseSingleView = Backbone.View.extend({
	template: Handlebars.compile(
		'<h2>Upcoming Courses: </h2>' +
			'<li><h3>{{name}}</h3>{{coursDay}}{{time}}{{location}}</li>' +
			'<a href="/test/signups/{{_id}}" data-id="{{_id}}"  class="btn btn-danger confirm-delete">Remove Course</a><br/><br/>' +
			'<li>{{_id}}</li>'
	),
	initialize: function() {
		
		this.listenTo(this.model, "change", this.render);	
	},

	events: {
		'click .btn-danger' : 'deleteItem'
	},

	
	deleteItem: function(event) {
		
		this.model.destroy( 
			{
				succcess:function(model) {
					app.signupsMongooseCollection.remove(model.get('_id'));
					console.log('destroyed');
				}
			}

		);
		event.preventDefault();
	},

	render: function () {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
	
});