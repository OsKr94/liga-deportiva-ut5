// ------------------------------------
// DATOS DE DEMO (relleno para visualización)
// ------------------------------------

window.addEventListener('load', () => {

const DATA = {
  equipos: [
    { id: 1, nombre: "Tigres DAW", comp: "futbol", capitan: "Hugo", jugadores: ["Hugo", "Marcos", "Iván", "David", "Óscar", "Leo"] },
    { id: 2, nombre: "Maestre United", comp: "futbol", capitan: "Nadia", jugadores: ["Nadia", "Sara", "Pablo", "Marta", "Luis", "Rafa"] },
    { id: 3, nombre: "Triple Doble", comp: "baloncesto", capitan: "Sergio", jugadores: ["Sergio", "Ana", "Diego", "Alba", "Noa"] },
    { id: 4, nombre: "Set Point", comp: "tenis", capitan: "Lucía", jugadores: ["Lucía", "Rubén"] },
    { id: 5, nombre: "Pixel Warriors", comp: "esports", capitan: "Vega", jugadores: ["Vega", "Kai", "Zoe", "Álex"] },
  ],
  resultados: [
    { j: 1, comp: "futbol", local: "Tigres DAW", visit: "Maestre United", fecha: "2025-10-10", res: "2-1" },
    { j: 1, comp: "baloncesto", local: "Triple Doble", visit: "IES All-Stars", fecha: "2025-10-11", res: "57-61" },
    { j: 1, comp: "tenis", local: "Lucía", visit: "Rubén", fecha: "2025-10-12", res: "6-4 6-3" },
    { j: 1, comp: "esports", local: "Pixel Warriors", visit: "Byte Kings", fecha: "2025-10-13", res: "2-0" },
    { j: 2, comp: "futbol", local: "Maestre United", visit: "Tigres DAW", fecha: "2025-10-20", res: "0-0" },
  ],
  clasif: {
    futbol: [
      { pos: 1, nombre: "Tigres DAW", pj: 2, pg: 1, pe: 1, pp: 0, gf: 2, gc: 1, pts: 4 },
      { pos: 2, nombre: "Maestre United", pj: 2, pg: 0, pe: 2, pp: 0, gf: 1, gc: 2, pts: 2 },
    ],
    baloncesto: [
      { pos: 1, nombre: "IES All-Stars", pj: 1, pg: 1, pe: 0, pp: 0, gf: 61, gc: 57, pts: 2 },
      { pos: 2, nombre: "Triple Doble", pj: 1, pg: 0, pe: 0, pp: 1, gf: 57, gc: 61, pts: 1 },
    ],
    tenis: [
      { pos: 1, nombre: "Lucía", pj: 1, pg: 1, pe: 0, pp: 0, gf: 12, gc: 7, pts: 2 },
      { pos: 2, nombre: "Rubén", pj: 1, pg: 0, pe: 0, pp: 1, gf: 7, gc: 12, pts: 1 },
    ],
    esports: [
      { pos: 1, nombre: "Pixel Warriors", pj: 1, pg: 1, pe: 0, pp: 0, gf: 2, gc: 0, pts: 3 },
      { pos: 2, nombre: "Byte Kings", pj: 1, pg: 0, pe: 0, pp: 1, gf: 0, gc: 2, pts: 0 },
    ],
  },
  jugadores: [
    { id: 101, nombre: "Marta", comp: "futbol", rol: "Delantera", edad: 17, stats: "3 G, 1 A" },
    { id: 102, nombre: "Luis", comp: "futbol", rol: "Portero", edad: 18, stats: "2 CS" },
    { id: 103, nombre: "Ana", comp: "baloncesto", rol: "Base", edad: 17, stats: "12 ptos, 7 ast" },
    { id: 104, nombre: "Diego", comp: "baloncesto", rol: "Ala-Pívot", edad: 18, stats: "9 ptos, 8 reb" },
    { id: 105, nombre: "Rubén", comp: "tenis", rol: "Individual", edad: 18, stats: "0-1" },
    { id: 106, nombre: "Zoe", comp: "esports", rol: "IGL", edad: 17, stats: "KDA 3.2" },
  ],
  arbitros: [
    { id: 201, nombre: "Sara", comp: "futbol", rol: "Árbitra principal", edad: 19, stats: "12 partidos" },
    { id: 202, nombre: "Diego", comp: "baloncesto", rol: "Colegiado", edad: 20, stats: "7 partidos" },
    { id: 203, nombre: "Álex", comp: "tenis", rol: "Juez de silla", edad: 21, stats: "5 partidos" },
    { id: 204, nombre: "Noa", comp: "esports", rol: "Árbitra de torneo", edad: 19, stats: "3 torneos" },
  ]
};

// ------------------------------------
// FUNCIONES AUXILIARES
// ------------------------------------
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
function capital(s) { return s.charAt(0).toUpperCase() + s.slice(1); }



// ------------------------------------
// EVENTOS BOOTSTRAP Y LÓGICA DE INTERFAZ
// ------------------------------------

// 1. Carrusel de noticias + botón "Leer noticia"
const carouselEl = document.getElementById('newsCarousel');
if (carouselEl) {
  const car = new bootstrap.Carousel(carouselEl);

  // contador de diapositivas
  carouselEl.addEventListener('slid.bs.carousel', e => {
    const items = document.querySelectorAll('#newsCarousel .carousel-item');
    const idx = e.to ?? Array.from(items).findIndex(i => i.classList.contains('active'));
    const contador = document.getElementById('carruselContador');
    if (contador && idx >= 0) contador.textContent = `${idx + 1} / ${items.length}`;
  });
}

// --- NUEVO: rellenar el modal justo cuando se va a abrir ---
const modalNoticiaEl = document.getElementById('modalNoticia');
if (modalNoticiaEl) {
  modalNoticiaEl.addEventListener('show.bs.modal', () => {
    const active = document.querySelector('#newsCarousel .carousel-item.active');
    if (!active) return;

    const tituloEl = document.getElementById('modalNoticiaTitulo');
    const textoEl  = document.getElementById('modalNoticiaTexto');
    const imgEl    = document.getElementById('modalNoticiaImg');

    if (tituloEl) tituloEl.textContent = active.dataset.title  || 'Noticia';
    if (textoEl)  textoEl.textContent  = active.dataset.content || '';
    if (imgEl)    imgEl.src            = active.dataset.img     || '';
  });
}


// 2. Toast del formulario de contacto
const formContacto = document.getElementById('formContacto');
if (formContacto) {
  formContacto.addEventListener('submit', e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    // Mostrar toast
    const toastEl = document.getElementById('toastOk');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }

    form.reset();
    form.classList.remove('was-validated');
  });
}

// 3. Modal de inscripción (focus y reset)
const modalIns = document.getElementById('modalInscripcion');
if (modalIns) {
  modalIns.addEventListener('shown.bs.modal', () => {
    const input = document.getElementById('inscNombre');
    if (input) input.focus();
  });
  modalIns.addEventListener('hidden.bs.modal', () => {
    const form = document.getElementById('formInscripcion');
    if (form) {
      form.reset();
      form.classList.remove('was-validated');
    }
  });
}

// 4. Collapse (logs en consola)
const collapse = document.getElementById('calendarioHoy');
if (collapse) {
  collapse.addEventListener('show.bs.collapse', () => console.log('[Collapse] abierto #calendarioHoy'));
  collapse.addEventListener('hide.bs.collapse', () => console.log('[Collapse] cerrado #calendarioHoy'));
}

console.log("✨ Eventos Bootstrap activos");
});
