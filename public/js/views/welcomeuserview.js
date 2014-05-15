var WelcomeUserView = Backbone.View.extend ({

	template: Handlebars.compile(
		'<h4>Welcome: {{local.email}}</h4>'+
		'<h4>Welcome: {{local.petname}}</h4>'+
		'<a href="/logout" class="btn btn-default btn-sm">Logout</a>'
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