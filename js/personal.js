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
                    let parentLabel = parentCheckboxMain.querySelector('label').textContent

                    // Если чекбокс является дочерним для главного чекбокса
                    if (e.target.checked) {
                        // Добавляем дочерние элементы в правую часть
                        searchSelectedBox.innerHTML += `
                        <div class="search__selected-item">
                            <div class="checkbox searchSelected">
                                <label for="">${parentLabel}</label>
                                <img src="/img/register/btn-close.svg" alt="x">
                            </div>
                        </div>
                        `;
                        let childCheckboxes = parentCheckboxMain.closest('.checkbox.list').querySelectorAll('.checkbox.more')
                        childCheckboxes.forEach(e => {
                            let childBoxName = e.querySelector('.search__more-name');
                            let childLabel = childBoxName.textContent;
                            e.querySelector('input').checked = true
                            e.classList.add('disable')
                        });

                        checkboxList.forEach(i => {
                            let parentCheckBoxLabel = i.querySelector('label').textContent
                            let checkBoxMore = i.querySelectorAll('.checkbox.more')
                            searchSelectedBox.querySelectorAll('.search__selected-item').forEach(item => {
                                item.querySelector('img').addEventListener('click', () => {
                                    if (parentCheckBoxLabel == item.querySelector('label').textContent) {
                                        i.querySelector('input').checked = false
                                        checkBoxMore.forEach(e => {
                                            e.classList.remove('disable')
                                            e.querySelector('input').checked = false
                                        })
                                    }
                                    searchSelectedBox.removeChild(item);
                                })
                            })
                        })

                    } else {
                        // Если родительский чекбокс снят, удаляем соответствующие элементы
                        let childCheckboxes = parentCheckboxMain.closest('.checkbox.list').querySelectorAll('.checkbox.more')
                        let selectedItems = searchSelectedBox.querySelectorAll('.search__selected-item');
                        let parentLabel = parentCheckboxMain.closest('.checkbox.list').querySelectorAll('.search__item-more .item .checkbox label')
                        let parentLabels = []
                        parentLabel.forEach(e => {
                            parentLabels.push(e.textContent)
                        })

                        childCheckboxes.forEach(e => {
                            e.querySelector('input').checked = false
                            e.classList.remove('disable')
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
                                <label for="">${label}</label>
                                <img src="/img/register/btn-close.svg" alt="x">
                            </div>
                        </div>
                        `;

                        let parentCheckboxMain = e.target.closest('.checkbox.list').querySelector('.checkbox-main input');
                        parentCheckboxMain.checked = true

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

                        const parentCheckBox = e.target.closest('.checkbox.list')
                        const childCheckBox = parentCheckBox.querySelectorAll('.checkbox.more')
                        let checkedCheckBoxChildCounter = childCheckBox.length

                        childCheckBox.forEach(e => {
                            if (checkedCheckBoxChildCounter > 1) {
                                if (e.querySelector('input').checked == false) {
                                    checkedCheckBoxChildCounter--
                                }
                            }
                            else {
                                let parentCheckboxMain = parentCheckBox.querySelector('.checkbox-main input');
                                parentCheckboxMain.checked = false
                            }
                        })

                    }
                }
            } else {
                // Если клик был не на чекбоксе, переключаем класс 'active'
                if (elem.classList.contains('active')) {
                    if (!e.target.classList.contains('search__more-name')) {
                        elem.classList.remove('active')
                    } else {
                        elem.querySelectorAll('.checkbox.more').forEach(el => {
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

                                    const parentCheckBox = e.target.closest('.checkbox.list')
                                    const childCheckBox = parentCheckBox.querySelectorAll('.checkbox.more')
                                    let checkedCheckBoxChildCounter = childCheckBox.length

                                    childCheckBox.forEach(e => {
                                        if (checkedCheckBoxChildCounter > 1) {
                                            if (e.querySelector('input').checked == false) {
                                                checkedCheckBoxChildCounter--
                                            }
                                        }
                                        else {
                                            let parentCheckboxMain = parentCheckBox.querySelector('.checkbox-main input');
                                            parentCheckboxMain.checked = false
                                        }
                                    })

                                } else {

                                    searchSelectedBox.innerHTML += `
                                        <div class="search__selected-item">
                                            <div class="checkbox searchSelected">
                                                <label for="">${el.querySelector('label').textContent}</label>
                                                <img src="/img/register/btn-close.svg" alt="x">
                                            </div>
                                        </div>
                                    `
                                    el.querySelector('input').checked = true
                                    let parentCheckboxMain = e.target.closest('.checkbox.list').querySelector('.checkbox-main input');
                                    parentCheckboxMain.checked = true

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
        let inputContainer = document.querySelector('.input.searchRegion')
        if (val != '') {
            // Показываем контейнер с результатами поиска
            document.querySelector('.search__content-items').classList.add('active');
            inputContainer.classList.add('selected')
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

            let inputCloseBtn = inputContainer.querySelector('.close')
            inputCloseBtn.addEventListener('click', () => {
                document.querySelector('.search__content-items').classList.remove('active')
                inputContainer.classList.remove('selected')
                e.target.value = ''
            })

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
                                if (el.classList.contains('disable')) {
                                    searchItem.classList.add('disable')
                                }
                            } 
                        })
                    }
                })
            })
        } else {
            // Скрываем контейнер с результатами, если поле поиска пустое
            let inputContainer = document.querySelector('.input.searchRegion')
            inputContainer.classList.remove('selected')
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

                            const parentCheckBox = el.closest('.checkbox.list')
                            const childCheckBox = parentCheckBox.querySelectorAll('.checkbox.more')
                            let checkedCheckBoxChildCounter = childCheckBox.length

                            childCheckBox.forEach(e => {
                                if (checkedCheckBoxChildCounter > 1) {
                                    if (e.querySelector('input').checked == false) {
                                        checkedCheckBoxChildCounter--
                                    }
                                }
                                else {
                                    let parentCheckboxMain = parentCheckBox.querySelector('.checkbox-main input');
                                    parentCheckboxMain.checked = false
                                }
                            })
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
                                el.closest('.checkbox.list').querySelector('.checkbox-main input').checked = true
                            }
                        })
                    })
                    e.querySelector('input').checked = true
                }
            })
        })
    };

    //Кнопки модального окна выбора региона

    let resetRegion = document.querySelector('.resetRegions')
    let saveRegion = document.querySelector('.saveRegions')
    let selectedItemsBox = document.querySelector('.search__selected-items')
    resetRegion.addEventListener('click', () => {
        let checkBoxList = document.querySelectorAll('.checkbox.list')
        checkBoxList.forEach(el => {
            const checkboxMore = el.querySelectorAll('.checkbox.more')
            const inputs = el.querySelectorAll('input')
            inputs.forEach(input => {
                input.checked = false
                input.classList.remove('disable')
            })
            checkboxMore.forEach(cbm =>{
                if(cbm.classList.contains('disable')){
                    cbm.classList.remove('disable')
                }
            })
        })
        selectedItemsBox.innerHTML = ``
    })
    saveRegion.addEventListener('click', ()=>{
        if(selectedItemsBox.innerHTML != ''){
            let selectedItems = selectedItemsBox.querySelectorAll('.search__selected-item')
            let changeRegionRightItems = document.querySelector('.change__region-right-items')
            changeRegionRightItems.innerHTML = ''
            selectedItems.forEach(item =>{
                let label = item.querySelector('label').textContent
                changeRegionRightItems.innerHTML +=`
                    <div class="change__region-right-item">
                        <span>${label}</span>
                    </div>
                `
            }) 
        }
    })
});
