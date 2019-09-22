'use strict';

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
    x: getRandomInteger(0, 1200),
    y: getRandomInteger(130, 630)
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

createAnnouncement({index: 1});
