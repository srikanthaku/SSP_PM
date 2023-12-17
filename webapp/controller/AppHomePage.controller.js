sap.ui.define([
		"./BaseController",
		"sap/ui/model/json/JSONModel"
	],

	function (BaseController, JSONModel) {
		"use strict";
		return BaseController.extend("com.swcc.pm.SSP_PM.controller.AppHomePage", {

			onInit: function () {

				this.oRouter = this.getRouter();

			},

			onPressTile: function (oEvent) {
				var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
				var sVal = oEvent.getSource().getAdditionalTooltip();
				oStorage.put("sServiceType", sVal);
				this.oRouter.navTo("ModuleSelect");
			}
		})
	})