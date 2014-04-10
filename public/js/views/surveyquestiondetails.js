
var SurveyQuestionDetails = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="{{number}}">' +
		'<h1>{{number}}'+ '. ' + '{{name}}</h1>' +
		'<p><span class="label">{{question}}</span></p>' +
		'<form class="form-horizontal3" id="form" name="{{number}}">'+
		'<fieldset>' +
		'{{#each questions}}' + '<p>{{question}}</p>' + '{{/each}}' +
		'{{#each answers}}'+
			'<li>' +
				'<input class="quiz" type="radio" name="answer1" value="{{@key}}" checked=""/>{{this}}' +
			'</li>' +	
		'{{/each}}' +
		'</fieldset>' +
		'</form>' +
		'<button class="btn btn-primary submit" value="submit">Submit</button>' +
		'<br/>' +
		'</div>'
	),

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
		 _.bindAll(this, 'submit1');
    	this.submit = this.$('.submit');

	},

	events: {

		'click .submit' : 'submit1'
	},

	submit1: function() {
		//get the value for the checked button on submit
		var value1 = $('input.quiz').filter(':checked').val();
		console.log(value1);
	},

	render: function () {
		
		this.$el.html(this.template(this.model.attributes));

		return this;
	}

});	