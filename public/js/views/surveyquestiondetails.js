
var SurveyQuestionDetails = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="questions {{number}}">' +
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
		
		'<br/>' +
		'</div>'
	),

	initialize: function() {
		this.listenTo(this.model, "change", this.render);	
	},

	
	render: function () {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}

});	