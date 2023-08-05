"use strict";

window.addEventListener('load', function () {
  //Добавляем показ пароля при клике на иконку
  var btn = document.querySelectorAll('.show-password');
  btn.forEach(function (e) {
    e.addEventListener('click', function () {
      e.classList.toggle('active');

      if (e.classList.contains('active')) {
        var input = e.closest('div').querySelector('input');
        input.type = 'text';
      } else {
        var _input = e.closest('div').querySelector('input');

        _input.type = 'password';
      }
    });
  }); // SideBar

  var Logo = document.querySelector('.sidebar-header img');
  var SideBar = document.querySelector('.sidebar');
  var SideBarToggle = SideBar.querySelector('.sidebar-items__close-item');
  var Content = document.querySelector('.content');
  var ContentW = Content.offsetWidth;
  var contentFormWelcomeBtn = document.querySelector('.content-form__welcome-btn');
  var contentFormWelcome = document.querySelector('.content-form__welcome');
  var contentFormBar = document.querySelectorAll('.content-form__bar-items .content-form__bar-item');
  var contentFormStep = document.querySelector('.content-form__step');
  var contentFormStepNext = document.querySelector('.content-form__step-next');
  var contentFormAcquaintance = document.querySelector('.content-form__acquaintance');
  var contentFormAcquaintanceSelect = contentFormAcquaintance.querySelectorAll('select');
  var contentFormSelectRole = document.querySelector('.content-form__selectRole');
  var contentFormOPF = document.querySelector('.content-form__OPF');
  var contentFormEnd = document.querySelector('.content-form__end');
  var contentFormSelectRoleItem = contentFormSelectRole.querySelectorAll('.content-form__selectRole-item');
  var contentFormSelectORFItem = contentFormOPF.querySelectorAll('.content-form__OPF-item');
  var nextButtons = document.querySelectorAll('.form-step-next');
  var contentInfobarItems = document.querySelectorAll('.content-infobar .content-infobar__item');

  if (contentFormWelcome.classList.contains('swiper-slide-active')) {
    contentFormStep.style.opacity = '0';
    contentFormBar.forEach(function (e) {
      e.classList.add('disable');
    });
  }

  SideBarToggle.addEventListener('click', function () {
    SideBar.classList.toggle('close');
    var windowWidth = window.innerWidth;

    if (SideBar.classList.contains('close')) {
      Logo.style.width = '45px';
      Logo.src = '/img/register/logo.svg';

      if (windowWidth <= 1580) {
        Content.style.width = "".concat(ContentW + 80, "px");
      } else {
        Content.style.width = "".concat(ContentW + 120, "px");
      }
    } else {
      Logo.style.width = '125px';
      Logo.src = '/img/Logo.svg';

      if (windowWidth <= 1580) {
        Content.style.width = "".concat(ContentW - 20, "px");
      } else {
        Content.style.width = "".concat(ContentW - 120, "px");
      }
    }
  });
  var swiper = new Swiper(".content-form__items", {
    navigation: {
      prevEl: ".form-step-prev"
    },
    allowTouchMove: false
  });
  nextButtons[0].addEventListener('click', function () {
    swiper.slideNext();

    if (contentFormAcquaintance.classList.contains('swiper-slide-active')) {
      contentFormBar[0].classList.remove('disable');
      contentFormStep.style.opacity = '1';
    }
  }); // Обработчик клика для второй кнопки "Next"

  nextButtons[1].addEventListener('click', function () {
    if (contentFormAcquaintance.classList.contains('swiper-slide-active')) {
      var _checkAcquaintanceChe = checkAcquaintanceCheck(),
          current = _checkAcquaintanceChe.current,
          error = _checkAcquaintanceChe.error;

      var inputAcquaintance = contentFormAcquaintance.querySelector('input');

      if (error.length > 0) {
        contentFormAcquaintanceSelect.forEach(function (e) {
          if (error.includes(e.name)) {
            e.classList.add('err');
          } else {
            e.classList.remove('err');
          }
        });

        if (error.includes(inputAcquaintance.name)) {
          inputAcquaintance.classList.add('err');
        } else {
          inputAcquaintance.classList.remove('err');
        }
      } else {
        var item = contentInfobarItems[0].querySelector('.content-infobar__content');
        contentInfobarItems[0].classList.add('full');
        current.forEach(function (e) {
          var name = '';

          if (e.name == 'country') {
            name = 'Страна:';
          } else if (e.name == 'city') {
            name = 'Город:';
          } else if (e.name == 'name') {
            name = 'Имя:';
          }

          item.innerHTML += "\n                <div class=\"content-infobar__content-item\">\n                    <div class=\"content-infobar__content-name\">\n                        <span>".concat(name, "</span>\n                    </div>\n                    <div class=\"content-infobar__content-value\">\n                        <span>").concat(e.value, "</span>\n                    </div>\n                </div>\n                ");
        });
        swiper.slideNext();
        contentFormBar[0].classList.add('success');
        contentFormBar[0].querySelector('img').src = '/img/bar/check-circle.svg';
        contentFormBar[1].classList.remove('disable');
      }
    } else if (contentFormSelectRole.classList.contains('swiper-slide-active')) {
      var _current = checkSelectRoleCheck();

      if (_current.length > 0) {
        var _item = contentInfobarItems[1].querySelector('.content-infobar__content');

        contentInfobarItems[1].classList.add('full');

        _current.forEach(function (e) {
          _item.innerHTML += "\n                    <div class=\"content-infobar__content-item\">\n                        <div class=\"content-infobar__content-name\">\n                            <span>\u0420\u043E\u043B\u044C:</span>\n                        </div>\n                        <div class=\"content-infobar__content-value\">\n                            <span>".concat(e, "</span>\n                        </div>\n                    </div>\n                ");
        });

        swiper.slideNext();
        contentFormBar[1].classList.add('success');
        contentFormBar[1].querySelector('img').src = '/img/bar/check-circle.svg';
        contentFormBar[2].classList.remove('disable');
      } else {//делаем валидацию
      }
    } else if (contentFormOPF.classList.contains('swiper-slide-active')) {
      var _current2 = checkOPFCheck();

      if (_current2.length > 0) {
        var _item2 = contentInfobarItems[2].querySelector('.content-infobar__content');

        contentInfobarItems[2].classList.add('full');

        _current2.forEach(function (e) {
          _item2.innerHTML += "\n                    <div class=\"content-infobar__content-item\">\n                        <div class=\"content-infobar__content-name\">\n                            <span>\u0420\u043E\u043B\u044C:</span>\n                        </div>\n                        <div class=\"content-infobar__content-value\">\n                            <span>".concat(e, "</span>\n                        </div>\n                    </div>\n                ");
        });

        swiper.slideNext();
        contentFormBar[2].classList.add('success');
        contentFormBar[2].querySelector('img').src = '/img/bar/check-circle.svg';
        contentFormStep.style.opacity = '0';
      } else {//делаем валидацию
      }
    }
  });
  contentFormSelectRoleItem.forEach(function (e) {
    e.addEventListener('click', function () {
      e.classList.toggle('active');

      if (e.classList.contains('active')) {
        e.querySelector('input').checked = true;
      } else {
        e.querySelector('input').checked = false;
      }
    });
    e.querySelector('img').addEventListener('mouseenter', function () {
      e.querySelector('.content-form__item-help').classList.add('active');
    });
    e.querySelector('img').addEventListener('mouseleave', function () {
      e.querySelector('.content-form__item-help').classList.remove('active');
    });
  });
  contentFormSelectORFItem.forEach(function (e) {
    e.addEventListener('click', function () {
      e.classList.toggle('active');

      if (e.classList.contains('active')) {
        e.querySelector('input').checked = true;
      } else {
        e.querySelector('input').checked = false;
      }
    });
    e.querySelector('img').addEventListener('mouseenter', function () {
      e.querySelector('.content-form__item-help').classList.add('active');
    });
    e.querySelector('img').addEventListener('mouseleave', function () {
      e.querySelector('.content-form__item-help').classList.remove('active');
    });
  });

  var checkAcquaintanceCheck = function checkAcquaintanceCheck() {
    var error = [];
    var current = [];
    var input = contentFormAcquaintance.querySelector('input');
    contentFormAcquaintanceSelect.forEach(function (e) {
      if (e.value == 'default') {
        error.push(e.name);
      } else {
        var currentItem = {
          name: e.name,
          value: e.value
        };
        current.push(currentItem);
      }
    });

    if (input.value == '') {
      error.push(input.name);
    } else {
      var currentItem = {
        name: input.name,
        value: input.value
      };
      current.push(currentItem);
    }

    return {
      current: current,
      error: error
    };
  };

  var checkSelectRoleCheck = function checkSelectRoleCheck() {
    var current = [];
    var input = contentFormSelectRole.querySelectorAll('input');
    input.forEach(function (e) {
      if (e.checked) {
        current.push(e.name);
      }
    });
    return current;
  };

  var checkOPFCheck = function checkOPFCheck() {
    var current = [];
    var input = contentFormOPF.querySelectorAll('input');
    input.forEach(function (e) {
      if (e.checked) {
        current.push(e.name);
      }
    });
    return current;
  };
});