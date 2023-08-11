// Ждем, пока страница полностью загрузится
window.addEventListener('load', () => {
    // Получаем список всех элементов с классом 'checkbox list'
    let checkboxList = document.querySelectorAll('.checkbox.list');
    // Получаем элемент с классом 'search__selected-items'
    let searchSelectedBox = document.querySelector('.search__selected-items');
    // Получаем элемент ввода поискового запроса
    let searchInput = document.querySelector('.input.searchRegion input')

    // Добавление обработчика события 'click' на каждый элемент 'checkbox list'
    checkboxList.forEach(elem => {
        elem.addEventListener('click', (e) => {
            if (e.target.type === 'checkbox') {
                // Если клик был на чекбоксе
                let parentCheckboxMain = e.target.closest('.checkbox-main');
                let label = e.target.nextElementSibling.textContent;

                if (parentCheckboxMain) {
                    // Если чекбокс является дочерним для главного чекбокса
                    if (e.target.checked) {
                        // Добавляем дочерние элементы в правую часть
                        let childCheckboxes = parentCheckboxMain.closest('.checkbox.list').querySelectorAll('.search__more-name');
                        childCheckboxes.forEach(childCheckbox => {
                            let childLabel = childCheckbox.textContent;
                            // Добавляем HTML-код выбранного элемента
                            searchSelectedBox.innerHTML += `
                            <div class="search__selected-item">
                                <div class="checkbox searchSelected">
                                    <input type="checkbox">
                                    <label for="">${childLabel}</label>
                                    <img src="/img/register/btn-close.svg" alt="x">
                                </div>
                            </div>
                            `;
                        });
                    } else {
                        // Если родительский чекбокс снят, удаляем соответствующие элементы
                        let selectedItems = searchSelectedBox.querySelectorAll('.search__selected-item');
                        let parentLabel = parentCheckboxMain.closest('.checkbox.list').querySelectorAll('.search__item-more .item .checkbox label')
                        let parentLabels = []
                        parentLabel.forEach(e => {
                            parentLabels.push(e.textContent)
                        })
                        selectedItems.forEach(item => {
                            let selectedLabel = item.querySelector('.searchSelected label').textContent;
                            // Удаляем элементы, соответствующие родительским или текущему чекбоксу
                            if (parentLabels.includes(selectedLabel) || selectedLabel === label) {
                                searchSelectedBox.removeChild(item);
                            }
                        });
                    }
                } else {
                    // Если чекбокс не имеет родительского элемента
                    if (e.target.checked) {
                        // Добавляем выбранный элемент в правую часть
                        searchSelectedBox.innerHTML += `
                        <div class="search__selected-item">
                            <div class="checkbox searchSelected">
                                <input type="checkbox">
                                <label for="">${label}</label>
                                <img src="/img/register/btn-close.svg" alt="x">
                            </div>
                        </div>
                        `;

                        // Добавляем обработчики событий для удаления выбранных элементов
                        checkboxList.forEach(i => {
                            let checkBoxMore = i.querySelectorAll('.checkbox.more')
                            searchSelectedBox.querySelectorAll('.search__selected-item').forEach(item => {
                                item.querySelector('img').addEventListener('click', () => {
                                    checkBoxMore.forEach(el => {
                                        if (el.querySelector('label').textContent == item.querySelector('label').textContent) {
                                            el.querySelector('input').checked = false
                                        }
                                    })
                                    searchSelectedBox.removeChild(item);
                                })
                            })
                        })
                    } else {
                        // Если чекбокс снят, удаляем соответствующий элемент из правой части
                        let selectedItems = searchSelectedBox.querySelectorAll('.search__selected-item');
                        selectedItems.forEach(item => {
                            let selectedLabel = item.querySelector('.searchSelected label').textContent;
                            if (selectedLabel === label) {
                                searchSelectedBox.removeChild(item);
                            }
                        });
                    }
                }
            } else {
                // Если клик был не на чекбоксе, переключаем класс 'active'
                if (elem.classList.contains('active')) {
                    if (!e.target.classList.contains('search__more-name')) {
                        elem.classList.remove('active')
                    } else {
                        elem.querySelectorAll('.checkbox.more').forEach(el => {
                            console.log(e.target.textContent)
                            if (el.querySelector('label').textContent == e.target.textContent) {
                                if (el.querySelector('input').checked) {

                                     let selectedItems = searchSelectedBox.querySelectorAll('.search__selected-item');
                                        selectedItems.forEach(item => {
                                            let selectedLabel = item.querySelector('.searchSelected label').textContent;
                                            if (selectedLabel === el.querySelector('label').textContent) {
                                                searchSelectedBox.removeChild(item);
                                            }
                                    })

                                    el.querySelector('input').checked = false
                                } else {
                                    searchSelectedBox.innerHTML += `
                                        <div class="search__selected-item">
                                            <div class="checkbox searchSelected">
                                                <input type="checkbox">
                                                <label for="">${el.querySelector('label').textContent}</label>
                                                <img src="/img/register/btn-close.svg" alt="x">
                                            </div>
                                        </div>
                                    `
                                    el.querySelector('input').checked = true
                                }
                            }
                        })
                    }
                } else {
                    elem.classList.add('active')
                }
            }
        });
    });

    // Обработчик события ввода в поле поиска
    searchInput.oninput = (e) => {
        let val = e.target.value.trim();
        let items = document.querySelectorAll('.checkbox.more');
        let searchContentItems = document.querySelectorAll('.search__content-item');

        if (val != '') {
            // Показываем контейнер с результатами поиска
            document.querySelector('.search__content-items').classList.add('active');
            
            let groupedItems = {};

            items.forEach(i => {
                if (i.innerText.search(new RegExp(val, 'i')) == -1) {
                    // Ничего не делаем, элемент не соответствует запросу
                } else {
                    if (i.closest('.checkbox.list')) {
                        const parentLabel = i.closest('.checkbox.list').querySelector('.checkbox-main label').textContent;
                        if (!groupedItems[parentLabel]) {
                            groupedItems[parentLabel] = [];
                        }

                        groupedItems[parentLabel].push(i.querySelector('label').textContent);
                    }
                }
            });

            let searchContentHTML = '';

            for (const parentLabel in groupedItems) {
                searchContentHTML += `
                <div class="search__content-item">
                    <div class="search__content-item__parent">
                        <span>${parentLabel}</span>
                    </div>
                `;

                groupedItems[parentLabel].forEach(itemLabel => {
                    searchContentHTML += `
                    <div class="checkbox more">
                        <input type="checkbox">
                        <label class="search__more-name" for="">${itemLabel}</label>
                    </div>
                    `;
                });

                searchContentHTML += `</div>`;
            }

            // Заполняем контейнер результатами поиска
            document.querySelector('.search__content-items').innerHTML = searchContentHTML;

            // Обновляем состояние чекбоксов в соответствии с выбранными элементами
            let searchUpdateItem = document.querySelectorAll('.search__content-items .checkbox.more')
            checkboxList.forEach(i => {
                let checkBoxMore = i.querySelectorAll('.checkbox.more')
                checkBoxMore.forEach(el => {
                    if (el.querySelector('input').checked) {
                        searchUpdateItem.forEach(searchItem => {
                            if (searchItem.querySelector('label').textContent == el.querySelector('label').textContent) {
                                searchItem.querySelector('input').checked = true;
                            }
                        })
                    }
                })
            })
        } else {
            // Скрываем контейнер с результатами, если поле поиска пустое
            document.querySelector('.search__content-items').classList.remove('active');
        }

        // Обработчики событий для элементов результатов поиска
        document.querySelectorAll('.search__content-item .checkbox').forEach(e => {
            e.addEventListener('click', () => {
                if (e.querySelector('input').checked) {
                    // Если чекбокс выбран, удаляем соответствующий элемент из правой части
                    let selectedItems = searchSelectedBox.querySelectorAll('.search__selected-item');
                    selectedItems.forEach(item => {
                        let selectedLabel = item.querySelector('.searchSelected label').textContent;
                        if (selectedLabel === e.querySelector('label').textContent) {
                            searchSelectedBox.removeChild(item);
                        }
                    });
                    // Обновляем состояние чекбоксов
                    checkboxList.forEach(i => {
                        let checkBoxMore = i.querySelectorAll('.checkbox.more')
                        checkBoxMore.forEach(el => {
                            if (el.querySelector('label').textContent == e.querySelector('label').textContent) {
                                el.querySelector('input').checked = false
                            }
                        })
                    })
                    e.querySelector('input').checked = false
                } else {
                    // Если чекбокс не выбран
                    let selecteditem = searchSelectedBox.querySelectorAll('.search__selected-item label')
                    let selectLabel = []
                    selecteditem.forEach(e => {
                        selectLabel.push(e.textContent);
                    })
                    if (!selectLabel.includes(e.querySelector('label').textContent)) {
                        // Добавляем элемент в правую часть, если его там еще нет
                        searchSelectedBox.innerHTML += `
                        <div class="search__selected-item">
                            <div class="checkbox searchSelected">
                                <input type="checkbox">
                                <label for="">${e.querySelector('label').textContent}</label>
                                <img src="/img/register/btn-close.svg" alt="x">
                            </div>
                        </div>
                        `

                        // Добавляем обработчики событий для удаления выбранных элементов
                        checkboxList.forEach(i => {
                            let checkBoxMore = i.querySelectorAll('.checkbox.more')
                            searchSelectedBox.querySelectorAll('.search__selected-item').forEach(item => {
                                item.querySelector('img').addEventListener('click', () => {
                                    checkBoxMore.forEach(el => {
                                        if (el.querySelector('label').textContent == item.querySelector('label').textContent) {
                                            el.querySelector('input').checked = false
                                        }
                                    })
                                    searchSelectedBox.removeChild(item);
                                })
                            })
                        })

                    }
                    // Обновляем состояние чекбоксов
                    checkboxList.forEach(i => {
                        let checkBoxMore = i.querySelectorAll('.checkbox.more')
                        checkBoxMore.forEach(el => {
                            if (el.querySelector('label').textContent == e.querySelector('label').textContent) {
                                el.querySelector('input').checked = true
                            }
                        })
                    })
                    e.querySelector('input').checked = true
                }
            })
        })
    };
});
