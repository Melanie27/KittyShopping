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
      alert('cancel class ' + this.model.get('name'));
      var modelID = this.model.get('_id');
      console.log(modelID);
      
      this.model.destroy(
        {
          success: function(model, response) {
            
            jQuery.ajax({
              url: "/api/unsign", 
              type: "DELETE",
              data: {"name" : name},
              
              success: function (data, textStatus, jqXHR) { 
                console.log("Post resposne:"); 
                console.dir(data); 
                console.log(textStatus); 
                console.dir(jqXHR); 
            }
          });

            alert('destroyed');
            console.log(data);
          } 
        })

      var data = {  "name" : name,
              "courseDay" : courseDay,
              "time" : time,
              "location" : location,
              "rsvp" : rsvp }
      var name = this.model.get('name');
      var courseDay = this.model.get('courseDay');
      var time = this.model.get('time');
      var location = this.model.get('location');
       var rsvp = this.model.get('rsvp');
       console.log(name)
   },


   save: function(event) {
      event.preventDefault();
      this.setModelData();
      //Change the appearance of the link after it has been clicked
      //if link has been clicked then change colorclicked change color
      var blackOut = this.model.get('signup');
      //console.log(blackOut);
      /*$(this.link).hide();
      /*$(blackOut).({color: 'black'});*/

      

      alert( 'You signed up for ' + this.model.get('name'));
      this.model.save(this.model.attributes, 
      {
        success: function (model) {
            //app.coursesReservedCollection.add(model);
            

            jQuery.post("/api/signup", {
              "name" : name,
              "courseDay" : courseDay,
              "time" : time,
              "location" : location,
              "rsvp" : rsvp
            });
            
        }  
      })
      
      var name = this.model.get('name');
      var courseDay = this.model.get('courseDay');
      var time = this.model.get('time');
      var location = this.model.get('location');
       var rsvp = this.model.get('rsvp');
      
   },

   setModelData: function() {
      this.model.set({
        rsvp: true
      })
   }

});