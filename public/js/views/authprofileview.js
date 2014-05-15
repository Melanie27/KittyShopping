var AuthProfileView = Backbone.View.extend({
	
	template: Handlebars.compile(
		'<div class="container">' +
			'<h1><span class="fa fa-anchor"></span> Kitten Profile Page</h1>' +
			'<a href="/logout" class="btn btn-default btn-sm">Logout</a>' +
		'</div>' +	
		'<div class="row">'+
			'<div class="col-sm-6">' +
				'<div class="well">' +
					'<h3><span class="fa fa-user"></span> Local</h3>' +
					'<p>'+
						//'<strong>id</strong>:{{#each models}}<li>{{attributes._id}}</li>{{/each}}<br>' +
						'<strong>id</strong>: {{_id}}<br>' +
						'<strong>email</strong>: {{local.email}}<br>' +
						'<strong>password</strong>: {{local.password}}<br>' +
						'<strong>petname</strong>: {{local.petname}}<br>' +
						'<strong>winner</strong>: {{local.winner}}<br>' +
						
					'</p>' +
				'</div>' +
			'</div>'+	
		'</div>'
	),

	initialize: function() {
		this.model = new UserMongooseModel();
		this.model.fetch({reset: true});
		
		//these console.logs are fetching the defualt model??? WTF??
		console.log(this.model);
		console.log(this.model.get('_id'));
		//this.listenTo(this.collection, "reset", this.render );
		this.listenTo(this.model, "change", this.render );
	},

	render: function() {
		//console.log(user);
		
		//var email = this.model.attributes.local;
		//console.log(email);
		//this.$el.html(this.template(this.collection));
		this.$el.html(this.template(this.model.attributes));
		//$(this.el).html(html);
		//console.log(req.user);
		return this;
	}

})