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
});