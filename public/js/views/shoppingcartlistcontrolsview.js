var ShoppingCartListControlsView = Backbone.View.extend({
	render: function() {
		var html = 
		'<br>'+
		'<input id="remove" type="button" value="Remove">'+
		'<button id="reset" value="Check Out">Reset</button>' +
		'<button id="order" value="Check Out">Submit Order</button>'

		$(this.el).html(html);
		return this;
	},

	events: {
		'click #add' : 'addNewInvoiceItem',
		'click #remove' : 'removeInvoiceItem',
		'click #reset' : 'resetBasket',
		'click #order' : 'submitOrder'
	}, 

	//Add button handler
	//repurpose this for on the indiv model view page

	resetBasket: function() {
			// reset the order collection
			alert('resetting');
			this.collection.reset();
	},

	submitOrder: function() {
		alert('submitting');
			// print out order in the console
		console.log(" ************** Following will be submitted **************");
		console.log(this.collection.toJSON());
		console.log(" *********************************************************");

	},


	addNewInvoiceItem: function() {
		var description = prompt('Enter Item Description', '');
		var price = prompt('Enter Item Price', '0');
		var quantity = prompt('Enter Item Quantity', '1');

		this.collection.add([{
			description: description,
			price: price,
			quantity: quantity
		}]);
	},

	//remove button handler
	removeInvoiceItem: function() {
		var position = 
			prompt('Enter position of item to remove', '');

			model= this.collection.at(position);
			model.destroy();
		}

});