var DayModel = Backbone.RelationalModel.extend({
	relations: [{
		type: Backbone.HasMany,
		key: 'courses', 
		relatedModel: 'YogaoCourseModel',
		reverseRelation: {
			key: 'courseDay',
			includeInJSON: 'id'
		}
	
	}]
});