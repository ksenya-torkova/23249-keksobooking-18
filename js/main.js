'use strict';

var PINS_AMOUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var CHECK_IN = [
  '12:00',
  '13:00',
  '14:00'
];

var CHECK_OUT = [
  '12:00',
  '13:00',
  '14:00'
];

var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var TYPES_DICTIONARY = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var MAP_X_MIN = 0;
var MAP_Y_MIN = 130;
var MAP_Y_MAX = 630;

var pins = [];
var map = document.querySelector('.map');
var mapXMax = map.offsetWidth;
map.classList.remove('map--faded');

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var shuffleArray = function (arr, length) {
  // тасование массива по алгоритму Фишера-Йетса
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }

  // если нужен массив случайной длины, передается и используется параметр length, иначе массив сохраняет исходную длину
  arr.length = length ? length : arr.length;

  return arr;
};

var createAnnouncement = function () {
  for (var i = 0; i < PINS_AMOUNT; i++) {
    pins.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: 'title',
        address: getRandomInteger(MAP_X_MIN, mapXMax) + ', ' + getRandomInteger(MAP_Y_MIN, MAP_Y_MAX),
        price: 0,
        type: TYPES[getRandomInteger(0, TYPES.length - 1)],
        rooms: 0,
        guests: 0,
        checkin: CHECK_IN[getRandomInteger(0, CHECK_IN.length - 1)],
        checkout: CHECK_OUT[getRandomInteger(0, CHECK_OUT.length - 1)],
        features: shuffleArray(FEATURES.slice(), getRandomInteger(0, FEATURES.length)),
        description: 'description',
        photos: shuffleArray(PHOTOS.slice(), getRandomInteger(0, PHOTOS.length))
      },

      location: {
        x: getRandomInteger(MAP_X_MIN, mapXMax),
        y: getRandomInteger(MAP_Y_MIN, MAP_Y_MAX)
      }
    });
  }
};

createAnnouncement();

var pinTemplate = document.querySelector('#pin').content;
var pinTemplateItem = pinTemplate.querySelector('.map__pin');
var pinFragment = document.createDocumentFragment();

var getTemplateOfPin = function (announcementItem) {
  var pinMarkup = pinTemplateItem.cloneNode(true);

  pinMarkup.querySelector('img').src = announcementItem.author.avatar;
  pinMarkup.querySelector('img').alt = announcementItem.offer.title;
  pinMarkup.style.left = (announcementItem.location.x - PIN_WIDTH / 2) + 'px';
  pinMarkup.style.top = (announcementItem.location.y - PIN_HEIGHT) + 'px';
  pinMarkup.tabIndex = '0';

  return pinMarkup;
};

var pinsBlock = map.querySelector('.map__pins');
var renderPins = function () {
  for (var i = 0; i < PINS_AMOUNT; i++) {
    pinFragment.appendChild(getTemplateOfPin(pins[i]));
  }

  pinsBlock.appendChild(pinFragment);
};

renderPins();

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
var cardFragment = document.createDocumentFragment();
var filtersBlock = map.querySelector('.map__filters-container');

var getTemplateOfCard = function (announcementItem) {
  var cardMarkup = cardTemplateItem.cloneNode(true);

  cardMarkup.querySelector('.popup__avatar').src = announcementItem.author.avatar;
  cardMarkup.querySelector('.popup__title').textContent = announcementItem.offer.title;
  cardMarkup.querySelector('.popup__text--address').textContent = announcementItem.offer.address;
  cardMarkup.querySelector('.popup__text--price').textContent = announcementItem.offer.price + '₽/ночь';
  cardMarkup.querySelector('.popup__type').textContent = TYPES_DICTIONARY[announcementItem.offer.type];
  cardMarkup.querySelector('.popup__text--capacity').textContent = announcementItem.offer.rooms + ' комнаты для ' + announcementItem.offer.guests + ' гостей';
  cardMarkup.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcementItem.offer.checkin + ' выезд до ' + announcementItem.offer.checkout;
  cardMarkup.querySelector('.popup__description').textContent = announcementItem.offer.description;

  var cardFeaturesList = cardMarkup.querySelector('.popup__features');
  getFeaturesList(cardFeaturesList, announcementItem.offer.features);

  var cardPhotosBlock = cardMarkup.querySelector('.popup__photos');
  getCardPhotos(cardPhotosBlock, announcementItem.offer.photos);

  return cardMarkup;
};

cardFragment.appendChild(getTemplateOfCard(pins[0]));

map.insertBefore(cardFragment, filtersBlock);
