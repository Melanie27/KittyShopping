var express = require('express'),
  http = require('http'),
 
  questions = require('./data/kitty-questions');
  profiles = require('./data/kitty-profiles');
 
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

  //got the following from pixel handler
  //sets up public directory to use static files
  //app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  

  app.set('view engine', 'ejs'); // set up ejs for templating
  app.engine('.js', require('ejs').renderFile); //allows js files to be rendered via ejs
 
  app.set('views', __dirname + '/public/js/views'); //override default directory for the views
  app.set('photos', __dirname + '/public/photos'); //override default directory for the photos

  // required for passport
  app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session

  app.use(function(req, res, next){
   res.locals.user = req.user;
   next();
});

  //adding in 404 from nettuts tutorial
  //doesnt work with the backbone routes - do I set this up separately???? - yes
 /*app.use(function (req,res) {
    //res.send(404, "404, bitch");

  });*/

  app.use(app.router);

});


//Pixelhandler Schema



var Schema = mongoose.Schema;


var Courses = new Schema({
   name: { type: String }, 
   description: { type: String }, 
   recommeded: { type: String }, 
   time: { type: String }, 
   location: { type: String }, 
   signup: { type: String }, 
   rsvp: { type: Boolean }, 
   courseDay: { type: String }, 
   id: { type: String },

});

var CoursesModel = mongoose.model('Courses', Courses);


var Product = new Schema({
    id: { type: String }, 
    category: { type: String },  
    title: { type: String }, 
    url: {type: String}, 
    keyword: { type: String },  
    description: { type: String }, 
    price: {type: Number},
    quantity: {type: Number},
    imagepathsm: {type: String},  
    modified: { type: Date, default: Date.now }

});

var ProductModel = mongoose.model('Product', Product);




//PixelHandler
app.get('/api', function(req, res) {
  res.send('configDB is running');
});



app.get('/api/courses', function(req, res) {
  return CoursesModel.find(function(err, courses) {
    if (!err) {
      return res.send(courses);
    } else {
      return console.log(err);
    }
  });
});


//read the list of courses you've signed up for
app.get('/api/signup', function(req, res) {
  return SignupModel.find(function(err, signup) {
    if (!err) {
      return res.send(signup);
    } else {
      return console.log(err);
    }
  });
});



app.get('/supplies', function  (req, res) {
  res.json(supplies);
});


//read a list of products
app.get('/api/products', function(req, res) {
  
  return ProductModel.find(function(err, products) {
    if (!err) {
      return res.send(products);
      //return res.json(products);
    } else {
      return console.log(err);
    }
  });
});



//create a single course
/*app.post('/api/courses', function (req, res) {
  var course;
  console.log("POST: ");
  console.log(req.body);
  course = new CoursesModel ({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    recommeded: req.body.recommeded,
    time: req.body.time,
    location: req.body.location,
    signup: req.body.signup,
    rsvp: req.body.rsvp,
    courseDay: req.body.courseDay,
    modified: req.body.modified,
    
  });
  course.save(function(err) {
    if (!err) {
      return console.log('added course');
    } else {
      return console.log(err);
    }
  });
  return res.send(course);
});*/


//create a single product
app.post('/api/products', function (req, res) {
  var product;
  console.log("POST: ");
  console.log(req.body);
  product = new ProductModel ({
    id: req.body.id,
    category: req.body.category,
    title: req.body.title,
    url: req.body.url,
    keyword: req.body.keyword,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    imagepathsm: req.body.imagepathsm,
    modified: req.body.modified,
    
  });
  product.save(function(err) {
    if (!err) {
      return console.log('added');
    } else {
      return console.log(err);
    }
  });
  return res.send(product);
});


//read a single product by ID

app.get('/api/products/:id', function (req, res){
  
  return ProductModel.findById(req.params.id, function (err, product) {
  
    if (!err) {
      return res.send(product);
      //return res.send(product.url);
    } else {
      return console.log(err);
    }
  });
});

//read a single course by ID

app.get('/api/courses/:id', function (req, res){
  return CoursesModel.findById(req.params.id, function (err, course) {
  
    if (!err) {
      return res.send(course);
      
    } else {
      return console.log(err);
    }
  });
});

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


//update a single product by ID
app.put('/api/products/:id', function (req, res){
  return ProductModel.findById(req.params.id, function (err, product) {
    product.title = req.body.title,
    product.url = req.body.url,
    product.keyword = req.body.keyword,
    product.description = req.body.description,
    product.price = req.body.price,
    product.quantity = req.body.quantity,
    product.imagepathsm = req.body.imagepathsm,
    product.modified = req.body.modified;
    return product.save(function (err) {
      if (!err) {
        console.log("updated the quantity");
      } else {
        console.log(err);
      }
      return res.send(product);
    });
  });
});

//delete a single product by ID
app.delete('/api/products/:id', function (req, res){
  return ProductModel.findById(req.params.id, function (err, product) {
    return product.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});

//delete a single order by ID
app.delete('/api/orders/:id', function (req, res){
  return OrderedModel.findById(req.params.id, function (err, order) {
    return order.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});

//delete a single course by ID
app.delete('/api/courses/:id', function (req, res){
  return CoursesModel.findById(req.params.id, function (err, course) {
    return course.remove(function (err) {
      if (!err) {
        console.log("removed course");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});



// load routes for auth  ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

var User = mongoose.model('User');
// This function is responsible for returning all entries for the Message model
/*function getUsers(req, res, next) {
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
}*/

app.get('/update', function(req, res) {
  User.findOne(function (err, data) {
     res.send(data);
     //console.log(local.email);
     //console.log(req.body._id);
  })
});

app.post('/update', function(req, res) {
  
  if (req.session.user) {
    next();
    console.log('logged in');
  } else {
    console.log('you are not logged in');
  }

    console.log(req.body.petname);
    //res.render('_index.ejs'); //load index file
  });


/*res.locals = _.extend(res.locals, {

});*/

//YEA --- TEST WORKS!!!!!!!-->
app.get('/test', function(req,res) {
    res.send(res.locals.user);
});

//update an individual user by ID
app.put('/test', function (req, res){
  res.send(res.locals.local);
  /*return User.findById(req.params.user_id, function (err, user) {
   
    res.locals.user.kittenType = req.body.kittenType,
    res.locals.user.modified = req.body.modified;
    return res.locals.user.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(user);
    });
  });*/
});




app.get('/users', function(req, res) {
    //res.send(res.locals.user);
    User.find(function(err, data) {
      res.send(data);

    });
});

//app.get('/users', getUsers);

app.get('/users/:user_id', function  (req, res) {
  
  mongoose.model('User').find({ '_id': req.params.user_id}, function(err, User) {
    res.send(User);
  });
  

});


//update an individual user by ID
app.put('/users/:user_id', function (req, res){
  return User.findById(req.params.user_id, function (err, user) {
   
    user.kittenType = req.body.kittenType,
    user.modified = req.body.modified;
    return user.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(user);
    });
  });
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
  //res.send(res.locals.user);
});


app.get('/supplies', function  (req, res) {
  res.json(supplies);
});

/*app.get('/courses', function  (req, res) {
  res.json(courses);
});*/

/*app.get('/days', function  (req, res) {
  res.json(days);
});*/

app.get('/home', function  (req, res) {
  res.json(home);
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


/*Supplies has been moved to mongoose - delete when all is working*/
/*app.post('/supplies', function  (req, res) {
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

});*/

app.put('/questions/:question_name', function (req, res) {
    
  var matches = questions.filter(function  (question) {
    return question.url === req.params.question_name;
    
  });

for (var i=0; i<6; i ++) {
  for (key in questions) {
      var qs = questions[key].responded;
      var defaultResponse = questions[key].responded;

    }
  }
 
   if (matches.length > 0 ) {
      defaultResponse.push(req.body.responded);
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

app.put('/profiles/:profile_name', function  (req, res) {
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

/*app.get('/supplies/:category/:supply', function  (req, res) {
   
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

});*/



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
    //splice (found = index - the position to remove the item)
    //1 = howmany - number of items to be removed
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
