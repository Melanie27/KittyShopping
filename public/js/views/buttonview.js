var ButtonView = Backbone.View.extend({
	tagName: "button",

	//binding customized methods in the initialization

	initialize: function() {

		_.bindAll(this, "resetBasket", "submitOrder");

	},

	resetBasket: function() {
			// reset the order collection
			this.options.parent.collection.reset();
	},

	submitOrder: function() {

			// print out order in the console
		console.log(" ************** Following will be submitted **************");
		console.log(this.options.parent.collection.toJSON());
		console.log(" *********************************************************");

	},

		// render Button view
	render: function () {
		var view = this;

		// render button as jQuery-UI button
		$( this.el ).button({

		// use label from the associated model
		label: this.model.get('label')})

		// associate click event to invoke method
		// based on defined action in the button model
		.click(function (event, ui) {
		view[view.model.get('action')]();
		});
		return this;
	}



});