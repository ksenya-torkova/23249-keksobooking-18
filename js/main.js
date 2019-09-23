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

var map = document.querySelector('.map');

var MAP_X_MIN = 0;
var MAP_X_MAX = map.offsetWidth;
var MAP_Y_MIN = 130;
var MAP_Y_MAX = 630;

map.classList.remove('map--faded');

var getRandomInteger = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

var createAnnouncement = function (props) {
  var photos = PHOTOS;
  photos.length = getRandomInteger(0, PHOTOS.length);
  var features = FEATURES;
  features.length = getRandomInteger(0, FEATURES.length);
  var location = {
    x: getRandomInteger(MAP_X_MIN, MAP_X_MAX),
    y: getRandomInteger(MAP_Y_MIN, MAP_Y_MAX)
  };

  var announcement = {
    author: {
      avatar: 'img/avatars/user0' + (props.index + 1) + '.png'
    },
    offer: {
      title: '',
      address: location.x + ', ' + location.y,
      price: 0,
      type: TYPES[getRandomInteger(0, TYPES.length - 1)],
      rooms: 0,
      guests: 0,
      checkin: CHECK_IN[getRandomInteger(0, CHECK_IN.length - 1)],
      checkout: CHECK_OUT[getRandomInteger(0, CHECK_OUT.length - 1)],
      features: features,
      description: '',
      photos: photos
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
