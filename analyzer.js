// analyzer.js
// var exports = module.exports = {};
var S = require('string'); 

// My module
function Analyzer(words) {
  this.words = words.split(" ");
}

Analyzer.prototype.interrestedIn = function foo(textLine) {
      var result = false;
      this.words.map(function(word) {
        if(S(textLine.toUpperCase()).contains(word.toUpperCase()))
            result = true;          
      })
      return result;     
};

module.exports = Analyzer;