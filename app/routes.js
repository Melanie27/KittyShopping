// app/routs.js
// load up the user model


var User = require('../app/models/user');

module.exports = function(app, passport) {

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

	app.get('/signup', function(req, res) {
		//render the page and pass flash data if it exists
		res.render('_signup.ejs', {message: req.flash('signupMessage')});
		//res.sendfile('authsignupview.js', {message: req.flash('signupMessage')})
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		//successRedirect : '/profile', // redirect to the secure profile section
		successRedirect : '/#/survey', // redirect to the survey section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	
app.get('/test/signups', function(req, res) {
	User.findOne({'_id': req.user.id }, function(err, user) {
		if (err) 
			return done(err);
		if (user) {
			res.send(user.signup);
		}
	});
});

app.post('/test/signups', isLoggedIn, function (req, res){

	User.findOne({'_id': req.user.id }, function(err, user) {
		if (err)
			return done(err);

		if (user) {
			user.signup.name = req.body.name;
			user.signup.courseDay = req.body.courseDay;
			user.signup.time = req.body.time;
			user.signup.location = req.body.location;
			user.signup.modified = req.body.modified;

			user.update({$push: { "signup" : 
				{   name: user.signup.name,
					courseDay: user.signup.courseDay,
					time: user.signup.time,
					location: user.signup.location,
					modified: user.signup.modified
				}
				}},{safe:true, upsert:true},function(err){
        			if(err){
                		return res.status(500).send(err);
        			} 
                		console.log("Successfully added" + user.signup);
                		res.send(user);
				});

			} else {
				res.status(404).send();
			}		
		});

	});

app.get('/test/signups/:id', function(req, res) {
  User.findOne({'_id': req.user.id }, function(err, user) {
    if (err)
      return done(err);
    if (user) {
      var singlesignup = user.signup.filter(function(e){ return e._id == req.params.id })[0]
      res.send(singlesignup);
    }
  });
});


app.delete('/test/signups/:id', isLoggedIn, function(req, res) {
	User.findOne({'_id': req.user.id }, function(err, user) {
		if (err)
			return done(err);

		if (user) {
			var found = false;
			var singlesignup = user.signup.filter(function(e){ return e._id == req.params.id })[0]
			console.log(singlesignup);
			user.signup.forEach(function (singlesignup, index) {
				if (singlesignup._id.toString() === req.params.id) {
					found = index;
					console.log(index);
				}
				else {
					console.log('prob');
				}
			});
			if(found) {
				user.signup.splice(found, 1);
				user.save(function(err){
    			if(!err){
    				res.send(user);
    				console.log('save working');
    			}
    			else {
    				console.log(err);
    				console.log('save busted');

    			}
    		});
				res.json(200, {status: 'deleted'});
  			} else {
    			res.json(404, {status: 'invalid survey question deletion'});
  			}
		}		
	});
});


app.get('/test/orders', function(req, res) {
	console.log(req.orders);
	User.findOne({'_id': req.user.id }, function(err, user) {
		if (err) 
			return done(err);
		if (user) {
			res.send(user.orders);
		}

	});
});

app.get('/test/orders/:id', function(req, res) {
  User.findOne({'_id': req.user.id }, function(err, user) {
    if (err)
      return done(err);
    if (user) {
      var order = user.orders.filter(function(e){ return e._id == req.params.id })[0]
      res.send(order);
    }
  });
});

app.delete('/test/orders/:id', isLoggedIn, function(req, res) {
	User.findOne({'_id': req.user.id }, function(err, user) {
		if (err)
			return done(err);
		if (user) {
			var found = false;
			var order = user.orders.filter(function(e){ return e._id == req.params.id })[0]
			user.orders.forEach(function (order, index) {
				if (order._id.toString() === req.params.id) {
					found = index;
				}
			});
			if(found) {
				user.orders.splice(found, 1);
				user.save(function(err){
    			if(!err){
    				res.send(user);
    			}
    			else {
    				console.log(err);
    			}
    		});
				res.json(200, {status: 'deleted'});
  			} else {
    			res.json(404, {status: 'invalid order deleted'});
  			}
		}		
	});
});

app.post('/test/orders', isLoggedIn, function (req, res){

	User.findOne({'_id': req.user.id }, function(err, user) {
		if (err)
			return done(err);

		if (user) {
			user.orders.quantity = req.body.quantity;
			user.orders.description = req.body.description;
			user.orders.title = req.body.title;
			user.orders.price = req.body.price;
			user.orders.imagepathsm = req.body.imagepathsm;
			user.orders.modified = req.body.modified;
			
			user.update({$push: { "orders" : 
				{   title: user.orders.title,
					description: user.orders.description,
					quantity: user.orders.quantity,
					price: user.orders.price,
					imagepathsm: user.orders.imagepathsm,
					modified: user.orders.modified
				}
				}},{safe:true, upsert:true},function(err){
        			if(err){
                		return res.status(500).send(err);
        			} 
                		console.log("Successfully added" + user.orders.title);
                		res.send(user);
			});
		}		
	});

});
	
	//update the user with the kitten Type
app.post('/test/kittenType', isLoggedIn, function (req, res, done) {
 	User.kittenType = req.body.kittenType;
    User.findOne({ '_id': req.user.id}, function(err, user) {
    	if(err) 
    		return done(err);
    	if(user) {
    		user.kittenType = req.body.kittenType;
    		user.save(function(err){
    			if(err){
              		return res.status(500).send(err);
            	}
            	res.send(user);
    		});
    	} else {
      		res.status(404).send();
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

	
	//});

	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('#/');
	});
};

//route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	//if user is authenticated, keep going
	if (req.isAuthenticated())
		return next();

	else {
		//how can I pass something to the template from here
		console.log('you must be logged in');
	}

	//if they aren't redirect them to the home page
	res.redirect('#/login');
}