	var AppRouter = Backbone.Router.extend({
	_currentsub:null,

	routes: {
		//"": "questionCollection",
		"survey": "questionCollection",
		"take-quiz" : "takeQuiz",
		"results/:kitty" : "surveyResults",
		"cart-list"		: "cartList",
		"updated-cart" : "updatedCart",
		
		"ordered-item/:supply" : "orderedItem",
		
		"store-locator" : "storeLocator",
		"class-schedule" : "classSchedule",
		
	
		"shop-form" : "shopForm",

		"auth-index" : "authIndex",
		"welcome-view" : "welcomeView",
		":whatever": "notFound",
		
		


	},

	initialize: function() {

		
		//shopping cart form:
		this.userModel = new UserModel();
		this.userFormView = new UserFormView ({model: this.userModel});


		//Class Schedule benknowscode - need to get this view working with handlebars
		this.scheduleCollection = new SchedulesCollection(kittySchedules);
   		this.scheduleTableView = new ScheduleTableView({ 
   			collection: this.scheduleCollection 
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
		this.resultsView = new ResultsView({model: this.resultsModel});

		//init store location view
		this.storeLocateView = new StoreLocateView();

		//user model 
		this.userMongooseModel = new UserMongooseModel();
		//console.log(this.userMongooseModel.fetch());
		this.userMongooseModel.fetch();
		
		this.usersMongooseCollection = new UsersMongooseCollection();
		//console.log(this.usersMongooseCollection.fetch());

		this.authProfileView = new AuthProfileView({

			//model: this.userMongooseModel
			//collection: this.usersMongooseCollection
		});


		//Append the Welcome User View to the page
		this.welcomeUserView = new WelcomeUserView({

		});
		$('body').html(this.welcomeUserView.render().el);

		this.authIndexView = new AuthIndexView();

		this.takeQuizView = new TakeQuizView();

	},

	welcomeView: function() {
		$('#app2').html(this.welcomeUserView.render().el);
	},

	takeQuiz: function() {
		$('#app2').html(this.takeQuizView.render().el);
	},

	notFound: function() {
		$('#app2').html('404, bitch');
	},

	authIndex: function() {
		
		//this.userMongooseModel.set('_id', user)
		//this.userMongooseModel.set('_id', user);
		//this.userMongooseModel.fetch();
		console.log(this.userMongooseModel);
		$('#app2').html(this.authProfileView.render().el);
	},


	shopForm: function() {
		$('#app2').html(this.userFormView.render().el);
		//$('#app2').html('the form shall be here');

	},

	classSchedule: function() {
		$('#app2').html( this.scheduleTableView.render().$el.attr('id', 'schedules') );
	},

	schedRow: function() {
		$('#app2').html( this.scheduleRowView.render().el);
	},


	storeLocator: function() {
		$('#app2').html(this.storeLocateView.render().el);
		$('#map-container').storeLocator({'slideMap' : false, 'defaultLoc': true, 'defaultLat': '34.01945', 'defaultLng' : '-118.49119', 'dataType': 'json', 'dataLocation': 'locations.json' });
       
	},

	suppliesList: function() {
		this.supplyCategoryModel.fetch();
		$('#app2').html(this.shoppingCartListView.render().el);
	},

	orderedItem: function() {
		$('#app2').html(this.orderedSupplyView.render().el);
	},

	cartList: function() {
		this.supplyCategoriesCollection.fetch();
		$('#app2').html(this.shoppingCartFullPageView.render().el);
	},

	surveyResults: function(kitty) {
		this.resultsModel.set('id', kitty);
		this.resultsModel.fetch();
		console.log(this.resultsModel.fetch());
		$('#app2').html(this.resultsView.render().el);
	},

	questionCollection: function () {
		$('#app2').html(this.surveyQuestionListView.render().el);
	},

	//update quantity on indiv items
	updatedCart: function(supply) {
		this.supplyCategoryModel.set('id', supply);
		this.supplyCategoryModel.fetch();
		$('#app2').html(this.shoppingCartRenderView.render().el);
	},
	
});



var app = new AppRouter();

$(function() {
	Backbone.history.start();


});