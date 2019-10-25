'use strict';

(function () {
  var PINS_AMOUNT = 8;
  var MAP_X_MIN = 0;
  var MAP_Y_MIN = 130;
  var MAP_Y_MAX = 630;

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

  var pins = [];
  var map = document.querySelector('.map');
  var mapXMax = map.offsetWidth;

  var createAnnouncement = function (data) {
    for (var i = 0; i < data.length; i++) {
      pins.push({
        author: {
          avatar: data[i].author.avatar
        },

        offer: {
          title: data[i].offer.title,
          address: data[i].offer.address,
          price: data[i].offer.price,
          type: data[i].offer.type,
          rooms: data[i].offer.rooms,
          guests: data[i].offer.guests,
          checkin: data[i].offer.checkin,
          checkout: data[i].offer.checkout,
          features: data[i].offer.features,
          description: data[i].offer.description,
          photos: data[i].offer.photos
        },

        location: {
          x: data[i].location.x,
          y: data[i].location.y
        }
      });
    }
  };

  window.data = {
    PINS_AMOUNT: PINS_AMOUNT,
    HOUSING_DATA: HOUSING_DATA,
    MAP_X_MIN: MAP_X_MIN,
    MAP_Y_MIN: MAP_Y_MIN,
    MAP_Y_MAX: MAP_Y_MAX,
    mapXMax: mapXMax,
    createAnnouncement: createAnnouncement,
    pins: pins,
    map: map
  };
})();
