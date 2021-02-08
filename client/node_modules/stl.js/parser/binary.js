'use strict';

module.exports = BinaryEngine;

function BinaryEngine() {
	this.done = false;
	this.buffer = null;
	this.remaining = null;
	this.read = read;
}

BinaryEngine.prototype = {
	done: false,
	write: write,
	ending: null,
	readHeader: getBinaryHeader,
	readTriangle: getBinaryTriangle
};

function write(chunk) {
	var chunks = [];
	if (this.buffer !== null) {
		chunks.push(this.buffer);
	}
	if (chunk) {
		chunks.push(chunk);
	}
	if (chunks.length === 0) {
		this.buffer = null;
	} else if (chunks.length === 1) {
		this.buffer = chunks[0];
	} else {
		this.buffer = Buffer.concat(chunks);
	}
}

function ending() {
}

function read(count) {
	if (this.buffer === null) {
		return null;
	}
	if (this.buffer.length < count) {
		return null;
	}
	var result;
	if (this.buffer.length === count) {
		result = this.buffer;
		this.buffer = null;
	} else {
		result = this.buffer.slice(0, count);
		this.buffer = this.buffer.slice(count);
	}
	return result;
}

function getBinaryHeader() {
	if (this.buffer.length < 84) {
		return false;
	}
	var data = new Buffer(this.buffer.slice(0, 79));
	var count = this.buffer.readUInt32LE(80);
	this.buffer = this.buffer.slice(84);
	this.remaining = count;
	return {
		data: data,
		count: count
	};
}

function getBinaryTriangle() {
	/* Done? */
	if (this.remaining === 0) {
		this.done = true;
		return false;
	}
	/* Has triangle? */
	if (this.buffer.length < 50) {
		return false;
	}
	this.remaining--;
	var iter = new BufferIterator(this.read(50));
	/* Read triangle */
	var normal = iter.readVector();
	var vertices = [iter.readVector(), iter.readVector(), iter.readVector()];
	var attr = iter.readWord();
	return {
		normal: normal,
		vertices: vertices,
		attr: attr
	};
}

function BufferIterator(buffer, offset) {
	if (arguments.length === 1) {
		offset = 0;
	}
	this.readFloat = readFloat;
	this.readVector = readVector;
	this.readWord = readWord;
	function readFloat() { return buffer.readFloatLE(advance(4)); }
	function readVector() { return [readFloat(), readFloat(), readFloat()]; }
	function readWord() { return buffer.readUInt16LE(advance(2)); }
	function advance(bytes) {
		var current = offset;
		offset += bytes;
		return current;
	}
}
