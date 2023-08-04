window.addEventListener('load', () => {
    //Добавляем показ пароля при клике на иконку

    const btn = document.querySelectorAll('.show-password');

    btn.forEach((e) => {
        e.addEventListener('click', () => {
            e.classList.toggle('active')
            if (e.classList.contains('active')) {
                const input = e.closest('div').querySelector('input')
                input.type = 'text'
            } else {
                const input = e.closest('div').querySelector('input')
                input.type = 'password'
            }
        })
    })



    // SideBar
    const Logo = document.querySelector('.sidebar-header img')
    const SideBar = document.querySelector('.sidebar')
    const SideBarToggle = SideBar.querySelector('.sidebar-items__close-item')
    const Content = document.querySelector('.content')
    const ContentW = Content.offsetWidth
    const contentFormWelcomeBtn = document.querySelector('.content-form__welcome-btn')
    const contentFormWelcome = document.querySelector('.content-form__welcome')
    const contentFormBar = document.querySelectorAll('.content-form__bar-items .content-form__bar-item')
    const contentFormStep = document.querySelector('.content-form__step')
    const contentFormStepNext = document.querySelector('.content-form__step-next');
    const contentFormAcquaintance = document.querySelector('.content-form__acquaintance')
    const contentFormAcquaintanceSelect = contentFormAcquaintance.querySelectorAll('select')
    const contentFormSelectRole = document.querySelector('.content-form__selectRole')
    const contentFormOPF = document.querySelector('.content-form__OPF')
    const contentFormEnd = document.querySelector('.content-form__end')
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

    SideBarToggle.addEventListener('click', () => {
        SideBar.classList.toggle('close')
        if (SideBar.classList.contains('close')) {
            Logo.style.width = '45px'
            Logo.src = '/img/register/logo.svg'
            Content.style.width = `${ContentW + 140}px`
        } else {
            Logo.style.width = '125px'
            Logo.src = '/img/Logo.svg'
            Content.style.width = `${ContentW - 140}px`
        }
    })

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
            if (current.length > 0){
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
                            <span>${e}</span>
                        </div>
                    </div>
                `
                })
                swiper.slideNext();
                contentFormBar[1].classList.add('success')
                contentFormBar[1].querySelector('img').src = '/img/bar/check-circle.svg'
                contentFormBar[2].classList.remove('disable')
            }else{
                //делаем валидацию
            }
        } else if (contentFormOPF.classList.contains('swiper-slide-active')) {
            const current = checkOPFCheck()
            if (current.length > 0){
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
                            <span>${e}</span>
                        </div>
                    </div>
                `
                })
                swiper.slideNext();
                contentFormBar[2].classList.add('success')
                contentFormBar[2].querySelector('img').src = '/img/bar/check-circle.svg'
                contentFormStep.style.opacity = '0'
            }else{
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
        e.querySelector('img').addEventListener('mouseenter', ()=>{
            e.querySelector('.content-form__item-help').classList.add('active')
        })
        e.querySelector('img').addEventListener('mouseleave', ()=>{
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
        e.querySelector('img').addEventListener('mouseenter', ()=>{
            e.querySelector('.content-form__item-help').classList.add('active')
        })
        e.querySelector('img').addEventListener('mouseleave', ()=>{
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

    const checkSelectRoleCheck = () =>{
        const current = []
        const input = contentFormSelectRole.querySelectorAll('input')
        input.forEach(e =>{
            if(e.checked){
                current.push(e.name)
            }
        })

        return current;
    }

    const checkOPFCheck = () =>{
        const current = []
        const input = contentFormOPF.querySelectorAll('input')
        input.forEach(e =>{
            if(e.checked){
                current.push(e.name)
            }
        })

        return current;
    }

})