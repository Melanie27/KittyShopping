var AppRouter = Backbone.Router.extend({
	_currentsub:null,

	routes: {
		"": "questionCollection",
		"kitty-survey/:question": "questionDetails",
		"survey": "questionCollection",
		"kitty-supplies": "supplyList",
		"results/:kitty" : "surveyResults",
		"shopping-cart/:supply" : "shoppingCart",
		"updated-cart" : "updatedCart",
		"cart-list"		: "cartList",
		"ordered-item/:supply" : "orderedItem",
		"ordered-list" : "orderedList",
		"locations" : "locateCenter",
		"store-locator" : "storeLocator"

	},

	initialize: function() {

	//Shopping Cart declarations
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


	storeLocator: function() {
		
	},


	init : function() {
  
  			this.createMap();
  			this.places = new LocationCollection(studios);

 			 // Render Markers
  			var markerCollectionView = new MarkerCollectionView({
    			collection: this.places,
    			map: this.map
  			});
  			markerCollectionView.render();

  			// Render ListView
 			var listView = new ListView({ collection: this.places });
  				//listView.render();
	},


	locateCenter: function() {
		
		var mapOptions = {
    			center: new google.maps.LatLng(34.01945, -118.49119),
    			zoom: 10,
    			mapTypeId: google.maps.MapTypeId.TERRAIN
 			 }
		
			this.map = new google.maps.Map($('#map_canvas')[0], mapOptions);

		this.places = new LocationCollection(studios);

 			 // Render Markers
  			var markerCollectionView = new MarkerCollectionView({
    			collection: this.places,
    			map: this.map
  			});
  			markerCollectionView.render();

  			// Render ListView
 			var listView = new ListView({ collection: this.places });
  				listView.render();



		//init();
		//$('#app2').html('locations');
		//$('#app2').html(this.listView.render().el);
	},


	suppliesList: function() {
		
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
		this.supplyCategoryModel.fetch();
		$('#app2').html(this.shoppingCartView.render().el);
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
		$('#app2').html(this.surveyQuestionDetails.render().el);

	},

	supplyList: function (category) {
		$('#app2').html(this.suppliesView.render().el);
	},

	updatedCart: function(supply) {
		this.supplyCategoryModel.set('id', supply);
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