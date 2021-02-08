'use strict';

var Cat = new require('stream').PassThrough;

module.exports = Combiner;

function Combiner(source) {
	var stl = { format: null, header: null, triangles: null };
	var stream = new Cat({ objectMode: true });
	source
		.on('format', function (format) {
			stl.format = format;
		})
		.on('header', function (header) {
			stl.header = header;
			stl.triangles = [];
		})
		.on('data', function (triangle) {
			stl.triangles.push(triangle);
		})
		.on('error', function (error) {
			stream.emit('error', error);
		})
		.on('finish', function () {
			stream.push(stl);
			stream.end();
		});
	return stream;
}
