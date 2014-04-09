var ResultsView = Backbone.View.extend({

	template: Handlebars.compile(
		'<h1>Quiz Results: </h1>' +
		'<h2 class="name">You have a {{name}} cat </h2>' +
		'<img src="photos/kittys/' + '{{photo}}' + '" class="img-polaroid" />' +
		'<h4 class="profile">{{profile}}</h4>' +
		'<h5><a href="#">Please proceed to scheduling --></a></h5>'
	),

	initialize: function() {
		this.model.on('reset',this.render,this)
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));

		return this;
	}
	
});