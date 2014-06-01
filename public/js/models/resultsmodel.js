var ResultsModel = Backbone.Model.extend ({
	urlRoot: '/profiles',
	defaults: {
		id : "Grumpy",
		url : "Grumpy",
		name : "Default",
		kittenType   : "Grumpy",
		photo : "grumpy.jpg",
		profile : "Your kitty is suffering on a fundamental spiritual level and needs an intense regimen at Yoga Kitten."
	}	
});