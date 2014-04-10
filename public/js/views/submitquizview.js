var SubmitQuizView = Backbone.View.extend({
	tagName: 'button',

render: function() {
	 var html = 
		'<br>'+
		'<button id="tally" class="btn btn-primary submit" value="submit">Submit Quiz</button>'

		$(this.el).html(html);
		return this;
},


events: {

	'click #tally' : 'submitQuiz'

},


initialize: function() {
	//_.bindAll(this, "submitQuiz");
	//SurveyQuestionDetails.bind("submit1", this.submitQuiz)
},

display: function() {
	app.navigate('survey/:kitty', true);
},


submitQuiz: function(data) {

	
	/*var formsCollection = $("form");
	for(var i=0;i<formsCollection.length;i++) {
   		alert(formsCollection[i].name);
   		var values = $('input.quiz').filter(':checked').val();
   		console.log(values);
   		//alert(formsCollection[i].checked);
	}*/

	/*for (var i =0; i<6; i ++) {
		console.log($('input.quiz').filter(':checked').val());
	}*/

	/*$('survey-view').each(function(index) {
		//console.log($('input.quiz').filter(':checked').val());

		console.log( index + ": " + $('input.quiz').filter(':checked').val() );
	});*/
	var values = $('input.quiz').filter(':checked').val();
	console.log(values);

	//console.log(this.options.parent.collection.toJSON());
	var value1 = $('.1 input.quiz').filter(':checked').val();
	console.log('1 ' + value1);
	var value2 = $('.2 input.quiz').filter(':checked').val();
	console.log('2 ' + value2);
	var value3 = $('.3 input.quiz').filter(':checked').val();
	console.log('3 ' + value3);
	var value4 = $('.4 input.quiz').filter(':checked').val();
	console.log('4 ' + value4);
	var value5 = $('.5 input.quiz').filter(':checked').val();
	console.log('5 ' + value5);
	
	//console.log(data);

	//count grumpy
	var GrumpyCount = 0

	if (value1 == "Grumpy") {
		var GrumpyCount = GrumpyCount + 1
	}
		
	if (value2 == "Grumpy") {
		var GrumpyCount = GrumpyCount + 1
	} 

	if (value3 == "Grumpy") {
		var GrumpyCount = GrumpyCount + 1
	} 

	if (value4 == "Grumpy") {
		var GrumpyCount = GrumpyCount + 1
	} 

	if (value5 == "Grumpy") {
		var GrumpyCount = GrumpyCount + 1
	} 

	console.log('Total Grumpies:' + GrumpyCount);

	//count hipsters
	var HipsterCount = 0

	if (value1 == "Hipster") {
		var HipsterCount = HipsterCount + 1
	}
		
	if (value2 == "Hipster") {
		var HipsterCount = HipsterCount + 1	
	} 

	if (value3 == "Hipster") {
		var HipsterCount = HipsterCount + 1
	} 

	if (value4 == "Hipster") {
		var HipsterCount = HipsterCount + 1
	} 

	if (value5 == "Hipster") {
		var HipsterCount = HipsterCount + 1
	} 


	console.log('Total Hipsters:' + HipsterCount);

	//count pudges

	var PudgeCount = 0

	if (value1 == "Pudge") {
		var PudgeCount = PudgeCount + 1
	}
		
	if (value2 == "Pudge") {
		var PudgeCount = PudgeCount + 1	
	} 

	if (value3 == "Pudge") {
		var PudgeCount = PudgeCount + 1
	} 

	if (value4 == "Pudge") {
		var PudgeCount = PudgeCount + 1
	} 

	if (value5 == "Pudge") {
		var PudgeCount = PudgeCount + 1
	} 


	console.log('Total Pudgies:' + PudgeCount);

	//count bubs

	var BubCount = 0

	if (value1 == "Bub") {
		var BubCount = BubCount + 1
	}
		
	if (value2 == "Bub") {
		var BubCount = BubCount + 1	
	} 

	if (value3 == "Bub") {
		var BubCount = BubCount + 1
	} 

	if (value4 == "Bub") {
		var BubCount = BubCount + 1
	} 

	if (value5 == "Bub") {
		var BubCount = BubCount + 1
	} 


	console.log('Total Bubs:' + BubCount);

	//count meows

	var MeowCount = 0

	if (value1 == "Meow") {
		var MeowCount = MeowCount + 1
	}
		
	if (value2 == "Meow") {
		var MeowCount = MeowCount + 1	
	} 

	if (value3 == "Meow") {
		var MeowCount = MeowCount + 1
	} 

	if (value4 == "Meow") {
		var MeowCount = MeowCount + 1
	} 

	if (value5 == "Meow") {
		var MeowCount = MeowCount + 1
	} 


	console.log('Total Meows:' + MeowCount);

	if (GrumpyCount >= 3 || (GrumpyCount == 2 && ( HipsterCount != 2 && PudgeCount != 2 && BubCount != 2 && MeowCount != 2  )) || (GrumpyCount == 2 && HipsterCount == 2) || (GrumpyCount == 2 && BubCount == 2)) {
		console.log('grumpy!')
		app.navigate("results/Grumpy", true);
	}

	if (HipsterCount >= 3 || (HipsterCount == 2 && ( GrumpyCount != 2 && PudgeCount != 2 && BubCount != 2 && MeowCount != 2  )) || (HipsterCount == 2 && PudgeCount == 2) || (HipsterCount == 2 && MeowCount == 2)) {
		console.log('hipster!');
		app.navigate("results/Hipster", {trigger: true});
	}

	if (PudgeCount >= 3 || (PudgeCount == 2 && ( GrumpyCount != 2 && HipsterCount != 2 && BubCount != 2 && MeowCount != 2  )) || (GrumpyCount == 2 && PudgeCount == 2) || (PudgeCount == 2 && BubCount == 2)) {
		console.log('pudge!');
		app.navigate("results/Pudge", {trigger: true});
	}

	if (BubCount >= 3 || (BubCount == 2 && ( GrumpyCount != 2 && PudgeCount != 2 && HipsterCount != 2 && MeowCount != 2  )) || (BubCount == 2 && MeowCount == 2)) {
		console.log('bub!');
		app.navigate("results/Bub", {trigger: true});
	}

	if (MeowCount >= 3 || (MeowCount == 2 && ( GrumpyCount != 2 && PudgeCount != 2 && BubCount != 2 && HipsterCount != 2  )) || (GrumpyCount == 2 && MeowCount == 2) || (PudgeCount == 2 && MeowCount == 2)) {
		console.log('meow!');
		app.navigate("results/Meow", {trigger: true});

	}
	
	if (GrumpyCount == 1 &&  HipsterCount == 1 && PudgeCount == 1 && BubCount == 1 && MeowCount == 1) {
		console.log('5 way tie');
		app.navigate("results/Bub", {trigger: true});
	}

	//prompt('Enter the name of your furry Beast');
	//app.navigate("survey/results", {trigger: true});

}




});