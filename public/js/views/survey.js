var SurveyView = Backbone.View.extend({

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
		//this.listenTo(this.collection, "submit", this.render);
		


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
		
		this.helperOne();
		
		this.$el.html(this.template(this.collection));
		this.delegateEvents({
			'click .btn-danger': 'submit'
			
		});
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