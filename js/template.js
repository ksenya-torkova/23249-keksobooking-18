'use strict';

(function () {
  var PinSettings = {
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,
    PIN_MAX_AMOUNT: 5
  };

  var getFeaturesList = function (list, items) {
    var listClass = list.className;
    var listItemTemplate = cardTemplate.querySelector('.' + listClass + ' li');
    var cardListFragment = document.createDocumentFragment();

    items.forEach(function (item) {
      var listItemMarkup = listItemTemplate.cloneNode(true);
      listItemMarkup.className = 'popup__feature' + ' popup__feature--' + item;
      cardListFragment.appendChild(listItemMarkup);
    });

    list.innerHTML = '';
    list.appendChild(cardListFragment);
  };

  var getCardPhotos = function (block, items) {
    var blockClass = block.className;
    var blockItemTemplate = cardTemplate.querySelector('.' + blockClass + ' .popup__photo');
    var cardblockFragment = document.createDocumentFragment();

    items.forEach(function (item) {
      var blockItemMarkup = blockItemTemplate.cloneNode(true);
      blockItemMarkup.src = item;
      cardblockFragment.appendChild(blockItemMarkup);
    });

    block.innerHTML = '';
    block.appendChild(cardblockFragment);
  };

  var cardTemplate = document.querySelector('#card').content;
  var cardTemplateItem = cardTemplate.querySelector('.map__card');

  var getTemplateOfCard = function (announcementItem) {
    var cardMarkup = cardTemplateItem.cloneNode(true);

    cardMarkup.querySelector('.popup__avatar').src = announcementItem.author.avatar;
    cardMarkup.querySelector('.popup__title').textContent = announcementItem.offer.title;
    cardMarkup.querySelector('.popup__text--address').textContent = announcementItem.offer.address;
    cardMarkup.querySelector('.popup__text--price').textContent = announcementItem.offer.price + '₽/ночь';
    cardMarkup.querySelector('.popup__type').textContent = window.util.HOUSING_DATA[announcementItem.offer.type].ru;
    cardMarkup.querySelector('.popup__text--capacity').textContent =
      announcementItem.offer.rooms + ' ' + window.util.numDecline(announcementItem.offer.rooms, 'комната', 'комнаты', 'комнат') + ' для ' +
      announcementItem.offer.guests + ' ' + window.util.numDecline(announcementItem.offer.guests, 'гостя', 'гостей', 'гостей');
    cardMarkup.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcementItem.offer.checkin + ' выезд до ' + announcementItem.offer.checkout;
    cardMarkup.querySelector('.popup__description').textContent = announcementItem.offer.description;

    var cardFeaturesList = cardMarkup.querySelector('.popup__features');
    getFeaturesList(cardFeaturesList, announcementItem.offer.features);

    var cardPhotosBlock = cardMarkup.querySelector('.popup__photos');
    getCardPhotos(cardPhotosBlock, announcementItem.offer.photos);

    return cardMarkup;
  };

  var pinFragment = document.createDocumentFragment();
  var pinsBlock = window.popup.map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content;
  var pinTemplateItem = pinTemplate.querySelector('.map__pin');

  var getTemplateOfPin = function (announcementItem) {
    var pinMarkup = pinTemplateItem.cloneNode(true);

    pinMarkup.querySelector('img').src = announcementItem.author.avatar;
    pinMarkup.querySelector('img').alt = announcementItem.offer.title;
    pinMarkup.style.left = (announcementItem.location.x - PinSettings.PIN_WIDTH / 2) + 'px';
    pinMarkup.style.top = (announcementItem.location.y - PinSettings.PIN_HEIGHT) + 'px';
    pinMarkup.tabIndex = '0';

    pinMarkup.addEventListener('click', function () {
      window.popup.activate(announcementItem, pinMarkup);
    });

    pinMarkup.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        window.popup.activate(announcementItem, pinMarkup);
      }
    });

    return pinMarkup;
  };

  var renderPins = function (announcementItems) {
    window.map.pinsData = announcementItems;

    for (var i = 0; i < announcementItems.length && i < PinSettings.PIN_MAX_AMOUNT; i++) {
      pinFragment.appendChild(getTemplateOfPin(announcementItems[i]));
    }

    pinsBlock.appendChild(pinFragment);
  };

  var clearPins = function () {
    var pins = pinsBlock.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  window.template = {
    getCard: getTemplateOfCard,
    renderPins: renderPins,
    clearPins: clearPins
  };
})();
