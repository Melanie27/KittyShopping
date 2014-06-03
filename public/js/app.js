	var AppRouter = Backbone.Router.extend({
	_currentsub:null,

	routes: {
		//"": "questionCollection",
		"": "homePage",
		"survey": "questionCollection",
		"take-quiz" : "takeQuiz",
		"login": "loginUser",
		"results/:kitty" : "surveyResults",
		"updated-cart" : "updatedCart",
		"store-locator" : "storeLocator",
		"class-schedule" : "classSchedule",
		"list-course" : "listCourse",
		"full-course" : "fullCourse",
		"auth-index" : "authIndex",
		"welcome-view" : "welcomeView",
		"prod2/:product" : "productDetails2",
		"shopping-cart" : "shoppingCart",
		"view-cart" : "viewCart",
		":whatever": "notFound",	
	},

	initialize: function() {
		
		//QUIZ
		this.surveyQuestionModel = new SurveyQuestion();
		this.surveyQuestions = new SurveyQuestions();
		this.surveyQuestions.fetch();
		this.surveyQuestionDetails = new SurveyQuestionDetails({ 
			model: this.surveyQuestionModel 
		});
		this.surveyQuestionListView = new SurveyQuestionListView({
				collection: this.surveyQuestions
		});
		this.resultsModel = new ResultsModel();
		this.resultsView = new ResultsView({model: this.resultsModel});

		//STORE LOCATOR
		this.storeLocateView = new StoreLocateView();

		//USER
		this.userMongooseModel = new UserMongooseModel();
		this.userMongooseModel.fetch();
		this.usersMongooseCollection = new UsersMongooseCollection();

		//SHOPPING CART
		this.supplyCategoryModel = new SupplyCategory();
		this.orderedSuppliesCollection = new OrderedSuppliesCollection({});
		this.supplyCategoriesCollection = new SupplyCategoriesCollection({});
		this.supplyCategoriesCollection.fetch();
		this.productDetailsView2 = new ProductDetailsView2 ({
			model: this.supplyCategoryModel
		 });
		this.productMenuModel = new ProductMenuModel();
		this.productMenuView = new ProductMenuView({
				collection: this.supplyCategoriesCollection
		});
		this.productsOrderedCollection = new SupplyCategoriesCollection();
		this.productsOrderedView = new ProductsOrderedView();

		this.productsOrderedModel = new ProductsOrderedModel();
		this.productsOrderedModel.fetch();
		this.productsOrderedCollection = new ProductsOrderedCollection();
		this.productsOrderedCollection.fetch();
		this.productsOrderedSingleView = new ProductsOrderedSingleView({
			model: this.productsOrderedModel
		});
		this.productsOrderedListView = new ProductsOrderedListView({
			collection: this.productsOrderedCollection
		});

		//COURSE SIGNUP
		this.scheduleCollection = new SchedulesCollection();
		this.scheduleCollection.fetch();
   		this.scheduleTableView = new ScheduleTableView({ 
   			collection: this.scheduleCollection 
   		});
		this.coursesReservedCollection = new SchedulesCollection();
		this.signupsMongooseModel = new SignupsMongooseModel();
		this.signupsMongooseCollection = new SignupsMongooseCollection();
		this.supplyCategoriesCollection.fetch();
		
		this.yourCourseSingleView = new YourCourseSingleView({
			model: this.signupsMongooseModel
		});
		this.yourCourseListView = new YourCourseListView({
			collection: this.signupsMongooseCollection
		});

		//MISC
		//Definitely using this - will put the photo here
		this.authProfileView = new AuthProfileView();
		//are we using this??
		this.authIndexView = new AuthIndexView();
		this.takeQuizView = new TakeQuizView({
			model: this.userMongooseModel
		});
		this.loginView = new LoginView();
		
		this.homePageView = new HomePageView();

	

	},


	listCourse: function() {
		this.signupsMongooseCollection.fetch();
		$('#app2').html(this.yourCourseListView.render().el);
	},


	productDetails2: function(product) {
		this.supplyCategoryModel.set('_id', product);
		this.supplyCategoryModel.fetch();
		$('#app2').html(this.productDetailsView2.render().el);
	},
	
	homePage: function() {
		$('#app2').html(this.homePageView.render().el);
	},

	welcomeView: function() {
		$('#app2').html(this.welcomeUserView.render().el);
	},

	takeQuiz: function() {
		$('#app2').html(this.takeQuizView.render().el);
	},

	loginUser: function() {
		$('#app2').html(this.loginView.render().el);
	},

	authIndex: function() {
		$('#app2').html(this.authProfileView.render().el);
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

	shoppingCart: function() {
		$('#app2').html(this.productMenuView.render().el);	
	},

	viewCart: function() {
		//$('#app2').html(this.productsOrderedView.render().el);
		$('#app2').html(this.productsOrderedListView.render().el);
	},

	surveyResults: function(kitty) {
		this.resultsModel.set('id', kitty);
		this.resultsModel.fetch();
		$('#app2').html(this.resultsView.render().el);
	},

	questionCollection: function () {
		$('#app2').html(this.surveyQuestionListView.render().el);
	},

	notFound: function() {
		$('#app2').html('404, bitch');
	},

});


var app = new AppRouter();

$(function() {
	Backbone.history.start();


});