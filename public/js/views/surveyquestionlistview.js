//Define new view for rendering the collection of questions - this is located at url-question-collection

var SurveyQuestionListView = Backbone.View.extend ({

	className: 'container-cart col-lg-8 col-lg-offset-2',

	initialize: function() {
		this.listenTo(this.collection, "reset", this.render);
	},

	render: function() {
		$(this.el).empty();
		$(this.el).append('<h1>Kitten Personality Quiz</h1><hr>');
		//append table with a row
		$(this.el).append(
			_.map(this.collection.models, function(model, key) {
				return new SurveyQuestionDetails({ model: model }).render().el
				var values = $('input.quiz').filter(':checked').val();
			})
		);

		$(this.el).append(new SubmitQuizView ({
				collection: this.surveyQuestionListView
		}).render().el);


		return this;
	}

});