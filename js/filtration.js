'use strict';

(function () {
  var pinsData = [];

  // var housingSelect = mapFilters.querySelector('#housing-type');
  // var defaultHousingSelectValue = housingSelect.value;
  //
  // var updatePins = function () {
  //   var filtratedPins = pinsData.filter(function (it) {
  //     return it.offer.type === housingSelect.value;
  //   });
  //
  //   window.template.renderPins(filtratedPins);
  // };
  //
  var onSuccessPinsLoad = function (data) {
    pinsData = data;
    window.template.renderPins(pinsData);
  };
  //
  // housingSelect.addEventListener('change', function () {
  //   window.template.clearPins();
  //   window.popup.hide();
  //
  //   if (housingSelect.value === defaultHousingSelectValue) {
  //     window.template.renderPins(pinsData);
  //   }
  //
  //   updatePins();
  // });

  var mapFilters = window.popup.map.querySelector('.map__filters');

  var priceMap = {
    'low': {
      start: 0,
      end: 1000
    },
    'middle': {
      start: 10000,
      end: 50000
    },
    'high': {
      start: 50000,
      end: Infinity
    }
  };

  var filterRules = {
    'housing-type': function (data, filter) {
      return data.offer.type === filter.value;
    },

    'housing-price': function (data, filter) {
      return data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end;
    },

    'housing-rooms': function (data, filter) {
      return filter.value === data.offer.rooms.toString();
    },

    'housing-guests': function (data, filter) {
      return filter.value === data.offer.guests.toString();
    },

    'housing-features': function (data, filter) {
      var checkListElements = Array.from(filter.querySelectorAll('input[type=checkbox]:checked'));

      return checkListElements.every(function (it) {
        return data.offer.features.some(function (feature) {
          return feature === it.value;
        });
      });
    }
  };

  var getFilterData = function (data, elements) {
    return data.filter(function (item) {
      return elements.every(function (filter) {
        return (filter.value === 'any') ? true : filterRules[filter.id](item, filter);
      });
    });
  };

  var onFormFiltersChange = window.util.debounce(function () {
    var filterElements = [];

    filterElements = Array.from(mapFilters.children);
    window.template.clearPins();
    window.popup.hide();
    window.template.renderPins(getFilterData(pinsData, filterElements));
  });

  mapFilters.addEventListener('change', onFormFiltersChange);

  window.filtration = {
    mapFilters: mapFilters,
    onSuccessPinsLoad: onSuccessPinsLoad
  };
})();
