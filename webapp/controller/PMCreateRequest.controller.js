sap.ui.define([
		"./BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/routing/History",
		"sap/m/MessageBox"
	],

	function (BaseController, JSONModel, History, MessageBox) {
		"use strict";
		return BaseController.extend("com.swcc.pm.SSP_PM.controller.PMCreateRequest", {
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
			onProceed: function () {
				//	this.getOwnerComponent().getTargets().display("DetailView");
				this._handleMessageBoxProceed("Your Service Request has been generated : 1945676");
			},
			_handleMessageBoxProceed: function (sMessage) {
				var that = this;
				sap.m.MessageBox.success(sMessage, {
					icon: MessageBox.Icon.SUCCESS,
					title: "Success",
					actions: [MessageBox.Action.OK],
					emphasizedAction: MessageBox.Action.YES,
					onClose: function (oAction) {
						if (oAction == "OK") {

							that.getRouter().navTo("HomePage", {}, true);
						}
					},
				});

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