'use strict';

var Transform = require('stream').Transform;
var util = require('util');

module.exports = STLAsciiWriter;

function STLAsciiWriter(name, count, options) {
	if (!(this instanceof STLAsciiWriter)) {
		return new STLAsciiWriter(name, count, options);
	}
	options = Object.create(options || {});
	options.objectMode = true;
	Transform.call(this, options);
	this.__name = name;
	if (typeof count === 'number') {
		writeHeader.call(this, name, count);
	}
}

util.inherits(STLAsciiWriter, Transform);

STLAsciiWriter.prototype._transform = transform;
STLAsciiWriter.prototype._flush = flush;

function writeHeader(name, count) {
	if (count < 0 || !isFinite(count) || Math.floor(count) !== count) {
		throw new Error('Triangle count must be non-negative integer');
	}
	this.__name = name || this.__name;
	this.__remaining = count;
	this.push(new Buffer('solid ' + this.__name + '\n', 'ascii'));
}

function transform(data, enc, done) {
	if (typeof this.__remaining !== 'number') {
		if (!data.triangles) {
			throw new Error('Header not written');
		}
		writeHeader.call(this, data.header.name, data.triangles.length);
		pushTriangles.call(this, data.triangles);
	} else if (data instanceof Array) {
		pushTriangles.call(this, data);
	} else if (data) {
		pushTriangles.call(this, [data]);
	} else {
		pushTriangles.call(this);
	}
	return done();
}

function flush(done) {
	pushTriangles.call(this);
	if (this.__remaining !== -1) {
		throw new Error('Insufficient triangles');
	}
	return done();
}

function pushTriangles(triangles) {
	if (arguments.length === 0 || triangles.length === 0) {
		if (this.__remaining === 0) {
			this.push(new Buffer('endsolid ' + this.__name + '\n', 'ascii'));
			this.__remaining = -1;
		}
		return;
	}
	if (triangles.length > this.__remaining) {
		throw new Error('Too many triangles');
	}
	var lines = [];
	triangles.forEach(function (triangle) {
		var normal = triangle.normal;
		lines.push('facet normal ' + normal.join(' '));
		lines.push('outer loop');
		for (var i = 0; i < 3; i++) {
			lines.push('vertex ' + triangle.vertices[i].join(' '));
		}
		lines.push('endloop');
		lines.push('endfacet');
	});
	lines.push('');
	this.push(new Buffer(lines.join('\n'), 'ascii'));
	this.__remaining -= triangles.length;
	if (!this.__remaining) {
		pushTriangles.call(this);
	}
}
