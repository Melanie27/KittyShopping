var WelcomeUserView = Backbone.View.extend ({

	template: Handlebars.compile(
		'<a href="#/login" class="btn btn-default btn-sm logout">Sign In</a>' +
		'<a href="/logout" class="btn btn-default btn-sm logout">Logout</a>' +
		'<a href="#/take-quiz" class="btn btn-default btn-sm logout">Signup</a>' +
		'<div class="clearfix"></div>'+
		'<div class="login-bar">'+
			'{{#if _id}}'+	
				'<h4><span class="welcome">Welcome:</span> {{local.email}}</h4>'+
				'<h4><span class="welcome">Your pet:</span> {{local.petname}} is a '+
				'{{#if kittenType}}'+
				'<a class="kitten-type" href="#results/{{url}}">{{kittenType}}</a> kitten</h4>'+
				'{{/if}}' +
				'<h4 id="courseLink"><a class="signup" href="#/list-course">{{local.petname}}' + "'s" + ' Courses </a><h4>'+
				'<h4 id="cartLink"><a class="signup"href="#/view-cart">{{local.petname}}' + "'s" + ' Shopping Cart</h2></a>'+
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