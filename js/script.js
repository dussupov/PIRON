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
    const contentFormSelectRole = document.querySelector('.content-form__selectRole')
    const contentFormOPF = document.querySelector('.content-form__OPF')
    const contentFormEnd = document.querySelector('.content-form__end')
    const nextButtons = document.querySelectorAll('.form-step-next');
    if(contentFormWelcome.classList.contains('swiper-slide-active')){
        contentFormStep.style.opacity = '0'
        contentFormBar.forEach(e=>{
            e.classList.add('disable')
        })
    }

    SideBarToggle.addEventListener('click', ()=>{
        SideBar.classList.toggle('close')
        if(SideBar.classList.contains('close')){
            Logo.style.width = '45px'
            Logo.src = '/img/register/logo.svg'
            Content.style.width = `${ContentW+140}px`
        }else{
            Logo.style.width = '125px'
            Logo.src = '/img/Logo.svg'
            Content.style.width = `${ContentW-140}px`
        }
    })

    var swiper = new Swiper(".content-form__items", {
        navigation: {
          prevEl: ".form-step-prev",
        },
        allowTouchMove : false
    });

    nextButtons[0].addEventListener('click', () => {
        swiper.slideNext(); 
        if(contentFormAcquaintance.classList.contains('swiper-slide-active')){
            contentFormBar[0].classList.remove('disable')
            contentFormStep.style.opacity = '1'
        }
    });
      
      // Обработчик клика для второй кнопки "Next"
    nextButtons[1].addEventListener('click', () => {
        swiper.slideNext(); 
        if(contentFormSelectRole.classList.contains('swiper-slide-active')){
            contentFormBar[0].classList.add('success')
            contentFormBar[0].querySelector('img').src = '/img/bar/check-circle.svg'
            contentFormBar[1].classList.remove('disable')
        }else if(contentFormOPF.classList.contains('swiper-slide-active')){
            contentFormBar[1].classList.add('success')
            contentFormBar[1].querySelector('img').src = '/img/bar/check-circle.svg'
            contentFormBar[2].classList.remove('disable')
        }else if(contentFormEnd.classList.contains('swiper-slide-active')){
            contentFormBar[2].classList.add('success')
            contentFormBar[2].querySelector('img').src = '/img/bar/check-circle.svg'
            contentFormStep.style.opacity = '0'
        }
    });

})