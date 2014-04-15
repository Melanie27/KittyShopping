var ItemView = Backbone.View.extend({
  template: '<%=title %>',
  tagName: 'li',

  events: {
    'mouseenter': 'selectItem',
    'mouseleave': 'deselectItem'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'selectItem', 'deselectItem')

    this.model.on("remove", this.close, this);
  },

  render: function() {
    var html = _.template(this.template, this.model.toJSON());
    this.$el.html(html);

    return this;
  },

  close: function() {
    this.$el.remove();
  },

  selectItem: function() {
    this.model.select();
  },

  deselectItem: function() {
    this.model.deselect();
  }
});