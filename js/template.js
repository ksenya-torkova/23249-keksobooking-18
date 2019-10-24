'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  window.data.request(window.data.createAnnouncement, window.data.onErrorLoad);

  var getFeaturesList = function (list, items) {
    var listClass = list.className;
    var listItemTemplate = cardTemplate.querySelector('.' + listClass + ' li');
    var cardListFragment = document.createDocumentFragment();

    for (var i = 0; i < items.length; i++) {
      var listItemMarkup = listItemTemplate.cloneNode(true);
      listItemMarkup.className = 'popup__feature' + ' popup__feature--' + items[i];
      cardListFragment.appendChild(listItemMarkup);
    }

    list.innerHTML = '';
    list.appendChild(cardListFragment);
  };

  var getCardPhotos = function (block, items) {
    var blockClass = block.className;
    var blockItemTemplate = cardTemplate.querySelector('.' + blockClass + ' .popup__photo');
    var cardblockFragment = document.createDocumentFragment();

    for (var i = 0; i < items.length; i++) {
      var blockItemMarkup = blockItemTemplate.cloneNode(true);
      blockItemMarkup.src = items[i];
      cardblockFragment.appendChild(blockItemMarkup);
    }

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
    cardMarkup.querySelector('.popup__type').textContent = window.data.HOUSING_DATA[announcementItem.offer.type].ru;
    cardMarkup.querySelector('.popup__text--capacity').textContent =
      announcementItem.offer.rooms + ' ' + window.utils.numDecline(announcementItem.offer.rooms, 'комната', 'комнаты', 'комнат') + ' для ' +
      announcementItem.offer.guests + ' ' + window.utils.numDecline(announcementItem.offer.guests, 'гостя', 'гостей', 'гостей');
    cardMarkup.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcementItem.offer.checkin + ' выезд до ' + announcementItem.offer.checkout;
    cardMarkup.querySelector('.popup__description').textContent = announcementItem.offer.description;

    var cardFeaturesList = cardMarkup.querySelector('.popup__features');
    getFeaturesList(cardFeaturesList, announcementItem.offer.features);

    var cardPhotosBlock = cardMarkup.querySelector('.popup__photos');
    getCardPhotos(cardPhotosBlock, announcementItem.offer.photos);

    return cardMarkup;
  };

  var pinFragment = document.createDocumentFragment();
  var pinsBlock = window.data.map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content;
  var pinTemplateItem = pinTemplate.querySelector('.map__pin');

  var getTemplateOfPin = function (announcementItem) {
    var pinMarkup = pinTemplateItem.cloneNode(true);

    pinMarkup.querySelector('img').src = announcementItem.author.avatar;
    pinMarkup.querySelector('img').alt = announcementItem.offer.title;
    pinMarkup.style.left = (announcementItem.location.x - PIN_WIDTH / 2) + 'px';
    pinMarkup.style.top = (announcementItem.location.y - PIN_HEIGHT) + 'px';
    pinMarkup.tabIndex = '0';

    pinMarkup.addEventListener('click', function () {
      window.popup.pinActivate(announcementItem, pinMarkup);
    });

    pinMarkup.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ENTER_KEYCODE) {
        window.popup.pinActivate(announcementItem, pinMarkup);
      }
    });

    return pinMarkup;
  };

  var renderPins = function (announcementItems) {
    for (var i = 0; i < announcementItems.length; i++) {
      pinFragment.appendChild(getTemplateOfPin(announcementItems[i]));
    }

    pinsBlock.appendChild(pinFragment);
  };

  window.template = {
    getTemplateOfCard: getTemplateOfCard,
    renderPins: renderPins
  };
})();
