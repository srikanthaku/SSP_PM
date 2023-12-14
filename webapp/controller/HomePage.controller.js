sap.ui.define([
		"./BaseController",
		"sap/ui/model/json/JSONModel"
	],

	function (BaseController, JSONModel) {
		"use strict";
		return BaseController.extend("com.swcc.pm.SSP_PM.controller.HomePage", {
			onInit: function () {
				this.oRouter = this.getRouter();
				//this._createHeaderModel();
			},
			onPressCreateRequest: function () {
				this.oRouter.navTo("AppHomePage");
			},

			onPressViewAllRequest: function () {
				this.oRouter.navTo("ViewRequest");
			},
			onback: function () {
				this.getOwnerComponent().getTargets().display("LandingView");

			},
			onPressBpRequest: function () {
				this.oRouter.navTo("CustomerRegistration");
			},
			onPressSlaRequest: function () {
				this.oRouter.navTo("SlaCreation");
			},

			onSearch: function () {

				this.oRouter.navTo("LandingView");

			}
		})
	})