var UserFormView = Backbone.Form.extend({
	
	events: {
		
		'click button' : 'submit'
	},

	submit: function() {
		this.form.commit();
		//console.log(this.model.toJSON());
	},

	render: function () {
		this.form = new Backbone.Form({ model: this.model});

		this.$el.html('<h3>Enter your details in the form</h3>');
		this.$el.append(this.form.render().el);
		this.$el.append('<button>Submit</button');

		return this;
	},	

});