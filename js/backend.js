'use strict';

(function () {
  var XHR_TIMEOUT = 10000;

  var Urls = {
    GET_DATA: 'https://js.dump.academy/keksobooking/data',
    SET_DATA: 'https://js.dump.academy/keksobooking'
  };

  var RequestCodes = {
    SUCCESS: 200,
    ERROR: 400,
    USER_ERROR: 401,
    DATA_ERROR: 404
  };

  var pageMain = document.querySelector('.page-main');

  var onErrorLoad = function (message) {
    var errorTemplate = document.querySelector('#error').content;
    var errorBlock = errorTemplate.querySelector('.error');

    errorBlock.addEventListener('click', function () {
      errorBlock.classList.add('error--hidden');
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        errorBlock.classList.add('error--hidden');
      }
    });

    var errorText = errorBlock.querySelector('.error__message');

    errorText.textContent = message;
    pageMain.insertAdjacentElement('afterbegin', errorBlock);
  };

  var getRequestStatus = function (request) {
    var error;

    switch (request.status) {
      case RequestCodes.ERROR:
        error = 'Неверный запрос';
        break;
      case RequestCodes.USER_ERROR:
        error = 'Пользователь не авторизован';
        break;
      case RequestCodes.DATA_ERROR:
        error = 'Ничего не найдено';
        break;
      default:
        error = 'Cтатус ответа: ' + request.status + ' ' + request.statusText;
    }

    return error;
  };

  var request = function (method, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = XHR_TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === RequestCodes.SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError(getRequestStatus(xhr));
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(method, url);

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  window.backend = {
    GET_DATA_URL: Urls.GET_DATA,
    SET_DATA_URL: Urls.SET_DATA,
    pageMain: pageMain,
    request: request,
    onErrorLoad: onErrorLoad
  };
})();
