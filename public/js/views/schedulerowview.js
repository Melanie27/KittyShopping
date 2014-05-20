var ScheduleRowView = Backbone.View.extend({

   tagName: 'tr',


   template: Handlebars.compile(

    '<td><div>{{name}}</div></td>' +
    '<td><div>{{description}}</div></td>' +
    '<td style="padding:8px;">{{recommeded}}</td>' +
    '<td style="padding:8px;">{{time}}</td>' +
    '<td style="padding:8px;">{{studio}}</td>' +
    '<td style="padding:8px;">{{courseDay}}</td>'+
    '<td style="padding:8px;"><a href="#" class="link">{{signup}}</a></td>'

    ),

   render: function() {

     
      this.$el.html(this.template(this.model.attributes));

      // a checkbox to mark / unmark the done status of this task 
    	/*this.$el.append(new Backbone.UI.Link({
      		model: this.model,
      		content: 'signup',
      		onClick:  function() { 
      			alert('You have signed up for ' + this.model.get('name'));
      			console.log('A modal box should open now');
            //this.model.save();
      			//this.model.clone();
      		}
    	}).render().el);*/

      this.delegateEvents({
        'click .link' : 'save'
      });

      return this;
   },

   save: function(event) {
      event.preventDefault();
      this.setModelData();

      this.model.save(this.model.attributes, 
      {
        success: function (model) {
            app.coursesReservedCollection.add(model);

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