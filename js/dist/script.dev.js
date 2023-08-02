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
  });
});