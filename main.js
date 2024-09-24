
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
