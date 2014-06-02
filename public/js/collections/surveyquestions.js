var SurveyQuestions = Backbone.Collection.extend ({
	comparator: 'number',
	model: SurveyQuestion,
	url: '/questions',
});

