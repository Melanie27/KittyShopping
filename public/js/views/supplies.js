var SuppliesView = Backbone.View.extend({

	template: Handlebars.compile(
		'<ul>' +
		'{{#each title}}<li>{{this}}</li>{{/each}}' +
		'</ul>'
	),

	render: function () {
		this.$el.html(this.template(this.options));
		return this;
	}

});