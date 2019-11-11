'use strict';

(function () {
  var IMAGES_FORMATS = ['gif', 'jpg', 'jpeg', 'png', 'svg', 'webp'];

  var avatarUploader = window.dragAndDrop.announcementForm.querySelector('.ad-form-header__input');
  var avatarPreview = window.dragAndDrop.announcementForm.querySelector('.ad-form-header__preview img');
  var defaultAvatarPreview = avatarPreview.src;
  var housingUploader = window.dragAndDrop.announcementForm.querySelector('.ad-form__input');
  var housingPreview = window.dragAndDrop.announcementForm.querySelector('.ad-form__photo img');
  var defaultHousingPreview = housingPreview.src;

  var onAvatarUpload = function (uploader, preview) {
    var avatar = uploader.files[0];

    if (avatar) {
      var fileName = avatar.name.toLowerCase();

      var matches = IMAGES_FORMATS.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var avatarReader = new FileReader();

        avatarReader.addEventListener('load', function () {
          preview.src = avatarReader.result;
        });

        avatarReader.readAsDataURL(avatar);
      }
    }
  };

  avatarUploader.addEventListener('change', function () {
    onAvatarUpload(avatarUploader, avatarPreview);
  });

  housingUploader.addEventListener('change', function () {
    onAvatarUpload(housingUploader, housingPreview);
  });

  var resetUploadedPhotos = function () {
    avatarPreview.src = defaultAvatarPreview;
    housingPreview.src = defaultHousingPreview;
  };

  window.photo = {
    reset: resetUploadedPhotos
  };
})();
