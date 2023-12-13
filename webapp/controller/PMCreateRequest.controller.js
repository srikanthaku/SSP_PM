sap.ui.define([
		"./BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/routing/History",
		"sap/m/MessageBox",
		"sap/ui/core/Fragment",
		"sap/ui/Device"
	],

	function (BaseController, JSONModel, History, MessageBox, Fragment, Device) {
		"use strict";
		return BaseController.extend("com.swcc.pm.SSP_PM.controller.PMCreateRequest", {
			onInit: function () {
				debugger;
				this.oRouter = this.getRouter();
				this.getRouter().getRoute("PMRequest").attachPatternMatched(this._onObjectMatched, this);
				this._createItemDataModel();
				this.PlantF4();

			},
			_onObjectMatched: function () {
				this._createItemDataModel();

			},
			_createItemDataModel: function () {
				this.getModel().setData({
					busy: false,
					PMCreateRequest: {
						Header: {},
						Attachment: [],
						PlantF4: []
					}
				});
			},
			PlantF4: function () {

				this.getModel().setProperty("/busy", true);
				this.getAPI.oDataReadAPICall(this.getOwnerComponent().getModel("ZSSP_COMMON_SRV"), 'read', '/A_Plant/')
					.then(function (oResponse) {

						this.getModel().setProperty("/PMCreateRequest/PlantF4/", oResponse.results);
						this.getModel().setProperty("/busy", false);
					}.bind(this)).catch(function (error) {
						MessageBox.error(error.responseText);
						this.getModel().setProperty("/busy", false);
					}.bind(this));

			},
			onCheckPlantVal: function (oEve) {

				oEve.getSource().getSelectedKey() === "" ? oEve.getSource().setValue(null) : "";

			},
			onSelectPlant1: function (oEve) {
				var sKey = oEve.getSource().getSelectedKey();
				this.getModel().setProperty("/busy", true);
				this.getAPI.oDataReadAPICall(this.getOwnerComponent().getModel("ZSSP_COMMON_SRV"), 'read', '/ZCDSV_EQUIPMENTVH/')
					.then(function (oResponse) {

						this.getModel().setProperty("/PMCreateRequest/EquipmentF4/", oResponse.results);
						this.getModel().setProperty("/busy", false);
					}.bind(this)).catch(function (error) {
						MessageBox.error(error.responseText);
						this.getModel().setProperty("/busy", false);
					}.bind(this));
			},
			onValueHelpRequest: function (oEvent) {

				var oView = this.getView();

				if (!this._pDialog) {
					this._pDialog = Fragment.load({
						id: oView.getId(),
						name: "com.swcc.pm.SSP_PM.fragments.PMModule.EquipmentF4",
						controller: this
					}).then(function (oDialog) {
						oView.addDependent(oDialog);
						if (Device.system.desktop) {
							oDialog.addStyleClass("sapUiSizeCompact");
						}
						return oDialog;
					});
				}

				this._pDialog.then(function (oDialog) {

					oDialog.open();
				}.bind(this));
			},
			onValueHelpSearch: function (oEvent) {
				var sValue = oEvent.getParameter("value");
				var oFilter = new Filter(
					[
						new Filter({
							path: "CustomerName",
							operator: "Contains",
							value1: sValue.trim()
						})
					],
					false
				);

				oEvent.getSource().getBinding("items").filter([oFilter]);
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
				this.getModel().setProperty("/busy", true);
				this.getAPI.oDataAPICall(this.getOwnerComponent().getModel("ZSSP_COMMON_SRV"), 'create', '/ServNotificationSet',
						oPayload)
					.then(function (oResponse) {
						this._handleMessageBoxProceed(`Service Request has been created : ${oResponse.Notificat} `);
						this.getModel().setProperty("/PMCreateRequest/Header", oResponse.results);
						this.getModel().setProperty("/busy", false);
					}.bind(this)).catch(function (error) {
						MessageBox.error(error.responseText);
						this.getModel().setProperty("/busy", false);
					}.bind(this));

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
							that.onPresshomepage();
						}
					},
				});
			},
			onPresshomepage: function () {
				this.getOwnerComponent().getRouter().navTo("HomePage");
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
				debugger;
				var oPayload = this.getModel().getProperty("/PMCreateRequest/Header/");
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