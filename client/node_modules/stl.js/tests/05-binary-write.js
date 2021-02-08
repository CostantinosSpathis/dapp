'use strict';

var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

describe('Binary engine', function () {
	var fs = require('fs');
	var path = require('path');
	var STL = require('../');

	it('Reads and writes binary format correctly', function (done) {
		var data = fs.readFileSync(path.join(__dirname, 'ship.stl'));
		var buf = [];
		fs.createReadStream(path.join(__dirname, 'ship.stl'))
			.pipe(new STL.ParseStream())
			.construct()
			.pipe(new STL.BinaryWriter())
			.on('data', function (chunk) {
				buf.push(chunk);
			})
			.on('error', done)
			.on('finish', function () {
				buf = Buffer.concat(buf);
				expect(buf.toString('base64', 80)).to.be.equal(data.toString('base64', 80));
				done();
			});
	});

});
