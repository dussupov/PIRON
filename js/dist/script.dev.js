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
  var contentFormSelectRole = document.querySelector('.content-form__selectRole');
  var contentFormOPF = document.querySelector('.content-form__OPF');
  var contentFormEnd = document.querySelector('.content-form__end');
  var nextButtons = document.querySelectorAll('.form-step-next');

  if (contentFormWelcome.classList.contains('swiper-slide-active')) {
    contentFormStep.style.opacity = '0';
    contentFormBar.forEach(function (e) {
      e.classList.add('disable');
    });
  }

  SideBarToggle.addEventListener('click', function () {
    SideBar.classList.toggle('close');

    if (SideBar.classList.contains('close')) {
      Logo.style.width = '45px';
      Logo.src = '/img/register/logo.svg';
      Content.style.width = "".concat(ContentW + 140, "px");
    } else {
      Logo.style.width = '125px';
      Logo.src = '/img/Logo.svg';
      Content.style.width = "".concat(ContentW - 140, "px");
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
    swiper.slideNext();

    if (contentFormSelectRole.classList.contains('swiper-slide-active')) {
      contentFormBar[0].classList.add('success');
      contentFormBar[0].querySelector('img').src = '/img/bar/check-circle.svg';
      contentFormBar[1].classList.remove('disable');
    } else if (contentFormOPF.classList.contains('swiper-slide-active')) {
      contentFormBar[1].classList.add('success');
      contentFormBar[1].querySelector('img').src = '/img/bar/check-circle.svg';
      contentFormBar[2].classList.remove('disable');
    } else if (contentFormEnd.classList.contains('swiper-slide-active')) {
      contentFormBar[2].classList.add('success');
      contentFormBar[2].querySelector('img').src = '/img/bar/check-circle.svg';
      contentFormStep.style.opacity = '0';
    }
  });
});