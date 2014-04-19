var express = require('express'),
  http = require('http'),
  items = require('./data/menu-items');
  questions = require('./data/kitty-questions');
  profiles = require('./data/kitty-profiles');
  supplies = require('./data/kitty-supplies-test');
  courses = require('./data/kitty-courses');
  days = require('./data/kitty-days');



var app = express()
  .use(express.bodyParser())
  .use(express.static('public'));


/*var days = {

  1: { text: "Monday", id: 1 }
  
},

courses = {
      1: {
          1: { text: "Nap time", id: 1},
          2: {text: "Litter time", id: 2}
      }
  },

  d = 2,
  c = 2;


app.get('/days', function(req, res) {
  var results = [];
  for (var day in days) {
    if(days.hasOwnProperty(day)) {
      results.push(days[day]);
    }
  }
  res.json(results);

});

app.post('/days', function (req, res) {
  var day = req.body;
  day.id = d++;
  days[day.id] = day;
  res.json(day);

});

app.put('/days/:id', function (req, res) {
  days[req.params.id] = req.body;
  res.json(req.body);
});


app.get('/days/:did/courses', function (req, res) {
    var results = [], c = courses[req.param.did];
    for (var course in c) {
      if (c.hasOwnProperty(course)) {
        results.push(c[course]);
      }
    }
    res.json(results);
});


app.post('/days/:did/courses', function(req, res) {
  var course = req.body, id = req.params.did;
  course.id = c++;
  if(!courses[id]) { courses[id] = {}; }
  courses[id][course.id] = course;
  res.json(course);
});

app.put('/days/:did/courses/:cid', function (req, res) {
    courses[req.params.id] = req.body;
  res.json(req.body);
});*/



app.get('/items', function  (req, res) {
  res.json(items);
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

http.createServer(app).listen(3000, function () {
  console.log("Server ready at http://localhost:3000");
});
