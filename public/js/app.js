var AppRouter = Backbone.Router.extend({
	_currentsub:null,

	routes: {
		"": "questionCollection",
		"kitty-survey/:question": "questionDetails",
		"survey": "questionCollection",
		"kitty-supplies": "supplyList",
		"results/:kitty" : "surveyResults",
		//"kitty-supplies/:category/:supply": "supplyDetails",
		"kitty-supplies/:supply": "categoryDetails",
		"kitty-page/p:page" : 'getPages',
		"shopping-cart/:supply" : "shoppingCart",
		"updated-cart" : "updatedCart",
		"cart-list"		: "cartList",
		"ordered-item/:supply" : "orderedItem",
		"ordered-list" : "orderedList",
		"ordered-page" : "orderedPage",
		"supplies-list" : "suppliesList",
		"render-view" : "renderView",
		"locations" : "locateCenter"

	},

	initialize: function() {
		
		
		AppRouter.Location = Backbone.GoogleMaps.Location.extend({
  idAttribute: 'title',
  defaults: {
    lat: 34.01945,
    lng: -118.49119,
    hours: ''
  }
});

AppRouter.LocationCollection = Backbone.GoogleMaps.LocationCollection.extend({
  model: AppRouter.Location
});

AppRouter.InfoWindow = Backbone.GoogleMaps.InfoWindow.extend({
  template: '#infoWindow-template',

  events: {
    'mouseenter h2': 'logTest'
  },

  logTest: function() {
    console.log('test in InfoWindow');
  }
});

AppRouter.MarkerView = Backbone.GoogleMaps.MarkerView.extend({
  infoWindow: AppRouter.InfoWindow,

  initialize: function() {
    _.bindAll(this, 'handleDragEnd');
  },

  mapEvents: {
    'dragend': 'handleDragEnd',
    dblclick: 'tellTheWorldAboutIt'
  },

  handleDragEnd: function(e) {
    alert('Dropped at: \n Lat: ' + e.latLng.lat() + '\n lng: ' + e.latLng.lng());
  },

  tellTheWorldAboutIt: function() {
    console.assert(this instanceof App.MarkerView);
    alert('You done gone and double-clicked me!');
    this.logIt('I hope you know that this will go down on your permanent record.')
  },

  logIt: function(message) {
    console.assert(this instanceof App.MarkerView);
    console.log(message);
  }
});

AppRouter.studioMarker = AppRouter.MarkerView.extend({
  overlayOptions: {
    draggable: false,
    icon: 'assets/kittenYoga.png'
  }
});

AppRouter.spaMarker = AppRouter.MarkerView.extend({
  overlayOptions: {
    draggable: true,
    icon: 'assets/kittenYoga.png'
  }
});

AppRouter.MarkerCollectionView = Backbone.GoogleMaps.MarkerCollectionView.extend({
  markerView: AppRouter.MarkerView,

  addChild: function(model) {
    this.markerView = model.get('type') === 'studio' ?
            AppRouter.studioMarker :
            AppRouter.spaMarker;

    Backbone.GoogleMaps.MarkerCollectionView.prototype.addChild.apply(this, arguments);
  }
});

AppRouter.init = function() {
  this.createMap();

  this.places = new this.LocationCollection(studios);

  // Render Markers
  var markerCollectionView = new this.MarkerCollectionView({
    collection: this.places,
    map: this.map
  });
  markerCollectionView.render();

  // Render ListView
  var listView = new AppRouter.ListView({
    collection: this.places
  });
  listView.render();
}

AppRouter.createMap = function() {
  var mapOptions = {
    center: new google.maps.LatLng(34.01945, -118.49119),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  // Instantiate map
  this.map = new google.maps.Map($('#map_canvas')[0], mapOptions);
}


/**
 * List view
 */
AppRouter.ItemView = Backbone.View.extend({
  template: '<%=title %>',
  tagName: 'li',

  events: {
    'mouseenter': 'selectItem',
    'mouseleave': 'deselectItem'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'selectItem', 'deselectItem')

    this.model.on("remove", this.close, this);
  },

  render: function() {
    var html = _.template(this.template, this.model.toJSON());
    this.$el.html(html);

    return this;
  },

  close: function() {
    this.$el.remove();
  },

  selectItem: function() {
    this.model.select();
  },

  deselectItem: function() {
    this.model.deselect();
  }
});

AppRouter.ListView = Backbone.View.extend({
  tagName: 'ul',
  className: 'overlay',
  id: 'listing',

  initialize: function() {
    _.bindAll(this, "refresh", "addChild");

    this.collection.on("reset", this.refresh, this);
    this.collection.on("add", this.addChild, this);

    this.$el.appendTo('body');
  },

  render: function() {
    this.collection.each(this.addChild);
  },

  addChild: function(childModel) {
    var childView = new AppRouter.ItemView({ model: childModel });
    childView.render().$el.appendTo(this.$el);
  },

  refresh: function() {
    this.$el.empty();
    this.render();
  }
});


		//collection of ordered items 
		this.orderedSuppliesCollection = new OrderedSuppliesCollection({});
		
		//collection data for shopping cart

		this.supplyCategoriesCollection = new SupplyCategoriesCollection({});

		this.shoppingCartFullPageView = new ShoppingCartFullPageView ({ collection: this.supplyCategoriesCollection });

		//differentiate btwn 2 collections on single page

		this.shoppingCartFullPageView.collections = {

			supplyCategoriesCollection: this.supplyCategoriesCollection,
			orderedSuppliesCollection: this.orderedSuppliesCollection
	
		}

		/*this.totalPriceView = new  TotalPriceView ({
			collection : this.orderedSuppliesCollection
		})*/

		 //shopping cart supply list view

		 this.suppliesView = new SuppliesView (
		 	{
		 		title: [
		 			"Hydration",
		 			"Toillette",
		 			"Perches",
		 			"Toys"
		 		]
		 	}
		 );

		 //initialize ordered items model
		this.supplyCategoryModel = new SupplyCategory();

		//shopping cart indiv view
		this.supplyCategoryModel = new SupplyCategory();

		this.supplyIndivDetails = new SupplyIndivDetails (
			{ model: this.supplyCategoryModel }
		);

		 //individual item ordered view
		 this.orderedSupplyView = new OrderedSupplyView (
		 	 { model: this.orderSupplyModel }
		 );

		 //list page for ordered items

		 this.orderedSupplyListView = new OrderedSupplyListView (

		 	{ collection: this.orderedSuppliesCollection }

		 );

		 this.orderedSupplyListView.collections = {

			//supplyCategoriesCollection: this.supplyCategoriesCollection,
			orderedSuppliesCollection: this.orderedSuppliesCollection
	
		}

		this.shoppingCartRenderView = new ShoppingCartRenderView (
			{
				model: this.supplyCategoryModel
			}
		);

		this.shoppingCartListView = new ShoppingCartListView (
			{
				collection: this.supplyCategoriesCollection
			}
		);

		
		//Shopping cart view and model

		this.shoppingCartView = new ShoppingCartView (
			{
				model: this.supplyCategoryModel
			}
		);

		//indiv supply view and model
		this.supplyCategoryModel = new SupplyCategory();
		this.supplyCategoryView = new SupplyCategoryDetails (
			{
				model: this.supplyCategoryModel
			}
		);

		//survey question model
		this.surveyQuestionModel = new SurveyQuestion();

		//survey questions collection:
		//create the collection
		this.surveyQuestions = new SurveyQuestions();
		this.surveyQuestions.fetch();

		//model view
		this.surveyQuestionDetails = new SurveyQuestionDetails(
			{ model: this.surveyQuestionModel }
		);

		this.surveyQuestionListView = new SurveyQuestionListView({
				collection: this.surveyQuestions
		});


		//Survey Results
		//results model
		this.resultsModel = new ResultsModel();


		//model view
		this.resultsView = new ResultsView({
			model: this.resultsModel
		});

	},

	locateCenter: function() {
		//$('#app2').html('locations here');
	},

	renderView: function() {
		$('#app2').html('this is Shopping Cart Render View');
		$('#app2').html(this.shoppingCartRenderView.render().el);
	},

	suppliesList: function() {
		//$('#app2').html('this is the supplies list');
		this.supplyCategoryModel.fetch();
		$('#app2').html(this.shoppingCartListView.render().el);
	},

	orderedList: function() {
		$('#app2').html(this.orderedSupplyListView.render().el);
	},

	orderedItem: function() {
		$('#app2').html(this.orderedSupplyView.render().el);
	},

	cartList: function() {
		this.supplyCategoriesCollection.fetch();
		$('#app2').html(this.shoppingCartFullPageView.render().el);
	},

	shoppingCart: function(supply) {
		this.supplyCategoryModel.set('id', supply);
		//$('#app2').html('Shopping cart View here');
		this.supplyCategoryModel.fetch();
		$('#app2').html(this.shoppingCartView.render().el);
	},


	getPages: function(page) {
		$('#app2').html('hi');
		//var page_number = page || 1;
		//console.log(page_number);
	},


	surveyResults: function(kitty) {
		this.resultsModel.set('id', kitty);
		this.resultsModel.fetch();
		$('#app2').html(this.resultsView.render().el);
	},


	questionCollection: function () {
		$('#app2').html(this.surveyQuestionListView.render().el);
		//$('#app2').html('survey question coll');
	},

	questionDetails: function (question) {
		this.surveyQuestionModel.set('id', question);
		this.surveyQuestionModel.fetch();
		//this.surveyQuestionDetails.model = this.surveyQuestions.get(question);
		//this.surveyQuestionModel.set('name', question) 
		$('#app2').html(this.surveyQuestionDetails.render().el);

	},

	supplyDetails: function (category, supply) {
		
		//var	encodedHtml = encodedHtml.replace(/\//g,"%2F");
		//console.log(encodedHtml);
		var str = "%2F";
		var result = str.replace("%2F", "/");
		console.log(category);
		console.log(supply);
		cat = category + result
		newRoute = cat + supply;
		this.supplyCategoryModel.set({id : newRoute });
		//this.supplyCategoryModel.set('id', category);
		this.supplyCategoryModel.fetch();
		$('#app2').html(this.supplyIndivDetails.render().el);
	},

	categoryDetails: function (supply) {
		//this.supplyCategoryView.model = this.supplyCategoriesCollection.get(supply);

		this.supplyCategoryModel.set('id', supply);
		//id is appended to the url root and then that data is loaded
		this.supplyCategoryModel.fetch();
		//this.supplyCategoryView.options.title = category;
		$('#app2').html(this.supplyCategoryView.render().el);
		
	},

	supplyList: function (category) {
		
		
		$('#app2').html(this.suppliesView.render().el);
	},

	updatedCart: function(supply) {
		
		this.supplyCategoryModel.set('id', supply);
		//$('#app2').html('Shopping cart View here');
		this.supplyCategoryModel.fetch();
		$('#app2').html(this.shoppingCartRenderView.render().el);
	},
	
});

// Sample Data
var studios = [
  {
    title: "Kitten Yoga - Santa Monica",
    lat: 34.01945,
    lng: -118.49119,
    type: 'studio',
    hours: 'Monday - Friday: 8am-7pm, Saturday: noon-6pm'
  },
  {
    title: "Kitten Yoga - Beverly Hills",
    lat: 34.07362,
    lng: -118.40036,
    type: 'studio',
    hours: 'Monday - Friday 8am-7pm'
  },
  {
    title: "Kitten Yoga - Venice",
    lat: 33.99621,
    lng: -118.46888,
    type: 'studio',
    hours: 'Monday - Friday 8am-7pm'
  },
   {
    title: "Kitten Yoga - Silverlake",
    lat: 34.06785,
    lng: -118.27095,
    type: 'studio',
    hours: 'Monday - Friday 10am-9pm'
  }
];
var spas = [
  {
    title: "Kitten Yoga - Santa Monica",
    lat: 34.01945,
    lng: -118.49119,
    type: 'spa',
    hours: 'Monday - Friday 8am-7pm, Saturday: noon-6pm'
  },
   {
    title: "Kitten Yoga - Silverlake",
    lat: 34.06785,
    lng: -118.27095,
    type: 'spa',
    hours: 'Monday - Friday 10am-9pm'
  }
];

var app = new AppRouter();

$(function() {
	Backbone.history.start();


 

});