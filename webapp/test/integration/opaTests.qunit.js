/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/swcc/pm/SSP_PM/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});