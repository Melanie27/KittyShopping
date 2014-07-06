var YourCourseListView = Backbone.View.extend({
	

	className: "your-classes container-cart",
	

	initialize: function() {
		
		//this.collection = new SignupsMongooseCollection();
		//this.collection.fetch();
		//console.log(this.collection);
		this.listenTo(this.collection, "reset", this.render);
		this.listenTo(this.collection, "remove", this.render);
		this.listenTo(this.collection, "change", this.render);

		
	},

	render: function() {
		$(this.el).empty();

		var html = 

		'<h1>Course Schedule</h1>'+
		'<img class="grad-photo" src="photos/kitty-in-cap.jpg"/>'+
		'<br/><br/>'+
		'<hr>'
		$(this.el).html(html);
		
		$(this.el).append(

			_.map(this.collection.models, function(model, key) {
				return new YourCourseSingleView({ model: model }).render().el
			})
		);

		return this;
	}


});