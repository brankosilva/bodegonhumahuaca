
/**************************** color-mode ***********************************************************/

/** boton modo color **/
let botonColorMode = document.querySelector("#color-mode");

botonColorMode.addEventListener("click", () => {
    if (document.body.classList.contains("bright-mode")) {
        document.body.classList.remove("bright-mode");
        botonColorMode.innerHTML = '<i class="bi bi-brightness-high-fill"></i>'
     } else {
        document.body.classList.add("bright-mode");
        botonColorMode.innerHTML = '<i class="bi bi-moon-fill"></i>'
     }
})



/**************************** menu **************************************************************/

/** array para guardar el menu **/
let menuArray = [];

/** carga de menu desde JSON **/
function cargarMenuDesdeJSON() {
    fetch("./menu.json")
    .then(response => response.json())
    .then(data => {
        menuArray = data; 
        guardarEnLocalStorage();
        mostrarMenu(menuArray);
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
}

/** guardar menu en LS **/
function guardarEnLocalStorage() {
    localStorage.setItem('menu', JSON.stringify(menuArray));
}

/** cargar menu en LS sino desde JSON **/
function cargarMenuLocalStorage() {
    const menuGuardado = localStorage.getItem('menu');
    if (menuGuardado) {
        menuArray = JSON.parse(menuGuardado);
        mostrarMenu(menuArray);
    } else {
        cargarMenuDesdeJSON();
    }
}

const menuBodegon = document.querySelector("#menu-container");
const menuVacio = document.querySelector("#menu-vacio");


/** menu actualizado: si no hay productos muestras msj "menu vacio" **/
function actualizarMenu () {
    if (menuArray.length === 0) {
        menuVacio.classList.remove("d-none");
        menuBodegon.classList.add("d-none");
    } else {
        menuVacio.classList.add("d-none");
        menuBodegon.classList.remove("d-none");
    }
}



/**************************** creacion y recorrido menu **************************************************************/

/** mostrar menu **/
function mostrarMenu (menuArray) {
    menuBodegon.innerHTML = "";

    menuArray.forEach((producto) => {
        let div = document.createElement("div");
        div.classList.add("menu-product");
 
        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
        `;
    

        /** boton eliminar producto **/
        let buttonEliminate = document.createElement("button");
        buttonEliminate.classList.add("eliminate-product-btn");
        buttonEliminate.innerText = "✖";
 
        buttonEliminate.addEventListener("click", () => {
          eliminarProducto(producto)
        })

        /** boton modificar producto **/
        let buttonEditar = document.createElement("button");
        buttonEditar.classList.add("edit-product-btn");
        buttonEditar.innerText = "✏️";
        let index = menuArray.indexOf(producto);
        buttonEditar.addEventListener("click", () => editarProducto(producto, index));


        div.append(buttonEliminate)
        div.append(buttonEditar);
        menuBodegon.append(div)
 
    });

    actualizarMenu ();
}



/**************************** Filtrar por categoria **************************************************/


let menuCompleto = document.querySelector("#menu");
menuCompleto.addEventListener("click",() => {
    filtrarCategoria("menu")
} )

let menuEntradas = document.querySelector("#entradas");
menuEntradas.addEventListener("click",() => {
    filtrarCategoria("entradas")
} )

let menuPrincipales = document.querySelector("#principales");
menuPrincipales.addEventListener("click",() => {
    filtrarCategoria("principales")
} )

let menuBebidas = document.querySelector("#bebidas");
menuBebidas.addEventListener("click",() => {
    filtrarCategoria("bebidas")
} )

let menuTragos = document.querySelector("#tragos");
menuTragos.addEventListener("click",() => {
    filtrarCategoria("tragos")
} )

let menuPostres = document.querySelector("#postres");
menuPostres.addEventListener("click",() => {
    filtrarCategoria("postres")
} )

/** filtrar el menu segun categoria **/
function filtrarCategoria(categoria) {
    if (categoria === "menu") {
        mostrarMenu(menuArray); 
    } else {
        const productosFiltrados = menuArray.filter((producto) => producto.categoria === categoria);
        mostrarMenu(productosFiltrados); 
    }

    actualizarMenu ();

}



/**************************** Eliminar producto del menu *********************************/


function eliminarProducto (productoEliminado) {
    
    /** popup advertencia **/
    Swal.fire ({
        text:`¿Estás seguro que deseas eliminar el producto ${productoEliminado.nombre} del menú?`,
        icon: "warning",
        showClosebutton: true,

        showConfirmButton: true,
        showCancelButton: true,

        confirmButtonText: "Eliminar producto",
        cancelButtonText: "Cancelar",

        customClass: "popup-eliminate-product"

    }).then((result) => {

        /** popup confirmacion **/
        if (result.isConfirmed) {
            let indice = menuArray.findIndex((producto) => producto === productoEliminado);
            menuArray.splice(indice, 1);
            guardarEnLocalStorage();
            swal.fire ({
                text: `El producto ${productoEliminado.nombre} fue eliminado.`,
                icon: "success",
                customClass: "popup-eliminate-product"
            })
            actualizarMenu ();
            mostrarMenu(menuArray);
        }
    })

    actualizarMenu ();
    mostrarMenu(menuArray);
}

/**************************** Editar producto del menu *********************************/

/** formulario editor productos - referencia al DOM **/
const formEditProduct = document.querySelector("#form-edit-product");
const formEditProductDetails = document.querySelector("#form-edit-product-details");
const inputEditProductName = document.querySelector("#edit-product-name");
const inputEditProductPrice = document.querySelector("#edit-product-price");
const selectEditProductCategory = document.querySelector("#edit-product-category");
const inputEditProductIndice = document.querySelector("#edit-product-indice");
const btnEditClose = document.querySelector("#btn-edit-close");

/** Abrir form con datos del producto **/
function editarProducto(producto, index) {

/** mostrar form **/
    formEditProduct.classList.remove("d-none");

    inputEditProductName.value = producto.nombre;
    inputEditProductPrice.value = producto.precio;
    selectEditProductCategory.value = producto.categoria;
    inputEditProductIndice.value = index;
}


/** btn cerrar form **/
btnEditClose.addEventListener("click", () => {
    formEditProduct.classList.add("d-none")
    formEditProductDetails.reset();
});



/** guardar cambios en el menu **/
formEditProductDetails.addEventListener("submit", (e) => {
    e.preventDefault();

    /** indice del producto **/
    const indice = inputEditProductIndice.value;

    menuArray[indice] = {
        nombre: inputEditProductName.value,
        precio: Number(inputEditProductPrice.value),
        categoria: selectEditProductCategory.value
    };

    guardarEnLocalStorage();

    actualizarMenu ();
    mostrarMenu(menuArray);

    /** cerrar form **/
    formEditProduct.classList.add("d-none");
    formEditProductDetails.reset();

    /** toastify producto editado **/
    Toastify({
        text: "Producto modificado!",
        duration: 1500,
        close: true
    }).showToast();
});



/**************************** Eliminar TODOS los producto del menu *********************************/

const BtnEliminarProducto = document.querySelector("#eliminate-menu");

BtnEliminarProducto.addEventListener("click", () => {

    /** popup advertencia **/
    Swal.fire ({
        text:`¿Estás seguro que deseas eliminar todo el menú? Esta acción no se puede deshacer.`,
        icon: "warning",
        showClosebutton: true,

        showConfirmButton: true,
        showCancelButton: true,

        confirmButtonText: "Eliminar menú",
        cancelButtonText: "Cancelar",

        customClass: "popup-eliminate-product"

    }).then((result) => {

        /** popup confirmacion **/
        if (result.isConfirmed) {
            menuArray = [];
            swal.fire ({
                text: `El menú fue eliminado.`,
                icon: "success",
                customClass: "popup-eliminate-product"
            })
            guardarEnLocalStorage();
            actualizarMenu ();
            mostrarMenu(menuArray);
        }
     });

        guardarEnLocalStorage();

        actualizarMenu ();
        mostrarMenu(menuArray);
    })



/********************************** Formulario carga menu **************************************************/

const btnAgregarProducto = document.querySelector("#add-producto");
const formAdministracionMenu = document.querySelector("#form-administration-menu");

/** mostrar form **/
btnAgregarProducto.addEventListener("click", () => {
    formAdministracionMenu.classList.toggle("d-none");
});

/** formulario agregar productos - referencia al DOM **/
const formAddProduct = document.querySelector("#form-add-product");
const inputProductName = document.querySelector("#product-name");
const inputProductPrice = document.querySelector("#product-price");
const selectProductCategory = document.querySelector("#product-category");
const btnClose = document.querySelector("#btn-close");

/** btn cerrar form **/
btnClose.addEventListener("click", () => {
    formAdministracionMenu.classList.add("d-none")

});

/** crear nuevo producto **/
formAddProduct.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevoProducto = {
        nombre: inputProductName.value,
        precio: Number(inputProductPrice.value),
        categoria: selectProductCategory.value
    };


    menuArray.push(nuevoProducto);

    guardarEnLocalStorage();

    mostrarMenu(menuArray);

    /** cerrar form **/
    formAdministracionMenu.classList.add("d-none");
    formAddProduct.reset();

    /** tastify de producto cargado **/
    Toastify ({
        text: "Producto agregado!",
        duration: 1500,
        close:true
    }).showToast();

  })

/** carga del menu **/
cargarMenuLocalStorage();
mostrarMenu(menuArray);




