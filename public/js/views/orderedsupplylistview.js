	// Container view for list of order item view
// or we can call this simply shopping basket view
var OrderedSupplyListView = Backbone.View.extend({

	//define HTML element destination
	//what's up with el - what's the syntax to render this???
	//el: $("#orderedProducts"),

		// this view has total price view
		totalView: null,

			// initialization
	initialize: function () {
	this.collection.reset();
	this.listenTo(this.collection, 'add', this.render);
	this.listenTo(this.collection, 'save', this.render);
	//this.listenTo(this.collection, 'reset', this.render);

	// bind all customized functions to this view
	_.bindAll(this, "render","addItem","removeItem","emptyBasket");

	// bind this collection events to customized functions
	this.collection.bind("add", this.addItem);
	this.collection.bind("remove", this.removeItem);
	this.collection.bind("reset", this.emptyBasket);

	// initialize total price view
	this.totalPriceView = new TotalPriceView({collection: this.collection});
	
	},

		// empty basket view
	emptyBasket: function() {
	// show explanation panel
		//$('#explanationTxtFrame').removeClass('hidden').addClass('showed');

	// remove total price from view
	//where is removeTotalPrice function - it is comeing back undefined???
		//this.totalView.removeTotalPrice();

	// empty main element
		$(this.el).empty();
	},

		// when an item is added
	addItem: function(item)
	{
		
		//alert('adding');



		$('#orderedProducts').append(_.map(this.collection.models, function(model, key) {
				return new OrderedSupplyView({
					model: model,
					parent: this
					
				}).render().el;
		}));

		// create and render order item view based on associated model and
		// attach this view as its parent
		//var itemView = new OrderedSupplyView({model: this.model, parent: this});
		//itemView.render();

		// finally render the total price view
		this.totalPriceView.render();
	
	},

		// when an item is removed from the basket
	removeItem: function(item) {

		// let's find out which one is going to be removed by generate element id
		var _id = 'order_item_' + item.get('category') + '_' + item.get('product_id') + '_' + item.cid;

		// remove element from the screen
		$('#'+ _id).remove();

		// re-render total price to get new price
		this.totalView.render();

		// remove total price view and re-display explanation panel if basket empty
		if (this.collection.length < 1) {
			this.totalView.removeTotalPrice();
			$('#explanationTxtFrame').removeClass('hidden').addClass('showed');
		}

		// print the updated collection to the console
		console.log(this.collection.toJSON());
	},

	render:function() {

			// get this view so it's accessible
		var _view = this;
		//this.el = $("#orderedProducts");
			// get parent's element and then
			// render it as droppable element
		$(_view.el).closest('div').addClass("ordered").droppable({
		// set droppable element as pointer tolerance
		// meaning draggable considered as hovering this view
		// when mouse pointer overlaps
		tolerance: 'pointer',

		// highlight basket when it's being hovered
		over: function( event, ui ) {
			$( this ).addClass( "basketHighlight" );
		},

		// and when an item is dropped
		drop: function( event, ui ) {
			// turn off the highlight color
			$( this ).removeClass( "basketHighlight" );

			// hide the explanation txt frame
			$('#explanationTxtFrame').removeClass('showed').addClass('hidden');

			// retrieved model from the dropped item view
			var model = $(ui.draggable).data("item-view").model;
			console.log(model);

			
			
		
						// then insert its clone to the order collection
			_view.collection.add(model.clone());

			// let's have a look how the order collection
			// after another item is dropped
			console.log(_view.collection.toJSON());

			// re-render the total price
			//_view.totalView.render();


		}
	});


		var html = '<div class="panel basketPanel">' +
		'<h1>' + 'List View' + '</h1>' +
		'<div id="explanationTxtFrame" class="showed" >' +
		'<span class="explanationTxt">' + 'Drag and drop your product here.' + '</span>' +
		'</div>' +
		'<ul id="orderedProducts">' + '</ul>' +
		'<ul id="totalPrice">' + '</ul>' +
		'</div>'+
		'<div id="buttonList" class="panel actionPanel">' + '</div>';

		console.log(_view.collection.toJSON());

		$(this.el).html(html);

		return this;

	}
	
});