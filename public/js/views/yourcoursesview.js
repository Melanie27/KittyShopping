var YourCoursesView = Backbone.View.extend({
	template: Handlebars.compile(
		
		'<h4>{{local.petname}} is a busy beast!</h4>'+
		'<h2>Upcoming Courses: </h2>' +
		'<ul>'+
			'{{#each signup}}' +
				'<li><h3>{{name}}</h3>{{coursDay}}{{time}}{{location}}</li>' +
				'<a href="/test/signups/{{_id}}" data-id="{{_id}}"  class="btn btn-danger confirm-delete">Remove Course</a><br/><br/>' +
				'<li>{{_id}}</li>'+
			'{{/each}}'+
		'</ul>'
		
	),

	initialize: function() {
		//this.model = new UserMongooseModel();
		//this.model.fetch({reset: true});
		//this.model.on('change', this.render, this);
		this.listenTo(this.model, "change", this.render );
		//this.listenTo(this.model, "add", this.render );

		
	},

	events: {
		'click .btn-danger' : 'deleteItem'
	},

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



	render: function() {

		this.$el.html(this.template(this.model.attributes));
		return this;

	}

});