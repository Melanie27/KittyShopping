var PreviewInvoiceItemView = Backbone.View.extend ({

			template: _.template('\
				Price: <%= Price %>.\
				Quantity: <%= Quantity %>.\
				Amount: <%= Amount %>.\
			'),

			render: function () {
				var html = this.template({
				//pass model properties to the template
				Price: this.model.get('Price'),
				Quantity: this.model.get('Quantity'),

				//calculate amount and pass it to the template
				Amount: this.model.calculateAmount()
			});

		// set html for the view using jquery
		$(this.el).html(html);
		
	}
});