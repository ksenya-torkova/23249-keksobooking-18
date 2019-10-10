'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var getRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var shuffleArray = function (arr, length) {
    // тасование массива по алгоритму Фишера-Йетса
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var x = arr[i];
      arr[i] = arr[j];
      arr[j] = x;
    }

    // если нужен массив случайной длины, передается и используется параметр length, иначе массив сохраняет исходную длину
    arr.length = length ? length : arr.length;

    return arr;
  };

  var numDecline = function (num, nominative, genetiveSingular, genetivePlural) {
    if (num > 10 && (Math.round((num % 100) / 10)) === 1) {
      return genetivePlural;
    } else {
      switch (num % 10) {
        case 1: return nominative;
        case 2:
        case 3:
        case 4: return genetiveSingular;
      }
    }

    return genetivePlural;
  };

  window.utils = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    getRandomInteger: getRandomInteger,
    shuffleArray: shuffleArray,
    numDecline: numDecline
  };
})();
