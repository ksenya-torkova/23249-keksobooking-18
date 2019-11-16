'use strict';

(function () {
  var IMAGES_FORMATS = ['gif', 'jpg', 'jpeg', 'png', 'svg', 'webp'];

  var HousingPreview = {
    ALT: 'фото жилья',
    WIDTH: 70,
    HEIGHT: 70
  };

  var avatarUploader = window.dragAndDrop.announcementForm.querySelector('.ad-form-header__input');
  var avatarPreview = window.dragAndDrop.announcementForm.querySelector('.ad-form-header__preview img');
  var defaultAvatarPreview = avatarPreview.src;
  var housingUploader = window.dragAndDrop.announcementForm.querySelector('.ad-form__input');
  var housingPreview = window.dragAndDrop.announcementForm.querySelector('.ad-form__photo');
  var housingPreviewImg = document.createElement('img');

  housingPreviewImg.alt = HousingPreview.ALT;
  housingPreviewImg.width = HousingPreview.WIDTH;
  housingPreviewImg.height = HousingPreview.HEIGHT;

  var onAvatarUpload = function (uploader, preview) {
    var avatar = uploader.files[0];

    if (avatar) {
      var fileName = avatar.name.toLowerCase();

      var matches = IMAGES_FORMATS.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var avatarReader = new FileReader();

        if (preview.tagName.toLowerCase() === 'img') {
          avatarReader.addEventListener('load', function () {
            preview.src = avatarReader.result;
          });
        } else {
          preview.insertAdjacentElement('afterbegin', housingPreviewImg);

          avatarReader.addEventListener('load', function () {
            housingPreviewImg.src = avatarReader.result;
          });
        }

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
    housingPreviewImg.remove();
  };

  window.photo = {
    reset: resetUploadedPhotos
  };
})();
