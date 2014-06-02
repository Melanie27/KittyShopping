var YourCourseListView = Backbone.View.extend({
	
	initialize: function() {
		this.collection.fetch();
		this.listenTo(this.collection, "reset", this.render);
		this.listenTo(this.collection, "remove", this.render);
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