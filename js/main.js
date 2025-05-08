// js/main.js
import { iniciarJuego, verificar, reiniciar, cambiarJugador } from './juego.js';
import { cargarRanking } from './ranking.js';
import { inicializarModoOscuro, inicializarAudio } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  // Eventos del juego
  document.getElementById('dificultad')
          .addEventListener('change', iniciarJuego);
  document.getElementById('btnAdivinar')
          .addEventListener('click', verificar);
  document.getElementById('btnReiniciar')
          .addEventListener('click', reiniciar);
  document.getElementById('btnCambiar')
          .addEventListener('click', cambiarJugador);

  // Carga inicial de datos y UI
  cargarRanking();        // Ranking online
  inicializarModoOscuro();// Tema oscuro
  inicializarAudio();     // Toggle de música
});
