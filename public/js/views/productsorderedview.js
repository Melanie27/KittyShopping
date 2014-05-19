var ProductsOrderedView = Backbone.View.extend({
	template: Handlebars.compile(
		'<h1>Ordered Items</h1>' +
		'{{#each models}}' +
		'{{attributes.title}}' +
		'<img src="photos/kitty-store/{{attributes.imagepathsm}}" class="img-polaroid" style="width:150px;"/>' +
		'{{/each}}' 
	),

	render: function() {
		$(this.el).empty();

		this.$el.html(this.template(this.collection));
		return this;
	}

});