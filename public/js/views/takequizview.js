var TakeQuizView = Backbone.View.extend({
	
	events: {

		//'click .take-quiz': 'triggerLogin'

	},

	triggerLogin: function() {
		//$(this.el).append(new AuthSignupView().render().el);
		$('.take-quiz').hide();
	},

	render: function() {
		var html = 
		'<br>'+
		//'<button class="take-quiz" value="quiz">Take Kitty Quiz</button>';
		$(this.el).html(html);
		$(this.el).append(new AuthSignupView().render().el);
		return this;
	}
});