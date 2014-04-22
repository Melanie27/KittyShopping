var AppRouter = Backbone.Router.extend({
	_currentsub:null,

	routes: {
		"": "questionCollection",
		"survey": "questionCollection",
		"results/:kitty" : "surveyResults",
		"cart-list"		: "cartList",
		"updated-cart" : "updatedCart",
		
		"ordered-item/:supply" : "orderedItem",
		
		"store-locator" : "storeLocator",
		"class-schedule" : "classSchedule",
		
	
		"shop-form" : "shopForm",


	},

	initialize: function() {

		
		//shopping cart form:
		this.userModel = new UserModel();
		//console.log(this.userModel.toJSON());

		var form = new Backbone.Form({
			//model: this.userModel
		});

		$('body').append(form.el);

		/*this.userFormView = new UserFormView ({

			model: this.userModel
		})*/


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
		this.resultsView = new ResultsView({
			model: this.resultsModel
		});


		//init store location view
		this.storeLocateView = new StoreLocateView();


	},

	shopForm: function() {
		//$('#app3').html(this.userFormView.render().el);

	},



	classSchedule: function() {
		$('#app2').html( this.scheduleTableView.render().$el.attr('id', 'schedules') );
		//$('#app3').html('turn on the schedule here');

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

  /*var form = new Backbone.Form({
    //Schema
    schema: {
        title: { type: 'Select', options: ['Mr.', 'Mrs.', 'Ms.']},
        name:        { type: 'Text', validators: ['required']},
        email:   { validators: ['required', 'email'] },
        address1:  { type: 'Text', validators: ['required']},
        address2: 'Text',
        zipcode: { type: 'Number', validators: ['required']},
        name:       'Text',
        password1:   { type: 'Password', validators: ['required']},
        password2:   { type: 'Password', validators: ['required']},
        petname: 'Text'
    },

    //Data to populate the form with
    data: {
      title: '',
      name: 'Melanie McGanney',
      email: 'melaniemcganney@gmail.com',
      address: 'address1',
      address: 'address2',
      zipcode: '12345',
      password1: 'juniper',
      password2: '',
      petname: 'Titty Bar Bob'
    }
}).render();

form.on('name:blur email:blur, address1:blur', function(form, editor) {
    form.fields[editor.key].validate();
});

$('body').append(form.el);*/
  

});