(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['profileview'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, functionType="function", escapeExpression=this.escapeExpression;
  return "<li>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attributes)),stack1 == null || stack1 === false ? stack1 : stack1._id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, functionType="function", escapeExpression=this.escapeExpression, buffer = "<div class=\"container\">\n	<h1><span class=\"fa fa-anchor\"></span> Kitten Profile Page</h1>\n	<a href=\"/logout\" class=\"btn btn-default btn-sm\">Logout</a>\n</div>\n<div class=\"row\">\n	<div class=\"col-sm-6\">\n		<div class=\"well\">\n			<h3><span class=\"fa fa-user\"></span> Local</h3>\n				<p>\n				//'<strong>id</strong>:";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.models), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "<br>' +\n				<strong>id</strong>: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1._id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>\n				<strong>email</strong>: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.local)),stack1 == null || stack1 === false ? stack1 : stack1.email)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>\n				<strong>password</strong>: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.local)),stack1 == null || stack1 === false ? stack1 : stack1.password)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>\n				<strong>password</strong>: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.local)),stack1 == null || stack1 === false ? stack1 : stack1.petName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>		\n			</p>\n		</div>\n	</div>	\n</div>";
},"useData":true});
})();