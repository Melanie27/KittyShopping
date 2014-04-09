
var SurveyQuestionDetails = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="{{number}}">' +
		'<h1>{{name}}</h1>' +
		'<p><span class="label">{{question}}</span></p>' +
		'<form class="form-horizontal3" id="form" name="myform">'+
		'<fieldset>' +
		'{{#each questions}}' + '<p>{{question}}</p>' + '{{/each}}' +
		'{{#each answers}}'+
			'<li>' +
				'<input class="quiz" type="radio" name="answer1" value="{{@key}}" checked=""/>{{this}}' +
			'</li>' +	
		'{{/each}}' +
		'</fieldset>' +
		'</form>' +
		'<input type="submit" class="{{number}} btn btn-primary submit"></button>' +
		'</div>'
	),

	initialize: function() {
		this.listenTo(this.model, "change", this.render);

		// Add the HTML to the DOM...
		//$('form input:last').prop('checked', false);

		
	},

	events: {

		'click input.submit.1' : 'submit1',
		'click input.submit.2' : 'submit2',
		'click input.submit.3' : 'submit3',
		'click input.submit.4' : 'submit4',
		'click input.submit.5' : 'submit5',
		'click input.submit.6' : 'submit6'
	},

	submit1: function() {
		//get the value for the checked button on submit
		var value1 = $('.1 input.quiz').filter(':checked').val();
		console.log(value1);
	},

	submit2: function() {
		//get the value for the checked button on submit
		var value2 = $('.2 input.quiz').filter(':checked').val();
		console.log(value2);
	},

	submit3: function() {
		//get the value for the checked button on submit
		var value3 = $('.3 input.quiz').filter(':checked').val();
		console.log(value3);
	},

	submit4: function() {
		//get the value for the checked button on submit
		var value4 = $('.4 input.quiz').filter(':checked').val();
		console.log(value4);
	},

	submit5: function() {
		//get the value for the checked button on submit
		var value5 = $('.5 input.quiz').filter(':checked').val();
		console.log(value5);
	},

	submit6: function() {
		//get the value for the checked button on submit
		var value6 = $('.6 input.quiz').filter(':checked').val();
		console.log(value6);
	},




	render: function () {
		
		this.$el.html(this.template(this.model.attributes));

		return this;
	}

});	