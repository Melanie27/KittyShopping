var ResultsView = Backbone.View.extend({

	template: Handlebars.compile(
		
		
		'<img src="photos/kittys/' + '{{photo}}' + '" class="img-polaroid" />' +
		'<h1>Kitten Type: {{name}} Cat</h1>' +
		
		'<h4 class="profile">{{profile}}</h4>' +
		'<h5><a href="#/class-schedule">Please proceed to scheduling &rarr;</a></h5>' +
		'<div class="form-group">' +
			'<input type="text" style="display:none;" class="form-control" name="kittenType" value="{{kittenType}}">' +
		'</div>' +
		'<button type="submit" id="signup" class="btn btn-primary btn-lg">Save Quiz Results to Profile</button>'
	),

	initialize: function() {
		
		this.listenTo(this.model, "change", this.render);
	},

	render: function() {
		$(this.el).empty();
		this.$el.html(this.template(this.model.attributes));
		
		this.delegateEvents({
			'click .btn-primary' : 'save'
		});

	return this;
	},

	save: function() {
		this.setModelData();
		var kittenType = this.model.get('kittenType');
		var url = this.model.get('url');

 		jQuery.ajax({
     		url: "/test/kittenType",
     		type: "POST",
     		data: {
       			"kittenType": kittenType,
       			"url" : url,
    	 	},
		});
		alert('saved to profile');

	},

	/*saveKitten: function(model) {
        app.userMongooseModel.add(model);
    },*/

	setModelData: function() {
		this.model.set({
			kittenType: this.$el.find('input[name="kittenType"]').val(),
		});

	}

});
