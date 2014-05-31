var ProductsOrderedView = Backbone.View.extend({
	template: Handlebars.compile(
		'<h1>Ordered Items</h1>' +
		'<h4>{{local.petname}} is a lucky beast!</h4>'+
		'{{#each orders}}' +
		'{{title}}<br/>' +
		'<label>Quantity :  </label><span class="quantity" style="font-size:16px;">{{quantity}}</span><br/>' +
		'<img src="photos/kitty-store/{{imagepathsm}}" class="img-polaroid" style="width:150px;"/>' +
		'<button type="button" data-id="{{_id}}" class="btn btn-secondary">Remove from Cart</button><br/>' +
		'{{/each}}'  
	),

	initialize: function() {
		this.model = new UserMongooseModel();
		this.model.fetch({reset: true});
		this.listenTo(this.model, "add", this.render);
	},

	render: function() {
		this.delegateEvents({
			'click .btn-secondary' : 'deleteItem'
		});

		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	deleteItem: function(event) {
		event.preventDefault();
		var attrID = "";
		$('.btn-secondary').on('click', function(event) {
  			event.preventDefault();
  			var attrID = $(this).data('id');
  			console.log(attrID);

  			 jQuery.ajax({
        		url: "/test/orders/" + attrID, 
        		type: "DELETE",
        
        		success: function (data, textStatus, jqXHR) { 
          			console.log("Post response:"); 
          			console.dir(data); 
          			console.log(textStatus); 
          			console.dir(jqXHR); 
        		}
      		});

		});
	},

});