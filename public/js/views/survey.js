var SurveyView = Backbone.View.extend({

	//el: 'body',

	template: Handlebars.compile (
		
		'<ul>' +
		//'{{#each}}{{this}}{{/each}}' +
		'{{question}}' +
		'{{#each models}}<h3>{{attributes.name}}</h3>' +
		'<h4>{{attributes.question}}</h4>' +
		'<form class="form-horizontal" id="form">'+
		'<fieldset>' +
		'<li><input class="quiz" type="radio" name="answer" value="{{@key}}" checked="false"/> {{attributes.answers.Grumpy}}</l1>' +
		'<li><input class="quiz" type="radio" name="answer" value="{{@key}}" checked="false"/> {{attributes.answers.Bub}}</l1>' +
		'<li><input class="quiz" type="radio" name="answer" value="{{@key}}" checked="false"/> {{attributes.answers.Hipster}}</l1>' +
		'<li><input class="quiz" type="radio" name="answer" value="{{@key}}" checked="false"/> {{attributes.answers.Meow}}</l1>' +
		'<li><input class="quiz" type="radio" name="answer" value="{{@key}}" checked="false"/> {{attributes.answers.Pudge}}</l1>' +
		'</fieldset>' +
		'</form>' +
		'{{/each}}' +
		'</ul>' +
		'<div>{{responded}}</div>' +
		'<button type="submit" class="btn btn-danger">Submit</button>'
		

		 
	),

	initialize: function() {

		this.listenTo(this.collection, "reset", this.render);
		//this.listenTo(this.collection, "change:responded", this.render);
		//and then add a check mark or something to the right
		
		

	},

	helperOne: function() {
		var context = this.collection.toJSON();
		//console.log(context);
		var output = "";

		for (var key in context) {
			var innerContext = context[key];
			

			//console.log(innerContext);
			//var qs = innerContext.question;
			//console.log(qs);
			var ans = innerContext.answers;
			//console.log(ans);
		
			for (var key2 in ans) {
			var answersContext = ans[key2];
			//console.log(answersContext);
			output += '<li>' +
			'answersContext' + 
				'</li>';
			//console.log(output);	

			}

		}

		
	},

	render: function () {
		
		var output = "";
		

		var html = '';
		
		_.each(this.collection.models, function(model, index, list) {
			
			var item_html = '<h2>' + 'Title: ' + model.get('name') + '</h2>' + '<br>';
			var question_html = '<h4>' + 'Question: ' + model.get('question') + '</h4>' + '<br>';
			var answer_html = model.get('answers');
			var n = 5
			var lists = _.groupBy (answer_html, function(element, index){
				return Math.floor(index/n);
					
					//have to access each list indiv
			});
			
			_.map(lists, function(keyobj, key, list) {
				console.log(lists);
				var output = "";
				var group = "";
				var answer_list = keyobj;
				var answer_group =  '<fieldset><ul>' + answer_list + '</ul><fieldset>' ;


				for (key in answer_list) {
					var innerAnswer = answer_list[key];
					output += '<input class="quiz" type="radio" name="answer" value=""/><li>' + innerAnswer + '</li>';
					group = '<fieldset><ul class="answers">' + output + '</ul></fieldset>';
				}

				html = html + group

			});

			html = html + item_html + question_html;
		});

		html = '<form class="form-horizontal" id="form">'+ '<ul>' + html + '<ul></form>';
		$(this.el).html(html);

		
		return this;
	},

	submit: function() {
		this.setCollectionData();
		
		this.model.save(this.model.attributes, 
			{	
				success: function(model) {
					
					
					alert('sucesss');
					app.navigate('kitty-survey/q-' + model.get('url'), {trigger:true});
				}
			}

		);

		
		
	},

	setCollectionData: function() {

		this.collection.set(this.surveyQuestionModel);
		
	},

});