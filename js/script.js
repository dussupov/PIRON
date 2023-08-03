window.addEventListener('load', () => {
    //Добавляем показ пароля при клике на иконку

    const btn = document.querySelectorAll('.show-password');

    btn.forEach((e) => {
        e.addEventListener('click', () => {
            e.classList.toggle('active')
            if (e.classList.contains('active')) {
                const input = e.closest('div').querySelector('input')
                input.type = 'text'
            }else{
                const input = e.closest('div').querySelector('input')
                input.type = 'password'
            }
        })
    })

    //SideBar
    const Logo = document.querySelector('.sidebar-header img')
    const SideBar = document.querySelector('.sidebar')
    const SideBarToggle = SideBar.querySelector('.sidebar-items__close-item')

    SideBarToggle.addEventListener('click', ()=>{
        SideBar.classList.toggle('close')
        if(SideBar.classList.contains('close')){
            Logo.style.width = '45px'
            Logo.src = '/img/register/logo.svg'
        }else{
            Logo.style.width = '125px'
            Logo.src = '/img/Logo.svg'
        }
    })

    //Бриф

    const contentFormBarItems = document.querySelectorAll('.content-form__bar .content-form__bar-items .content-form__bar-item')
    const contentFormWelcome = document.querySelector('.content-form__welcome')
    const contentForm = document.querySelector('.content-form')
    const contentFormItems = contentForm.querySelector('.content-form__items')
    let contentFormWidth = contentForm.offsetWidth
    const contentFormStep = document.querySelector('.content-form__step')
    const contentFormStepPrev = contentFormStep.querySelector('.content-form__step-prev button')
    const contentFormStepNext = contentFormStep.querySelector('.content-form__step-next button')
    const contentFormAcquaintance = document.querySelector('.content-form__acquaintance')
    const contentFormSelectRole = document.querySelector('.content-form__selectRole')
    const contentFormSelectRoleItem = contentFormSelectRole.querySelectorAll('.content-form__selectRole-item')
    const contentFormSelectOPF = document.querySelector('.content-form__OPF')
    const contentFormSelectOPFItem = contentFormSelectOPF.querySelectorAll('.content-form__OPF-item')
    const contentFormEnd = document.querySelector('.content-form__end')
    if(contentFormBarItems){
        if(contentFormWelcome.classList.contains('active')){
            contentFormStep.style.opacity = '0'
            contentFormBarItems.forEach(e =>{
                e.classList.add('disable')
            })
            const contentFormWelcomeBtn = contentFormWelcome.querySelector('.content-form__welcome-btn button')
            contentFormWelcomeBtn.addEventListener('click', ()=>{
                contentFormWelcome.classList.remove('active')
                contentFormAcquaintance.classList.add('active')
                contentFormItems.style.transform = `translateX(-${contentFormWidth + 100}px)`
                contentFormBarItems[0].classList.remove('disable')
                contentFormStep.style.opacity = '1'
            })
        }
        contentFormStepNext.addEventListener('click', ()=>{
            if(contentFormAcquaintance.classList.contains('active')){
                contentFormItems.style.transform = `translateX(-${(contentFormWidth)*2 + 100}px)`
                contentFormBarItems[0].classList.add('success')
                contentFormBarItems[0].querySelector('img').src = '/img/bar/check-circle.svg'
                contentFormBarItems[1].classList.remove('disable')
                contentFormAcquaintance.classList.remove('active')
                contentFormSelectRole.classList.add('active')
            }else if(contentFormSelectRole.classList.contains('active')){
                contentFormItems.style.transform = `translateX(-${(contentFormWidth)*3 + 100}px)`
                contentFormBarItems[1].classList.add('success')
                contentFormBarItems[1].querySelector('img').src = '/img/bar/check-circle.svg'
                contentFormBarItems[2].classList.remove('disable')
                contentFormSelectRole.classList.remove('active')
                contentFormSelectOPF.classList.add('active')
            }else if(contentFormSelectOPF.classList.contains('active')){
                contentFormItems.style.transform = `translateX(-${(contentFormWidth)*4 + 100}px)`
                contentFormBarItems[2].classList.add('success')
                contentFormBarItems[2].querySelector('img').src = '/img/bar/check-circle.svg'
                contentFormSelectOPF.classList.remove('active')
                contentFormEnd.classList.add('active')
                contentFormStep.style.opacity = '0'
            }
        })
        contentFormSelectRoleItem.forEach((e)=>{
            e.addEventListener('click', ()=>{
                e.classList.toggle('active')
                if(e.querySelector('input').checked == true){
                    e.querySelector('input').checked = false
                }else{
                    e.querySelector('input').checked = true
                }
            })
        })
        contentFormSelectOPFItem.forEach((e)=>{
            e.addEventListener('click', ()=>{
                e.classList.toggle('active')
                if(e.querySelector('input').checked == true){
                    e.querySelector('input').checked = false
                }else{
                    e.querySelector('input').checked = true
                    
                }
            })
        })
    }

})