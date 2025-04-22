const palabra = 'hola'
let errores = 0
let aciertos = 0
const maxIntentos = 6
let letrasUsadas = []

const wordDiv = document.getElementById('word')
const msgDiv = document.getElementById('message')
const hangmanDiv = document.getElementById('hangman')
const restartBtn = document.getElementById('restart')

function dibujarPalabra() {
    wordDiv.innerHTML = ''
    for (let letra of palabra) {
        const span = document.createElement('span')
        span.textContent = letrasUsadas.includes(letra) ? letra : '_'
        wordDiv.appendChild(span)
    }
}

function dibujarParte() {
    const parte = document.createElement('div')
    hangmanDiv.appendChild(parte)
}

function mostrarMensaje(texto) {
    msgDiv.textContent = texto
}

function reset() {
    errores = 0
    aciertos = 0
    letrasUsadas = []
    hangmanDiv.innerHTML = ''
    msgDiv.textContent = ''
    dibujarPalabra()
}

document.addEventListener('keydown', (e) => {
    const letra = e.key.toLowerCase()

    if (letra.match(/^[a-zñ]$/) && !letrasUsadas.includes(letra)) {
        letrasUsadas.push(letra)

        if (palabra.includes(letra)) {
            mostrarMensaje('¡Bien!')
            aciertos += palabra.split(letra).length - 1
        } else {
            mostrarMensaje('¡Fallaste!')
            errores++
            dibujarParte()
        }

        dibujarPalabra()

        if (aciertos === palabra.length) {
            mostrarMensaje('¡Ganaste!')
            document.removeEventListener('keydown', arguments.callee)
        }

        if (errores === maxIntentos) {
            mostrarMensaje('¡Perdiste!')
            document.removeEventListener('keydown', arguments.callee)
        }
    }
})

restartBtn.addEventListener('click', () => {
    reset()
})

dibujarPalabra()
