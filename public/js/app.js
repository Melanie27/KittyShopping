var AppRouter = Backbone.Router.extend({
	_currentsub:null,

	routes: {
		"": "survey",
		"kitty-survey/:question": "questionDetails",
		"survey": "questionCollection",
		"kitty-supplies": "supplyList",
		"survey/:kitty" : "surveyResults",
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
		"render-view" : "renderView"

	},

	initialize: function() {
		
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
			{
				model: this.supplyCategoryModel
			}
		);

		 //individual item ordered view
		 this.orderedSupplyView = new OrderedSupplyView (
		 	 {

		 	 	model: this.orderSupplyModel

		 	 }
		 );

		 //list page for ordered items

		 this.orderedSupplyListView = new OrderedSupplyListView (

		 	{ 
		 		collection: this.orderedSuppliesCollection
				//model: this.supplyCategoryModel
			}

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

		//collection view
		this.surveyView = new SurveyView ( 
			{ collection: this.surveyQuestions }

		);

		//Survey Results
		//results model
		this.resultsModel = new ResultsModel();
		

		//model view
		this.resultsView = new ResultsView({
			model: this.resultsModel
		});

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

	survey: function (question) {
		//this.surveyQuestionModel.set('id', question);
		//this.surveyQuestionModel.fetch();
		//this.surveyView.model = this.surveyQuestions.get(question);
		$('#app2').html(this.surveyView.render().el);
	},

	surveyResults: function(kitty) {
		console.log('triggered');
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

var app = new AppRouter();

$(function() {
	Backbone.history.start();
});