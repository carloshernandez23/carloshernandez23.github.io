const nameInput = document.querySelector('#name-input');
const tlfInput = document.querySelector('#tlf-input');
const form = document.querySelector('#form');
const list = document.querySelector('#list');
const btn = document.querySelector('#boton-registrar');

const getPersonas = () => {
    list.innerHTML = localStorage.getItem('guardado');
}

getPersonas();


// Regex
const NAME_REGEX = /^[A-Za-z ]*$/;
const TLF_REGEX = /^([0]{1})([2,4]{1})([1,2]{1})([2,4,6]{1})([0-9]{7})$/;



const validation = (validation, input) => {
    if (validation) {
        input.classList.remove('wrong');
        input.classList.add('correct');
        input.parentElement.children[2].classList.remove('display-text');
    } else {
        input.classList.add('wrong');
        input.classList.remove('correct');
        input.parentElement.children[2].classList.add('display-text');
    }
}


nameInput.addEventListener('input', e =>{
    const nameValidation = NAME_REGEX.test (e.target.value);
    validation(nameValidation, nameInput);
});

tlfInput.addEventListener('input', e =>{
    const tlfValidation = TLF_REGEX.test (e.target.value);
    validation(tlfValidation, tlfInput);
});



form.addEventListener('submit', e => {
e.preventDefault();
const newPerson = {
    name: nameInput.value,
    tlf: tlfInput.value,

}
    


const listItem = document.createElement('li');
listItem.innerHTML= `
<span>${newPerson.name}</span>
<input class="li-input" type="text" value="${newPerson.tlf}"readonly>
<button class="delete-btn">
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="28" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<line x1="4" y1="7" x2="20" y2="7" />
<line x1="10" y1="11" x2="10" y2="17" />
<line x1="14" y1="11" x2="14" y2="17" />
<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
</svg>
</button>
<button class="check-btn">
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="28" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
<path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
<path d="M13.5 6.5l4 4"></path>
</svg>
</button>
`;

listItem.classList.add('li');
list.append(listItem);
localStorage.setItem('guardado', list.innerHTML);


});        


  
list.addEventListener('click', e => {
    if(e.target.classList.contains('delete-btn')){
    e.target.parentElement.remove();
    localStorage.setItem('guardado', list.innerHTML);
    }

    if(e.target.classList.contains('check-btn')){
        const input = e.target.parentElement.children[1];
        if(input.hasAttribute('readonly')) {
            input.removeAttribute('readonly');
        } else {
            input.setAttribute('value',input.value);
            input.setAttribute('readonly',true);
            localStorage.setItem('guardado',list.innerHTML);
        }
    }
    });

    function validar(){
       let deshabilitar = false;

        if(nameInput.classList.contains('correct') && tlfInput.classList.contains('correct'))
        {
        deshabilitar = true; 
        }
         
           if (deshabilitar == true && btn.hasAttribute('disabled'))
           {
            btn.removeAttribute('disabled');
           }
    }

    form.addEventListener("keyup", validar);

   