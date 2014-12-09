var assert = require("assert");

function expect(a) {

}
function equal(a,b,msg) {
    assert(a===b,msg);
}
function xtest(comment,fct) {
    xit(comment,fct);
}
function test(comment,fct) {
    it(comment,fct);
}
GLOBAL.expect = expect;
GLOBAL.test = test;
GLOBAL.equal = equal;
GLOBAL.xtest = xtest;
GLOBAL.assert = assert;

