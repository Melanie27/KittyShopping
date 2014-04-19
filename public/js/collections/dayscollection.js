var DaysCollection = Backbone.Collection.extend({
	model: DayModel,
	urlRoot: "/days"
});