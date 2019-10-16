'use strict';

(function () {
  var filterForm = window.data.map.querySelector('.map__filters');
  var filterFormSection = filterForm.querySelector('fieldset');
  var filterFormSelects = filterForm.querySelector('select');
  var announcementFormSections = window.dragAndDrop.announcementForm.querySelectorAll('fieldset');

  var inactivateMap = function () {
    window.data.map.classList.add('map--faded');
    window.dragAndDrop.announcementForm.classList.add('ad-form--disabled');
    filterFormSection.disabled = 'disabled';

    for (var i = 0; i < filterFormSelects.length; i++) {
      filterFormSelects[i].disabled = 'disabled';
    }

    for (var j = 0; j < announcementFormSections.length; j++) {
      announcementFormSections[j].disabled = 'disabled';
    }

    window.dragAndDrop.announcementAddress.value = window.dragAndDrop.getAnnouncementAddress(false);
  };

  inactivateMap();

  var activateMap = function () {
    window.data.map.classList.remove('map--faded');
    window.dragAndDrop.announcementForm.classList.remove('ad-form--disabled');
    filterFormSection.disabled = '';

    window.data.createAnnouncement();
    window.pin.renderPins();

    for (var i = 0; i < filterFormSelects.length; i++) {
      filterFormSelects[i].disabled = '';
    }

    for (var j = 0; j < announcementFormSections.length; j++) {
      announcementFormSections[j].disabled = '';
    }

    window.dragAndDrop.mapMainPin.removeEventListener('mousedown', activateMap);
  };

  window.dragAndDrop.mapMainPin.addEventListener('mousedown', activateMap);

  window.dragAndDrop.mapMainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      activateMap();
    }
  });
})();
