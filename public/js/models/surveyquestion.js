var SurveyQuestion = Backbone.Model.extend({
	comparator: 'id',
	urlRoot: '/questions',
	defaults: 
			{
			
			id: "favorite-band",
			name: 'Favorite Band',
			question: 'Your kitty claws at you desperatly when it wants to listen to:',
			answers: {
						"Bub" : "Country",
						"Grumpy" : "Mozart. Popular music is for the plebs.",
						"Pudge" : "z100",
						"Meow" : "Very heavy metal",
						"Hipster" : "something long winded"
					}
			},

});