var ResultsView = Backbone.View.extend({

	template: Handlebars.compile(
		'<h1>Quiz Results: </h1>' +
		'<h2 class="name">You have a {{name}} cat </h2>' +
		'<img src="photos/kittys/' + '{{photo}}' + '" class="img-polaroid" />' +
		'<h4 class="profile">{{profile}}</h4>' +

		'<h5><a href="#">Please proceed to scheduling --></a></h5>'
	),

	initialize: function() {
		//this.model.on('reset',this.render,this)
		this.listenTo(this.model, "change", this.render);

		
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		var kittenType = this.model.get('kittenType');
		console.log(kittenType);
		jQuery.ajax({
    url: "/api/products/53763d2ba512a41affbb8990", 
    type: "PUT",
    data: {
      
                "price" : "600"
               

    }, 
    success: function (data, textStatus, jqXHR) { 
        console.log("Post response:"); 
        console.dir(data); 
        console.log(textStatus); 
        console.dir(jqXHR); 
    }
});

		return this;
	},

	save: function() {
		//this.setModelData();
		
		/*this.model.save(this.model.attributes, {
			success: function (model) {
				console.log('is it saving?');
			}
		});*/
		
		

	}

	
	
});