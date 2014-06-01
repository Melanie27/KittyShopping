var ResultsView = Backbone.View.extend({

	template: Handlebars.compile(
		'<h1>Kitten Type: </h1>' +
		'<h2 class="name">You have a {{name}} cat </h2>' +
		'<img src="photos/kittys/' + '{{photo}}' + '" class="img-polaroid" />' +
		'<h4 class="profile">{{profile}}</h4>' +
		'<h5><a href="#">Please proceed to scheduling --></a></h5>' +
		'<div class="form-group">' +
			'<input type="text" style="display:none;" class="form-control" name="kittenType" value="{{kittenType}}">' +
		'</div>' +
		'<button type="submit" id="signup" class="btn btn-warning btn-lg">Save Quiz Results to Profile</button>'
	),

	initialize: function() {
		
		this.listenTo(this.model, "change", this.render);
	},

	render: function() {
		$(this.el).empty();
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
		});
		alert('saved to profile');

	},

	setModelData: function() {
		this.model.set({
			kittenType: this.$el.find('input[name="kittenType"]').val(),
		});

	}

});
