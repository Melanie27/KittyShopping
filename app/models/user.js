//user.js
//load what we need

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//define the schema for our user model

var userSchema = mongoose.Schema({

	user            : {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    loggedIn : Boolean,
    kittenType   : String,
    url: String,
    orders: [{
        title: String,  
        description: String, 
        quantity : String,
        price : Number,
        total: Number,
        imagepathsm:  String,
        imagepathmenu: String,
        modified: { type: Date, default: Date.now }
    }],
    signup: [{
        name: String,
        courseDay: String,
        time: String,
        location: String,
        url: String,
        rsvp: Boolean,
        modified: { type: Date, default: Date.now }
    }],
    profilePhoto : String,
    profilePage :  String,
    local            : {
        email        : String,
        password     : String,
        petname      : String,
        path         : String,
       
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

//generating a hash

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);



//this is defined in my server.js file
//var User = mongoose.model('User');
