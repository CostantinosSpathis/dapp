'use strict';

module.exports = Line;

function Line(number, str, strict) {
	this.strict = strict;
	this.number = number;
	this.tokens = str.trim().toLowerCase().split(strict ? ' ' : /\s/);
	this.line = this.tokens.join(' ');
	this.token = 0;
	this.parseError = parseError;
}

Line.prototype = {
	peekToken: peekToken,
	getToken: getToken,
	getFloat: getFloat,
	getVector: getVector,
	getRest: getRest,
	assertToken: assertToken,
	assertTokens: assertTokens,
	assertLine: assertLine,
	assertEnd: assertEnd,
};

function assertEnd() {
	if (this.strict && this.token !== this.tokens.length) {
		throw this.parseError('Expected end of line but found more data');
	}
}

function peekToken() {
	var index = this.token;
	if (index < this.tokens.length) {
		return this.tokens[index];
	} else {
		throw this.parseError('Expected at least ' + (index + 1) + 'tokens but found ' + this.tokens.length + ' tokens');
	}
}

function getToken() {
	var value = this.peekToken();
	this.token++;
	return value;
}

function getRest() {
	var index = this.token;
	this.token = this.tokens.length;
	return this.tokens.slice(index).join(' ');
}

var floatRx = /^[+-]?(\d+(\.\d+)?|\d(\.\d+)?[eE][-+]\d+)$/;

function getFloat() {
	var token = this.getToken();
	var value = parseFloat(token);
	if (isNaN(value) || (this.strict && !floatRx.test(token))) {
		throw this.parseError('Expected value of type "number" but found expression "' + token + '"');
	}
	return value;
}

function getVector(v) {
	v.push(this.getFloat());
	v.push(this.getFloat());
	v.push(this.getFloat());
	return this;
}

function assertToken(expect) {
	var actual = this.getToken();
	if (expect !== actual) {
		throw this.parseError('Expected "' + expect + '" but found "' + actual + '"');
	}
	return this;
}

function assertTokens(min, max) {
	if (arguments.length === 1) {
		max = min;
	}
	if (this.tokens.length < min || this.tokens.length > max) {
		if (min === max) {
			throw this.parseError('Expected ' + min + ' tokens but found ' + this.tokens.length + ' tokens');
		} else {
			throw this.parseError('Expected between ' + min + ' and ' + max + ' tokens but found ' + this.tokens.length + ' tokens');
		}
	}
}

function assertLine(expect) {
	if (this.line !== expect) {
		throw this.parseError('Expected "' + expect + '" but found "' + this.line + '"');
	}
}

function parseError(message) {
	return new Error(message + ', on line #' + this.number + ' with content:\n\n\t' + this.line + '\n');
}

