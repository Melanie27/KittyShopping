var TakeQuizView = Backbone.View.extend({

	events: {
		'click .take-quiz': 'triggerLogin'

	},

	template: Handlebars.compile(
		'<div class="container yoga-auth">' +
			'<div class="col-sm-6 col-sm-offset-3">' +
				'<h1><span class="fa fa-sign-in"></span>Yoga Kitten Signup</h1>' +
				'<h2>Enter your email, a password and kitten name.</h2>' +
				//'<h3>Upload kitty photo for optimal experience</h3>' +
				'<form action="/signup" method="post">' +
					'<div class="form-group">' +
						'<label>Email</label></br>' +
						'<input type="text" class="form-control" name="email">' +
					'</div>' +
					'<div class="form-group">' +
						'<label>Password</label></br>' +
						'<input type="password" class="form-control" name="password">' +
					'</div>' +
					'<div class="form-group">' +
						'<label>Pet Name</label></br>' +
						'<input type="text" class="form-control" name="petname" placeholder="Titty Bar Bob">' +
					'</div>' +
					'<div class="form-group" style="display:none">' +
						'<label>Pet Photo</label>' +
						'<input type="file" class="form-control" name="photo[image]"/>' +
					'</div>' +
						'<button type="submit" id="signup" class="btn btn-warning btn-lg">Take Quiz</button>' +
				'</form>' +	

				/*'<form action="/update" method="post">' +
					'<div class="form-group">' +
						'<label>Add Pet Name -existing user</label>' +
						'<input type="text" class="form-control" name="petname">' +
					'</div>' +
					'<button type="submit" id="signup" class="btn btn-warning btn-lg">Update</button>' +
				'</form>' +*/
				
				'<hr>'+
				
			'</div>' +
		'</div>'

	),


	triggerLogin: function() {
		$('.take-quiz').hide();
	},

	render: function() {
		this.$el.html(this.template());
		return this;
	}
});