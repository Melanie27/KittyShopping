var InvoiceItemModel = Backbone.Model.extend({
			defaults: {
				Price: 0,
				Quantity: 0
			},
		//calculate amount

		calculateAmount: function() {
			return this.get('Price') * this.get('Quantity');
				
			}
		});
