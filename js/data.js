'use strict';

(function () {
  var PINS_AMOUNT = 8;
  var MAP_X_MIN = 0;
  var MAP_Y_MIN = 130;
  var MAP_Y_MAX = 630;

  var CHECK_IN = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var CHECK_OUT = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

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

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var pins = [];
  var map = document.querySelector('.map');
  var mapXMax = map.offsetWidth;

  var createAnnouncement = function () {
    for (var i = 0; i < PINS_AMOUNT; i++) {
      pins.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },

        offer: {
          title: 'title',
          address: window.utils.getRandomInteger(MAP_X_MIN, mapXMax) + ', ' + window.utils.getRandomInteger(MAP_Y_MIN, MAP_Y_MAX),
          price: 0,
          type: TYPES[window.utils.getRandomInteger(0, TYPES.length - 1)],
          rooms: window.utils.getRandomInteger(1, 3),
          guests: window.utils.getRandomInteger(0, 3),
          checkin: CHECK_IN[window.utils.getRandomInteger(0, CHECK_IN.length - 1)],
          checkout: CHECK_OUT[window.utils.getRandomInteger(0, CHECK_OUT.length - 1)],
          features: window.utils.shuffleArray(FEATURES.slice(), window.utils.getRandomInteger(0, FEATURES.length)),
          description: 'description',
          photos: window.utils.shuffleArray(PHOTOS.slice(), window.utils.getRandomInteger(0, PHOTOS.length))
        },

        location: {
          x: window.utils.getRandomInteger(MAP_X_MIN, mapXMax),
          y: window.utils.getRandomInteger(MAP_Y_MIN, MAP_Y_MAX)
        }
      });
    }
  };

  window.data = {
    PINS_AMOUNT: PINS_AMOUNT,
    TYPES: TYPES,
    HOUSING_DATA: HOUSING_DATA,
    FEATURES: FEATURES,
    PHOTOS: PHOTOS,
    createAnnouncement: createAnnouncement,
    pins: pins,
    map: map
  };
})();
