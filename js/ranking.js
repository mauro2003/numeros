// js/ranking.js
import { db } from './firebase.js';

// Asignamos un peso a cada nivel para ordenar
const dificultadPeso = {
  facil:   1,
  medio:   2,
  dificil: 3,
  extremo: 4
};

// Función que suscribe un listener único a los cambios del nodo "rankings"
function cargarRanking() {
  db.ref('rankings')
    .on('value', snap => {
      const items = [];
      snap.forEach(child => items.push(child.val()));

      // Ordenamos por (nivel, intentos, timeSpent)
      items.sort((a, b) => {
        const d = dificultadPeso[a.nivel] - dificultadPeso[b.nivel];
        if (d) return d;
        if (a.intentos !== b.intentos) return a.intentos - b.intentos;
        return (a.timeSpent || 0) - (b.timeSpent || 0);
      });

      // Tomamos los 10 mejores
      const top10 = items.slice(0, 10);
      renderRanking(top10);
    });
}

function renderRanking(entries) {
  const ul = document.getElementById('rankingOnline');
  if (!ul) return;
  ul.innerHTML = '';
  entries.forEach(({ nombre, nivel, intentos, timeSpent }) => {
    const li = document.createElement('li');
    li.textContent =
      `${nombre} — ${nivel} — ${intentos} intento(s)` +
      (timeSpent != null ? ` — ${timeSpent}s` : '');
    ul.appendChild(li);
  });
}

export { cargarRanking };
