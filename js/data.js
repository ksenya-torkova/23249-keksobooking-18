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

  var createAnnouncement = function (data) {
    console.log(data[0]);
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

  var SET_DATA_URL = 'https://js.dump.academy/code-and-magick';
  var GET_DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var XHR_TIMEOUT = 10000;
  var REQUEST_SUCCESS_CODE = 200;
  var REQUEST_ERROR = 400;
  var USER_REQUEST_ERROR = 401;
  var DATA_REQUEST_ERROR = 404;

  var onErrorLoad = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; width: 100%';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var getRequestStatus = function (request) {
    var error;

    switch (request.status) {
      case REQUEST_ERROR:
        error = 'Неверный запрос';
        break;
      case USER_REQUEST_ERROR:
        error = 'Пользователь не авторизован';
        break;
      case DATA_REQUEST_ERROR:
        error = 'Ничего не найдено';
        break;
      default:
        error = 'Cтатус ответа: ' + request.status + ' ' + request.statusText;
    }

    return error;
  };

  var request = function (method, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === REQUEST_SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError(getRequestStatus(xhr));
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = XHR_TIMEOUT;

    xhr.open(method, url);

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  window.data = {
    PINS_AMOUNT: PINS_AMOUNT,
    TYPES: TYPES,
    HOUSING_DATA: HOUSING_DATA,
    FEATURES: FEATURES,
    PHOTOS: PHOTOS,
    MAP_X_MIN: MAP_X_MIN,
    MAP_Y_MIN: MAP_Y_MIN,
    MAP_Y_MAX: MAP_Y_MAX,
    mapXMax: mapXMax,
    createAnnouncement: createAnnouncement,
    request: request,
    onErrorLoad: onErrorLoad,
    pins: pins,
    map: map
  };
})();
