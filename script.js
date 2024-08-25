const letraAbecedario = document.querySelectorAll(".letra");
const palabraElegida = palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
const palabraElegidaArray = palabraElegida.split("");
const palabraVaciaArray = new Array (palabraElegidaArray.length).fill("");
const palabraContenedor = document.querySelector(".palabra");
const modalBoton = document.querySelector(".modal-boton");
const modalContenedor = document.querySelector(".modal-contenedor");
const modalTexto = document.querySelector(".modal-texto");
const imagenesAhorcado = document.querySelector(".imagenes_juego");

//numero de oportunidades en el juego
let oportunidades = 6;

console.log(palabraElegida);

function reiniciarJuego() {
    modalBoton.addEventListener("click", () => location.reload());
}

function aparecerModal(resultado) {
    modalContenedor.style.opacity = "1";
    modalContenedor.style.pointerEvents = "all";
    modalTexto.textContent = resultado;
    reiniciarJuego();
    
}

//carga la palabra vacia en el DOM, solo se visualizan las lineas que corresponden a la cantidad de letras de la palabra
function cargarPalabraVacia () {
    palabraVaciaArray.forEach(letra => {
        let div = `<div class="line">${letra}</div>`;
        palabraContenedor.insertAdjacentHTML("beforeend", div);
    });
}

//eventos a cada una de las letras - logica del juego
function eventosLetras () {
    const letrasPalabra = document.querySelectorAll(".line");
    letraAbecedario.forEach(letra => {
        letra.addEventListener("click", () => {
            let letraEncontrada = false;
            for(let i = 0; i < palabraElegida.length; i++) {
                if(letra.textContent == palabraElegidaArray[i]) {
                    palabraVaciaArray[i] = palabraElegidaArray[i];
                    letrasPalabra[i].textContent = letra.textContent;
                    letraEncontrada = true;
                    letra.style.backgroundColor = "green";
                    letra.style.pointerEvents = "none";
                    letra.style.opacity = ".3";
                }
            }
            if (!letraEncontrada) {
                hasPerdido(letra);
            }
            if (JSON.stringify(palabraVaciaArray) == JSON.stringify(palabraElegidaArray)) {
                aparecerModal(`Has ganado \u{1F600}`);
            }
        });
    });
}

//funcion que ayuda a conocer cuando el jugador ha perdido el juego
function hasPerdido(letra){
    oportunidades--;
    imagenesAhorcado.src = `img/ahorcado_${oportunidades}.png`;
    letra.style.backgroundColor = "red";
    letra.style.pointerEvents = "none";
    letra.style.opacity = ".3";
    letra
    if(oportunidades == 0) {
        aparecerModal(`Has perdido \u{1F622}`);
    }
}

//funcion para iniciar el juego
function iniciarJuego () {
    cargarPalabraVacia();
    eventosLetras();
}

//se hace el llamado a la funcion para iniciar el juego
iniciarJuego();
