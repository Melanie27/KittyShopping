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

	
	//can actually delete a model from here?? I think so.and then the automatic sync should work
	//look to Linda
	deleteItem: function(event) {
		
		alert('deleting');
  			var attrID = $(event.currentTarget).data('id');
  			console.log(attrID);

  			 jQuery.ajax({
        		url: "/test/signups/" + attrID, 
        		type: "DELETE",
        
        		success: function (data, textStatus, jqXHR) { 
          			console.log("Post response:"); 
          			console.dir(data); 
          			console.log(textStatus); 
          			console.dir(jqXHR); 
          			
        		}
      		});
  			
  			 console.log(this.model.get('signup'));
		event.preventDefault();

	},

	render: function () {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
	
});