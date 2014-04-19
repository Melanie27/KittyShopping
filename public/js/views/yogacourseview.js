var YogaCourseView = Backbone.View.extend ({
	
	template: Handlebars.compile(
		'<td style="padding:8px;">{{name}}<td>' +
		'<td style="padding:8px;">{{description}}<td>' +
		'<td style="padding:8px;">{{recommeded}}<td>' +
		'<td style="padding:8px;">{{time}}<td>' +
		'<td style="padding:8px;">{{location}}<td>'

	),

	alert: function() {

		alert('sign up');
	},

	render: function() {

		this.$el.html(this.template(this.model.attributes));

		

		// a checkbox to mark / unmark the done status of this task 
    	this.$el.append(new Backbone.UI.Link({
      		model: this.model,
      		content: 'signup',
      		onClick:  function() { 
      			console.log('You have signed up for ' + this.model.get('name'));
      			console.log('A modal box should open now');
      		}
    	}).render().el);

    	return this;
	}

});