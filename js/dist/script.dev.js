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
  }); //SideBar

  var Logo = document.querySelector('.sidebar-header img');
  var SideBar = document.querySelector('.sidebar');
  var SideBarToggle = SideBar.querySelector('.sidebar-items__close-item');
  SideBarToggle.addEventListener('click', function () {
    SideBar.classList.toggle('close');

    if (SideBar.classList.contains('close')) {
      Logo.style.width = '45px';
      Logo.src = '/img/register/logo.svg';
    } else {
      Logo.style.width = '125px';
      Logo.src = '/img/Logo.svg';
    }
  }); //Бриф

  var contentFormBarItems = document.querySelectorAll('.content-form__bar .content-form__bar-items .content-form__bar-item');
  var contentFormWelcome = document.querySelector('.content-form__welcome');
  var contentForm = document.querySelector('.content-form');
  var contentFormItems = contentForm.querySelector('.content-form__items');
  var contentFormWidth = contentForm.offsetWidth;
  var contentFormStep = document.querySelector('.content-form__step');
  var contentFormStepPrev = contentFormStep.querySelector('.content-form__step-prev button');
  var contentFormStepNext = contentFormStep.querySelector('.content-form__step-next button');
  var contentFormAcquaintance = document.querySelector('.content-form__acquaintance');
  var contentFormSelectRole = document.querySelector('.content-form__selectRole');
  var contentFormSelectRoleItem = contentFormSelectRole.querySelectorAll('.content-form__selectRole-item');
  var contentFormSelectOPF = document.querySelector('.content-form__OPF');
  var contentFormSelectOPFItem = contentFormSelectOPF.querySelectorAll('.content-form__OPF-item');
  var contentFormEnd = document.querySelector('.content-form__end');

  if (contentFormBarItems) {
    if (contentFormWelcome.classList.contains('active')) {
      contentFormStep.style.opacity = '0';
      contentFormBarItems.forEach(function (e) {
        e.classList.add('disable');
      });
      var contentFormWelcomeBtn = contentFormWelcome.querySelector('.content-form__welcome-btn button');
      contentFormWelcomeBtn.addEventListener('click', function () {
        contentFormWelcome.classList.remove('active');
        contentFormAcquaintance.classList.add('active');
        contentFormItems.style.transform = "translateX(-".concat(contentFormWidth + 100, "px)");
        contentFormBarItems[0].classList.remove('disable');
        contentFormStep.style.opacity = '1';
      });
    }

    contentFormStepNext.addEventListener('click', function () {
      if (contentFormAcquaintance.classList.contains('active')) {
        contentFormItems.style.transform = "translateX(-".concat(contentFormWidth * 2 + 100, "px)");
        contentFormBarItems[0].classList.add('success');
        contentFormBarItems[0].querySelector('img').src = '/img/bar/check-circle.svg';
        contentFormBarItems[1].classList.remove('disable');
        contentFormAcquaintance.classList.remove('active');
        contentFormSelectRole.classList.add('active');
      } else if (contentFormSelectRole.classList.contains('active')) {
        contentFormItems.style.transform = "translateX(-".concat(contentFormWidth * 3 + 100, "px)");
        contentFormBarItems[1].classList.add('success');
        contentFormBarItems[1].querySelector('img').src = '/img/bar/check-circle.svg';
        contentFormBarItems[2].classList.remove('disable');
        contentFormSelectRole.classList.remove('active');
        contentFormSelectOPF.classList.add('active');
      } else if (contentFormSelectOPF.classList.contains('active')) {
        contentFormItems.style.transform = "translateX(-".concat(contentFormWidth * 4 + 100, "px)");
        contentFormBarItems[2].classList.add('success');
        contentFormBarItems[2].querySelector('img').src = '/img/bar/check-circle.svg';
        contentFormSelectOPF.classList.remove('active');
        contentFormEnd.classList.add('active');
        contentFormStep.style.opacity = '0';
      }
    });
    contentFormSelectRoleItem.forEach(function (e) {
      e.addEventListener('click', function () {
        e.classList.toggle('active');

        if (e.querySelector('input').checked == true) {
          e.querySelector('input').checked = false;
        } else {
          e.querySelector('input').checked = true;
        }
      });
    });
    contentFormSelectOPFItem.forEach(function (e) {
      e.addEventListener('click', function () {
        e.classList.toggle('active');

        if (e.querySelector('input').checked == true) {
          e.querySelector('input').checked = false;
        } else {
          e.querySelector('input').checked = true;
        }
      });
    });
  }
});