var ScheduleTableView = Backbone.View.extend({

   scheduleRowViews: [],
   events: {
      "click th": "headerClick"
   },

   initialize: function() {
      //SignupsMongooseCollection.fetch();
      
      //this.listenTo(this.signupsMongooseCollection, "change", this.render);
      this.listenTo(this.collection, "reset", this.render);
      this.listenTo(this.collection, "sort", this.updateTable);
   },

   render: function() {
     
    var html = 
    '<br>'+
    //'<h1><a href="#/list-course">View Your Courses</a></h1>'+
      '<table>'+
        '<thead><tr>' +
          '<th column="name"><div>Course &#9660;</div></th>'+
          '<th column="description"><div>Description &#9660;</div></th>' +
          '<th column="recommeded"><div>Recommended for: &#9660;</div></th>' +
          '<th column="time"><div>Time &#9660;</div></th>' +
          '<th column="studio"><div>Studio &#9660;</div></th>' +
          '<th column="courseDay"><div>Day &#9660;</div></th>' +
          '<th column="signup"><div>Sign Up</div></th>' +
        '</tr></thead>'+
    '<tbody></tbody>'+
    '</table>'


    $(this.el).html(html);
     this.updateTable();
     //$(this.el).append(app.yourCourseListView.el);
     //separate pages for now
     /*$('#schedules').after(new YourCourseListView({
        collection: this.signupsMongooseCollection
     }).render().el);*/
    
    
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
                  var v = new ScheduleRowView({  model: that.get(obj)});
                  $table.append(v.render().$el);
                  return v;
              });
   }

});