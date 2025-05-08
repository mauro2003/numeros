// js/main.js
import { iniciarJuego, verificar, reiniciar, cambiarJugador } from './juego.js';
import { cargarRanking } from './ranking.js';
import { inicializarModoOscuro } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  // Eventos del juego
  document.getElementById('dificultad').addEventListener('change', iniciarJuego);
  document.getElementById('btnAdivinar').addEventListener('click', verificar);
  document.getElementById('btnReiniciar').addEventListener('click', reiniciar);
  document.getElementById('btnCambiar').addEventListener('click', cambiarJugador);

  // Carga inicial del ranking y modo oscuro
  cargarRanking();
  inicializarModoOscuro();
});
