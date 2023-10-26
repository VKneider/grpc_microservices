const create = document.getElementById('create');
const update = document.getElementById('update');
const read = document.getElementById('read');
const del = document.getElementById('delete');

async function createProduct() {
    const descrip = document.getElementById('descrip').value;
    const newProduct = {
        descrip: descrip,
    };
    await fetch('/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    }) 
}

async function getAllProducts(){
    const response = await fetch('/products');
    const data = await response.json();
    //update tbody
    const table = document.getElementById('tbody');
    table.innerHTML = '';
    data.forEach(element => {
        table.innerHTML += `<tr><td>${element.id}</td><td>${element.descrip}</td></tr>`
    });
}

async function deleteProduct(){
    const id = document.getElementById('id').value;
    const productId = {
        id: id,
    };
    await fetch('/products', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productId)
    }) 
}

async function updateProduct(){
    const id = document.getElementById('id').value;
    const descrip = document.getElementById('descrip').value;
    const productId = {
        id: id,
        descrip: descrip,
    };
    await fetch('/products', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productId)
    }) 
}

async function getOneProduct(){
    const id = document.getElementById('id').value;
    const productId = {
        id: id,
    };
    const response = await fetch('/products/' + id);
    const data = await response.json();
    document.getElementById('descrip').value = data.descrip;
}

document.addEventListener('DOMContentLoaded', async () => {
    await getAllProducts();
});

create.addEventListener('click', async () => {
    await createProduct();
    await getAllProducts();
});

read.addEventListener('click', async () => {
    await getAllProducts();
});

del.addEventListener('click', async () => {
    await deleteProduct();
    await getAllProducts();
}   );

update.addEventListener('click', async () => {
    await updateProduct();
    await getAllProducts();
});

