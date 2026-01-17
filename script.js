let actualId = "";
let indice = 0;
let startX = 0;

/* 🎶 Reproductor */
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playPause");
const progress = document.getElementById("progress");
const songTitle = document.getElementById("songTitle");

const recuerdos = {
    dic1: {
        titulo: "La cita perfecta",
        imagenes: [
            "img/fecha2.jpeg",
            "img/fecha2_1.jpeg",
            "img/fecha2_2.jpeg",
            "img/fecha2_3.jpeg",
            "img/fecha2_4.jpeg",
            "img/fecha2_5.jpeg",
            "img/fecha2_6.jpeg",
            "img/fecha2_7.jpeg"
        ],
        descripcion: "Una cita increíble contigo 💖",
        musica: "music/cancion1.mp3",
        nombreCancion: "Nuestra primera cita"
    },
    ene8: {
        titulo: "Otro gran día",
        imagenes: [
            "img/fecha2.jpeg",
            "img/fecha2_1.jpeg",
            "img/fecha2_2.jpeg",
            "img/fecha2_3.jpeg"
        ],
        descripcion: "Momentos que quiero repetir ✨",
        musica: "music/cancion2.mp3",
        nombreCancion: "Momentos contigo"
    },
    ene12: {
        titulo: "Un recuerdo más",
        imagenes: [
            "img/fecha3.jpeg",
            "img/fecha3_1.jpeg",
            "img/fecha3_2.jpeg",
            "img/fecha3_3.jpeg"
        ],
        descripcion: "Siempre contigo 💫",
        musica: "music/cancion3.mp3",
        nombreCancion: "Siempre tú"
    }
};

/* =====================
   CARGAR RECUERDO
===================== */
function cargarRecuerdo(id) {
    actualId = id;
    indice = 0;

    const r = recuerdos[id];

    document.getElementById("titulo").textContent = r.titulo;
    document.getElementById("desc").textContent = r.descripcion;

    mostrarImagen();
    cargarCalificacion();

    document.getElementById("texto-reco").value =
        localStorage.getItem(id + "_reco") || "";

    // 🎶 Cambiar canción
    audio.src = r.musica;
    songTitle.textContent = r.nombreCancion;
    audio.play();
    playBtn.textContent = "⏸";

    document.getElementById("display-card").classList.remove("hidden");
}

/* =====================
   SLIDER
===================== */
function mostrarImagen() {
    const img = document.getElementById("slider-img");
    img.src = recuerdos[actualId].imagenes[indice];
    img.onclick = () => abrirModal(img.src);
}

function siguiente() {
    indice = (indice + 1) % recuerdos[actualId].imagenes.length;
    mostrarImagen();
}

function anterior() {
    indice =
        (indice - 1 + recuerdos[actualId].imagenes.length) %
        recuerdos[actualId].imagenes.length;
    mostrarImagen();
}

/* =====================
   SWIPE
===================== */
const slider = document.getElementById("slider");
slider.addEventListener("touchstart", e => startX = e.touches[0].clientX);
slider.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (diff > 50) siguiente();
    if (diff < -50) anterior();
});

/* =====================
   MODAL
===================== */
function abrirModal(src) {
    document.getElementById("modal-img").src = src;
    document.getElementById("modal").style.display = "flex";
}
function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}

/* =====================
   RATING
===================== */
function calificar(valor) {
    localStorage.setItem(actualId + "_rating", valor);
    actualizarEstrellas(valor);
}
function cargarCalificacion() {
    actualizarEstrellas(localStorage.getItem(actualId + "_rating") || 0);
}
function actualizarEstrellas(v) {
    document.querySelectorAll(".rating span").forEach((e, i) => {
        e.classList.toggle("active", i < v);
    });
}

/* =====================
   RECOMENDACIONES
===================== */
function guardarRecomendacion() {
    localStorage.setItem(
        actualId + "_reco",
        document.getElementById("texto-reco").value
    );
    alert("Guardado 💖");
}

/* =====================
   REPRODUCTOR
===================== */
function toggleMusic() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
}

audio.addEventListener("timeupdate", () => {
    const porcentaje = (audio.currentTime / audio.duration) * 100;
    progress.style.width = porcentaje + "%";
});

audio.addEventListener("ended", () => {
    playBtn.textContent = "▶";
});

