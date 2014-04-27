var express = require('express'),
  http = require('http'),
  items = require('./data/menu-items');
  questions = require('./data/kitty-questions');
  profiles = require('./data/kitty-profiles');
  supplies = require('./data/kitty-supplies-test');
  courses = require('./data/kitty-courses');
  days = require('./data/kitty-days');
  // load up the user model
users = require('./app/models/user');



var app = express()
  .use(express.bodyParser())
  .use(express.static('public'));

var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

 require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

  // set up our express application
  app.use(express.logger('dev')); // log every request to the console
  app.use(express.cookieParser()); // read cookies (needed for auth)
  app.use(express.bodyParser()); // get information from html forms



  app.set('view engine', 'ejs'); // set up ejs for templating
  app.engine('.js', require('ejs').renderFile); //allows js files to be rendered via ejs
 
  app.set('views', __dirname + '/public/js/views'); //override default directory for the views

  // required for passport
  app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session


  //adding in 404 from nettuts tutorial
  //doesnt work with the backbone routes - do I set this up separately???? - yes
 /*app.use(function (req,res) {
    //res.send(404, "404, bitch");

  });*/

});


// load routes for auth  ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

//Making routes from the tuts video

/*app.get("/test", function (req, res) {
  res.send('nettuts');
});*/


var User = mongoose.model('User');
// This function is responsible for returning all entries for the Message model
function getUsers(req, res, next) {
  // Resitify currently has a bug which doesn't allow you to set default headers
  // This headers comply with CORS and allow us to server our response to any origin
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // .find() without any arguments, will return all results
  // the `-1` in .sort() means descending order
  User.find(function (arr,data) {
    //console.log(data);
    res.send(data);
  });
}

app.get('/users', function(req, res) {
    User.find(function(err, data) {
      res.send(data);

    });
});

//app.get('/users', getUsers);

app.get('/users/:user_id', function  (req, res) {
  
  User.findById(req.params.user_id, function (data, user) {
     //return user._id === req.params.user_id;
     res.send(data);
  });

  //res.send(req.params.user_id);

  /*var matches = users.filter(function  (user) {
    return user._id === req.params.user_id;
  });*/

  /*if (matches.length > 0) {
    res.json(matches[0]);
  } else {
    res.json(404, {status: 'invalid profile'});
  }*/

});


app.get('/items', function  (req, res) {
  //res.json(items);
  res.render('_signup.ejs', {message: req.flash('signupMessage')});
});

app.get('/questions', function  (req, res) {
  res.json(questions);
});

app.get('/profiles', function  (req, res) {
  res.json(profiles);
});


app.get('/supplies', function  (req, res) {
  res.json(supplies);
});

app.get('/courses', function  (req, res) {
  res.json(courses);
});

app.get('/days', function  (req, res) {
  res.json(days);
});

app.post('/items', function  (req, res) {
  var matches = items.filter(function  (item) {
    return item.url === req.body.url;
  });

  if (matches.length > 0) {
    res.json(409, {status: 'item already exists'});
  } else {
    req.body.id = req.body.url;
    items.push(req.body);
    res.json(req.body);
  }

});

app.post('/questions', function  (req, res) {
  var matches = questions.filter(function  (question) {
    return question.url === req.body.url;
  });

  if (matches.length > 0) {
    res.json(409, {status: 'question already exists'});
  } else {
    req.body.id = req.body.url;
    questions.push(req.body);
    res.json(req.body);
  }

});



app.post('/supplies', function  (req, res) {
  var matches = supplies.filter(function  (supply) {
    return supply.url === req.body.url;
  });

  if (matches.length > 0) {
    res.json(409, {status: 'supply already exists'});
    alert('another supply name added');
  } else {
    req.body.id = req.body.url;
    supplies.push(req.body);
    res.json(req.body);
  }

});

app.put('/questions/:question_name', function (req, res) {
    
  var matches = questions.filter(function  (question) {
    return question.url === req.params.question_name;
    //return question.responded === req.params.question_name;
    
  });

for (var i=0; i<6; i ++) {
for (key in questions) {

      var qs = questions[key].responded;
      var defaultResponse = questions[key].responded;
       //console.log(qs); 

      //defaultResponse = questions[i].responded;
 }
}

//console.log(defaultResponse);
 
  //var defaultResponse = questions[1].responded;
  
   
   if (matches.length > 0 ) {
    //questions.push(req.body);
    defaultResponse.push(req.body.responded);
    //defaultResponse.splice(0, 1, req.body.responded);
    //why is only question 5 updating?
   }
    
    res.json(req.body); 

});

app.get('/items/:item_name', function  (req, res) {
  var matches = items.filter(function  (item) {
    return item.url === req.params.item_name;
  });

  if (matches.length > 0) {
    matches[0].triggerArrive();
    //res.json(matches[0]);
  } else {
    res.json(404, {status: 'invalid menu item'});
  }

});

app.get('/questions/:question_name', function  (req, res) {
  var matches = questions.filter(function  (question) {
    return question.url === req.params.question_name;
  });

  if (matches.length > 0) {
    res.json(matches[0]);
  } else {
    res.json(404, {status: 'invalid survey question'});
  }

});

app.get('/profiles/:profile_name', function  (req, res) {
  var matches = profiles.filter(function  (profile) {
    return profile.url === req.params.profile_name;
  });

  if (matches.length > 0) {
    res.json(matches[0]);
  } else {
    res.json(404, {status: 'invalid profile'});
  }

});

//hydration

app.get('/supplies/:category', function  (req, res) {
  var matches = supplies.filter(function  (category) {
    return category.url === req.params.category;
  });

  if (matches.length > 0) {
    res.json(matches[0]);
  } else {
    res.json(404, {status: 'invalid category request'});
  }

});

app.get('/supplies/:category/:supply', function  (req, res) {
   
  //filter through the main json to get categories
   var matches = supplies.filter(function  (category) {
    return category.url === req.params.category;
     
  });

   //filter through the categories to get supplies
   var categories = matches[0].subsupply;
   var matches2 = categories.filter(function (supply) {
      return supply.url === req.params.supply;

   })


  if (matches.length > 0) {
    res.json(matches2[0]);

  } else {
    res.json(404, {status: 'invalid supply request'});
    
  }

});



app.delete('/items/:item_name', function  (req, res) {

  var found = false;

  items.forEach(function (item, index) {
    if (item.url === req.params.item_name) {
      found = index;
    }
  });

  if (found) {
    items.splice(found, 1);
    res.json(200, {status: 'deleted'});
  } else {
    res.json(404, {status: 'invalid menu item'});
  }

});

app.delete('/questions/:question_name', function  (req, res) {

  var found = false;

  items.forEach(function (question, index) {
    if (question.url === req.params.question_name) {
      found = index;
    }
  });

  if (found) {
    items.splice(found, 1);
    res.json(200, {status: 'deleted'});
  } else {
    res.json(404, {status: 'invalid survey question deletion'});
  }

});

app.delete('/supplies/:supply_name', function  (req, res) {

  var found = false;

  items.forEach(function (supply, index) {
    if (supply.url === req.params.supply_name) {
      found = index;
    }
  });

  if (found) {
    items.splice(found, 1);
    res.json(200, {status: 'deleted'});
  } else {
    res.json(404, {status: 'invalid survey question deletion'});
  }

});

app.get('/*', function  (req, res) {
  res.json(404, {status: 'not found'});
});

http.createServer(app).listen(port, function () {
  console.log("Listening at port " + port + ", bitch");
});
