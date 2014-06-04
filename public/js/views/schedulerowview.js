var ScheduleRowView = Backbone.View.extend({

   tagName: 'tr',
   template: Handlebars.compile(

    '<td><div>{{name}}</div></td>' +
    '<td><div>{{description}}</div></td>' +
    '<td style="padding:8px;">{{recommeded}}</td>' +
    '<td style="padding:8px;">{{time}}</td>' +
    '<td style="padding:8px;">{{location}}</td>' +
    '<td style="padding:8px;">{{courseDay}}</td>'+
    '<td style="padding:8px;"><a href="#" class="link">{{signup}}</a></td>'

    ),


   render: function() {  
      this.$el.html(this.template(this.model.attributes));
      this.delegateEvents({
        'click .link' : 'save',
        
      });

      return this;
   },

   mongoosechanged: function() {
    console.log('mongoose changed');
   },


   save: function(event) {
      event.preventDefault();
       
        var name = this.model.get('name');
        var courseDay = this.model.get('courseDay');
        var time = this.model.get('time');
        var location = this.model.get('location');
            jQuery.post("/test/signups", {
              "name" : name,
              "courseDay" : courseDay,
              "time" : time,
              "location" : location,

            }, function (data, textStatus, jqXHR) { 
      console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR);
            var notLogged = data;
            
            if (notLogged == 'You must be logged in for this') {
              alert(notLogged);
              //redirect the user here??
             app.navigate("#/login", {trigger: true});
            } else {

            }
            });     
              
   },

   saveClasses: function(model) {
        app.signupsMongooseCollection.add(model);
    }

  
});