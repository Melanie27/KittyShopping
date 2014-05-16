var HomePageView = Backbone.View.extend({
	
	template: Handlebars.compile(
		'<div class="container landing">' +
			'<section class="row">' +
				'<div class="col-lg-6">' + 
				'<p>Here at YogaKitten<sup>TM</sup> we provide a nuturing yet rigorous day program for your kitty.' + 
				'Your feline will never lack for exercise or companionship again. YogaKitten<sup>TM</sup> understands that every kitten is an individual with varying levels of ability and willingness to participate. We have tailored our classes to meet the needs of a variety of kitten types. Please take the <a href="#">kitten personality quiz</a> and then proceed to course recommendations. --></p>'+
				'</div>' +
				'<div class="col-lg-6">' +
					'<a href="#">'+
					'<h3>What Kind of Kitten do you have??</h3>' +
					'<img src="/photos/' + '{{landing}}' + '" class="img-polaroid" />'  +
					'<h1>Take the Quiz!!</h1>' +
					'</a>' +
				'</div>'+
			'</section>' +
		'</div>' +
		'<div class="container options">' +
		'<section class="row">' +
			'<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 options class">' +
			'<a href="#/class-schedule">'+
				'<h4>Class Sign Up</h4>' +
				'<img src="/photos/' + '{{shop}}' + '" class="img-polaroid" />'  +
				'</div>' +
			'</a>' +
			'<a href="#/cart-list">'+
				'<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 options shop">' +
				'<h4>Shop the Store</h4>' +
				'<img src="/photos/' + '{{signup}}' + '" class="img-polaroid" />'  +
				'</div>' +
			'</a>' +
			'<a href="#/store-locator">'+
				'<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 options locate">' +
				'<h4>Studio Locations</h4>' +
				'<img src="/photos/' + '{{locate}}' + '" class="img-polaroid" />'  +
				'</div>' +
			'</a>' +
		'</section>' +
		'</div>'

	),

	initialize: function() {

	},

	render: function() {

		this.$el.html(this.template(this.model.attributes));
		return this;

	}

});