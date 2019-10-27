'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var HOUSING_DATA = {
    bungalo: {
      ru: 'Бунгало',
      price: 0
    },

    flat: {
      ru: 'Квартира',
      price: 1000
    },

    house: {
      ru: 'Дом',
      price: 5000
    },

    palace: {
      ru: 'Дворец',
      price: 10000
    }
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
    HOUSING_DATA: HOUSING_DATA,
    numDecline: numDecline
  };
})();
