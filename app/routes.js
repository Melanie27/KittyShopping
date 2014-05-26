// app/routs.js
// load up the user model
//var User = require('../app/models/user');


var User       		= require('../app/models/user');

module.exports = function(app, passport) {


	//Home Page with login links

	app.get('/in', function(req, res) {
		res.render('_index.ejs'); //load index file

	});


	//Login Form
	app.get('/login', function (req, res) {

		//render the page and pass flash data if it exists
		res.render('_login.ejs', {message: req.flash('loginMessage')});


	});

	//process the login form
	app.post('/login', passport.authenticate('local-login', {
		//successRedirect : '/profile', // redirect to the secure profile section
		
		successRedirect: '/',
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	//signup
	//show signup form

	app.get('/signup', function(req, res) {

		//send res.locals instead????? 4/29

		//render the page and pass flash data if it exists
		res.render('_signup.ejs', {message: req.flash('signupMessage')});
		//res.render('authsignupview.js', {message: req.flash('signupMessage')});
		//res.sendfile('authsignupview.js', {message: req.flash('signupMessage')})

	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		//successRedirect : '/profile', // redirect to the secure profile section
		successRedirect : '/#/survey', // redirect to the survey section
		//successRedirect : '/#/auth-index', // redirect to the secure results section
		//failureRedirect: '/#/take-quiz',
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	



//read a list of ordered products
app.get('/api/orders', function(req, res) {
  res.send('orders');
});

app.get('/api/kittens', function(req, res) {
  res.send('kittens');
});

app.post('/api/orders', isLoggedIn, function (req, res){
	console.log(req.user.orders);
	console.log(req.body.title);
	console.log(req.user);

	User.findOne({'email' :  req.user.local.email }, function(err, user) {
		if (err)
			return done(err);

		if (user) {
			console.log('located a user');
		}		
	});

});
	

	//update the user with the kitten Type
app.post('/api/kittens', isLoggedIn, function (req, res, done) {
  
  User : req.user // get the user out of session and pass to template
  console.log(req.user.kittenType);
	console.log(req.body.kittenType); 	

 	User.kittenType = req.body.kittenType;
 	console.log(User.kittenType);
    
    User.findOne({ 'kittenType': req.user.kittenType}, function(err, user) {
    	if(err) 
    		return done(err);

    	if(user) {
    		user.kittenType = req.body.kittenType;
    		user.save(function(err){
    			if(!err){
    				console.log('yay');
    			}
    			else {
    				console.log(err);
    			}
    		});
    		console.log(User.kittenType);
    	}
    });
	
});


	

	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	/*app.get('/profile', isLoggedIn, function(req, res) {
		res.render('_profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});*/

	
	//not sure what this is doing for me when the view is being rendered by bb???
	//the bb routes are over-riding this, so the auth-index section is not currently protected

	/*app.get('/#/auth-index', isLoggedIn, function(req, res) {
		
		console.log('hi');
		//return req.user
		/*res.render('authprofileview.js', {
		
			user : req.user // get the user out of session and pass to template

		});*/


		/*res.render('_profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});*/
	//});


	// =====================================
	// FACEBOOK ROUTES =====================
	// =====================================
	// route for facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/in');
	});
};

//route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	//if user is authenticated, keep going
	if (req.isAuthenticated())
		return next();

	else {
		console.log('you must be logged in for this');
		res.redirect('/in'); 
	}

	//if they aren't redirect them to the home page
	res.redirect('/');
}