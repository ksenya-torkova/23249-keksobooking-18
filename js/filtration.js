'use strict';

(function () {
  var pinsData = [];
  var mapFilters = window.popup.map.querySelector('.map__filters');
  var housingSelect = mapFilters.querySelector('#housing-type');
  var defaultHousingSelectValue = housingSelect.value;

  var updatePins = function () {
    var filtratedPins = pinsData.filter(function (it) {
      return it.offer.type === housingSelect.value;
    });

    window.template.renderPins(filtratedPins);
  };

  var onSuccessPinsLoad = function (data) {
    pinsData = data;
    window.template.renderPins(pinsData);
  };

  housingSelect.addEventListener('change', function () {
    window.template.clearPins();
    window.popup.hide();

    if (housingSelect.value === defaultHousingSelectValue) {
      window.template.renderPins(pinsData);
    }

    updatePins();
  });

  window.filtration = {
    mapFilters: mapFilters,
    onSuccessPinsLoad: onSuccessPinsLoad
  };
})();
