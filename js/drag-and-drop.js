'use strict';

(function () {
  var pinSizes = {
    INACTIVE_PIN_WIDTH: 156,
    INACTIVE_PIN_HEIGHT: 156,
    ACTIVE_PIN_WIDTH: 65,
    ACTIVE_PIN_HEIGHT: 77
  };

  var MAIN_PIN_LIMITS = {
    xMin: window.data.MAP_X_MIN - pinSizes.ACTIVE_PIN_WIDTH / 2,
    xMax: window.data.mapXMax - pinSizes.ACTIVE_PIN_WIDTH / 2,
    yMin: window.data.MAP_Y_MIN - pinSizes.ACTIVE_PIN_HEIGHT,
    yMax: window.data.MAP_Y_MAX - pinSizes.ACTIVE_PIN_HEIGHT
  };

  var mapMainPin = window.data.map.querySelector('.map__pin--main');
  var announcementForm = document.querySelector('.ad-form');
  var announcementAddress = announcementForm.querySelector('#address');

  var limitMainPinCoordinates = function () {
    if (mapMainPin.offsetLeft < MAIN_PIN_LIMITS.xMin) {
      mapMainPin.style.left = MAIN_PIN_LIMITS.xMin + 'px';
    } else if (mapMainPin.offsetLeft > MAIN_PIN_LIMITS.xMax) {
      mapMainPin.style.left = MAIN_PIN_LIMITS.xMax + 'px';
    } else if (mapMainPin.offsetTop < MAIN_PIN_LIMITS.yMin) {
      mapMainPin.style.top = MAIN_PIN_LIMITS.yMin + 'px';
    } else if (mapMainPin.offsetTop > MAIN_PIN_LIMITS.yMax) {
      mapMainPin.style.top = MAIN_PIN_LIMITS.yMax + 'px';
    }
  };

  var getAnnouncementAddress = function (isMapActive) {
    var currentPinWidth = isMapActive ? pinSizes.ACTIVE_PIN_WIDTH : pinSizes.INACTIVE_PIN_WIDTH;
    var currentPinHeigth = isMapActive ? pinSizes.ACTIVE_PIN_HEIGHT : pinSizes.INACTIVE_PIN_HEIGHT;

    return (parseInt(mapMainPin.style.left, 10) + currentPinWidth / 2).toFixed() +
    ', ' + (parseInt(mapMainPin.style.top, 10) + currentPinHeigth).toFixed();
  };

  mapMainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    announcementAddress.value = getAnnouncementAddress(true);

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

      announcementAddress.value = getAnnouncementAddress(true);

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
    announcementAddress: announcementAddress,
    getAnnouncementAddress: getAnnouncementAddress
  };
})();
