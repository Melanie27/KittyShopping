var SupplyIndivDetails = Backbone.View.extend ({

render: function() {
	
	var indivSupply = this.model.attributes.subsupply;
	//console.log(indivSupply);
	var outputTitle
	for (index in indivSupply) {

		var supply = indivSupply[index];
		//console.log(supply);
		var supplyName = supply.name;
		var supplyImage = supply.imagepathsm;
		var supplyDesc = supply.description;
		console.log(supplyName);

		//outputTitle +=
	}

	var markup = '<div>' +
	
	/*'<div style="width:200px;">' +
	'<input type="button" value="back to category"/>' +
	'</div>' +
	'<div style="width:200px;">' +
	'<br/><br/>' +
	'<input type="submit" value="add to cart"/>' +
	'</div>' +
	'<br/><br/>' +
	'<img src="photos/kitty-store/' + supplyImage + '" class="img-polaroid" />' +
	'<h1>' + supplyDesc + '</h1>' +*/
	'</div>';

	this.$el.html(markup);
	return this;

}
	
});