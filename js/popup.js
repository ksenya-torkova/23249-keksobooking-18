'use strict';

(function () {
  var map = document.querySelector('.map');

  var inactivatePin = function () {
    var pinActive = map.querySelector('.map__pin--active');

    if (pinActive) {
      pinActive.classList.remove('map__pin--active');
    }
  };

  var activatePin = function (announcementItem, pin) {
    inactivatePin();

    pin.classList.add('map__pin--active');
    getAppropriateAnnouncement(announcementItem);
  };

  var hidePopup = function () {
    var currentPopup = map.querySelector('.popup');

    if (currentPopup) {
      currentPopup.classList.add('popup--hidden');
    }
  };

  var popupClose = function () {
    var currentPopup = map.querySelector('.popup');
    var mapPopupClose = currentPopup.querySelector('.popup__close');

    mapPopupClose.addEventListener('click', function () {
      hidePopup();
      inactivatePin();
    });
  };

  var cardFragment = document.createDocumentFragment();
  var filtersBlock = map.querySelector('.map__filters-container');

  var getAppropriateAnnouncement = function (announcementItem) {
    cardFragment.appendChild(window.template.getTemplateOfCard(announcementItem));
    var currentMapPopup = map.querySelector('.map__card');

    if (!currentMapPopup) {
      map.insertBefore(cardFragment, filtersBlock);
    } else {
      map.replaceChild(cardFragment, currentMapPopup);
    }

    popupClose();

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        hidePopup();
        inactivatePin();
      }
    });
  };

  window.popup = {
    activate: activatePin,
    hide: hidePopup,
    map: map
  };
})();
