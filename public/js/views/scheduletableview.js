var ScheduleTableView = Backbone.View.extend({

   scheduleRowViews: [],

   tagName: 'table',
   template: null,

   events: {
      "click th": "headerClick"
   },

   initialize: function() {

      this.template = _.template( $('#schedule-table').html() );
      this.listenTo(this.collection, "sort", this.updateTable);
   },

   render: function() {

      this.$el.html(this.template());
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