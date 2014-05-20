var ResultsView = Backbone.View.extend({

	template: Handlebars.compile(
		'<h1>Quiz Results: </h1>' +
		'<h2 class="name">You have a {{name}} cat </h2>' +
		'<img src="photos/kittys/' + '{{photo}}' + '" class="img-polaroid" />' +
		'<h4 class="profile">{{profile}}</h4>' +
		'<input class="kittenType" name="kittenType" value="{{kittenType}}">' +
		'<button type="button" class="btn btn-primary">Save Quiz Results to Profile</button><br/>' +

		'<h5><a href="#">Please proceed to scheduling --></a></h5>'
	),

	initialize: function() {
		//this.model.on('reset',this.save,this)
		this.listenTo(this.model, "change", this.render);
		
	},

	render: function() {
		$(this.el).empty();
		this.$el.html(this.template(this.model.attributes));
		var kittenType = this.model.get('kittenType');
		console.log(kittenType);
		

    	/*jQuery.post("/api/kittens", {
			"kittenType": kittenType 

			}, function (data, textStatus, jqXHR) { 
    			console.log("Post response:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
			});*/


		this.delegateEvents({
			'click .btn-primary' : 'save'
		})

		return this;
	},

	save: function() {
		console.log('button working');
		this.setModelData();
		
		jQuery.post("/api/kittens", {
			"kittenType": kittenType 

			}, function (data, textStatus, jqXHR) { 
    			console.log("Post response:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
			});

		this.model.save(this.model.attributes, {
			success: function (model) {
				console.log('is it saving?');
			}
		});

		var kittenType = this.model.get('kittenType');
		console.log(kittenType);
		
	},

	setModelData: function() {
		this.model.set({
			
			kittenType: this.$el.find('input[name="kittenType"]').val(),


		})

	}
	
});