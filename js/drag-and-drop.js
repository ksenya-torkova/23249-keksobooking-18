'use strict';

(function () {
  var MAP_MAIN_PIN_EDGE_HEIGHT = 22;
  var mapMainPin = window.data.map.querySelector('.map__pin--main');
  var mapMainPinWidth = mapMainPin.offsetWidth;
  var mapMainPinActiveHeight = mapMainPin.offsetHeight + MAP_MAIN_PIN_EDGE_HEIGHT;
  var announcementForm = document.querySelector('.ad-form');
  var announcementAddress = announcementForm.querySelector('#address');
  var mapMainPinDefaultX = mapMainPin.offsetLeft;
  var mapMainPinDefaultY = mapMainPin.offsetTop;

  mapMainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    announcementAddress.value = (parseInt(mapMainPin.style.left, 10) - mapMainPinWidth / 2).toFixed() +
    ', ' + (parseInt(mapMainPin.style.top, 10) - mapMainPinActiveHeight / 2).toFixed();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mainPinStyleTop = mapMainPinDefaultY;
    var mainPinStyleLeft = mapMainPinDefaultX;

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

      if (startCoordinates.x < mapMainPinDefaultX) {
        mainPinStyleLeft = mapMainPin.offsetLeft - shift.x >= window.data.MAP_X_MIN ? mapMainPin.offsetLeft - shift.x : window.data.MAP_X_MIN;
      }

      if (startCoordinates.x > mapMainPinDefaultX) {
        mainPinStyleLeft = mapMainPin.offsetLeft + mapMainPinWidth - shift.x <= window.data.mapXMax ? mapMainPin.offsetLeft - shift.x : window.data.mapXMax - mapMainPinWidth;
      }

      if (startCoordinates.y < mapMainPinDefaultY) {
        mainPinStyleTop = mapMainPin.offsetTop - shift.y >= window.data.MAP_Y_MIN ? mapMainPin.offsetTop - shift.y : window.data.MAP_Y_MIN;
      }

      if (startCoordinates.y > mapMainPinDefaultY) {
        mainPinStyleTop = mapMainPin.offsetTop - shift.y <= window.data.MAP_Y_MAX ? mapMainPin.offsetTop - shift.y : window.data.MAP_Y_MAX;
      }

      mapMainPin.style.top = mainPinStyleTop + 'px';
      mapMainPin.style.left = mainPinStyleLeft + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      announcementAddress.value = (parseInt(mapMainPin.style.left, 10) - mapMainPinWidth / 2).toFixed() +
      ', ' + (parseInt(mapMainPin.style.top, 10) - mapMainPinActiveHeight / 2).toFixed();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.dragAndDrop = {
    mapMainPin: mapMainPin,
    announcementForm: announcementForm,
    announcementAddress: announcementAddress,
    mapMainPinWidth: mapMainPinWidth
  };
})();
