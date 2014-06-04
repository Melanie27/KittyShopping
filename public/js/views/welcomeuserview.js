var WelcomeUserView = Backbone.View.extend ({

	template: Handlebars.compile(
		'<div class="login-bar">'+
		
		'<a href="#/login" class="btn btn-default btn-sm logout">Sign In</a>' +
		'<a href="/logout" class="btn btn-default btn-sm logout">Logout</a>' +
		'<a href="#/take-quiz" class="btn btn-default btn-sm logout">Signup</a>' +
		'{{#if _id}}'+	
		'<h4><span class="welcome">Welcome:</span> {{local.email}}</h4>'+
		'<h4><span class="welcome">Your pet:</span> {{local.petname}} is a '+
		'<a href="#results/{{kittenType}}">{{kittenType}}</a> kitten</h4><br/>'+
		'{{/if}}'+
		'<div class="clearfix"></div>' +
		'</div>'
	),


	initialize: function() {
		this.model = new UserMongooseModel();
		this.model.fetch({reset: true});
		this.listenTo(this.model, "change", this.render );
	},


	render: function() {

		this.$el.html(this.template(this.model.attributes));
		return this;

	}

});