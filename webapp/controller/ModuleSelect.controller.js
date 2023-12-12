sap.ui.define([
		"./BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/routing/History"
	],

	function (BaseController, JSONModel, History) {
		"use strict";
		return BaseController.extend("com.swcc.pm.SSP_PM.controller.ModuleSelect", {
			onInit: function () {
				this.oRouter = this.getRouter();
				// this.testCPI_API();

			},
			handleBackPress: function () {
				var oHistory, sPreviousHash;
				oHistory = History.getInstance();
				sPreviousHash = oHistory.getPreviousHash();
				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					this.getRouter().navTo("AppHomePage", {}, true);
				}

			},
			onback: function () {
				this.getOwnerComponent().getTargets().display("LandingView");

			},

			onSelect: function (oEve) {

				var sKey = oEve.getSource().getSelectedKey();
				if (sKey === "1") {
					this.oRouter.navTo("PMRequest");
				}

			},

			onSearch: function () {
				// this.getModel().setProperty("/VisibleManagePttyCash", true);
				// this.getModel().setProperty("/VisibleRecordProcessInvoice", true);
				this.oRouter.navTo("PMRequest");
				//	this.oRouter.navTo("LandingView");

			},

			testCPI_API: function () {

				var oOptions = {
					url: "http/sf",
					type: "GET"
				};
				this.getAPI.crudOperations_REST(oOptions)
					.then(function (oResponse) {
						var aData = oResponse.data;

					}.bind(this));
			}

		})
	})