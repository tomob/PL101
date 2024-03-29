var PEG = require('pegjs');
var assert = require('assert');
var fs = require('fs'); // for loading files

// Read file contents
var data = fs.readFileSync('scheem.pegjs', 'utf-8');
var parse = PEG.buildParser(data, {trackLineAndColumn: true}).parse;

// Tests
assert.throws(function() {parse("")}); // Empty 

// atoms
assert.equal(parse("a"), "a");
assert.equal(parse("pl101"), "pl101");
assert.equal(parse("101pl"), "101pl");
assert.equal(parse("PL-101"), "PL-101");
assert.equal(parse("PL-101 "), "PL-101");
assert.equal(parse("PL-101\n"), "PL-101");
assert.equal(parse("PL-101\t"), "PL-101");
assert.equal(parse("0-9a-zA-Z_?!+-=@#$%^&*/."), "0-9a-zA-Z_?!+-=@#$%^&*/.");

// lists
assert.deepEqual(parse("()"), []);
assert.deepEqual(parse("(  )"), []);
assert.deepEqual(parse("(a b c)"), ["a", "b", "c"]);
assert.deepEqual(parse("(())"), [[]]);
assert.deepEqual(parse("((()))"), [[[]]]);
assert.deepEqual(parse("(a (b c) d)"), ["a", ["b", "c"], "d"]);

// whitespace
assert(parse("  id   "), "id");
assert.deepEqual(parse("(a  b   c)"), ["a", "b", "c"]);
assert.deepEqual(parse("(a\tb\tc)"), ["a", "b", "c"]);
assert.deepEqual(parse("( a b c )"), ["a", "b", "c"]);
assert.deepEqual(parse("(a\nb\n\tc)"), ["a", "b", "c"]);
assert.deepEqual(parse("  (a b c)   "), ["a", "b", "c"]);

// quotes
assert(parse("'a"), ["quote", "a"]);
assert(parse("'(a b c)"), ["quote", ["a", "b", "c"]]);

// comments
//assert(parse(";; a comment\n"), "");
assert(parse(";; a comment\na"), "a");
assert(parse(";; a comment\na"), "a");
assert(parse("(a b ;;a comment\nc)"), ["a", "b", "c"]);
assert(parse("(a b \n;;a comment\nc)"), ["a", "b", "c"]);
assert(parse("'(a b ;;a comment\nc)"), ["quote" ["a", "b", "c"]]);

// Report completion
console.log("All OK")