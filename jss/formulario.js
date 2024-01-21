// Ejemplo de JavaScript inicial para deshabilitar el envío de formularios si hay campos no válidos
(() => {
    'use strict'
  
    // Obtenga todos los formularios a los que queremos aplicar estilos de validación Bootstrap personalizados
    const forms = document.querySelectorAll('.needs-validation')
  
    // Bucle sobre ellas y evitar la presentación
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

const email = document.getElementById("emailImput");
const form = document.getElementById("form");
const parrafo = document.getElementById("warnings");

form.addEventListener("submit", e=>{
  e.preventDefault()
  let warnings="";
  let entrar= false;
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  parrafo.innerHTML = "";
  console.log(regexEmail.test(email.value))
  if(!regexEmail.test(email.value)){
    warnings += `¡El email no es válido!`
    entrar=true;
  }
  if(entrar){
    parrafo.innerHTML=warnings;
  }
})
