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

})