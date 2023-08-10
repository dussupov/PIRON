"use strict";

window.addEventListener('load', function () {
  var checkboxList = document.querySelectorAll('.checkbox.list');
  checkboxList.forEach(function (elem) {
    elem.addEventListener('click', function () {
      elem.classList.toggle('active');
    });
  });
});