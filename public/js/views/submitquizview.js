var SubmitQuizView = Backbone.View.extend({
	tagName: 'button',

render: function() {
	 var html = 
		'<br>'+
		//'<form action="/quiz" method="post">' +
		'<button id="tally" class="btn btn-primary submit" value="submit">Submit Quiz</button>'
		//'</form>'
		/*'<form action="/login" method="post">' +
		'<button type="submit" class="btn btn-warning btn-lg">Login</button>'+
		'</form>'*/
		$(this.el).html(html);
		return this;
},


events: {

	'click #tally' : 'submitQuiz'

},


initialize: function() {
	
},

display: function() {
	app.navigate('survey/:kitty', true);
},


submitQuiz: function(data) {

	//modal window to enter username and pass first
	
	$('.questions, #tally').hide();
	//alert('please register an account to see quiz results');
	//$(this.el).append(new AuthSignupView().render().el);
	//$(this.el).append(new AuthProfileView().render().el);		

	

	var GrumpyCount = 0
	var HipsterCount = 0
	var PudgeCount = 0
	var BubCount = 0
	var MeowCount = 0
	var formsCollection = $("form");
	for(var i=0;i<formsCollection.length;i++) {
   		var collect = formsCollection[i];
   		var values = $(collect).find('input.quiz').filter(':checked').val();
		//console.log(values);

		
		if (values == "Grumpy") {
			var GrumpyCount = GrumpyCount + 1
		} 
		//console.log('Total Grumpies:' + GrumpyCount);

		if (values == "Hipster") {
			var HipsterCount = HipsterCount + 1
		} 
		//console.log('Total Hipsters:' + HipsterCount);

		if (values == "Pudge") {
			var PudgeCount = PudgeCount + 1
		} 
		//console.log('Total Pudgies:' + PudgeCount);

		if (values == "Bub") {
			var BubCount = BubCount + 1
		} 
		//console.log('Total Bubs:' + BubCount);

		if (values == "Meow") {
			var MeowCount = MeowCount + 1
		} 
		//console.log('Total Meow:' + MeowCount);
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
	 

	//prompt('Enter the name of your furry Beast');
	//app.navigate("survey/results", {trigger: true});*/

}




});