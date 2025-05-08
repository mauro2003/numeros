// js/juego.js
import { cargarRanking } from './ranking.js';
import { mostrarPantallaSecreta } from './ui.js';
import { db } from './firebase.js';

let secreto, maxNum, intCount, adivinado, tiempoRest, timer;

// Inicializa el juego cuando el usuario elige nivel
function iniciarJuego() {
  const nom = document.getElementById('nombreJugador').value.trim();
  if (!nom) return alert('Ingresá tu nombre');
  const nivel = document.getElementById('dificultad').value;
  if (!nivel) return;

  clearInterval(timer);
  if (nivel === 'facil') { maxNum = 10; tiempoRest = 60; }
  else if (nivel === 'medio') { maxNum = 20; tiempoRest = 60; }
  else if (nivel === 'dificil') { maxNum = 50; tiempoRest = 60; }
  else { maxNum = 100; tiempoRest = 30; }

  secreto = Math.floor(Math.random() * maxNum) + 1;
  intCount = 0;
  adivinado = false;

  document.getElementById('rango').textContent = `Entre 1 y ${maxNum}`;
  ['mensaje','temporizador'].forEach(id => document.getElementById(id).textContent = '');
  document.getElementById('intentos').textContent = 'Intentos: 0';

  const inp = document.getElementById('numeroIngresado');
  inp.value = '';
  inp.disabled = false;
  document.getElementById('btnAdivinar').disabled = false;
  inp.focus();

  iniciarTemporizador(nivel);
  cargarRanking(); // refresca ranking
}

// Verifica la adivinanza
function verificar() {
  if (adivinado) return;
  const val = +document.getElementById('numeroIngresado').value;
  if (!val || val < 1 || val > maxNum) return;

  intCount++;
  document.getElementById('intentos').textContent = `Intentos: ${intCount}`;

  if (val === secreto) {
    adivinado = true;
    clearInterval(timer);
    const nom = document.getElementById('nombreJugador').value;
    const tot = (maxNum === 100 ? 30 : 60);
    const timeSpent = tot - tiempoRest;
    document.getElementById('mensaje').textContent =
      `🎉 ¡${nom}, acertaste en ${intCount} intentos y ${timeSpent}s!`;
    enviarRanking(nom, document.getElementById('dificultad').value, intCount, timeSpent);
    if (intCount === 1) mostrarPantallaSecreta();
  } else {
    document.getElementById('mensaje').textContent =
      val < secreto ? '📉 Muy bajo' : '📈 Muy alto';
  }
}

// Temporizador según nivel
function iniciarTemporizador(nivel) {
  if (nivel === 'facil') return;
  const barra = document.getElementById('barraTiempo');
  barra.style.width = '100%';
  timer = setInterval(() => {
    tiempoRest--;
    document.getElementById('temporizador').textContent = `⏳ ${tiempoRest}s`;
    const tot = nivel === 'extremo' ? 30 : 60;
    barra.style.width = `${(tiempoRest / tot) * 100}%`;
    if (tiempoRest <= 0) {
      clearInterval(timer);
      document.getElementById('mensaje').textContent =
        `⛔ Se acabó el tiempo, era ${secreto}`;
      document.getElementById('btnAdivinar').disabled = true;
    }
  }, 1000);
}

function reiniciar() {
  clearInterval(timer);
  iniciarJuego();
}

function cambiarJugador() {
  clearInterval(timer);
  ['nombreJugador','dificultad','numeroIngresado'].forEach(id =>
    document.getElementById(id).value = ''
  );
  ['numeroIngresado','btnAdivinar'].forEach(id =>
    document.getElementById(id).disabled = true
  );
  ['mensaje','temporizador','rango','intentos'].forEach(id =>
    document.getElementById(id).textContent =
      id === 'intentos' ? 'Intentos: 0' : ''
  );
}

// Enviar ranking con tiempo
function enviarRanking(nombre, nivel, intentos, timeSpent) {
  db.ref('rankings').push().set(
    { nombre, nivel, intentos, timeSpent, ts: Date.now() },
    e => e && console.error(e)
  );
}

export {
  iniciarJuego,
  verificar,
  reiniciar,
  cambiarJugador
};
