'use strict';

(function () {
  var filterForm = window.popup.map.querySelector('.map__filters');
  var filterFormSection = filterForm.querySelector('fieldset');
  var filterFormSelects = filterForm.querySelector('select');
  var announcementFormSections = window.dragAndDrop.announcementForm.querySelectorAll('fieldset');
  var mainPinStartCoords = {
    x: window.dragAndDrop.mapMainPin.offsetLeft,
    y: window.dragAndDrop.mapMainPin.offsetTop
  };

  var inactivate = function () {
    window.popup.map.classList.add('map--faded');
    window.dragAndDrop.announcementForm.classList.add('ad-form--disabled');
    filterFormSection.disabled = 'disabled';

    for (var i = 0; i < filterFormSelects.length; i++) {
      filterFormSelects[i].disabled = 'disabled';
    }

    for (var j = 0; j < announcementFormSections.length; j++) {
      announcementFormSections[j].disabled = 'disabled';
    }

    window.dragAndDrop.mapMainPin.style.left = mainPinStartCoords.x + 'px';
    window.dragAndDrop.mapMainPin.style.top = mainPinStartCoords.y + 'px';

    window.dragAndDrop.announcementAddress.value = window.dragAndDrop.getAnnouncementAddress(false);

    window.template.clearPins();
    window.popup.hide();
    window.filtration.mapFilters.reset();

    window.dragAndDrop.mapMainPin.addEventListener('mousedown', activate);
  };

  inactivate();

  var activate = function () {
    window.popup.map.classList.remove('map--faded');
    window.dragAndDrop.announcementForm.classList.remove('ad-form--disabled');
    filterFormSection.disabled = '';

    window.backend.request('get', window.backend.GET_DATA_URL, window.filtration.onSuccessPinsLoad, window.backend.onErrorLoad);

    for (var i = 0; i < filterFormSelects.length; i++) {
      filterFormSelects[i].disabled = '';
    }

    for (var j = 0; j < announcementFormSections.length; j++) {
      announcementFormSections[j].disabled = '';
    }

    window.dragAndDrop.mapMainPin.removeEventListener('mousedown', activate);
  };

  window.dragAndDrop.mapMainPin.addEventListener('mousedown', activate);

  window.dragAndDrop.mapMainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      activate();
    }
  });

  window.map = {
    inactivate: inactivate
  };
})();
