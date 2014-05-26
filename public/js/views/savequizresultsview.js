var SaveQuizResultsView = Backbone.View.extend({
	
	template: Handlebars.compile(
		/*'<form action="/user/537ce279f26a0d0000db68f2" method="put">' +*/
			'<div class="form-group">' +
				'<label>Kitten Type</label>' +
				'<input type="text" class="form-control" name="kittenType" value="{{kittenType}}">' +
			'</div>' +
			'<button type="submit" id="signup" class="btn btn-warning btn-lg">Save Quiz Results to Profile</button>'
		/*'</form>'*/
	),

	initialize: function() {
		//alert(this.model.attributes.user_id);
	},


	render: function() {
		this.$el.html(this.template(this.model.attributes));
		
		this.delegateEvents({
			'click .btn-warning' : 'save'
		})

		return this;	
	},

	save: function() {
		this.setModelData();
		
		var kittenType = this.model.get('kittenType');
		//var user = this.model.get('result');
		//console.log(user);
		

		jQuery.ajax({
    		//url: "/users/537d082cf4092a00000d2fd2", 
    		url: "/api/kittens",
    		type: "POST",
    		data: {
      			"kittenType": kittenType 
     
    		}, 
    	success: function (data, textStatus, jqXHR) { 
        	console.log("Post resposne:"); 
        	console.dir(data); 
        	console.log(textStatus); 
        	console.dir(jqXHR); 
    		}
		});

		

	},

	setModelData: function() {
		this.model.set({
			//result: user, 
			kittenType: this.$el.find('input[name="kittenType"]').val(),


		})

	}

});