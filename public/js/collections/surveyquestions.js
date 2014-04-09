var SurveyQuestions = Backbone.Collection.extend ({
	comparator: 'number',
	model: SurveyQuestion,
	url: '/questions',

	initialize: function() {
		_.bindAll(this, "quizTally");
	},

	quizTally: function() {
		
	}

})

