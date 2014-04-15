//AppRouter.ListView = Backbone.View.extend({
  var ListView = Backbone.View.extend({
  
  tagName: 'ul',
  
  className: 'overlay',
  
  id: 'listing',

  initialize: function() {
    _.bindAll(this, "refresh", "addChild");

    this.collection.on("reset", this.refresh, this);
    this.collection.on("add", this.addChild, this);

    this.$el.appendTo('body');
  },

  render: function() {
    this.collection.each(this.addChild);
  },

  addChild: function(childModel) {
    var childView = new ItemView({ model: childModel });
    childView.render().$el.appendTo(this.$el);
  },

  refresh: function() {
    this.$el.empty();
    this.render();
  }
});
