/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	"sap/ui/core/sample/common/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("sap.ui.core.sample.odata.v4.GridTable.GridTable", {
		onNameChanged : function (oEvent) {
			oEvent.getSource().getBindingContext().requestSideEffects(["AGE", "Name"]);
		},

		onSynchronize : function () {
			this.byId("table").getBinding("rows").getHeaderContext().requestSideEffects(["*"]);
		}
	});
});
