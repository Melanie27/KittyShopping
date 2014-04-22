var ScheduleTableView = Backbone.View.extend({

   scheduleRowViews: [],

   tagName: 'table',
   template: null,

   /*template: Handlebars.compile(
       '<th><div>Name</div></th>' +
      '<th><div>Description</div></th>' +
      '<th><div>Kitten Type</div></th>' +
      '<th><div>Time</div></th>' +
      '<th><div>Studio</div></th>' +
      '<th><div>Day</div></th>' +
      '<th><div>Sign Up</div></th>'
  ),*/

   events: {
      "click th": "headerClick"
   },

   initialize: function() {

      //this.template = _.template( $('#schedule-table').html() );
      this.listenTo(this.collection, "sort", this.updateTable);
   },

   render: function() {
      
      this.template = _.template( $('#schedule-table').html() );
      this.$el.html(this.template());
      //this.$el.html(this.template(this.options));
      this.updateTable();

      return this;
   },

   headerClick: function( e ) {
      var $el = $(e.currentTarget),
          ns = $el.attr('column'),
          cs = this.collection.sortAttribute;

      this.collection.sortMovies(ns);
   },

   updateTable: function () {

      var that = this.collection,
          $table;

      // remove the old sort from the table so we only see the most recent sort
      _.invoke(this.scheduleRowViews, 'remove');

      $table = this.$('tbody');

      this.scheduleRowViews = that.map(
            function ( obj ) {
                  var v = new ScheduleRowView({  model: that.get(obj) });

                  $table.append(v.render().$el);

                  return v;
              });
   }

});