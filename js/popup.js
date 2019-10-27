'use strict';

(function () {
  var map = document.querySelector('.map');

  var pinInactivate = function () {
    var pinActive = map.querySelector('.map__pin--active');

    if (pinActive) {
      pinActive.classList.remove('map__pin--active');
    }
  };

  var pinActivate = function (announcementItem, pin) {
    pinInactivate();

    pin.classList.add('map__pin--active');
    getAppropriateAnnouncement(announcementItem);
  };

  var popupHide = function (popup) {
    popup.classList.add('popup--hidden');
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

    var mapPopup = map.querySelector('.popup');
    var mapPopupClose = mapPopup.querySelector('.popup__close');

    mapPopupClose.addEventListener('click', function () {
      popupHide(mapPopup);
      pinInactivate();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        popupHide(mapPopup);
        pinInactivate();
      }
    });
  };

  window.popup = {
    pinActivate: pinActivate,
    map: map
  };
})();
