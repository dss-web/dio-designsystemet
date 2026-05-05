/**
 * Handlebars Helper for Pattern Library
 *
 * Copyright (c) 2014 Yonas Sandbæk
 * Licensed under the MIT License (MIT).
 */

module.exports.register = function (Handlebars, options, params) {
	'use strict';

	Handlebars.registerHelper("default", function(optionalValue, textValue) {
		return optionalValue || textValue;
	});
};