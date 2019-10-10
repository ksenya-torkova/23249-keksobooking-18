'use strict';

(function () {
  var pinInactivate = function () {
    var pinActive = window.data.map.querySelector('.map__pin--active');

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
  var filtersBlock = window.data.map.querySelector('.map__filters-container');

  var getAppropriateAnnouncement = function (announcementItem) {
    cardFragment.appendChild(window.template.getTemplateOfCard(announcementItem));
    var currentMapPopup = window.data.map.querySelector('.map__card');

    if (!currentMapPopup) {
      window.data.map.insertBefore(cardFragment, filtersBlock);
    } else {
      window.data.map.replaceChild(cardFragment, currentMapPopup);
    }

    var mapPopup = window.data.map.querySelector('.popup');
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
    pinActivate: pinActivate
  };
})();
