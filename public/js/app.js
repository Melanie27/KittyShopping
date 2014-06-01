	var AppRouter = Backbone.Router.extend({
	_currentsub:null,

	routes: {
		//"": "questionCollection",
		"": "homePage",
		"survey": "questionCollection",
		"take-quiz" : "takeQuiz",
		"login": "loginUser",
		"results/:kitty" : "surveyResults",
		//"cart-list"		: "cartList",
		"list" : "List",
		"updated-cart" : "updatedCart",
		
		
		"store-locator" : "storeLocator",
		"class-schedule" : "classSchedule",
		"view-courses" : "viewCourses",
			

		"auth-index" : "authIndex",
		"welcome-view" : "welcomeView",
		
		"prod2/:product" : "productDetails2",
		"shopping-cart" : "shoppingCart",
		"view-cart" : "viewCart",
		//"orders/:products": "orderItem" - in productmenuview,
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

		//COURSE SIGNUP
		this.scheduleCollection = new SchedulesCollection();
		this.scheduleCollection.fetch();
   		this.scheduleTableView = new ScheduleTableView({ 
   			collection: this.scheduleCollection 
   		});
		this.coursesReservedCollection = new SchedulesCollection();
		this.yourCoursesView = new YourCoursesView();

		//MISC
		//Definitely using this - will put the photo here
		this.authProfileView = new AuthProfileView();
		//are we using this??
		this.authIndexView = new AuthIndexView();
		this.takeQuizView = new TakeQuizView();
		this.loginView = new LoginView();
		this.homePageModel = new HomePageModel()
		this.homePageView = new HomePageView({
			model: this.homePageModel
		});

	},


	viewCourses: function() {
		$('#app2').html(this.yourCoursesView.render().el);
	},

	/*orderItem: function(product) {
			this.supplyCategoriesCollection.fetch();
			var orderedItem = this.supplyCategoriesCollection.get(product);
			this.productsOrderedCollection.add(orderedItem);
			$('#app2').html(this.productsOrderedView.render().el);

	},*/

	shoppingCart: function() {
		$('#app2').html(this.productMenuView.render().el);	
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
		//$('#app2').html(this.authsignupView.render().el);
	},

	loginUser: function() {
		$('#app2').html(this.loginView.render().el);
	},

	notFound: function() {
		$('#app2').html('404, bitch');
	},

	authIndex: function() {
		
		console.log(this.userMongooseModel);
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

	
	viewCart: function() {
		$('#app2').html(this.productsOrderedView.render().el);
	},

	surveyResults: function(kitty) {
		this.resultsModel.set('id', kitty);
		this.resultsModel.fetch();
		$('#app2').html(this.resultsView.render().el);
	},

	questionCollection: function () {
		$('#app2').html(this.surveyQuestionListView.render().el);
	},

	
	
});



var app = new AppRouter();

$(function() {
	Backbone.history.start();


});