sap.ui.define([
		"./BaseController",
		"sap/ui/model/json/JSONModel"
	],

	function (BaseController, JSONModel) {
		"use strict";
		return BaseController.extend("com.swcc.pm.SSP_PM.controller.HomePage", {
			onInit: function () {
				debugger;
				this.oRouter = this.getRouter();

			},

			onPressCreateRequest: function () {
				debugger;

				this.oRouter.navTo("ModuleSelect");
			},

			onPressViewAllRequest: function () {
				this.oRouter.navTo("ViewRequest");
			},
			onback: function () {
				this.getOwnerComponent().getTargets().display("LandingView");

			},

			onSearch: function () {

				this.oRouter.navTo("LandingView");

			}
		})
	})