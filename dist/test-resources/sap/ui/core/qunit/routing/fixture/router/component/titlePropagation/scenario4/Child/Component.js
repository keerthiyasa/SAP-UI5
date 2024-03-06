sap.ui.define([
	'sap/ui/core/UIComponent'
], function(UIComponent) {
	"use strict";

	var Component = UIComponent.extend("qunit.router.component.titlePropagation.scenario4.Child.Component", {
		metadata : {
			manifest: "json"
		},
		init : function() {
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
		}
	});

	return Component;

});
