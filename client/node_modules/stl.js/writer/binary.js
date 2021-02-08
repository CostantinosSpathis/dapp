'use strict';

var Transform = require('stream').Transform;
var util = require('util');

module.exports = STLBinaryWriter;

function STLBinaryWriter(header, count, options) {
	if (!(this instanceof STLBinaryWriter)) {
		return new STLBinaryWriter(header, count, options);
	}
	options = Object.create(options || {});
	options.objectMode = true;
	Transform.call(this, options);
	this.__header = header;
	if (typeof count === 'number') {
		writeHeader.call(this, header, count);
	}
}

util.inherits(STLBinaryWriter, Transform);

STLBinaryWriter.prototype._transform = transform;
STLBinaryWriter.prototype._flush = flush;

function writeHeader(header, count) {
	if (count < 0 || !isFinite(count) || Math.floor(count) !== count) {
		throw new Error('Triangle count must be non-negative integer');
	}
	this.__remaining = count;
	var hdrbuf = new Buffer(84);
	hdrbuf.fill(0);
	header = header || this.__header;
	delete this.__header;
	if (header) {
		if (!(header instanceof Buffer)) {
			header = new Buffer(header);
		}
		if (header.length > 80) {
			throw new Error('Header must be at most 80 bytes long');
		}
		header.copy(hdrbuf);
	} else {
		hdrbuf.write('binary STL model encoded by github.com/battlesnake/stl.js');
	}
	if (hdrbuf.toString('utf8', 0, 6) === 'solid ') {
		throw new Error('Binary STL header cannot begin with "solid "');
	}
	hdrbuf.writeUInt32LE(count, 80);
	this.push(hdrbuf);
}

function transform(data, enc, done) {
	if (typeof this.__remaining !== 'number') {
		if (!data.triangles) {
			throw new Error('Header not written');
		}
		writeHeader.call(this, data.header, data.triangles.length);
		pushTriangles.call(this, data.triangles);
	} else if (data instanceof Array) {
		pushTriangles.call(this, data);
	} else if (data) {
		pushTriangles.call(this, [data]);
	} else {
		pushTriangles.call(this);
	}
	done();
}

function flush(done) {
	pushTriangles.call(this);
	if (this.__remaining !== -1) {
		throw new Error('Insufficient triangles');
	}
	done();
}

function pushTriangles(triangles) {
	if (arguments.length === 0 || triangles.length === 0) {
		if (this.__remaining === 0) {
			this.__remaining = -1;
		}
		return;
	}
	if (triangles.length > this.__remaining) {
		throw new Error('Too many triangles');
	}
	var buf = new Buffer(50 * triangles.length);
	var iter = new BufferIterator(buf);
	triangles.forEach(function (triangle) {
		iter.writeVector(triangle.normal);
		for (var i = 0; i < 3; i++) {
			iter.writeVector(triangle.vertices[i]);
		}
		iter.writeWord(triangle.attr || 0);
	});
	this.push(buf);
	this.__remaining -= triangles.length;
	if (!this.__remaining) {
		pushTriangles.call(this);
	}
}

function BufferIterator(buffer, offset) {
	if (arguments.length === 1) {
		offset = 0;
	}
	this.writeFloat = writeFloat;
	this.writeVector = writeVector;
	this.writeWord = writeWord;
	function writeFloat(x) { buffer.writeFloatLE(x, advance(4)); }
	function writeVector(v) { v.forEach(writeFloat); }
	function writeWord(w) { buffer.writeUInt16LE(w, advance(2)); }
	function advance(bytes) {
		var current = offset;
		offset += bytes;
		return current;
	}
}
