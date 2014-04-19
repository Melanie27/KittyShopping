var MovieRow = Backbone.View.extend({

   tagName: 'tr',

   template: null,

   initialize: function() {
      this.template = _.template( $('#movie-row').html() );
   },

   render: function() {

      this.$el.html( this.template( this.model.toJSON()) );

      return this;
   }

});