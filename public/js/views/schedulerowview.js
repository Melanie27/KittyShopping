var ScheduleRowView = Backbone.View.extend({

   tagName: 'tr',

   template: null,

   initialize: function() {
      this.template = _.template( $('#schedule-row').html() );
   },

   render: function() {

      this.$el.html( this.template( this.model.toJSON()) );

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