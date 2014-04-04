
var SurveyQuestionDetails = Backbone.View.extend({
	template: Handlebars.compile(
		'<div>' +

		'<h1>{{name}}</h1>' +
		'<p><span class="label">{{category}}</span></p>' +
		'<p><span class="label">{{question}}</span></p>' +
		'<form class="form-horizontal" id="form">'+
		'<fieldset>' +
		'{{#each questions}}' + '<p>{{question}}</p>' + '{{/each}}' +
		'{{#each answers}}'+

			'<li>' +
				'<input class="quiz" type="radio" name="answer" value="{{@key}}" checked="false"/>{{this}}' +
			'</li>' +	
		'{{/each}}' +
		'</fieldset>' +
		'</form>' +
		'<div>{{responded}}</div>' +
		'<button type="button" class="btn btn-danger">Next</button>' +
		'<button type="button" class="btn btn-delete">Delete</button>' +
		'</div>'
	),


	
	initialize: function() {
		this.listenTo(this.model, "change", this.render);
		
		//this.listenTo(this.model, "change:responded", this.update);
	},

	render: function () {
		var questions = this.model;
		this.$el.html(this.template(this.model.attributes));
		this.delegateEvents({
			'click .btn-danger': 'save',
			'click .btn-delete' : 'deleteQuestion'
			//'click .btn-danger' : 'nextScreen'
		});

		return this;
	},

	deleteQuestion: function() {
		//this.model.destroy();

		//delete view
		this.remove();
		console.log(this);
		
	},


	nextScreen: function(model) {
		//alert('view next screen');
		//app.navigate('kitty-survey/favorite-band', {trigger:true});		 	

	},

	save: function() {
		this.setModelData();
		
		this.model.save(this.model.attributes, 
			{	
				success: function(model) {
					
					app.surveyQuestions.add(model, {at: 0});
					alert('sucesss');
					app.navigate('kitty-survey/q-' + model.get('url'), {trigger:true});
				}
			}

		);

		this.remove();
		
	},

	
	setModelData: function() {
		/*if ($(".quiz").attr('checked', 'checked')) {
			var ans = this.$el.find('input[name=answer]:checked').val();
			console.log(ans + ' is checked');
		}*/

		this.model.set({
			responded: this.$el.find('input[name=answer]:checked').val()

		});

		
		
	},

});	