var TopicsCollection = Backbone.Collection.extend({
	model: TopicModel,
	url: "/profiles"
	//url: "/topics/" + coursename
});