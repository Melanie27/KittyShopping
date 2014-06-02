var SchedulesCollection = Backbone.Collection.extend({

   model: ScheduleModel,
   url: '/api/courses/',
   sortAttribute: "name",
   
   sortMovies: function (attr) {
      this.sortAttribute = attr;
      this.sort();
   },

   comparator: function(a, b) {
      var a = a.get(this.sortAttribute),
          b = b.get(this.sortAttribute);

      if (a < b ) {
         return -1;
      } else

      if (b < a) {
         return 1;
      } 

   }

});
