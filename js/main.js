// js/main.js
import { iniciarJuego, verificar, reiniciar, cambiarJugador } from './juego.js';
import { cargarRanking }      from './ranking.js';
import { inicializarModoOscuro, inicializarAudio } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('dificultad')
          .addEventListener('change', iniciarJuego);
  document.getElementById('btnAdivinar')
          .addEventListener('click', verificar);
  document.getElementById('btnReiniciar')
          .addEventListener('click', reiniciar);
  document.getElementById('btnCambiar')
          .addEventListener('click', cambiarJugador);

  cargarRanking();
  inicializarModoOscuro();
  inicializarAudio();
});
