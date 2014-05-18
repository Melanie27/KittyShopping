var ProductMenuView = Backbone.View.extend({
	template: Handlebars.compile( 
		'<h1>The Store</h1>' +
		'<ul style="width:200px;">' +
		'{{#each models}}<li><h2>{{attributes.title}}</h2>' +
		'<a href="#/shopping-cart/{{attributes._id}}">View Details --> </a>' +
		'<img src="photos/kitty-store/{{attributes.imagepathsm}}" class="img-polaroid" style="width:150px; max-height:100px; overflow:hidden;"/></li><br/>{{/each}}' +
		'<br/>' +
		'</ul>'

	),

	initialize: function() {
		this.listenTo(this.collection, "reset", this.render);
	},

	render: function() {
		this.$el.html(this.template(this.collection));
		return this;
	}
});