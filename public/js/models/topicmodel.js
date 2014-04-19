var TopicModel = Backbone.Model.extend ({
	defaults: {
		id: 0,
		title: 'New Topic',
		topic_type: 'Misc',
        description: 'Topic Description'

	}
});

TopicModel.bind("remove", function() {
	this.destroy();
});