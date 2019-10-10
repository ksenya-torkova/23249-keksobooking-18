'use strict';

(function () {
  var pinFragment = document.createDocumentFragment();
  var pinsBlock = window.data.map.querySelector('.map__pins');

  var renderPins = function () {
    for (var i = 0; i < window.data.PINS_AMOUNT; i++) {
      pinFragment.appendChild(window.template.getTemplateOfPin(window.data.pins[i]));
    }

    pinsBlock.appendChild(pinFragment);
  };

  window.pin = {
    renderPins: renderPins
  };
})();
