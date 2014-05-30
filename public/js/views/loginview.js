var LoginView = Backbone.View.extend({

	template: Handlebars.compile(
		'<div class="container yoga-auth">' +
			'<div class="col-sm-6 col-sm-offset-3">' +
				'<h1><span class="fa fa-sign-in"></span>Yoga Kitten Authentication</h1>' +
				'<h2>Enter your email and password</h2>' +
				//'<h3>Upload kitty photo for optimal experience</h3>' +
				'<form action="/login" method="post">'+
				'<div class="form-group">' +
					'<label>Email</label><br/>' +
					'<input type="text" class="form-control" name="email">' +
				'</div>' +
				'<div class="form-group">' +
					'<label>Password</label></br>' +
					'<input type="password" class="form-control" name="password">' +
				'</div>' +
				'<button type="submit" class="btn btn-warning btn-lg">Login</button>'+
			'</form>' +	

				
				'<hr>'+
				
			'</div>' +
		'</div>'

	),


	render: function() {
		this.$el.html(this.template());
		return this;
	}
});