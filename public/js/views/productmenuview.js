var ProductMenuView = Backbone.View.extend({
	template: Handlebars.compile( 
		'<h1>The Store</h1>' +
		'<ul style="width:200px;">' +
		'{{#each models}}<li><h2>{{attributes.title}}</h2>' +
		'<a href="#/prod2/{{attributes._id}}">View Details --> </a><br/>' +
		'<span class="price">' + '$' + '{{attributes.price}}' + '.00' + '</span><br/>' +
		/*'<a href="#/orders/{{attributes._id}}">Add to shopping-cart</a>' +*/
		'<img src="photos/kitty-store/{{attributes.imagepathsm}}" class="img-polaroid" style="width:150px; max-height:100px; overflow:hidden;"/></li><br/>{{/each}}' +
		'<br/>' +
		'</ul>'

	),

	initialize: function() {
		this.listenTo(this.collection, "reset", this.render);
	},


	render: function() {
		
		$(this.el).empty();
		this.$el.html(this.template(this.collection));
		return this;
	},

	
});