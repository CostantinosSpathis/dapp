'use strict';

var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

describe('ASCII engine', function () {
	var fs = require('fs');
	var path = require('path');
	var STLParser = require('../');
	var options = { lax: true };

	var r1, r2 = { triangles: [] };

	it('Parses gear file', function () {
		var data = fs.readFileSync(path.join(__dirname, 'gear.stl'));
		expect(function () { r1 = STLParser.parse(data, options); }).to.not.throw();
	});

	it('Parses gear via stream', function (done) {
		fs.createReadStream(path.join(__dirname, 'gear.stl'))
			.pipe(new STLParser.ParseStream(options))
			.on('format', function (f) { r2.format = f; })
			.on('header', function (h) { r2.header = h; })
			.on('data', function (t) { r2.triangles.push(t); })
			.on('error', done)
			.on('finish', done);
	});

	it('Got exact same result for parsing get by both methods', function () {
		this.timeout(10000);
		expect(r1).to.deep.equal(r2);
	});

});
