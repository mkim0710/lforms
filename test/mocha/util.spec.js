// Tests for the HL7 generation library
describe('Util library', function() {
  describe('getNextLetter', function() {
    it('should return correct letters', function() {
      assert.equal(LForms.Util.getNextLetter(-100), "");
      assert.equal(LForms.Util.getNextLetter(-1), "");
      assert.equal(LForms.Util.getNextLetter(0), "");
      assert.equal(LForms.Util.getNextLetter(1), "a");
      assert.equal(LForms.Util.getNextLetter(2), "b");
      assert.equal(LForms.Util.getNextLetter(3), "c");
      assert.equal(LForms.Util.getNextLetter(25), "y");
      assert.equal(LForms.Util.getNextLetter(26), "z");
      assert.equal(LForms.Util.getNextLetter(26+1), "aa");
      assert.equal(LForms.Util.getNextLetter(26+2), "ab");
      assert.equal(LForms.Util.getNextLetter(26*2-1), "ay");
      assert.equal(LForms.Util.getNextLetter(26*2), "az");
      assert.equal(LForms.Util.getNextLetter(26*2+1), "ba");
      assert.equal(LForms.Util.getNextLetter(26*2+2), "bb");
      assert.equal(LForms.Util.getNextLetter(26*26), "yz");
      assert.equal(LForms.Util.getNextLetter(26*26+1), "za");
      assert.equal(LForms.Util.getNextLetter(26*26+26), "zz");
      assert.equal(LForms.Util.getNextLetter(26*26+26+1), "aaa");
      assert.equal(LForms.Util.getNextLetter(1000), "all");
    });
  });

  describe('isItemValueEmpty', function() {
    it('should check all kinds of empty values', function() {
      var value = "";
      assert.equal(LForms.Util.isItemValueEmpty(value), true);
      value = [];
      assert.equal(LForms.Util.isItemValueEmpty(value), true);
      value = {};
      assert.equal(LForms.Util.isItemValueEmpty(value), true);
      value = {"code": null};
      assert.equal(LForms.Util.isItemValueEmpty(value), true);
      value = {"code": ""};
      assert.equal(LForms.Util.isItemValueEmpty(value), true);

      value = true;
      assert.equal(LForms.Util.isItemValueEmpty(value), false);
      value = false;
      assert.equal(LForms.Util.isItemValueEmpty(value), false);
      value = 0;
      assert.equal(LForms.Util.isItemValueEmpty(value), false);
      value = "a";
      assert.equal(LForms.Util.isItemValueEmpty(value), false);
      value = [1];
      assert.equal(LForms.Util.isItemValueEmpty(value), false);
      value = {"code": "1"};
      assert.equal(LForms.Util.isItemValueEmpty(value), false);


    });
  });

  describe('pruneNulls', function() {
    it('should remove elements with null and undefined values from an object/array', function () {
      var target    = {a: [null, undefined, 1, 'str', true, {}], b: true, s: 'str', n: null, u: undefined, child: {a: [null, undefined, 1, 'str', true, {}], num: 10.1, s: 'str', b: false, n: null, u: undefined, e: [], o: {}}};
      var expected  = {a: [                 1, 'str', true, {}], b: true, s: 'str',                        child: {a: [                 1, 'str', true, {}], num: 10.1, s: 'str', b: false,                        e: [], o: {}}};
      LForms.Util.pruneNulls(target);
      assert.deepEqual(target, expected);
    });
  });
});

