window.addEventListener('load', () => {
    //Добавляем показ пароля при клике на иконку

    const btn = document.querySelectorAll('.show-password');

    console.log(btn)

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

    SideBarToggle.addEventListener('click', () => {
        SideBar.classList.toggle('close')
        const windowWidth = window.innerWidth;
        if (SideBar.classList.contains('close')) {
            Logo.style.width = '45px'
            Logo.src = '/img/register/logo.svg'
            if(windowWidth <= 1580){
                Content.style.width = `${ContentW + 80}px`
            }else{
                Content.style.width = `${ContentW + 120}px`
            }
        } else {
            Logo.style.width = '125px'
            Logo.src = '/img/Logo.svg'
            if(windowWidth <= 1580){
                Content.style.width = `${ContentW - 20}px`
            }else{
                Content.style.width = `${ContentW - 120}px`
            }
        }
    })

    //SELECT

    let selectHeader = document.querySelectorAll('.select__header')
    let selectItem = document.querySelectorAll('.select__item')
    selectItem.forEach(e =>{
        e.addEventListener('click', selectedItem)
    })

    selectHeader.forEach(e =>{
        e.addEventListener('click', selectToggle)
    })

    function selectToggle(){
        this.parentElement.classList.toggle('active')
    }

    function selectedItem(){
        let text = this.innerText;
        let selectForm = this.closest('.formSelect')
        let currentText = selectForm.querySelector('.select__current')

        currentText.innerText = text
        currentText.classList.add('changed')
        selectForm.classList.remove('active')
    }

    document.addEventListener('click', function(event) {
        const isSelectFormClicked = event.target.closest('.formSelect');
        
        if (!isSelectFormClicked) {
            const allSelectForms = document.querySelectorAll('.formSelect');
            allSelectForms.forEach(selectForm => {
                selectForm.classList.remove('active');
            });
        }
    });
   
})