var InfoWindow = Backbone.GoogleMaps.InfoWindow.extend({
  template: '#infoWindow-template',

  events: {
    'mouseenter h2': 'logTest'
  },

  logTest: function() {
    console.log('test in InfoWindow');
  }
});