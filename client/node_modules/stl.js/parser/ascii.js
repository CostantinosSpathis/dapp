'use strict';

var Line = require('./line');

module.exports = AsciiEngine;

function AsciiEngine(options) {
	options = options || {};
	this.name = null;
	this.buffer = null;
	this.lineStart = 0;
	this.lineScanFrom = 0;
	this.getNextLine = getNextLine;
	this.linesBuffer = [];
	this.linesRead = 0;
	this.isEnding = false;
	this.strict = options.strict || false;
}

AsciiEngine.prototype = {
	done: false,
	write: write,
	ending: ending,
	readHeader: getSolidName,
	readTriangle: getAsciiTriangle
};

function write(chunk) {
	var chunks = [];
	if (this.buffer !== null) {
		chunks.push(this.buffer);
	}
	if (chunk) {
		chunks.push(chunk);
	}
	if (this.isEnding) {
		chunks.push(new Buffer('\n'));
	}
	if (chunks.length === 0) {
		this.buffer = null;
	} else if (chunks.length === 1) {
		this.buffer = chunks[0];
	} else {
		this.buffer = Buffer.concat(chunks);
	}
}

function getSolidName() {
	var next = this.getNextLine();
	if (!next) {
		return false;
	}
	var name = next.assertToken('solid').getRest();
	this.name = name;
	return {
		name: name
	};
}

function getAsciiTriangle() {
	var next = this.getNextLine();
	if (!next) {
		return false;
	}
	/* endsolid name */
	if (this.linesBuffer.length === 0 && next.peekToken() === 'endsolid') {
		var name = next
			.assertToken('endsolid')
			.getRest();
		if (this.strict && name !== '' && name !== this.name) {
			throw new Error('Solid name "' + name + '" at end of solid does not match solid name "' + this.name + '" at start of solid');
		}
		this.done = true;
		return false;
	}
	/* endfacet */
	if (next.line !== 'endfacet') {
		this.linesBuffer.push(next);
		return true;
	}
	var lines = this.linesBuffer;
	this.linesBuffer = [];
	function getLine() {
		if (lines.length > 0) {
			return lines.shift();
		} else {
			throw new Error('Insufficient data or missing command before line #' + next.number);
		}
	}
	/* Data */
	var normal = [], vertices = [[], [], []];
	/* facet normal n_x n_y n_z */
	getLine()
		.assertToken('facet')
		.assertToken('normal')
		.getVector(normal)
		.assertEnd();
	/* outer loop */
	getLine()
		.assertToken('outer')
		.assertToken('loop');
	/* vertex v_n_x v_n_y v_n_z */
	for (var n = 0; n < 3; n++) {
		getLine()
			.assertToken('vertex')
			.getVector(vertices[n])
			.assertEnd();
	}
	/* endloop */
	getLine()
		.assertToken('endloop')
		.assertEnd();
	/* endfacet already asserted */
	return {
		normal: normal,
		vertices: vertices
	};
}

/* Skips blank lines */
function getNextLine() {
	if (!this.buffer) {
		return null;
	}
	var len = this.buffer.length;
	for (var i = 0*this.lineScanFrom; i < len; i++) {
		var ch = this.buffer[i];
		/* Fairly portable, does not support unicode though */
		if (ch === 10 || ch === 13) {
			if (i === this.lineStart) {
				this.lineStart = i + 1;
			} else {
				var line = this.buffer.toString('utf8', this.lineStart, i);
				if (len === i + 1) {
					this.buffer = null;
				} else {
					this.buffer = this.buffer.slice(i + 1);
				}
				this.lineStart = 0;
				this.lineScanFrom = 0;
				return new Line(++this.linesRead, line, this.strict);
			}
		}
	}
	this.lineScanFrom = len;
	return null;
}

function ending() {
	this.isEnding = true;
}
