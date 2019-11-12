'use strict';

(function () {
  var ROOMS_AMOUNT_VALUES = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var roomNumberSelect = window.dragAndDrop.announcementForm.querySelector('#room_number');
  var roomCapacitySelect = window.dragAndDrop.announcementForm.querySelector('#capacity');

  var checkRoomsValidity = function () {
    if (roomCapacitySelect.options.length > 0) {
      [].forEach.call(roomCapacitySelect.options, function (item) {
        item.selected = ROOMS_AMOUNT_VALUES[roomNumberSelect.value][0] === item.value;
        item.hidden = !(ROOMS_AMOUNT_VALUES[roomNumberSelect.value].indexOf(item.value) >= 0);
      });
    }
  };

  roomNumberSelect.addEventListener('change', function () {
    checkRoomsValidity();
  });

  var timeInSelect = window.dragAndDrop.announcementForm.querySelector('#timein');
  var timeOutSelect = window.dragAndDrop.announcementForm.querySelector('#timeout');

  timeInSelect.addEventListener('change', function () {
    timeOutSelect.value = timeInSelect.value;
  });

  timeOutSelect.addEventListener('change', function () {
    timeInSelect.value = timeOutSelect.value;
  });

  var housingTypeSelect = window.dragAndDrop.announcementForm.querySelector('#type');
  var housingPriceSelect = window.dragAndDrop.announcementForm.querySelector('#price');

  housingTypeSelect.addEventListener('change', function () {
    housingPriceSelect.placeholder = window.util.HOUSING_DATA[housingTypeSelect.value].price;
    housingPriceSelect.min = window.util.HOUSING_DATA[housingTypeSelect.value].price;
  });

  var successTemplate = document.querySelector('#success').content;
  var successBlock = successTemplate.querySelector('.success');

  var hideSuccessNote = function () {
    successBlock.classList.add('success--hidden');
  };

  var onSuccessLoad = function () {
    successBlock.addEventListener('click', hideSuccessNote);

    window.backend.pageMain.insertAdjacentElement('afterbegin', successBlock);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        hideSuccessNote();
      }
    });

    window.dragAndDrop.announcementForm.reset();
    window.photo.reset();
    window.map.inactivate();
  };

  window.dragAndDrop.announcementForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.request('post', window.backend.SET_DATA_URL, onSuccessLoad, window.backend.onErrorLoad, new FormData(window.dragAndDrop.announcementForm));
  });

  var announcementFormReset = window.dragAndDrop.announcementForm.querySelector('.ad-form__reset');

  announcementFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.dragAndDrop.announcementForm.reset();
    window.map.inactivate();
    window.photo.reset();
  });
})();
