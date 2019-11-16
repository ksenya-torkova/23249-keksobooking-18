'use strict';

(function () {
  var DEFAULT_HOUSING_PRICE = 1000;

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

  var closeSuccessBlock = function () {
    var successTemplate = window.backend.pageMain.querySelector('.success');

    if (successTemplate) {
      successTemplate.remove();
      document.removeEventListener('keydown', onSuccessEsc);
    }
  };

  var onSuccessEsc = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeSuccessBlock();
    }
  };

  var onSuccessClick = function () {
    closeSuccessBlock();
  };

  var resetHousingPrice = function () {
    housingPriceSelect.placeholder = DEFAULT_HOUSING_PRICE;
    housingPriceSelect.min = DEFAULT_HOUSING_PRICE;
  };

  var resetForm = function () {
    window.photo.reset();
    window.map.inactivate();
    window.dragAndDrop.announcementForm.reset();
    resetHousingPrice();
  };

  var successMarkup = document.querySelector('#success').content;
  var successTemplate = successMarkup.querySelector('.success');

  var onSuccessLoad = function () {
    var successBlock = successTemplate.cloneNode(true);

    successBlock.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessEsc);

    window.backend.pageMain.insertAdjacentElement('afterbegin', successBlock);
    resetForm();
  };

  window.dragAndDrop.announcementForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.request('post', window.backend.SET_DATA_URL, onSuccessLoad, window.backend.onErrorLoad, new FormData(window.dragAndDrop.announcementForm));
  });

  var announcementFormReset = window.dragAndDrop.announcementForm.querySelector('.ad-form__reset');

  announcementFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });
})();
