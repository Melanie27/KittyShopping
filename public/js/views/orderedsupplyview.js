	// Representation of a single
	// selected product in the basket
	var OrderedSupplyView = Backbone.View.extend({
	// use HTML element **li**
	tagName: 'li',

	bindings: {
		'#quantity' : {observe: 'quantity'},
		'#price' : {observe: 'price'},
	},

	// HTML template for single ordered product item
	//template: $('#order-item-tmpl').template(),

	// bind click event to customized method
	events: {
	"click .removeItem" : "removeItem"
	},

	// parent view
	parent: null,

	// initialization
	initialize: function (options) {
	
		//this.listenTo(this.model, "change", this.render);
		// attach parent for this view
		this.parent = options.parent;
	},

	// remove a selected product item
	removeItem: function () {
	// will destroy associated model from ordered product item collection
	
	
	//server setup issues with destroy so just using remove for now;
	this.model.destroy();
	this.totalPriceView.render();
	
	},

	// render this view
	render: function() {

		var _this = this;
	
	$(this.el).html(_.map([
			
			
			'<div style="padding-left:40px; float:left;">' + this.model.get('title') + ' <div>' +
			'<div>' + ' Quantity: ' + 
			'<span>' + this.model.get('quantity') + '</span></div>' +
			'<button class="removeItem">' + 'Remove' + '</button>' +
			'<span>'+'</span>', this.model.calculateAmount(),
		], function(val, key) {
			return '<li style="padding:1px; clear:both; font-size:12px;">' + 'Total ' + val + '</li>';

		}));	


	

	/*var html = '<div style="clear:both;">' +
	'<p class="orderedProdTxt"><span class="albumTxt">'+ this.model.attributes.title + '</span>' + '-' +
	'<span class="artistTxt">' + this.model.attributes.description + '</span></p>' +
	'<p class="orderedProdPrice"><label id="price">' + '$' + '</label>' +
	'<span class="orderedProdPrice"><label id="quantity"></label>' + '</span>' +
	'<span class="orderedProdPrice"><label id="total"></label>' + '</span>' +
	'<button class="removeItem">' + 'Remove' + '</button></p>' 
	'</div>';

	$(this.el).html(html);*/

	// generate element id
	// based on **category**, **product_id**, and model's **cid**
	var _id = 'order_item_' + _this.model.get('category') + '_' + _this.model.get('product_id') + '_' + _this.model.cid;

	// render associated model using template and then append it to the
	// parent's element
	//$(this.el).append($.tmpl(this.template, _this.model)).appendTo(_this.parent.el);

	// set element's id with the generated id
	$(this.el).attr('id', _id);

	// render **.removeItem** as jQuery-UI button
	// which has circle close icon without text
	$(".removeItem").button({
		icons: {
			primary: "ui-icon ui-icon-circle-close"
		},
		
		text: false
	});

	this.stickit();

	return this;
	}
});


