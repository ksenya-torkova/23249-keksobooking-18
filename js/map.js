'use strict';

(function () {
  var filterForm = window.popup.map.querySelector('.map__filters');
  var filterFormComponents = filterForm.querySelectorAll('fieldset, select');
  var announcementFormSections = window.dragAndDrop.announcementForm.querySelectorAll('fieldset');
  var formComponents = Array.from(filterFormComponents).concat(Array.from(announcementFormSections));

  var mainPinStartCoords = {
    x: window.dragAndDrop.mapMainPin.offsetLeft,
    y: window.dragAndDrop.mapMainPin.offsetTop
  };

  var toggleFormActivity = function (formElements) {
    formElements.forEach(function (formElement) {
      formElement.disabled = !formElement.disabled;
    });
  };

  var inactivateMap = function () {
    window.popup.map.classList.add('map--faded');
    window.dragAndDrop.announcementForm.classList.add('ad-form--disabled');

    toggleFormActivity(formComponents);

    window.dragAndDrop.mapMainPin.style.left = mainPinStartCoords.x + 'px';
    window.dragAndDrop.mapMainPin.style.top = mainPinStartCoords.y + 'px';

    window.dragAndDrop.announcementAddress.value = window.dragAndDrop.getAnnouncementAddress(false);

    window.template.clearPins();
    window.popup.hide();
    window.filtration.mapFilters.reset();

    window.dragAndDrop.mapMainPin.addEventListener('mousedown', activateMap);
  };

  inactivateMap();

  var activateMap = function () {
    window.popup.map.classList.remove('map--faded');
    window.dragAndDrop.announcementForm.classList.remove('ad-form--disabled');

    window.backend.request('get', window.backend.GET_DATA_URL, window.filtration.onSuccessPinsLoad, window.backend.onErrorLoad);

    toggleFormActivity(formComponents);

    window.dragAndDrop.mapMainPin.removeEventListener('mousedown', activateMap);
  };

  window.dragAndDrop.mapMainPin.addEventListener('mousedown', activateMap);

  window.dragAndDrop.mapMainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      activateMap();
    }
  });

  window.map = {
    inactivate: inactivateMap
  };
})();
