var YogaCoursesListView = Backbone.View.extend({

tagName: 'table',


initialize: function() {
		this.listenTo(this.collection, 'reset', this.render);
		_.bindAll(this, "addLink");
		


},


	addLink: function() {

		$('.last').css(['color', 'red']);
	},

	

render: function() {

	//Append table with a table header
		$(this.el).append($('<h4><div><tr></tr></div></h4>').html(
			_.map(['Course', 'Description', 'Kitten Type', 'Time', 'Location', 'Day', 'Signup'],
				function(val, key) {
					return '<th column="val" style="padding-right:25px; width:90px; clear:both;">' + val + '</th>'
				} 
			) 
		));

	$(this.el).append(
			_.map(this.collection.models, function(model, key) {
				return new YogaCourseView({ model: model }).render().el
				
			})
		);


	//console.log(YogaCoursesCollection);

	$(this.el).append( new Backbone.UI.TableView ({
		sortable: true,
		model: this.collection,
		columns: [
				{title: "Course", content: "name", comparator: "item1, item2", width: "120" },
				{title: "Description", content: "description", comparator: "id", width: "270" },
				{title: "Kitten Type", content: "recommeded", comparator: "name", width: "300" },
				{title: "Time", content: "time", comparator: "time", width: "160" },
				{title: "Location", content: "location", comparator: "id", width: "160"  },
				{title: "Day", content: "courseDay", comparator: "id", width: "100"  },
				{title: "Signup", content: "signup", comparator: "id", width: "100"  }

			],


		 	
		onSort: function(item1, item2) {
		
			
			
		},

		onItemClick : function() {
			
			//console.log($(this.model).val("name"));
			_.map(this.model, function(model, key) {
				console.log($(this.model).val("name"));
				
			})
			console.log('invoke modal window');
			console.log(this.model.get('description'));

		}

		}).render().el);


	return this;
}
	
});