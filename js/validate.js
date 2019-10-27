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
    housingPriceSelect.placeholder = window.data.HOUSING_DATA[housingTypeSelect.value].price;
    housingPriceSelect.min = window.utils.HOUSING_DATA[housingTypeSelect.value].price;
  });
})();
