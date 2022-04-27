/* eslint-disable */
 
/*!
 * pixi-spine - v3.0.13
 * Compiled Mon, 13 Sep 2021 16:46:43 UTC
 *
 * pixi-spine is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 * 
 * Copyright 2019-2020, Ivan Igorevich Popelyshev <ivan.popelyshev@gmail.com>, All Rights Reserved
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var loaderUni = require('@pixi-spine/loader-uni');
var base = require('@pixi-spine/base');
var runtime4_0 = require('@pixi-spine/runtime-4.0');

loaderUni.SpineParser.registerLoaderPlugin();

Object.defineProperty(exports, 'Spine', {
	enumerable: true,
	get: function () {
		return loaderUni.Spine;
	}
});
Object.defineProperty(exports, 'SpineParser', {
	enumerable: true,
	get: function () {
		return loaderUni.SpineParser;
	}
});
Object.defineProperty(exports, 'SkeletonBounds', {
	enumerable: true,
	get: function () {
		return runtime4_0.SkeletonBounds;
	}
});
Object.keys(base).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () {
			return base[k];
		}
	});
});
//# sourceMappingURL=all.js.map
