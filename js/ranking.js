// js/ranking.js
import { db } from './firebase.js';

const dificultadPeso = {
  facil:   1,
  medio:   2,
  dificil: 3,
  extremo: 4
};

function cargarRanking() {
  db.ref('rankings').on('value', snap => {
    const items = [];
    snap.forEach(child => items.push(child.val()));

    items.sort((a, b) => {
      const d = dificultadPeso[a.nivel] - dificultadPeso[b.nivel];
      if (d) return d;
      if (a.intentos !== b.intentos) return a.intentos - b.intentos;
      return (a.timeSpent || 0) - (b.timeSpent || 0);
    });

    renderRanking(items.slice(0, 10));
  });
}

function renderRanking(entries) {
  const ul = document.getElementById('rankingOnline');
  ul.innerHTML = '';
  entries.forEach(({ nombre, nivel, intentos, timeSpent }) => {
    const li = document.createElement('li');
    li.textContent = `${nombre} — ${nivel} — ${intentos} intento(s)`
                     + (timeSpent ? ` — ${timeSpent}s` : '');
    ul.appendChild(li);
  });
}

export { cargarRanking };
