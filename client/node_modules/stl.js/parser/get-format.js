'use strict';

module.exports = getFormat;

function getFormat(buffer) {
	if (buffer.length < 6) {
		return false;
	}
	var solid = buffer.toString('ascii', 0, 5);
	if (solid.toLowerCase() === 'solid') {
		return 'ascii';
	} else {
		return 'binary';
	}
}

