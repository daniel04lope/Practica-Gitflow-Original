
const dado = document.getElementById('dado');
const botonTirar = document.getElementById('tirar');
const botonReiniciar = document.getElementById('reiniciar');
const resultado = document.getElementById('resultado');
const lista = document.getElementById('lista');
const vacio = document.getElementById('vacio');
const total = document.getElementById('total');

// Elementos de las estadísticas
const estadisticas = document.querySelectorAll('.estadistica');
const estadisticasInfo = document.querySelector('.estadisticas-info');

// Giro base que hay que aplicar al cubo para que cada cara mire al frente
const ORIENTACION = {
    1: [0, 0],
    2: [0, -90],
    3: [-90, 0],
    4: [90, 0],
    5: [0, 90],
    6: [0, 180],
};

let vueltas = 0; // se acumulan para que el dado siempre gire hacia delante

function mostrarCara(valor, conGiro) {
    const [x, y] = ORIENTACION[valor];
    if (conGiro) vueltas++;
    const extra = vueltas * 720;
    dado.style.transform = `rotateX(${x + extra}deg) rotateY(${y + extra}deg)`;
}

function actualizarEstadisticas(historial) {
    const ultimas10 = historial.slice(0, 10);
    const frecuencias = [0, 0, 0, 0, 0, 0, 0];

    ultimas10.forEach(valor => {
        frecuencias[valor]++;
    });

    estadisticas.forEach((elemento, indice) => {
        const numero = indice + 1;
        const cantidad = frecuencias[numero];
        const porcentaje = ultimas10.length > 0
            ? Math.round((cantidad / ultimas10.length) * 100)
            : 0;

        elemento.querySelector('.estadistica-cantidad').textContent = `${cantidad} veces`;
        elemento.querySelector('.estadistica-progreso').style.width = `${porcentaje}%`;
        elemento.querySelector('.estadistica-porcentaje').textContent = `${porcentaje}%`;
    });

    estadisticasInfo.textContent = `${ultimas10.length} de 10 tiradas analizadas`;
}

function pintarHistorial(historial, totalTiradas) {
    lista.innerHTML = '';

    historial.forEach(v => {
        const li = document.createElement('li');
        li.textContent = v;
        lista.appendChild(li);
    });

    vacio.hidden = historial.length > 0;
    total.textContent = `(${totalTiradas} en total)`;

    actualizarEstadisticas(historial);
}

async function enviar(accion) {
    const respuesta = await fetch('tirar.php', {
        method: 'POST',
        body: new URLSearchParams({ accion }),
    });

    if (!respuesta.ok) throw new Error('Error del servidor');
    return respuesta.json();
}

async function tirar() {
    if (botonTirar.disabled) return;

    botonTirar.disabled = true;
    resultado.textContent = 'Rodando…';

    try {
        const datos = await enviar('tirar');
        mostrarCara(datos.valor, true);

        // Esperamos a que termine la animación para enseñar el resultado
        setTimeout(() => {
            resultado.textContent = `Ha salido un ${datos.valor}`;
            pintarHistorial(datos.historial, datos.total);
            botonTirar.disabled = false;
        }, 1200);

    } catch (error) {
        resultado.textContent = 'No se pudo tirar. ¿Está el servidor PHP en marcha?';
        botonTirar.disabled = false;
    }
}

async function reiniciar() {
    try {
        const datos = await enviar('reiniciar');
        pintarHistorial(datos.historial, datos.total);
        resultado.textContent = 'Tira el dado';
        mostrarCara(1, false);
    } catch (error) {
        resultado.textContent = 'No se pudo borrar el historial.';
    }
}

// Estado inicial: sin animación, mostrando la última cara guardada
dado.style.transition = 'none';
mostrarCara(Number(dado.dataset.inicial), false);
void dado.offsetWidth;
dado.style.transition = '';

// Inicializar las estadísticas con los datos guardados en PHP
actualizarEstadisticas(
    Array.from(lista.children).map(li => Number(li.textContent))
);

botonTirar.addEventListener('click', tirar);
botonReiniciar.addEventListener('click', reiniciar);

document.addEventListener('keydown', e => {
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        tirar();
    }
});