'use strict';

(function () {
  var MapSizes = {
    MAP_X_MIN: 0,
    MAP_Y_MIN: 130,
    MAP_Y_MAX: 630
  };

  var PinSizes = {
    INACTIVE_PIN_WIDTH: 156,
    INACTIVE_PIN_HEIGHT: 156,
    ACTIVE_PIN_WIDTH: 65,
    ACTIVE_PIN_HEIGHT: 77
  };

  var mapXMax = window.popup.map.offsetWidth;

  var mainPinLimits = {
    xMin: MapSizes.MAP_X_MIN - PinSizes.ACTIVE_PIN_WIDTH / 2,
    xMax: mapXMax - PinSizes.ACTIVE_PIN_WIDTH / 2,
    yMin: MapSizes.MAP_Y_MIN - PinSizes.ACTIVE_PIN_HEIGHT,
    yMax: MapSizes.MAP_Y_MAX - PinSizes.ACTIVE_PIN_HEIGHT
  };

  var mapMainPin = window.popup.map.querySelector('.map__pin--main');
  var announcementForm = document.querySelector('.ad-form');
  var announcementAddress = announcementForm.querySelector('#address');

  var limitMainPinCoordinates = function () {
    if (mapMainPin.offsetLeft < mainPinLimits.xMin) {
      mapMainPin.style.left = mainPinLimits.xMin + 'px';
    } else if (mapMainPin.offsetLeft > mainPinLimits.xMax) {
      mapMainPin.style.left = mainPinLimits.xMax + 'px';
    }

    if (mapMainPin.offsetTop < mainPinLimits.yMin) {
      mapMainPin.style.top = mainPinLimits.yMin + 'px';
    } else if (mapMainPin.offsetTop > mainPinLimits.yMax) {
      mapMainPin.style.top = mainPinLimits.yMax + 'px';
    }
  };

  var getAnnouncementAddress = function (isMapActive) {
    var currentPinWidth = isMapActive ? PinSizes.ACTIVE_PIN_WIDTH : PinSizes.INACTIVE_PIN_WIDTH;
    var currentPinHeigth = isMapActive ? PinSizes.ACTIVE_PIN_HEIGHT : PinSizes.INACTIVE_PIN_HEIGHT;

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
    pinSizes: PinSizes,
    mapMainPin: mapMainPin,
    announcementForm: announcementForm,
    announcementAddress: announcementAddress,
    getAnnouncementAddress: getAnnouncementAddress
  };
})();
