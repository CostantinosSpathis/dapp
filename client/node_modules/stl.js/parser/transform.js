'use strict';

var Transform = require('stream').Transform;
var util = require('util');

module.exports = STLParser;

var getFormat = require('./get-format');
var engines = require('./engines');
var validateTriangle = require('../validate-triangle');
var combiner = require('./combiner');

function STLParser(options) {
	if (!(this instanceof STLParser)) {
		return new STLParser(options);
	}
	options = Object.create(options || {});
	options.objectMode = true;
	options.lax = options.lax || false;
	options.highWaterMark = options.highWaterMark || 1024;
	Transform.call(this, options);
	this.__buffer = null;
	this.__engine = null;
	this.__hasHeader = false;
	this.__doTransform = doTransform;
	this.__lax = options.lax;
}

util.inherits(STLParser, Transform);

STLParser.prototype._transform = stlTransform;
STLParser.prototype._flush = stlFlush;
STLParser.prototype.construct = stlConstruct;

function stlConstruct() {
	return combiner(this);
}

function stlTransform(chunk, encoding, done) {
	this.__doTransform(chunk);
	if (this.__engine.done) {
		this.emit('finish');
	}
	return done();
}

function stlFlush(done) {
	this.__engine.ending();
	this._transform(null, null, flushed.bind(this));
	function flushed () {
		if (!this.__engine || !this.__engine.done) {
			throw new Error('Reached end of stream while parsing STL file');
		}
		return done();
	}
}

/* Synchronous */
function doTransform(chunk) {
	if (this.__engine && this.__engine.done) {
		return;
	}
	/* 1. Identify format (ASCII/Binary) */
	if (this.__engine === null) {
		if (this.__buffer) {
			this.__buffer = Buffer.concat(this.__buffer, chunk);
		} else {
			this.__buffer = chunk;
		}
		var format = getFormat(this.__buffer);
		if (!format) {
			return;
		}
		this.__buffer = null;
		this.__engine = new engines[format]({ strict: !this.__lax });
		this.emit('format', format);
	}
	var engine = this.__engine;
	engine.write(chunk);
	/* 2. Get binary header or ascii model name */
	if (!this.__hasHeader) {
		var header = engine.readHeader();
		if (!header) {
			return;
		}
		this.__hasHeader = true;
		this.emit('header', header);
	}
	/* 3. Parse triangles */
	var triangle;
	while ((triangle = engine.readTriangle())) {
		if (triangle === true) {
			continue;
		}
		if (!this.__lax) {
			validateTriangle(triangle);
		}
		this.push(triangle);
	}
}
