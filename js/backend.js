'use strict';

(function () {
  var GET_DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var XHR_TIMEOUT = 10000;
  var REQUEST_SUCCESS_CODE = 200;
  var REQUEST_ERROR = 400;
  var USER_REQUEST_ERROR = 401;
  var DATA_REQUEST_ERROR = 404;

  var onErrorLoad = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content;
    var errorBlock = errorTemplate.querySelector('.error');
    var errorText = errorBlock.querySelector('.error__message');

    errorText.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorBlock);
  };

  var getRequestStatus = function (request) {
    var error;

    switch (request.status) {
      case REQUEST_ERROR:
        error = 'Неверный запрос';
        break;
      case USER_REQUEST_ERROR:
        error = 'Пользователь не авторизован';
        break;
      case DATA_REQUEST_ERROR:
        error = 'Ничего не найдено';
        break;
      default:
        error = 'Cтатус ответа: ' + request.status + ' ' + request.statusText;
    }

    return error;
  };

  var request = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = XHR_TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === REQUEST_SUCCESS_CODE) {
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

    xhr.open('get', GET_DATA_URL);
    xhr.send();
  };

  window.backend = {
    request: request,
    onErrorLoad: onErrorLoad,
  };
})();
