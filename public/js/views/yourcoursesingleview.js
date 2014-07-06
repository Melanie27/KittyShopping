var YourCourseSingleView = Backbone.View.extend({
	template: Handlebars.compile(
		
			'<li><h3>{{name}}</h3>{{coursDay}}<h3>{{time}}</h3><h3>{{location}}</h3></li>' +
			'<a href="/test/signups/{{_id}}" data-id="{{_id}}" class="btn btn-danger confirm-delete">Remove Course</a><br/><br/>'+
			'<div class="clearfix">&nbsp;</div>'+
			'<hr/>'
			
	),
	initialize: function() {
		this.listenTo(this.model, "reset", this.render);	
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