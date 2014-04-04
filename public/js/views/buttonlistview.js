	// List of buttons
var ButtonListView = Backbone.View.extend({
	// bind each button to <code>#buttonList</code>
	// <div> element in the HTML
	el: $("#buttonList"),

	// bind customized method to this view
	initialize: function(){
	_.bindAll(this, "renderButton");
	},

	// creation of each button
	// and append it to this view
	renderButton: function(model) {
	// create an button view with associated model and parent's view
	var buttonView = new ButtonView({model: model, parent:this.options.parent});
	buttonView.render();
	$(this.el).append(buttonView.el);
	},

	// render each buttons defined the collection
	render: function () {
	this.collection.each(this.renderButton);
	}
});