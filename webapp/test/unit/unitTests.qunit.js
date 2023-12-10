/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/swcc/pm/SSP_PM/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});