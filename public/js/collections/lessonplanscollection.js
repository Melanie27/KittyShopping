var LessonPlansCollection = Backbone.Collection.extend({
	model: LessonPlanModel,
	url: window.location.pathname,
	save: function() {
		var collection = this;
		options = {
			success: function(model, resp, xhr) {
				collection.reset(model);
			}
		};

		return Backbone.sync('update', this, options);
	}
});