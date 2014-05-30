var ProductsOrderedView = Backbone.View.extend({
	template: Handlebars.compile(
		'<h1>Ordered Items</h1>' +
		'{{#each models}}' +
		'{{attributes.title}}<br/>' +
		'<label>Quantity :  </label><span class="quantity" style="font-size:16px;">{{attributes.quantity}}</span><br/>' +
		'<img src="photos/kitty-store/{{attributes.imagepathsm}}" class="img-polaroid" style="width:150px;"/>' +
		'<button type="button" class="btn btn-secondary">Remove from Cart</button><br/>' +
		'{{/each}}' 
	),

	initialize: function() {

	},

	render: function() {
		this.delegateEvents({
			'click .btn-secondary' : 'remove'
		});

		this.$el.html(this.template(this.collection));
		return this;
	},

	remove: function(event) {
		event.preventDefault();
		//console.log(this.model.get('_id'));
		jQuery.ajax({
        url: "/test/orders/" + '5388cd807738d6e3564f6b36', 
        type: "DELETE",
        
        success: function (data, textStatus, jqXHR) { 
          console.log("Post response:"); 
          console.dir(data); 
          console.log(textStatus); 
          console.dir(jqXHR); 
        }
      });
	},

});