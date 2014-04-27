var AuthIndexView = Backbone.View.extend({
	

	render: function() {

		var html = '<div class="container yoga-auth">' +
			'<div class="jumbotron text-center">' +
				'<h1>Yoga Kitten Authentication</h1>' +
				'<p>Login or Register with:</p>' +
				'<a href="/login" class="btn btn-default"><span class="fa fa-user"></span> Local Login</a>' +
				'<a href="/signup" class="btn btn-default"><span class="fa fa-user"></span> Local Signup</a>' +
			'</div>' +
		'</div>';
		
		$(this.el).html(html);
		return this;
	}	

});