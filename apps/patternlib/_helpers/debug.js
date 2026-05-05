/**
 * Handlebars Helper for Pattern Library
 *
 * Copyright (c) 2014 Yonas Sandbæk
 * Licensed under the MIT License (MIT).
 */

module.exports.register = function (Handlebars, options, params) {
	'use strict';

	Handlebars.registerHelper("debug", function(optionalValue) {
		console.log("Current Context");
		console.log("====================");
		console.log(this);
	 
		if (optionalValue) {
			console.log("Value");
			console.log("====================");
			console.log(optionalValue);
		}
	});
};