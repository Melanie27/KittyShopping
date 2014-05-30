var ScheduleRowView = Backbone.View.extend({

   tagName: 'tr',


   template: Handlebars.compile(

    '<td><div>{{name}}</div></td>' +
    '<td><div>{{description}}</div></td>' +
    '<td style="padding:8px;">{{recommeded}}</td>' +
    '<td style="padding:8px;">{{time}}</td>' +
    '<td style="padding:8px;">{{studio}}</td>' +
    '<td style="padding:8px;">{{courseDay}}</td>'+
    '<td style="padding:8px;"><a href="#" class="link">{{signup}}</a></td>'+
    '<td style="padding:8px;"><a href="#" class="cancel">Cancel</a></td>'

    ),

   render: function() {  
      this.$el.html(this.template(this.model.attributes));


      this.delegateEvents({
        'click .link' : 'save',
        'click .cancel' : 'cancel'
      });

      return this;
   },

   cancel: function(event) {
      event.preventDefault();
      console.log('cancel class ' + this.model.get('name'));
      var modelID = this.model.get('_id');
    
      
      jQuery.ajax({
        url: "/test/signups/5388a4c88754b8af4da5e430", 
        type: "DELETE",
        
        success: function (data, textStatus, jqXHR) { 
          console.log("Post resposne:"); 
          console.dir(data); 
          console.log(textStatus); 
          console.dir(jqXHR); 
        }
      });
   },


   save: function(event) {
      event.preventDefault();
    
      //Change the appearance of the link after it has been clicked
      //if link has been clicked then change colorclicked change color

      alert( 'You signed up for ' + this.model.get('name'));
      var name = this.model.get('name');
      var courseDay = this.model.get('courseDay');
      var time = this.model.get('time');
      var location = this.model.get('location');
      
      
      //saves the attributes but does not trigger http request
     
            jQuery.post("/api/signup", {
              "name" : name,
              "courseDay" : courseDay,
              "time" : time,
              "location" : location
              
            });
             
   }

  
});