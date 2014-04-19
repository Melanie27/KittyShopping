var TopicView = Backbone.View.extend({

	template : _.template( "<div id='<%= ident %>' class='topic'><%= title %></div>" ),

    render : function() {

        this.$el.html(this.template(this.model.toJSON()));

        // Make topics draggable
        $(".topic").draggable({
            start: function(e, ui) {
                $(ui.helper).addClass("ui-draggable-topic");
            },
            cursorAt: {
                top: 5,
                left: 5
            },
            helper: 'clone',
            scroll: false,
            tolerance: 'pointer',
            revert: true,


        });

    }


	
});