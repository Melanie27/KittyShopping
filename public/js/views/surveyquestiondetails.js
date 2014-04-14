
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
		
		/*var formsCollection = $("form");
		var checked = $('input.quiz').filter(':checked');
		//var value = $('input.quiz').filter(':checked').val();
		for(var i=0;i<checked.length;i++) {
   			console.log(formsCollection[i].name);
   			console.log(formsCollection[i].input);
   			var formNumber = formsCollection[i].name;
   			var checker = $(formNumber).each(checked);
   			console.log(checker);
			//console.log(value);
		}*/
	},

	render: function () {
		
		this.$el.html(this.template(this.model.attributes));

		return this;
	}

});	