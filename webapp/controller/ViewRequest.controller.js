sap.ui.define([
		"./BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator"
	],

	function (BaseController, JSONModel, Filter, FilterOperator) {
		"use strict";
		return BaseController.extend("com.swcc.pm.SSP_PM.controller.ViewRequest", {

			onInit: function () {

				this.oRouter = this.getRouter();

				this._createItemDataModel();
				this.BPFlagCheckAPI();

			},
			_createItemDataModel: function () {
				this.getModel().setData({
					busy: false,
					OpenItemRequestData: {
						itemData: []
					}
				});
			},

			BPFlagCheckAPI: function () {

				var Filter = this.getFilters("WT_POWER", true);

				this.getAPI.oDataAPICall(this.getOwnerComponent().getModel("ZSSP_USER_SRV"), 'read', '/UserSet',
						Filter, null)
					.then(function (oResponse) {
						this.getModel().setProperty("/OpenItemRequestData/itemData", oResponse.results);

					}.bind(this));

			},

			getFilters: function (sUserName, sIsRequest) {

				var sUserNameFilter = new sap.ui.model.Filter({
					path: "SapID",
					operator: sap.ui.model.FilterOperator.EQ,
					value1: sUserName
				});

				var sIsRequestFilter = new sap.ui.model.Filter({
					path: "IsRequest",
					operator: sap.ui.model.FilterOperator.EQ,
					value1: sIsRequest
				});
				var aUserFilter = [];
				aUserFilter.push(sUserNameFilter, sIsRequestFilter);

				return aUserFilter;

			},
			onPressTile: function (oEvent) {
				this.getOwnerComponent().getRouter().navTo("ModuleSelect");
			}
		})
	})