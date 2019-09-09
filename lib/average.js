"use strict";

var filters = {};

function fact(a, b) {
    var n1 = Math.max(a, b);
    var n2 = Math.min(a, b);
    return (n1 - n2) / n1;
}

module.exports = function (arr, wl, thres, skipNulls) {
    var skipNull = (typeof skipNulls === 'undefined') ? false : skipNulls;
    function average(arr) {
        var acc = 0;
        var length = skipNull ? 0 : arr.length;
        for (var i = 0; i < arr.length; i++) {
          if(skipNull && arr[i] == null) {

          } else {
            acc += arr[i];
            if(skipNull) {
              ++length;
            }
          }
        }
        return acc / length;
    }

    wl = wl || 3;

    var w = [];
    var f = [];
    for (var i = 0; i < arr.length; i++) 
    {
      if(skipNull && arr[i] == null) {
        f.push(null);
      } else {
        if (thres && w.length > 0 && fact(arr[i], w[w.length - 1]) > thres) {
          w = [];
        } else {
          if (w.length >= wl)
            w.shift();
        }

        w.push(arr[i]);

        f.push(average(w));
      }
    }

    return f;
};

module.exports.difference = fact;
