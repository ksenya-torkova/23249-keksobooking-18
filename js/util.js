'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var DECLENSION_DECADE = 10;
  var DECLENSION_HUNDRED = 100;

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

  var KeyCodes = {
    ENTER: 13,
    ESC: 27
  };

  var getDeclension = function (num, nominative, genetiveSingular, genetivePlural) {
    if (num > DECLENSION_DECADE && (Math.round((num % DECLENSION_HUNDRED) / DECLENSION_DECADE)) === 1) {
      return genetivePlural;
    } else {
      switch (num % DECLENSION_DECADE) {
        case 1: return nominative;
        case 2:
        case 3:
        case 4: return genetiveSingular;
      }
    }

    return genetivePlural;
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    ENTER_KEYCODE: KeyCodes.ENTER,
    ESC_KEYCODE: KeyCodes.ESC,
    HOUSING_DATA: HOUSING_DATA,
    getDeclension: getDeclension,
    debounce: debounce
  };
})();
