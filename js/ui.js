// js/ui.js

// Muestra la pantalla secreta
export function mostrarPantallaSecreta() {
  const pantalla = document.getElementById('pantallaMensaje');
  if (!pantalla) return;
  pantalla.style.display = 'flex';
  setTimeout(() => (pantalla.style.display = 'none'), 3000);
}

// Inicializa reproductor de música con playlist
export function inicializarAudio() {
  const audio   = document.getElementById('musicaFondo');
  const btnMute = document.getElementById('btnMute');
  const btnPrev = document.getElementById('btnPrev');
  const btnPlay = document.getElementById('btnPlay');
  const btnNext = document.getElementById('btnNext');
  if (!audio || !btnMute || !btnPrev || !btnPlay || !btnNext) return;

  // Aquí tu playlist de 4 canciones (musica1.mp3 ... musica4.mp3)
  const playlist = [
    'musica1.mp3',
    'musica2.mp3',
    'musica3.mp3',
    'musica4.mp3'
  ];
  let current = 0;

  // Carga pista n y opcionalmente la reproduce
  function cargarPista(n, autoplay = false) {
    current = (n + playlist.length) % playlist.length;
    audio.src = playlist[current];
    audio.load();
    if (autoplay) audio.play().catch(() => {});
    actualizarIconoPlay();
  }

  // Actualiza icono de play/pause
  function actualizarIconoPlay() {
    btnPlay.textContent = audio.paused ? '▶️' : '⏸️';
  }

  // 1) Mute / Unmute
  btnMute.addEventListener('click', () => {
    audio.muted = !audio.muted;
    btnMute.textContent = audio.muted ? '🔇' : '🔊';
  });

  // 2) Pista anterior
  btnPrev.addEventListener('click', () => cargarPista(current - 1, true));

  // 3) Play / Pausa
  btnPlay.addEventListener('click', () => {
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
    actualizarIconoPlay();
  });

  // 4) Siguiente pista
  btnNext.addEventListener('click', () => cargarPista(current + 1, true));

  // Al terminar cada pista, pasa a la siguiente automáticamente
  audio.addEventListener('ended', () => cargarPista(current + 1, true));

  // Arranca con la primera pista (sin reproducir de golpe)
  cargarPista(0, false);
}

// Inicializa modo oscuro (lo dejamos igual)
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
