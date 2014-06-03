var YourCourseListView = Backbone.View.extend({
	
	className: "your-classes",

	initialize: function() {
		
		this.collection = new SignupsMongooseCollection();
		this.collection.fetch();
		this.listenTo(this.collection, "reset", this.render);
		this.listenTo(this.collection, "remove", this.render);
		this.listenTo(this.collection, "change", this.render);
	},

	render: function() {
		$(this.el).empty();

		$(this.el).append(
			_.map(this.collection.models, function(model, key) {
				return new YourCourseSingleView({ model: model }).render().el
			})
		);

		return this;
	}


});