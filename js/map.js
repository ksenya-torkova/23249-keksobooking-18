'use strict';

(function () {
  var MAP_MAIN_PIN_EDGE_HEIGHT = 22;

  var mapMainPin = window.data.map.querySelector('.map__pin--main');
  var mapMainPinWidth = mapMainPin.offsetWidth;
  var mapMainPinHeight = mapMainPin.offsetHeight;
  var mapMainPinActiveHeight = mapMainPin.offsetHeight + MAP_MAIN_PIN_EDGE_HEIGHT;
  var filterForm = window.data.map.querySelector('.map__filters');
  var filterFormSection = filterForm.querySelector('fieldset');
  var filterFormSelects = filterForm.querySelector('select');
  var announcementForm = document.querySelector('.ad-form');
  var announcementFormSections = announcementForm.querySelectorAll('fieldset');
  var announcementAddress = announcementForm.querySelector('#address');

  var inactivateMap = function () {
    window.data.map.classList.add('map--faded');
    announcementForm.classList.add('ad-form--disabled');
    filterFormSection.disabled = 'disabled';

    for (var i = 0; i < filterFormSelects.length; i++) {
      filterFormSelects[i].disabled = 'disabled';
    }

    for (var j = 0; j < announcementFormSections.length; j++) {
      announcementFormSections[j].disabled = 'disabled';
    }

    announcementAddress.value = (parseInt(mapMainPin.style.left, 10) - mapMainPinWidth / 2).toFixed() + ', ' + (parseInt(mapMainPin.style.top, 10) - mapMainPinHeight / 2).toFixed();
  };

  inactivateMap();

  var activateMap = function () {
    window.data.map.classList.remove('map--faded');
    announcementForm.classList.remove('ad-form--disabled');
    filterFormSection.disabled = '';

    window.data.createAnnouncement();
    window.pin.renderPins();

    for (var i = 0; i < filterFormSelects.length; i++) {
      filterFormSelects[i].disabled = '';
    }

    for (var j = 0; j < announcementFormSections.length; j++) {
      announcementFormSections[j].disabled = '';
    }

    announcementAddress.value = (parseInt(mapMainPin.style.left, 10) - mapMainPinWidth / 2).toFixed() + ', ' + (parseInt(mapMainPin.style.top, 10) - mapMainPinActiveHeight / 2).toFixed();

    mapMainPin.removeEventListener('mousedown', activateMap);
  };

  mapMainPin.addEventListener('mousedown', activateMap);

  mapMainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      activateMap();
    }
  });

  window.map = {
    announcementForm: announcementForm
  };
})();
