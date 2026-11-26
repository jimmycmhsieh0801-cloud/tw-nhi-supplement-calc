const assert = require("assert");
const { calcNhiSupplement } = require("./app.js");
assert.strictEqual(calcNhiSupplement("dividend", 19999).fee, 0);
assert.strictEqual(calcNhiSupplement("dividend", 20000).fee, 422);
assert.strictEqual(calcNhiSupplement("parttime", 29499).fee, 0);
assert.strictEqual(calcNhiSupplement("parttime", 29500).fee, 622);
assert.strictEqual(calcNhiSupplement("bonus", 200000, 40000).fee, 844); // (200k-160k)*2.11% = 844
console.log("NHI_SUPPLEMENT_TESTS_PASSED");
