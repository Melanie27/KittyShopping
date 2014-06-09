var HomePageView = Backbone.View.extend({
	
	template: Handlebars.compile(
		'<div class="container landing">' +
			'<section class="row">' +
				'<div class="col-lg-6">' + 
				'<h3 class="home-intro">Here at YogaKitten<sup>TM</sup> we provide a nuturing yet rigorous day program for your kitty.</h3>' + 
				'<p>Your feline will never lack for exercise or companionship again. YogaKitten<sup>TM</sup> understands that every kitten is an individual with varying levels of ability and willingness to participate. We have tailored our classes to meet the needs of a variety of kitten types. Please take the kitten personality quiz and then proceed to course recommendations.</p>'+
				'<button class="btn btn-primary  pull-left"><a href="#/take-quiz">Take the Quiz</a></button>'+
				'</div>' +

				'<div class="col-lg-6">' +
					'<a href="#">'+
					
					'<img src="/photos/landing.jpg' + '" class="img-polaroid" />'  +
					'<h3>What Kind of Kitten do you have??</h3>' +
					'</a>' +
				'</div>'+
			'</section>' +

		'</div>' +
		'<hr/>' +
		'<div class="container options">' +
		'<section class="row">' +
			'<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 options class">' +
			'<a href="#/class-schedule">'+
				'<h4>Class Sign Up</h4>' +
				'<img src="/photos/shopthestore.jpg' + '" class="img-polaroid" />'  +
				'</div>' +
			'</a>' +
			'<a href="#/cart-list">'+
				'<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 options shop">' +
				'<h4>Shop the Store</h4>' +
				'<img src="/photos/classsignup.jpg' + '" class="img-polaroid" />'  +
				'</div>' +
			'</a>' +
			'<a href="#/store-locator">'+
				'<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 options locate">' +
				'<h4>Studio Locations</h4>' +
				'<img src="/photos/findlocations.jpg' + '" class="img-polaroid" />'  +
				'</div>' +
			'</a>' +
		'</section>' +
		'</div>'

	),

	render: function() {

		this.$el.html(this.template());
		return this;

	}

});