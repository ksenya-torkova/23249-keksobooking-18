'use strict';

(function () {
  var pinSizes = {
    INACTIVE_PIN_WIDTH: 156,
    INACTIVE_PIN_HEIGHT: 156,
    ACTIVE_PIN_WIDTH: 65,
    ACTIVE_PIN_HEIGHT: 77
  };
  var mainPinLimits = {
    xMin: window.data.MAP_X_MIN - pinSizes.ACTIVE_PIN_WIDTH / 2,
    xMax: window.data.mapXMax - pinSizes.ACTIVE_PIN_WIDTH / 2,
    yMin: window.data.MAP_Y_MIN - pinSizes.ACTIVE_PIN_HEIGHT,
    yMax: window.data.MAP_Y_MAX - pinSizes.ACTIVE_PIN_HEIGHT
  };
  var mapMainPin = window.data.map.querySelector('.map__pin--main');
  var announcementForm = document.querySelector('.ad-form');
  var announcementAddress = announcementForm.querySelector('#address');

  var limitMainPinCoordinates = function () {
    if (mapMainPin.offsetLeft < mainPinLimits.xMin) {
      mapMainPin.style.left = mainPinLimits.xMin + 'px';
    } else if (mapMainPin.offsetLeft > mainPinLimits.xMax) {
      mapMainPin.style.left = mainPinLimits.xMax + 'px';
    } else if (mapMainPin.offsetTop < mainPinLimits.yMin) {
      mapMainPin.style.top = mainPinLimits.yMin + 'px';
    } else if (mapMainPin.offsetTop > mainPinLimits.yMax) {
      mapMainPin.style.top = mainPinLimits.yMax + 'px';
    }
  };

  mapMainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    announcementAddress.value = (parseInt(mapMainPin.style.left, 10) + pinSizes.ACTIVE_PIN_WIDTH / 2).toFixed() +
    ', ' + (parseInt(mapMainPin.style.top, 10) + pinSizes.ACTIVE_PIN_HEIGHT).toFixed();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapMainPin.style.top = mapMainPin.offsetTop - shift.y + 'px';
      mapMainPin.style.left = mapMainPin.offsetLeft - shift.x + 'px';

      limitMainPinCoordinates();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      announcementAddress.value = (parseInt(mapMainPin.style.left, 10) + pinSizes.ACTIVE_PIN_WIDTH / 2).toFixed() +
      ', ' + (parseInt(mapMainPin.style.top, 10) + pinSizes.ACTIVE_PIN_HEIGHT).toFixed();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.dragAndDrop = {
    pinSizes: pinSizes,
    mapMainPin: mapMainPin,
    announcementForm: announcementForm,
    announcementAddress: announcementAddress
  };
})();
