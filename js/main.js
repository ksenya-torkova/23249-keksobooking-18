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

var map = document.querySelector('.map');
var mapXMax = map.offsetWidth;
map.classList.remove('map--faded');

// выбор случайного значения из диапазона
var getRandomInteger = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

// выбор уникального и случайного элемента из массива
var getRandomUniqueItem = function (arr) {
  return arr.splice(getRandomInteger(0, arr.length - 1), 1);
};

// генерация массива случайной длины на основе имеющегося
var getRandomArray = function (arr) {
  var newArray = [];
  var arrCopy = arr.slice();

  for (var i = 0; i < getRandomInteger(0, arr.length); i++) {
    newArray[i] = getRandomUniqueItem(arrCopy);
  }

  return newArray;
};

var createAnnouncement = function (props) {
  var location = {
    x: getRandomInteger(MAP_X_MIN, mapXMax),
    y: getRandomInteger(MAP_Y_MIN, MAP_Y_MAX)
  };

  var announcement = {
    author: {
      avatar: 'img/avatars/user0' + (props.index + 1) + '.png'
    },
    offer: {
      title: 'title',
      address: location.x + ', ' + location.y,
      price: 0,
      type: TYPES[getRandomInteger(0, TYPES.length - 1)],
      rooms: 0,
      guests: 0,
      checkin: CHECK_IN[getRandomInteger(0, CHECK_IN.length - 1)],
      checkout: CHECK_OUT[getRandomInteger(0, CHECK_OUT.length - 1)],
      features: getRandomArray(FEATURES),
      description: 'description',
      photos: getRandomArray(PHOTOS)
    },
    location: {
      x: location.x,
      y: location.y
    }
  };

  return announcement;
};

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
  pinFragment.appendChild(pinMarkup);
};

var renderPins = function () {
  for (var i = 0; i < PINS_AMOUNT; i++) {
    getTemplateOfPin(createAnnouncement({index: i}));
  }

  var pinsBlock = map.querySelector('.map__pins');
  pinsBlock.appendChild(pinFragment);
};

renderPins();

var getFeaturesList = function (list, items) {
  var listClass = list.className;
  var listItemTemplate = cardTemplate.querySelector('.' + listClass + ' li'); // беру первую попавшуюся фичу в списке в качестве шаблона
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

  cardFragment.appendChild(cardMarkup);
};

var announcementItem = createAnnouncement({index: 0});

getTemplateOfCard(announcementItem);

var filtersBlock = map.querySelector('.map__filters-container');

map.insertBefore(cardFragment, filtersBlock);
