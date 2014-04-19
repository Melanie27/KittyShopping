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
		"store-locator" : "storeLocator",
		"class-schedule" : "classSchedule",
		"yoga-collection": "yogaCollection",
		"yoga-model" : "yogaModel"
		
		

	},

	initialize: function() {

		
		//instantiate course model 

		this.yogaCourseModel = new YogaCourseModel();

		//instant collection

		this.yogaCoursesCollection = new YogaCoursesCollection();
		this.yogaCoursesCollection.fetch();
		//console.log(this.yogaCoursesCollection);
		//console.log(this.yogaCoursesCollection.pluck(this.model));
		//view
		

		this.yogaCourseView = new YogaCourseView ({
			model: this.yogaCourseModel
		});

		this.yogaCoursesListView = new YogaCoursesListView ({
			
			collection: this.yogaCoursesCollection

		
		});


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
		 		title: [ "Hydration", "Toillette", "Perches", "Toys" ]
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


		//init store location view
		this.storeLocateView = new StoreLocateView();

		

		//instant Topic Model
		this.topicModel = new TopicModel();
		this.topicView = new TopicView ({ model: this.topicModel });

		//instant Topics Collection
		this.topicsCollection = new TopicsCollection();
		//this.topicsCollection.fetch();

		//instant lesson plans collection
		this.lessonPlansCollection = new LessonPlansCollection();
		//LessonPlansCollection.fetch();

	},

	yogaCollection: function() {
		$('#app3').html(this.yogaCoursesListView.render().el);

	},

	yogaModel: function() {

		$('#app3').html(this.yogaCourseView.render().el);
	},

	classSchedule: function() {
		//$('#app3').html(this.appView.render().el);
		console.log('schedule');

	},


	storeLocator: function() {
		$('#app2').html(this.storeLocateView.render().el);
		$('#map-container').storeLocator({'slideMap' : false, 'defaultLoc': true, 'defaultLat': '34.01945', 'defaultLng' : '-118.49119', 'dataType': 'json', 'dataLocation': 'locations.json' });
       
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



var app = new AppRouter();

$(function() {
	Backbone.history.start();

var movieList = new Movies(movieData);

   var movieView = new MovieTable({ collection: movieList });

   $('.wrapper').html( movieView.render().$el.attr('id', 'movies') );


});