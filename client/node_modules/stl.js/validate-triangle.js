'use strict';

module.exports = validate;

function validate(triangle) {
	var normal = triangle.normal;
	var vertices = triangle.vertices;
	var ords = [].concat.apply([], vertices);
	ords.forEach(function (ord) {
		if (ord <= 0) {
			throw new Error('Triangle vertex coördinates must contain positive values only');
		}
	});
}
