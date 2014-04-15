var MarkerCollectionView = Backbone.GoogleMaps.MarkerCollectionView.extend({
		  markerView: MarkerView,

		  addChild: function(model) {
		    this.markerView = model.get('type') === 'studio' ?
		            studioMarker :
		            spaMarker;

		    Backbone.GoogleMaps.MarkerCollectionView.prototype.addChild.apply(this, arguments);
		  }
		});