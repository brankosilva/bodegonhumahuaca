
/**************************** color-mode *****************************************/

let botonColorMode = document.querySelector("#color-mode");

botonColorMode.addEventListener("click", () => {
    if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        botonColorMode.innerHTML = '<i class="bi bi-brightness-high-fill"></i>'
     } else {
        document.body.classList.add("dark-mode");
        botonColorMode.innerHTML = '<i class="bi bi-moon-fill"></i>'
     }
})

/**************************** menu *****************************************/

let menuArray = [
   { nombre: "Bastones de muzzarella", precio: 4000, categoria: "entradas" },
   { nombre: "Pizza Napolitana", precio: 6500, categoria: "principales" },
   { nombre: "Hamburguesa", precio: 8000, categoria: "principales" },
   { nombre: "Coca-cola", precio: 3000, categoria: "bebidas" },
   { nombre: "Fernet", precio: 3000, categoria: "tragos" },
   { nombre: "Tiramisú", precio: 3200, categoria: "postres" },
   { nombre: "Flan con ddl", precio: 3800, categoria: "postres" }
];


const menuBodegon = document.querySelector("#menu-container");

function mostrarMenu (menuArray) {
    menuBodegon.innerHTML = '';

    menuArray.forEach((producto) => {
    let div = document.createElement("div");
    div.classList.add("menu-product");
 
    div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
        `;
    
        let button = document.createElement("button");
        button.classList.add("eliminate-product-btn");
        button.innerText = "✖";
 
        button.addEventListener("click", () => {
          console.log(producto)
        })
 
        div.append(button)
        menuBodegon.append(div)
 
    });
}

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

function filtrarCategoria(categoria) {
    if (categoria === 'menu') {
        mostrarMenu(menuArray); 
    } else {
        const productosFiltrados = menuArray.filter(producto => producto.categoria === categoria);
        mostrarMenu(productosFiltrados); 
    }
}

mostrarMenu(menuArray);

