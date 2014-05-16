var WelcomeUserView = Backbone.View.extend ({

	template: Handlebars.compile(
		'<h4><span class="welcome">Welcome:</span> {{local.email}}</h4>'+
		'<h4><span class="welcome">Welcome:</span> {{local.petname}}</h4><br/>'+
		'<div class="clearfix"></div>' +
		'<a href="/logout" class="btn btn-default btn-sm logout">Logout</a>' +
		'<div class="clearfix"></div>'
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