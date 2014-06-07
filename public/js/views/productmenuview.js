var ProductMenuView = Backbone.View.extend({
	template: Handlebars.compile( 
		
		'<div class="container container-cart">'+
			'<h1>The Store</h1>' +
			'<hr>'+
			'<ul class="menu-list row">'+
				'{{#each models}}'+	
					'<li class="col-lg-4 pull-left">'+				
						'<img src="photos/kitty-store/{{attributes.imagepathmenu}}" class="img-store img-responsive"/>'+
						'<div class ="arrow-up">&uarr;</div>'+
						'<h2>{{attributes.title}}</h2>' +
						'<div class="menu-price">' + '$' + '{{attributes.price}}' + '.00' + '</div>' +
						'<a href="#/prod2/{{attributes._id}}" class="menu-details">View Details &rarr; </a><br/>' +
					'</li>'+
				'{{/each}}' +
			'</ul>'+
		'</div>'

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