var ScheduleTableView = Backbone.View.extend({

   scheduleRowViews: [],

   tagName: 'table',
   template: '#schedule-table',

   

   events: {
      "click th": "headerClick"
   },

   initialize: function() {
      this.listenTo(this.collection, "reset", this.render);
      this.listenTo(this.collection, "sort", this.updateTable);
   },

   render: function() {
     
    var html = 
    '<br>'+
    '<thead><tr>' +
    '<th column="name"><div>Course</div></th>'+
    '<th column="description"><div>Description</div></th>' +
    '<th column="recommeded"><div>Kitten Type</div></th>' +
    '<th column="time"><div>Time</div></th>' +
    '<th column="studio"><div>Studio</div></th>' +
    '<th column="courseDay"><div>Day</div></th>' +
    '<th column="signup"><div>Sign Up</div></th>' +
    '</tr></thead>'+
    '<tbody></tbody>'


    $(this.el).html(html);
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