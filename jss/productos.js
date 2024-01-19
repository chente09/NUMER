const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})
function addToCarritoItem(e) {
    const button = e.target;
    const item = button.closest('.tarjeta');
    const itemTitle = item.querySelector('.card-title').textContent;
    
    // Modifica cómo se extrae el valor del precio
    const itemPrice = parseFloat(item.querySelector('.precio span').textContent);

    const itemImg = item.querySelector('.card-img-top').src;

    const newItem = {
        title: itemTitle,
        precio: itemPrice, // Ahora itemPrice debería ser un número
        img: itemImg,
        cantidad: 1
    };

    addItemCarrito(newItem);
}

function addItemCarrito(newItem) {
    const alert = document.querySelector('.alert');
    setTimeout(() => alert.classList.add('hide'), 2000);
    alert.classList.remove('hide');

    const existingItem = carrito.find(item => item.title.trim() === newItem.title.trim());
    if (existingItem) {
        existingItem.cantidad++;
        const inputValue = tbody.querySelector(`.title[data-title="${existingItem.title}"]`);
        inputValue.value++;
    } else {
        carrito.push(newItem);
        renderCarrito();
    }

    CarritoTotal();
    addLocalStorage();
}


function renderCarrito() {
    tbody.innerHTML = '';
    carrito.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.classList.add('ItemCarrito');

        const content = `
            <th scope="row">${index + 1}</th>
            <td class="table__productos">
                <img src="${item.img}" alt="">
                <h6 class="title" data-title="${item.title}">${item.title}</h6>
            </td>
            <td class="table__precio">
                <p>$${item.precio}</p>
            </td>
            <td class="table__cantidad">
                <input type="number" min="1" value="${item.cantidad}" class="input__elemento">
                <button class="delete btn btn-danger">X</button>
            </td>
        `;

        tr.innerHTML = content;
        tbody.appendChild(tr);

        tr.querySelector('.delete').addEventListener('click', removeItemCarrito);
        tr.querySelector('.input__elemento').addEventListener('change', sumaCantidad);
    });
}

function CarritoTotal() {
    let Total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal');

    carrito.forEach((item) => {
        const precio = parseFloat(item.precio);  // Utiliza parseFloat para manejar decimales
        const cantidad = Number(item.cantidad);

        if (!isNaN(precio) && !isNaN(cantidad)) {
            Total += precio * cantidad;
        } else {
            console.error(`Error: El precio o la cantidad no son valores numéricos para el item ${item.title}. Precio: ${item.precio}, Cantidad: ${item.cantidad}`);
        }
    });

    itemCartTotal.innerHTML = `Total $${Total.toFixed(2)}`;  // Ajusta a dos decimales
    addLocalStorage();
}

function removeItemCarrito(e){
    const buttonDelete = e.target;
    const tr = buttonDelete.closest(".ItemCarrito");
    const title = tr.querySelector('.title').textContent;

    for(let i = 0; i < carrito.length; i++){
        if(carrito[i].title.trim() === title.trim()){
            carrito.splice(i, 1);
        }
    }

    // Verificar si 'alert' existe antes de intentar acceder a su 'classList'
    const alert = document.querySelector('.remove');

    if (alert) {
        setTimeout(function(){
            alert.classList.add('remove');
        }, 2000);

        alert.classList.remove('remove');
    }

    tr.remove();
    CarritoTotal();
}

function sumaCantidad(e){
 const sumaInput =  e.target
 const tr = sumaInput.closest(".ItemCarrito")
 const title = tr.querySelector('.title').textContent;
 carrito.forEach(item=>{
    if(item.title.trim() === title){
        sumaInput.value < 1 ? (sumaInput.value=1): sumaInput.value;
        item.cantidad = sumaInput.value;
        CarritoTotal()
    }
 })
}

function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload= function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
        carrito = storage;
        renderCarrito()
        CarritoTotal()
    }
}