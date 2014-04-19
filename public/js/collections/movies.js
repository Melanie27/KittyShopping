var Movies = Backbone.Collection.extend({

   model: Movie,

   sortAttribute: "name",
   sortAttribute2: "recommeded",
   //sortDirection: 1,

   sortMovies: function (attr) {
      this.sortAttribute = attr;
      this.sort();
   },

   comparator: function(a, b) {
      var a = a.get(this.sortAttribute),
          b = b.get(this.sortAttribute);
      

      
      //if (a == b) return 0;

      if (a < b ) {
         return -1;
      } else

      if (b < a) {
         return 1;
      } 

      /*if (this.sortDirection == 1) {
         return a > b ? 1 : -1;
      } else {
         return a < b ? 1 : -1;
      }*/
   }

});
