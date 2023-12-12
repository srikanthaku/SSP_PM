sap.ui.define([
		"./BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/routing/History"
	],

	function (BaseController, JSONModel, History) {
		"use strict";
		return BaseController.extend("com.swcc.pm.SSP_PM.controller.ScmCreateRequest", {
			onInit: function () {

				this.oRouter = this.getRouter();
				this._createItemDataModel();
				this.PMCreateaRequestAPI();

			},
			_createItemDataModel: function () {
				this.getModel().setData({
					busy: false,
					recognitionAlreadyStarted: false,
					PMCreateRequest: {
						Header: {},
						Attachment: []
					}
				});
			},
			PMCreateaRequestAPI: function (oPayload) {
				debugger;

				var oPayload = {
					"NotifType": "ZT",
					"Equipment": "10000131",
					"Customer": "300113",
					"Descript": "TEST STS NOTIFICATION FOR INSTRUMENT",
					"NotifText": {
						"Line": "Testing long text"
					}
				};

				this.getAPI.oDataAPICall(this.getOwnerComponent().getModel("ZSSP_COMMON_SRV"), 'create', '/ServNotificationSet',
						oPayload)
					.then(function (oResponse) {
						debugger;
						this.getModel().setProperty("/PMCreateRequest/Header", oResponse.results);

					}.bind(this));

			},
			handleBackPress: function () {
				var oHistory, sPreviousHash;
				oHistory = History.getInstance();
				sPreviousHash = oHistory.getPreviousHash();
				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					this.getRouter().navTo("LandingView", {}, true);
				}

			},
			onSaveRequest: function () {
				var oPayload = this.getModel().getProperty("/PMCreateRequest/Header");
				this.PMCreateaRequestAPI(oPayload);

			},
			onback: function () {
				this.getOwnerComponent().getTargets().display("LandingView");

			},
			onAddItemsPress: function (oEvent) {
				var oModel = this.getModel().getProperty("/MarineTransportation/itemData");
				var oItems = oModel.map(function (oItem) {
					return Object.assign({}, oItem);
				});
				oItems.push({
					Material: "",
					Description: "",
					StorageLocation: "",
					Quantity: "",
					BaseUnit: "",
					Batch: "",
					M: true,
					// UnloadPoint: "",
					AvailableQty: null,
					PopupItems: null,
					IsBOQApplicable: ""
				});
				this.getModel().setProperty("/MarineTransportation/itemData", oItems);

			},
			onDeleteItemPress: function (oEvent) {
				var iRowNumberToDelete = parseInt(oEvent.getSource().getBindingContext().getPath().split("/")[3]);
				var aTableData = this.getModel().getProperty("/MarineTransportation/itemData");
				aTableData.splice(iRowNumberToDelete, 1);
				this.getModel().refresh();
			},

			onSearch: function () {

				this.oRouter.navTo("LandingView");

			}
		})
	})