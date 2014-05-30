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
		this.model = new UserMongooseModel();
		this.model.fetch({reset: true});
		this.listenTo(this.model, "change", this.render );
		
		Handlebars.registerHelper("caps", function(text){
			return text.toUpperCase();
		});

		//listen to change events and reset the view when items are deleted
		
	},

	//add a handlebars helper function where each link pulls the attrID and passes it to AJAX

	

	deleteItem: function(event) {
		event.preventDefault();
		var attrID = "";
		$('.btn-danger').on('click', function(event) {
  			event.preventDefault();
  			var attrID = $(this).data('id');
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

		});


     
	},

	render: function() {

		/*$(this.el).html(_.map([

		
		]));*/

		this.delegateEvents({
			'click .btn-danger' : 'deleteItem'
		});

		this.$el.html(this.template(this.model.attributes));
		return this;

	}

});