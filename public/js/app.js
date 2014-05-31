	var AppRouter = Backbone.Router.extend({
	_currentsub:null,

	routes: {
		//"": "questionCollection",
		"": "homePage",
		"survey": "questionCollection",
		"take-quiz" : "takeQuiz",
		"login": "loginUser",
		"results/:kitty" : "surveyResults",
		"cart-list"		: "cartList",
		"list" : "List",
		"updated-cart" : "updatedCart",
		
		"ordered-item/:supply" : "orderedItem",
		
		"store-locator" : "storeLocator",
		"class-schedule" : "classSchedule",
		"view-courses" : "viewCourses",
			

		"auth-index" : "authIndex",
		"welcome-view" : "welcomeView",
		
		"prod2/:product" : "productDetails2",
		"shopping-cart" : "shoppingCart",
		"view-cart" : "viewCart",
		"orders/:products": "orderItem",
		":whatever": "notFound",
		
	},

	initialize: function() {

		//Class Schedule benknowscode - need to get this view working with handlebars

		

		this.scheduleCollection = new SchedulesCollection();
		this.scheduleCollection.fetch();
   		this.scheduleTableView = new ScheduleTableView({ 
   			collection: this.scheduleCollection 
   		});
   	

	//Shopping Cart declarations
		 //collection of ordered items 
		this.orderedSuppliesCollection = new OrderedSuppliesCollection({});
		
		//collection data for shopping cart

		this.supplyCategoriesCollection = new SupplyCategoriesCollection({});
		this.supplyCategoriesCollection.fetch();

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

		//this.saveQuizResultsView = new SaveQuizResultsView({model: this.resultsModel});

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
		/*this.welcomeUserView = new WelcomeUserView({

		});
		$('body').html(this.welcomeUserView.render().el);*/

		this.authIndexView = new AuthIndexView();

		this.takeQuizView = new TakeQuizView();
		this.loginView = new LoginView();

		this.homePageModel = new HomePageModel()
		this.homePageView = new HomePageView({
			model: this.homePageModel
		});

		

		this.productDetailsView2 = new ProductDetailsView2 ({
			
			model: this.supplyCategoryModel
			
		 });

		this.productMenuModel = new ProductMenuModel();
		this.productMenuView = new ProductMenuView({
				//model: this.productMenuModel
				collection: this.supplyCategoriesCollection
			}

		);

		//new instance of supplies collection to house the orders
		this.productsOrderedCollection = new SupplyCategoriesCollection();

		//orders view
		this.productsOrderedView = new ProductsOrderedView({
			//collection: this.productsOrderedCollection
		});

		//new instance of schedules collection for the classes rsvp'd for
		this.coursesReservedCollection = new SchedulesCollection();

		this.yourCoursesView = new YourCoursesView();

	},


	viewCourses: function() {
		$('#app2').html(this.yourCoursesView.render().el);
	},

	orderItem: function(product) {
			this.supplyCategoriesCollection.fetch();
			var orderedItem = this.supplyCategoriesCollection.get(product);
			this.productsOrderedCollection.add(orderedItem);
			$('#app2').html(this.productsOrderedView.render().el);

	},

	shoppingCart: function() {
		$('#app2').html(this.productMenuView.render().el);	
	},

	productDetails2: function(product) {
				this.supplyCategoryModel.set('_id', product);
				this.supplyCategoryModel.fetch();
				
				//this.productDetailsView.model = this.supplyCategoriesCollection.get(product);
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

	suppliesList: function() {
		this.supplyCategoryModel.fetch();
		$('#app2').html(this.shoppingCartListView.render().el);
	},

	orderedItem: function() {
		$('#app2').html(this.orderedSupplyView.render().el);
	},

	List: function() {
		$('#app2').html(this.shoppingCartRenderView.render().el);
	},

	cartList: function() {
		
		$('#app2').html(this.shoppingCartFullPageView.render().el);
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