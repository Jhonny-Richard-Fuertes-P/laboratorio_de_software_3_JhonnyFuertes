// Loader para incluir fragmentos HTML (parciales) de manera recursiva
(async function includePartials() {
  async function processOnce() {
    const slots = document.querySelectorAll('[data-include]');
    let count = 0;
    for (const el of slots) {
      const url = el.getAttribute('data-include');
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        el.innerHTML = await res.text();
      } catch (err) {
        el.innerHTML = `<div class="alert alert-warning">No se pudo cargar <code>${url}</code> (${err.message}).</div>`;
      } finally {
        el.removeAttribute('data-include');
        count++;
      }
    }
    return count;
  }

  // Ejecuta múltiples pasadas hasta que no queden inclusiones anidadas
  // Evita bucles infinitos con un máximo de 10 iteraciones
  for (let i = 0; i < 10; i++) {
    const processed = await processOnce();
    const remaining = document.querySelector('[data-include]');
    if (!remaining) break;
    if (processed === 0) break;
  }
})();


