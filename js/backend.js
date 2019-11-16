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
  var errorMarkup = document.querySelector('#error').content;
  var errorTemplate = errorMarkup.querySelector('.error');

  var closeErrorBlock = function () {
    var error = pageMain.querySelector('.error');

    if (error) {
      error.remove();
      document.removeEventListener('keydown', onErrorEsc);
    }
  };

  var onErrorEsc = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeErrorBlock();
    }
  };

  var onErrorClick = function () {
    closeErrorBlock();
  };

  var onErrorLoad = function (message) {
    var error = errorTemplate.cloneNode(true);
    var errorText = error.querySelector('.error__message');

    errorText.textContent = message;
    pageMain.insertAdjacentElement('afterbegin', error);

    error.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onErrorEsc);
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
