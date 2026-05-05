/**
 * Handlebars Helper for Pattern Library
 *
 * Copyright (c) 2014 Yonas Sandbæk
 * Licensed under the MIT License (MIT).
 */

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

module.exports.register = function (Handlebars, options, params) {
	'use strict';

	options = options || {};

	var config = _.extend(options, options.data || {});

	var patterns = ['atom', 'molecule', 'organism'];

	var root = process.cwd();

	patterns.forEach(function(pattern) {
		var inflection = pattern + 's';
		var dir = path.join(root, inflection);

		var files;
		try {
			files = fs.readdirSync(dir);
		}
		catch (err) {
			console.error(err);
			return;
		}

		for (var i in files) {
			if (!files.hasOwnProperty(i)) {
				continue;
			}
			var name = path.join(dir, files[i]);
			if (fs.statSync(name).isDirectory()) {
				var template = fs.readFileSync(path.join(name, files[i] + '.hbs'), 'utf8');
					Handlebars.registerPartial(pattern + "-" + files[i], template);

					(function(name){

						Handlebars.registerHelper(name, function(data, options) {
							data = typeof data === "string" ? JSON.parse(data) : data || {};
							data = _.extend(data, options);
							var template = Handlebars.partials[name];
							if(typeof template === "string"){
								template = Handlebars.compile(template);
							}
							return new Handlebars.SafeString(template(data));
						});

					})(pattern + "-" + files[i]);

				}
			}

		// {{#atom 'primary-header' obj || '{json:"here"}' }}
		Handlebars.registerHelper(pattern, function(name, context) {
			context = _.extend(config, typeof context === "string" ? JSON.parse(context) : context || {});

			var template = Handlebars.partials[pattern + '-' + name],
				data = _.extend(context, this);

			if(typeof template === "string"){
				template = Handlebars.compile(template);
			}

			return new Handlebars.SafeString(template(data));
		});

		// {{#atom-raw 'primary-header' obj || '{json:"here"}' }}
		Handlebars.registerHelper(pattern+"-raw", function(name, context) {
			//console.log("X", name, context);
			context = _.extend(config, typeof context === "string" ? JSON.parse(context) : context || {});

			var template = Handlebars.partials[pattern + '-' + name],
				data = _.extend(context, this);

			if(typeof template === "string"){
				template = Handlebars.compile(template);
			}

			var html = template(data);
			html = html.replace(new RegExp('<', 'g'), '&lt;').replace(new RegExp('>', 'g'), '&gt;');
			// TODO Fix indenting

			return html;
		});
	});
};
