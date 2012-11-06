var resolve = require("../");
var should = require("should");
var path = require("path");

describe("simple", function() {
	var pathsToIt = [
		[__dirname, "../lib/cachedFsResolve", "direct"],
		[__dirname, "../", "as directory"],
		[path.join(__dirname, "..", ".."), "./enhanced-resolve", "as module"],
		[path.join(__dirname, "..", ".."), "./enhanced-resolve/lib/cachedFsResolve", "in module"]
	];
	pathsToIt.forEach(function(pathToIt) {
		it("should resolve itself " + pathToIt[2], function(done) {
			resolve(pathToIt[0], pathToIt[1], function(err, filename) {
				if(err) return done(err);
				should.exist(filename);
				filename.should.be.a("string");
				filename.should.be.eql(path.join(__dirname, "..", "lib", "cachedFsResolve.js"));
				done();
			});
		});
		it("should resolve itself sync " + pathToIt[2], function() {
			var filename = resolve.sync(pathToIt[0], pathToIt[1]);
			should.exist(filename);
			filename.should.be.a("string");
			filename.should.be.eql(path.join(__dirname, "..", "lib", "cachedFsResolve.js"));
		});
	});

});