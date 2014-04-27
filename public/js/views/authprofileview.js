var AuthProfileView = Backbone.View.extend({
	


	template: Handlebars.compile(
		'<div class="container">' +
			'<h1><span class="fa fa-anchor"></span> Kitten Profile Page</h1>' +
			'<a href="/logout" class="btn btn-default btn-sm">Logout</a>' +
		'</div>' +	
		'<div class="row">'+
			'<div class="col-sm-6">' +
				'<div class="well">' +
					'<h3><span class="fa fa-user"></span> Local</h3>' +
					'<p>'+
						'<strong>id</strong>: {{id}}<br>' +
						'<strong>email</strong>: {{local.email}}<br>' +
						'<strong>password</strong>: {{local.password}}<br>' +
						//'<strong>password</strong>: {{local.petName}}<br>' +
						
					'</p>' +
				'</div>' +
			'</div>'+	
		'</div>'
	),

	initialize: function() {
		this.listenTo(this.model, "change", this.render );
	},

	render: function() {
		
		this.$el.html(this.template(this.model.attributes));
		//$(this.el).html(html);
		return this;
	}

})