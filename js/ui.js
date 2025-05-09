// js/ui.js

// Muestra la pantalla secreta por 3 segundos
export function mostrarPantallaSecreta() {
  const pantalla = document.getElementById('pantallaMensaje');
  pantalla.style.display = 'flex';
  setTimeout(() => (pantalla.style.display = 'none'), 3000);
}

// Inicializa el toggle de la música de fondo
export function inicializarAudio() {
  const audio = document.getElementById('musicaFondo');
  const btn   = document.getElementById('btnMusica');
  if (!audio || !btn) return;

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => {});
      btn.textContent = '🔊';
      btn.style.background = '#28a745';
    } else {
      audio.pause();
      btn.textContent = '🔇';
      btn.style.background = '#dc3545';
    }
  });
}

// Inicializa el modo oscuro
export function inicializarModoOscuro() {
  const btn = document.getElementById('btnDarkMode');
  if (!btn) return;
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('modoDark', document.body.classList.contains('dark'));
  });
  if (localStorage.getItem('modoDark') === 'true') {
    document.body.classList.add('dark');
  }
}
