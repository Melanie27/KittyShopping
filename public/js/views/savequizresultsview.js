var SaveQuizResultsView = Backbone.View.extend({

	template: Handlebars.compile(
		'<div class="form-group">' +
			'<label>Kitten Type</label>' +
			'<input type="text" class="form-control" name="kittenType" value="{{kittenType}}">' +
		'</div>' +
		'<button type="submit" id="signup" class="btn btn-warning btn-lg">Save Quiz Results to Profile</button>'
	),

	render: function() {
		this.$el.html(this.template(this.model.attributes));

		this.delegateEvents({
			'click .btn-warning' : 'save'
		});

		return this;	
	},

	save: function() {
		this.setModelData();
		var kittenType = this.model.get('kittenType');

 		jQuery.ajax({
     	url: "/api/kittens",
     	type: "POST",
     	data: {
       		"kittenType": kittenType
    	 },
     
     	success: function (data, textStatus, jqXHR) {
         	console.log("Post response:");
         	console.dir(data);
         	console.log(textStatus);
         	console.dir(jqXHR);
     		}

		});
		alert('saved to profile');
	},

	setModelData: function() {
		this.model.set({
			kittenType: this.$el.find('input[name="kittenType"]').val(),
		});

	}

});