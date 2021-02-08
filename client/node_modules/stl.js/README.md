Simple STL utils
================

Currently, just an STL parser and writer.  It handles the most popular ASCII and
binary formats.  It can read an entire buffer synchronously, or read a stream
on-the-fly.  It writes via a transform stream.

Reading
=======

Synchronous immediate
---------------------

	var data = fs.readFileSync('gear.stl');
	var stl = STLParser.parse(data [, options] );

	stl = {
		format: ...,
		header: { ... },
		triangles: [{ normal: vector, vertices: [vector, ...] }, ...]
	};

Pseudo-asynchronous steam
-------------------------

	fs.createReadStream('gear.stl')
		.pipe(new STLParser.ParseStream( [options] ))
		.on('format', function (format) {
		})
		.on('header', function (header) {
		})
		.on('data', function (triangle) {
		})
		.on('error', ...)
		.on('finish', ...);

I called this "pseudo" asynchronous because the actual parsing is done by JS
code, so is blocking and synchronous.  The stream wrapper provides an
asynchronous transform-stream interface around the parser, allowing sockets and
files to be easily streamed through the parser.

If you're reading from a stream, but want the entire STL object, the transform
stream has a `construct` method which will stream in the entire model and give
a single result in the same format as the non-streaming method:

	fs.createReadStream('gear.stl')
		.pipe(new STL.ParseStream())
		.construct()
		.on('data', function (chunk) {
			/* Callback only called once */
			/* chunk is entire STL model in same format that STLParser returns */
		})
		.on('finish', function () {
		});

Result formats
--------------

 * `format` is either `binary` or `ascii`.

 * `header` is either:

   * ascii format: `{ name: 'solid name' }`

   * binary format: `{ data: <80-byte buffer>, count: number }`

 * `triangles` is an array of `triangle`.

 * `triangle` is:

		{
		    normal: [nx, ny, nz],
		    vertices: [
		        [v1x, v1y, v1z],
		        [v2x, v2y, v2z],
		        [v3x, v3y, v3z]
		    ]
		}

   For binary format, each triangle also contains an `attr` property containing
   a 16-bit integer value which has no standardized meaning.

Notes
-----

The parser strictly enforces syntax, and disallows unfamiliar tokens.  It does
*not* however perform any validation on the geometry data, including:

 * Winding direction of vertices

 * Normal agreeing with direction implied by vertices

Some parse errors can be disabled by setting `lax: true` in the parser options.
With `lax` mode enabled, the following deviations from the standard are
permitted:

 * Non-positive values are permitted in vertex vectors

 * Tabs may also be used as whitespace in ASCII format

 * Garbage at end of lines is ignored

 * `name` after `endsolid` does not have to match name after `solid`

Writing
=======

Streaming
---------

The writer is a transform stream.  Initialize it with header data and triangle
count, then stream the triangles in:

	/* AsciiWriter requires solid name and triangle count */
	var writer = new STL.AsciiWriter('name', numTriangles);

	/* BinaryWriter requires header buffer/string and triangle count */
	var writer = new STL.BinaryWriter(null, numTriangles);

	/* Either/both of the following may be called multiple times */
	writer.write(individualTriangle);
	writer.write(arrayOfTriangles);

All at once
-----------

When initialized without header data, then writer will accept the entire STL
object (including headers) in one call to `write`:

	/* No parameters */
	var writer = new STL.AsciiWriter();

	/* One write call, with the entire STL object */
	writer.write(parsedStlObject);
		.pipe(...);
