var ScheduleRowView = Backbone.View.extend({

   tagName: 'tr',


   template: Handlebars.compile(

    '<td><div>{{name}}</div></td>' +
    '<td><div>{{description}}</div></td>' +
    '<td style="padding:8px;">{{recommeded}}</td>' +
    '<td style="padding:8px;">{{time}}</td>' +
    '<td style="padding:8px;">{{studio}}</td>' +
    '<td style="padding:8px;">{{courseDay}}</td>'

    ),

   initialize: function() {
      //this.template = _.template( $('#schedule-row').html() );
   },

   render: function() {

      //this.$el.html( this.template( this.model.toJSON()) );
      this.$el.html(this.template(this.model.attributes));

      // a checkbox to mark / unmark the done status of this task 
    	this.$el.append(new Backbone.UI.Link({
      		model: this.model,
      		content: 'signup',
      		onClick:  function() { 
      			console.log('You have signed up for ' + this.model.get('name'));
      			console.log('A modal box should open now');
      			this.model.clone();
      		}
    	}).render().el);

      return this;
   }

});