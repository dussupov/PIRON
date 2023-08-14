"use strict";

// Ждем, пока страница полностью загрузится
window.addEventListener('load', function () {
  // Получаем список всех элементов с классом 'checkbox list'
  var checkboxList = document.querySelectorAll('.checkbox.list'); // Получаем элемент с классом 'search__selected-items'

  var searchSelectedBox = document.querySelector('.search__selected-items'); // Получаем элемент ввода поискового запроса

  var searchInput = document.querySelector('.input.searchRegion input'); // Добавление обработчика события 'click' на каждый элемент 'checkbox list'

  checkboxList.forEach(function (elem) {
    elem.addEventListener('click', function (e) {
      if (e.target.type === 'checkbox') {
        // Если клик был на чекбоксе
        var parentCheckboxMain = e.target.closest('.checkbox-main');
        var label = e.target.nextElementSibling.textContent;

        if (parentCheckboxMain) {
          var parentLabel = parentCheckboxMain.querySelector('label').textContent; // Если чекбокс является дочерним для главного чекбокса

          if (e.target.checked) {
            // Добавляем дочерние элементы в правую часть
            searchSelectedBox.innerHTML += "\n                        <div class=\"search__selected-item\">\n                            <div class=\"checkbox searchSelected\">\n                                <label for=\"\">".concat(parentLabel, "</label>\n                                <img src=\"/img/register/btn-close.svg\" alt=\"x\">\n                            </div>\n                        </div>\n                        ");
            var childCheckboxes = parentCheckboxMain.closest('.checkbox.list').querySelectorAll('.checkbox.more');
            childCheckboxes.forEach(function (e) {
              var childBoxName = e.querySelector('.search__more-name');
              var childLabel = childBoxName.textContent;
              e.querySelector('input').checked = true;
              e.classList.add('disable'); // Добавляем HTML-код выбранного элемента
              // searchSelectedBox.innerHTML += `
              // <div class="search__selected-item">
              //     <div class="checkbox searchSelected">
              //         <label for="">${childLabel}</label>
              //         <img src="/img/register/btn-close.svg" alt="x">
              //     </div>
              // </div>
              // `;
            });
            checkboxList.forEach(function (i) {
              var parentCheckBoxLabel = i.querySelector('label').textContent;
              var checkBoxMore = i.querySelectorAll('.checkbox.more');
              searchSelectedBox.querySelectorAll('.search__selected-item').forEach(function (item) {
                item.querySelector('img').addEventListener('click', function () {
                  if (parentCheckBoxLabel == item.querySelector('label').textContent) {
                    i.querySelector('input').checked = false;
                    checkBoxMore.forEach(function (e) {
                      console.log(e);
                      e.classList.remove('disable');
                      e.querySelector('input').checked = false;
                    });
                  }

                  searchSelectedBox.removeChild(item);
                });
              });
            });
          } else {
            // Если родительский чекбокс снят, удаляем соответствующие элементы
            var _childCheckboxes = parentCheckboxMain.closest('.checkbox.list').querySelectorAll('.checkbox.more');

            var selectedItems = searchSelectedBox.querySelectorAll('.search__selected-item');

            var _parentLabel = parentCheckboxMain.closest('.checkbox.list').querySelectorAll('.search__item-more .item .checkbox label');

            var parentLabels = [];

            _parentLabel.forEach(function (e) {
              parentLabels.push(e.textContent);
            });

            _childCheckboxes.forEach(function (e) {
              e.querySelector('input').checked = false;
              e.classList.remove('disable');
            });

            selectedItems.forEach(function (item) {
              var selectedLabel = item.querySelector('.searchSelected label').textContent; // Удаляем элементы, соответствующие родительским или текущему чекбоксу

              if (parentLabels.includes(selectedLabel) || selectedLabel === label) {
                searchSelectedBox.removeChild(item);
              }
            });
          }
        } else {
          // Если чекбокс не имеет родительского элемента
          if (e.target.checked) {
            // Добавляем выбранный элемент в правую часть
            searchSelectedBox.innerHTML += "\n                        <div class=\"search__selected-item\">\n                            <div class=\"checkbox searchSelected\">\n                                <label for=\"\">".concat(label, "</label>\n                                <img src=\"/img/register/btn-close.svg\" alt=\"x\">\n                            </div>\n                        </div>\n                        ");

            var _parentCheckboxMain = e.target.closest('.checkbox.list').querySelector('.checkbox-main input');

            _parentCheckboxMain.checked = true; // Добавляем обработчики событий для удаления выбранных элементов

            checkboxList.forEach(function (i) {
              var checkBoxMore = i.querySelectorAll('.checkbox.more');
              searchSelectedBox.querySelectorAll('.search__selected-item').forEach(function (item) {
                item.querySelector('img').addEventListener('click', function () {
                  checkBoxMore.forEach(function (el) {
                    if (el.querySelector('label').textContent == item.querySelector('label').textContent) {
                      el.querySelector('input').checked = false;
                    }
                  });
                  searchSelectedBox.removeChild(item);
                });
              });
            });
          } else {
            // Если чекбокс снят, удаляем соответствующий элемент из правой части
            var _selectedItems = searchSelectedBox.querySelectorAll('.search__selected-item');

            _selectedItems.forEach(function (item) {
              var selectedLabel = item.querySelector('.searchSelected label').textContent;

              if (selectedLabel === label) {
                searchSelectedBox.removeChild(item);
              }
            });

            var parentCheckBox = e.target.closest('.checkbox.list');
            var childCheckBox = parentCheckBox.querySelectorAll('.checkbox.more');
            var checkedCheckBoxChildCounter = childCheckBox.length;
            childCheckBox.forEach(function (e) {
              if (checkedCheckBoxChildCounter > 1) {
                if (e.querySelector('input').checked == false) {
                  checkedCheckBoxChildCounter--;
                }
              } else {
                var _parentCheckboxMain2 = parentCheckBox.querySelector('.checkbox-main input');

                _parentCheckboxMain2.checked = false;
              }
            });
          }
        }
      } else {
        // Если клик был не на чекбоксе, переключаем класс 'active'
        if (elem.classList.contains('active')) {
          if (!e.target.classList.contains('search__more-name')) {
            elem.classList.remove('active');
          } else {
            elem.querySelectorAll('.checkbox.more').forEach(function (el) {
              if (el.querySelector('label').textContent == e.target.textContent) {
                if (el.querySelector('input').checked) {
                  var _selectedItems2 = searchSelectedBox.querySelectorAll('.search__selected-item');

                  _selectedItems2.forEach(function (item) {
                    var selectedLabel = item.querySelector('.searchSelected label').textContent;

                    if (selectedLabel === el.querySelector('label').textContent) {
                      searchSelectedBox.removeChild(item);
                    }
                  });

                  el.querySelector('input').checked = false;

                  var _parentCheckBox = e.target.closest('.checkbox.list');

                  var _childCheckBox = _parentCheckBox.querySelectorAll('.checkbox.more');

                  var _checkedCheckBoxChildCounter = _childCheckBox.length;

                  _childCheckBox.forEach(function (e) {
                    if (_checkedCheckBoxChildCounter > 1) {
                      if (e.querySelector('input').checked == false) {
                        _checkedCheckBoxChildCounter--;
                      }
                    } else {
                      var _parentCheckboxMain3 = _parentCheckBox.querySelector('.checkbox-main input');

                      _parentCheckboxMain3.checked = false;
                    }
                  });
                } else {
                  searchSelectedBox.innerHTML += "\n                                        <div class=\"search__selected-item\">\n                                            <div class=\"checkbox searchSelected\">\n                                                <label for=\"\">".concat(el.querySelector('label').textContent, "</label>\n                                                <img src=\"/img/register/btn-close.svg\" alt=\"x\">\n                                            </div>\n                                        </div>\n                                    ");
                  el.querySelector('input').checked = true;

                  var _parentCheckboxMain4 = e.target.closest('.checkbox.list').querySelector('.checkbox-main input');

                  _parentCheckboxMain4.checked = true;
                  checkboxList.forEach(function (i) {
                    var checkBoxMore = i.querySelectorAll('.checkbox.more');
                    searchSelectedBox.querySelectorAll('.search__selected-item').forEach(function (item) {
                      item.querySelector('img').addEventListener('click', function () {
                        checkBoxMore.forEach(function (el) {
                          if (el.querySelector('label').textContent == item.querySelector('label').textContent) {
                            el.querySelector('input').checked = false;
                          }
                        });
                        searchSelectedBox.removeChild(item);
                      });
                    });
                  });
                }
              }
            });
          }
        } else {
          elem.classList.add('active');
        }
      }
    });
  }); // Обработчик события ввода в поле поиска

  searchInput.oninput = function (e) {
    var val = e.target.value.trim();
    var items = document.querySelectorAll('.checkbox.more');
    var searchContentItems = document.querySelectorAll('.search__content-item');

    if (val != '') {
      // Показываем контейнер с результатами поиска
      document.querySelector('.search__content-items').classList.add('active');
      var groupedItems = {};
      items.forEach(function (i) {
        if (i.innerText.search(new RegExp(val, 'i')) == -1) {// Ничего не делаем, элемент не соответствует запросу
        } else {
          if (i.closest('.checkbox.list')) {
            var parentLabel = i.closest('.checkbox.list').querySelector('.checkbox-main label').textContent;

            if (!groupedItems[parentLabel]) {
              groupedItems[parentLabel] = [];
            }

            groupedItems[parentLabel].push(i.querySelector('label').textContent);
          }
        }
      });
      var searchContentHTML = '';

      for (var parentLabel in groupedItems) {
        searchContentHTML += "\n                <div class=\"search__content-item\">\n                    <div class=\"search__content-item__parent\">\n                        <span>".concat(parentLabel, "</span>\n                    </div>\n                ");
        groupedItems[parentLabel].forEach(function (itemLabel) {
          searchContentHTML += "\n                    <div class=\"checkbox more\">\n                        <input type=\"checkbox\">\n                        <label class=\"search__more-name\" for=\"\">".concat(itemLabel, "</label>\n                    </div>\n                    ");
        });
        searchContentHTML += "</div>";
      } // Заполняем контейнер результатами поиска


      document.querySelector('.search__content-items').innerHTML = searchContentHTML; // Обновляем состояние чекбоксов в соответствии с выбранными элементами

      var searchUpdateItem = document.querySelectorAll('.search__content-items .checkbox.more');
      checkboxList.forEach(function (i) {
        var checkBoxMore = i.querySelectorAll('.checkbox.more');
        checkBoxMore.forEach(function (el) {
          if (el.querySelector('input').checked) {
            searchUpdateItem.forEach(function (searchItem) {
              if (searchItem.querySelector('label').textContent == el.querySelector('label').textContent) {
                searchItem.querySelector('input').checked = true;
              }
            });
          }
        });
      });
    } else {
      // Скрываем контейнер с результатами, если поле поиска пустое
      document.querySelector('.search__content-items').classList.remove('active');
    } // Обработчики событий для элементов результатов поиска


    document.querySelectorAll('.search__content-item .checkbox').forEach(function (e) {
      e.addEventListener('click', function () {
        if (e.querySelector('input').checked) {
          // Если чекбокс выбран, удаляем соответствующий элемент из правой части
          var selectedItems = searchSelectedBox.querySelectorAll('.search__selected-item');
          selectedItems.forEach(function (item) {
            var selectedLabel = item.querySelector('.searchSelected label').textContent;

            if (selectedLabel === e.querySelector('label').textContent) {
              searchSelectedBox.removeChild(item);
            }
          }); // Обновляем состояние чекбоксов

          checkboxList.forEach(function (i) {
            var checkBoxMore = i.querySelectorAll('.checkbox.more');
            checkBoxMore.forEach(function (el) {
              if (el.querySelector('label').textContent == e.querySelector('label').textContent) {
                el.querySelector('input').checked = false;
              }
            });
          });
          e.querySelector('input').checked = false;
        } else {
          // Если чекбокс не выбран
          var selecteditem = searchSelectedBox.querySelectorAll('.search__selected-item label');
          var selectLabel = [];
          selecteditem.forEach(function (e) {
            selectLabel.push(e.textContent);
          });

          if (!selectLabel.includes(e.querySelector('label').textContent)) {
            // Добавляем элемент в правую часть, если его там еще нет
            searchSelectedBox.innerHTML += "\n                        <div class=\"search__selected-item\">\n                            <div class=\"checkbox searchSelected\">\n                                <label for=\"\">".concat(e.querySelector('label').textContent, "</label>\n                                <img src=\"/img/register/btn-close.svg\" alt=\"x\">\n                            </div>\n                        </div>\n                        "); // Добавляем обработчики событий для удаления выбранных элементов

            checkboxList.forEach(function (i) {
              var checkBoxMore = i.querySelectorAll('.checkbox.more');
              searchSelectedBox.querySelectorAll('.search__selected-item').forEach(function (item) {
                item.querySelector('img').addEventListener('click', function () {
                  checkBoxMore.forEach(function (el) {
                    if (el.querySelector('label').textContent == item.querySelector('label').textContent) {
                      el.querySelector('input').checked = false;
                    }
                  });
                  searchSelectedBox.removeChild(item);
                });
              });
            });
          } // Обновляем состояние чекбоксов


          checkboxList.forEach(function (i) {
            var checkBoxMore = i.querySelectorAll('.checkbox.more');
            checkBoxMore.forEach(function (el) {
              if (el.querySelector('label').textContent == e.querySelector('label').textContent) {
                el.querySelector('input').checked = true;
              }
            });
          });
          e.querySelector('input').checked = true;
        }
      });
    });
  };
});