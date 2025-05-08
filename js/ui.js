// js/ui.js

// Muestra la pantalla secreta por 3 segundos
export function mostrarPantallaSecreta() {
  const pantalla = document.getElementById('pantallaMensaje');
  pantalla.style.display = 'flex';
  setTimeout(() => pantalla.style.display = 'none', 3000);
}

// Inicializa el botón de modo oscuro
export function inicializarModoOscuro() {
  const btn = document.getElementById('btnDarkMode');
  if (!btn) return;

  // Al hacer clic, alterna la clase y guarda preferencia
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('modoDark', document.body.classList.contains('dark'));
  });

  // Al cargar la página, restaura la preferencia
  if (localStorage.getItem('modoDark') === 'true') {
    document.body.classList.add('dark');
  }
}
