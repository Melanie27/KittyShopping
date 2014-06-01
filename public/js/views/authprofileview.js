var AuthProfileView = Backbone.View.extend({
	
	template: Handlebars.compile(
		'<div class="container">' +
			'<h1><span class="fa fa-anchor"></span> Kitten Profile Page</h1>' +
			'<a href="/logout" class="btn btn-default btn-sm">Logout</a>' +
		'</div>' +	
		'<div class="row">'+
			'<div class="col-sm-6">' +
				'<div class="well">' +
					'<h3><span class="fa fa-user"></span> User info</h3>' +
					'<p>'+
						'<strong>id</strong>: {{_id}}<br>' +
						'<strong>email</strong>: {{local.email}}<br>' +
						'<strong>password</strong>: {{local.password}}<br>' +
						'<strong>petname</strong>: {{local.petname}}<br>' +
					'</p>' +
				'</div>' +
			'</div>'+	
		'</div>'
	),

	initialize: function() {
		this.model = new UserMongooseModel();
		this.model.fetch({reset: true});
		this.listenTo(this.model, "change", this.render );
	},

	render: function() {
		//APPEND THE RESULTS PAGE HERE??? If it is responsive
		this.$el.html(this.template(this.model.attributes));
		return this;
	}

})