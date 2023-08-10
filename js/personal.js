window.addEventListener('load', () =>{
    let checkboxList = document.querySelectorAll('.checkbox.list')
    checkboxList.forEach(elem =>{
        elem.addEventListener('click', ()=>{
            elem.classList.toggle('active')
        })
    })
})