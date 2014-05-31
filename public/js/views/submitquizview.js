var SubmitQuizView = Backbone.View.extend({
	

render: function() {
	 var html = 
		'<br>'+
		'<button id="tally1" class="btn btn-primary submit" value="submit">Submit Quiz</button><br/>'
		$(this.el).html(html);
		return this;
},


events: {

	'click #tally1' : 'submitQuiz'
	
},


display: function() {
	app.navigate('survey/:kitty', true);
},


submitQuiz: function(data) {
	
	$('.questions, #tally').hide();
	var GrumpyCount = 0
	var HipsterCount = 0
	var PudgeCount = 0
	var BubCount = 0
	var MeowCount = 0
	var formsCollection = $("form");
	for(var i=0;i<formsCollection.length;i++) {
   		var collect = formsCollection[i];
   		var values = $(collect).find('input.quiz').filter(':checked').val();
		if (values == "Grumpy") {
			var GrumpyCount = GrumpyCount + 1
		} 

		if (values == "Hipster") {
			var HipsterCount = HipsterCount + 1
		} 

		if (values == "Pudge") {
			var PudgeCount = PudgeCount + 1
		} 

		if (values == "Bub") {
			var BubCount = BubCount + 1
		} 

		if (values == "Meow") {
			var MeowCount = MeowCount + 1
		} 
	}

	var winner = "";

	//Navigate to the winning cat

	if (GrumpyCount >= 3 || (GrumpyCount == 2 && ( HipsterCount != 2 && PudgeCount != 2 && BubCount != 2 && MeowCount != 2  )) || (GrumpyCount == 2 && HipsterCount == 2) || (GrumpyCount == 2 && BubCount == 2)) {
		app.navigate("results/Grumpy", true);
		var winner = "Grumpy";
	}

	if (HipsterCount >= 3 || (HipsterCount == 2 && ( GrumpyCount != 2 && PudgeCount != 2 && BubCount != 2 && MeowCount != 2  )) || (HipsterCount == 2 && PudgeCount == 2) || (HipsterCount == 2 && MeowCount == 2)) {
		app.navigate("results/Hipster", {trigger: true});
		var winner = "Hipster";
	}

	if (PudgeCount >= 3 || (PudgeCount == 2 && ( GrumpyCount != 2 && HipsterCount != 2 && BubCount != 2 && MeowCount != 2  )) || (GrumpyCount == 2 && PudgeCount == 2) || (PudgeCount == 2 && BubCount == 2)) {
		app.navigate("results/Pudge", {trigger: true});
		var winner = "Pudge";
	}

	if (BubCount >= 3 || (BubCount == 2 && ( GrumpyCount != 2 && PudgeCount != 2 && HipsterCount != 2 && MeowCount != 2  )) || (BubCount == 2 && MeowCount == 2) || (BubCount == 2 && HipsterCount == 2)){
		app.navigate("results/Bub", {trigger: true});
		var winner = "Bub";
	}

	if (MeowCount >= 3 || (MeowCount == 2 && ( GrumpyCount != 2 && PudgeCount != 2 && BubCount != 2 && HipsterCount != 2  )) || (GrumpyCount == 2 && MeowCount == 2) || (PudgeCount == 2 && MeowCount == 2)) {
		app.navigate("results/Meow", {trigger: true});
		var winner = "Meow";

	}
	
	if (GrumpyCount == 1 &&  HipsterCount == 1 && PudgeCount == 1 && BubCount == 1 && MeowCount == 1) {
		app.navigate("results/Hipster", {trigger: true});
		var winner = "Hipster";
	}

	console.log(winner);

}




});