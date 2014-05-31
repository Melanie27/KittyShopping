var AuthSignupView = Backbone.View.extend({

template: Handlebars.compile(
'<div class="container yoga-auth">' +
'<div class="col-sm-6 col-sm-offset-3">' +
'<h1><span class="fa fa-sign-in"></span>Yoga Kitten Signup</h1>' +
'<h2>Enter kitten name and password to take the quiz</h2>' +
'<h3>Upload kitty photo for optimal experience</h3>' +
'<form action="/signup" method="post">' +
'<div class="form-group">' +
'<label>Email</label>' +
'<input type="text" class="form-control" name="email">' +
'</div>' +
'<div class="form-group">' +
'<label>Password</label>' +
'<input type="password" class="form-control" name="password">' +
'</div>' +
'<div class="form-group">' +
'<label>Pet Name</label>' +
'<input type="text" class="form-control" name="petname">' +
'</div>' +
'<div class="form-group">' +
'<label>Kitten Type</label>' +
'<input type="text" class="form-control" name="kittenType">' +
'</div>' +
'<div class="form-group">' +
'<label>Pet Photo</label>' +
'<input type="file" class="form-control" name="photo[image]"/>' +
'</div>' +

'<button type="submit" id="signup" class="btn btn-warning btn-lg">Signup</button>' +

'</form>' +	

'<form action="/update" method="post">' +
'<div class="form-group">' +
'<label>Add Pet Name -existing user</label>' +
'<input type="text" class="form-control" name="petname">' +
'</div>' +
'<button type="submit" id="signup" class="btn btn-warning btn-lg">Update</button>' +
'</form>' +

'<hr>'+
//'<p>Already have an account? <a href="/login">Login</a></p>' +
'</div>' +
'</div>'

),

render: function() {

/*var html = '<div class="container yoga-auth">' +
'<div class="col-sm-6 col-sm-offset-3">' +
'<h1><span class="fa fa-sign-in"></span>Yoga Kitten Signup</h1>' +
'<h2>Enter kitten name and password to take the quiz</h2>' +
'<h3>Upload kitty photo for optimal experience</h3>' +
'<form action="/signup" method="post">' +
'<div class="form-group">' +
'<label>Email</label>' +
'<input type="text" class="form-control" name="email">' +
'</div>' +
'<div class="form-group">' +
'<label>Password</label>' +
'<input type="password" class="form-control" name="password">' +
'</div>' +

'<button type="submit" id="signup" class="btn btn-warning btn-lg">Signup</button>' +
'</form>' +
'<hr>'+
//'<p>Already have an account? <a href="/login">Login</a></p>' +
'</div>' +
'</div>';*/


//this.$el.html(JST['/views/_signup']);
//$(this.el).html(html);
this.$el.html(this.template());
return this;
},

});