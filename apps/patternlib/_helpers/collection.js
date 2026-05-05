/**
 * Handlebars Helper for Pattern Library
 *
 * Copyright (c) 2014 Yonas Sandbæk
 * Licensed under the MIT License (MIT).
 */

module.exports.register = function (Handlebars, options, params) {
	'use strict';

	Handlebars.registerHelper("parseJSON", function(data, options) {
		return options.fn(JSON.parse(data));
	});
	
	Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
		switch (operator) {
			case '==':
				return (v1 == v2) ? options.fn(this) : options.inverse(this);
			case '===':
				return (v1 === v2) ? options.fn(this) : options.inverse(this);
			case '<':
				return (v1 < v2) ? options.fn(this) : options.inverse(this);
			case '<=':
				return (v1 <= v2) ? options.fn(this) : options.inverse(this);
			case '>':
				return (v1 > v2) ? options.fn(this) : options.inverse(this);
			case '>=':
				return (v1 >= v2) ? options.fn(this) : options.inverse(this);
			case '&&':
				return (v1 && v2) ? options.fn(this) : options.inverse(this);
			case '||':
				return (v1 || v2) ? options.fn(this) : options.inverse(this);
			default:
				return options.inverse(this);
		}
	});

	Handlebars.registerHelper('eachUpto', function(ary, max, options) {
		if(!ary || ary.length === 0){
			return options.inverse(this);
		}

		var result = [ ];
		for(var i = 0; i < max && i < ary.length; ++i){
			result.push(options.fn(ary[i]));
		}
		return result.join('');
	});

	Handlebars.registerHelper('ifIn', function(elem, list, options) {
		if(list.indexOf(elem) > -1) {
			return options.fn(this);
		}
		return options.inverse(this);
	});

   /**
	 * Raw
	 * Output a partial as raw text
	 *
	 * Usage example:
	 * {{raw "my-partial"}}
	 * 
	 * To avoid escaping of html etc., use triple curly braces:
	 * {{{raw "my-partial"}}}
	 *
	 * @param  {string} partialName Name of a registered partial.
	 * @return {string}
	 */
	Handlebars.registerHelper('raw', function(partialName) {
		return Handlebars.partials[partialName];
	});

	// Handlebars.registerHelper('makeVar', function (name, value, options) {
	//  function extend( defaults, options ) {
	//      var extended = {};
	//      var prop;
	//      for (prop in defaults) {
	//          if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
	//              extended[prop] = defaults[prop];
	//          }
	//      }
	//      for (prop in options) {
	//          if (Object.prototype.hasOwnProperty.call(options, prop)) {
	//              extended[prop] = options[prop];
	//          }
	//      }
	//      return extended;
	//  };

	//     if (options.data) {
	//      // console.log(options);
	//          //options.data[name] = value;
	//          var extended = this;
	//          extended = extend(this, {index: options.data.index});
	//         console.log(extended);
	//     }
	//     return extended;
	// });
};