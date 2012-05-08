var PEG = require('pegjs');
var assert = require('assert');
var fs = require('fs'); // for loading files

// Read file contents
var data = fs.readFileSync('scheem.pegjs', 'utf-8');
var parse = PEG.buildParser(data).parse;

// Tests
assert.throws(function() {parse("")}); // Empty 

// atoms
assert(parse("a"), "a");
assert(parse("pl101"), "a");
assert(parse("101pl"), "a");
assert(parse("PL-101"), "a");
assert(parse("0-9a-zA-Z_?!+-=@#$%^&*/."), "0-9a-zA-Z_?!+-=@#$%^&*/.");

// lists
assert.deepEqual(parse("()"), []);
assert.deepEqual( parse("(a b c)"), ["a", "b", "c"] );
assert.deepEqual(parse("(())"), [[]]);
assert.deepEqual(parse("((()))"), [[[]]]);
assert.deepEqual(parse("(a (b c) d)"), ["a", ["b", "c"], "d"]);
console.log("All OK")