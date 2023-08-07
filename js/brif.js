window.addEventListener('load', () => {


    const contentFormWelcome = document.querySelector('.content-form__welcome')
    const contentFormBar = document.querySelectorAll('.content-form__bar-items .content-form__bar-item')
    const contentFormStep = document.querySelector('.content-form__step')
    const contentFormAcquaintance = document.querySelector('.content-form__acquaintance')
    const contentFormAcquaintanceSelect = contentFormAcquaintance.querySelectorAll('select')
    const contentFormSelectRole = document.querySelector('.content-form__selectRole')
    const contentFormOPF = document.querySelector('.content-form__OPF')
    const contentFormSelectRoleItem = contentFormSelectRole.querySelectorAll('.content-form__selectRole-item')
    const contentFormSelectORFItem = contentFormOPF.querySelectorAll('.content-form__OPF-item')
    const nextButtons = document.querySelectorAll('.form-step-next');
    const contentInfobarItems = document.querySelectorAll('.content-infobar .content-infobar__item')

    if (contentFormWelcome.classList.contains('swiper-slide-active')) {
        contentFormStep.style.opacity = '0'
        contentFormBar.forEach(e => {
            e.classList.add('disable')
        })
    }

    var swiper = new Swiper(".content-form__items", {
        navigation: {
            prevEl: ".form-step-prev",
        },
        allowTouchMove: false
    });

    nextButtons[0].addEventListener('click', () => {
        swiper.slideNext();
        if (contentFormAcquaintance.classList.contains('swiper-slide-active')) {
            contentFormBar[0].classList.remove('disable')
            contentFormStep.style.opacity = '1'
        }
    });

    // Обработчик клика для второй кнопки "Next"
    nextButtons[1].addEventListener('click', () => {
        if (contentFormAcquaintance.classList.contains('swiper-slide-active')) {
            const { current, error } = checkAcquaintanceCheck()
            const inputAcquaintance = contentFormAcquaintance.querySelector('input')
            if (error.length > 0) {
                contentFormAcquaintanceSelect.forEach(e => {
                    if (error.includes(e.name)) {
                        e.classList.add('err');
                    } else {
                        e.classList.remove('err');
                    }
                });
                if (error.includes(inputAcquaintance.name)) {
                    inputAcquaintance.classList.add('err')
                } else {
                    inputAcquaintance.classList.remove('err')
                }
            } else {
                const item = contentInfobarItems[0].querySelector('.content-infobar__content')
                contentInfobarItems[0].classList.add('full')
                current.forEach(e => {
                    let name = ''
                    if (e.name == 'country') {
                        name = 'Страна:'
                    } else if (e.name == 'city') {
                        name = 'Город:'
                    } else if (e.name == 'name') {
                        name = 'Имя:'
                    }
                    item.innerHTML +=
                        `
            <div class="content-infobar__content-item">
                <div class="content-infobar__content-name">
                    <span>${name}</span>
                </div>
                <div class="content-infobar__content-value">
                    <span>${e.value}</span>
                </div>
            </div>
            `
                })
                swiper.slideNext();
                contentFormBar[0].classList.add('success')
                contentFormBar[0].querySelector('img').src = '/img/bar/check-circle.svg'
                contentFormBar[1].classList.remove('disable')
            }
        } else if (contentFormSelectRole.classList.contains('swiper-slide-active')) {
            const current = checkSelectRoleCheck()
            console.log(current)
            if (current.length > 0) {
                const item = contentInfobarItems[1].querySelector('.content-infobar__content')
                contentInfobarItems[1].classList.add('full')
                current.forEach(e => {
                    item.innerHTML +=
                        `
                <div class="content-infobar__content-item">
                    <div class="content-infobar__content-name">
                        <span>Роль:</span>
                    </div>
                    <div class="content-infobar__content-value">
                        <span>${e.value}</span>
                    </div>
                </div>
            `
                })
                swiper.slideNext();
                contentFormBar[1].classList.add('success')
                contentFormBar[1].querySelector('img').src = '/img/bar/check-circle.svg'
                contentFormBar[2].classList.remove('disable')
            } else {
                //делаем валидацию
            }
        } else if (contentFormOPF.classList.contains('swiper-slide-active')) {
            const current = checkOPFCheck()
            if (current.length > 0) {
                const item = contentInfobarItems[2].querySelector('.content-infobar__content')
                contentInfobarItems[2].classList.add('full')
                current.forEach(e => {
                    item.innerHTML +=
                        `
                <div class="content-infobar__content-item">
                    <div class="content-infobar__content-name">
                        <span>Роль:</span>
                    </div>
                    <div class="content-infobar__content-value">
                        <span>${e.value}</span>
                    </div>
                </div>
            `
                })
                swiper.slideNext();
                contentFormBar[2].classList.add('success')
                contentFormBar[2].querySelector('img').src = '/img/bar/check-circle.svg'
                contentFormStep.style.opacity = '0'
            } else {
                //делаем валидацию
            }
        }
    });

    contentFormSelectRoleItem.forEach(e => {
        e.addEventListener('click', () => {
            e.classList.toggle('active')
            if (e.classList.contains('active')) {
                e.querySelector('input').checked = true
            } else {
                e.querySelector('input').checked = false
            }
        })
        e.querySelector('.content-form__selectRole-item__img').addEventListener('mouseover', () => {
            e.querySelector('.content-form__item-help').classList.add('active')
        })
        e.querySelector('.content-form__selectRole-item__img').addEventListener('mouseout', () => {
            e.querySelector('.content-form__item-help').classList.remove('active')
        })
    })
    contentFormSelectORFItem.forEach(e => {
        e.addEventListener('click', () => {
            e.classList.toggle('active')
            if (e.classList.contains('active')) {
                e.querySelector('input').checked = true
            } else {
                e.querySelector('input').checked = false
            }
        })
        e.querySelector('.content-form__selectRole-item__img').addEventListener('mouseover', () => {
            e.querySelector('.content-form__item-help').classList.add('active')
        })
        e.querySelector('.content-form__selectRole-item__img').addEventListener('mouseout', () => {
            e.querySelector('.content-form__item-help').classList.remove('active')
        })
    })

    const checkAcquaintanceCheck = () => {
        const error = []
        const current = []
        const input = contentFormAcquaintance.querySelector('input')
        contentFormAcquaintanceSelect.forEach(e => {
            if (e.value == 'default') {
                error.push(e.name)
            } else {
                const currentItem = { name: e.name, value: e.value }
                current.push(currentItem)
            }
        })
        if (input.value == '') {
            error.push(input.name)
        } else {
            const currentItem = { name: input.name, value: input.value }
            current.push(currentItem)
        }

        return { current, error };
    }

    // console.log(contentFormSelectRole)

    const checkSelectRoleCheck = () => {
        const current = []
        contentFormSelectRoleItem.forEach(e => {
            const input = e.querySelector('input')
            const label = e.querySelector('label')
            if (input.checked) {
                const currentItem = { id: input.name, value: label.innerText }
                current.push(currentItem)
            }
        })

        return current;
    }

    const checkOPFCheck = () => {
        const current = []
        contentFormSelectORFItem.forEach(e => {
            const input = e.querySelector('input')
            const label = e.querySelector('label')
            if (input.checked) {
                const currentItem = { id: input.name, value: label.innerText }
                current.push(currentItem)
            }
        })

        return current;
    }
});