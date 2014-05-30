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
      var modelID = this.model.get('_id');
      console.log( modelID);
      //it's not the correct ID - I need to target the ide from the server
      
      jQuery.ajax({
        url: "/test/signups/" + modelID, 
        type: "DELETE",
        
        success: function (data, textStatus, jqXHR) { 
          console.log("Post response:"); 
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

      console.log( 'You signed up for ' + this.model.get('_id'));
      var name = this.model.get('name');
      var courseDay = this.model.get('courseDay');
      var time = this.model.get('time');
      var location = this.model.get('location');
      
      //saves the attributes but does not trigger http request
     
            jQuery.post("/api/signup", {
              "name" : name,
              "courseDay" : courseDay,
              "time" : time,
              "location" : location,
              
               success: function (data, textStatus, jqXHR) { 
                console.log("Post response:"); 
                console.dir(data); 
                console.log(textStatus); 
                console.dir(jqXHR); 
        }

            });

            console.log(this.model.get('_id'));
            console.log(app.userMongooseModel);
             
   }

  
});