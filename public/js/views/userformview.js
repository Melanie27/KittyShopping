var UserFormView = Backbone.Form.extend({
	
	

	events: {
		
		'click button' : 'submit'
	},

	initialize: function() {
		this.form = new Backbone.Form({ model: this.model});
		this.form.on('name:blur email:blur address1:blur password1:blur password2:blur petname:blur', function(form, editor) {
    		this.fields[editor.key].validate();
    		
    		console.log(form.getValue());
    		//this.commit();
		});
	},

	submit: function() {
		
		console.log(this.form.getValue());
	},

	render: function () {
		//this.form = new Backbone.Form({ model: this.model});

		this.$el.html('<h3>Enter your details in the form</h3>');
		this.$el.append(this.form.render().el);
		this.$el.append('<button>Submit</button');

		

		return this;
	},	

});