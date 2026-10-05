document.addEventListener("DOMContentLoaded", () => {

    const videoPrincipal = document.getElementById("videoPrincipal");
    const tituloPrincipal = document.getElementById("tituloPrincipal");
    const statsPrincipal = document.getElementById("statsPrincipal");
    const listaCola = document.getElementById("listaCola");

    // 1. REPRODUCIR VIDEO AL HACER CLIC EN CUALQUIER ITEM DE LA LISTA O GRID
    document.addEventListener("click", (e) => {
        // Si el clic fue en un botón de acción (+ o ✕ o Limpiar), no cambiar video
        if (e.target.closest(".btn-agregar") || e.target.closest(".btn-eliminar") || e.target.closest(".btn-limpiar")) {
            return;
        }

        const item = e.target.closest(".item-reproducible");
        if (item) {
            const src = item.getAttribute("data-src");
            const titulo = item.getAttribute("data-titulo");
            const vistas = item.getAttribute("data-vistas");

            if (src) {
                videoPrincipal.src = src;
                tituloPrincipal.textContent = titulo;
                if (vistas) statsPrincipal.textContent = vistas;
                
                videoPrincipal.play();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    });

    // 2. BOTÓN ME GUSTA
    const btnMeGusta = document.getElementById("btnMeGusta");
    const contadorLikes = document.getElementById("contadorLikes");
    let likes = 4800;
    let haDadoLike = false;

    if (btnMeGusta) {
        btnMeGusta.addEventListener("click", () => {
            if (!haDadoLike) {
                likes++;
                haDadoLike = true;
                btnMeGusta.classList.add("activo-like");
            } else {
                likes--;
                haDadoLike = false;
                btnMeGusta.classList.remove("activo-like");
            }
            contadorLikes.textContent = likes;
        });
    }

    // 3. BOTÓN SUSCRIBIRSE
    const btnSuscribirse = document.getElementById("btnSuscribirse");
    const contadorSubs = document.getElementById("contadorSubs");
    let subs = 1200000;
    let suscrito = false;

    if (btnSuscribirse) {
        btnSuscribirse.addEventListener("click", () => {
            if (!suscrito) {
                subs++;
                suscrito = true;
                btnSuscribirse.textContent = "Suscrito";
                btnSuscribirse.classList.add("suscrito");
            } else {
                subs--;
                suscrito = false;
                btnSuscribirse.textContent = "Suscribirse";
                btnSuscribirse.classList.remove("suscrito");
            }
            contadorSubs.textContent = subs.toLocaleString();
        });
    }

    // 4. AGREGAR A LA COLA DE REPRODUCCIÓN (+)
    document.addEventListener("click", (e) => {
        const btnAgregar = e.target.closest(".btn-agregar");
        if (btnAgregar) {
            e.stopPropagation();

            const titulo = btnAgregar.getAttribute("data-titulo");
            const vistas = btnAgregar.getAttribute("data-vistas");
            const duracion = btnAgregar.getAttribute("data-duracion");
            const src = btnAgregar.getAttribute("data-src");
            const gif = btnAgregar.getAttribute("data-gif") || "https://media.giphy.com/media/3o7aD1zsNcOG26N9iE/giphy.gif";
            const img = btnAgregar.getAttribute("data-img") || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&auto=format&fit=crop&q=80";

            const nuevoItem = document.createElement("div");
            nuevoItem.className = "item-video item-reproducible";
            nuevoItem.setAttribute("data-src", src);
            nuevoItem.setAttribute("data-titulo", titulo);
            nuevoItem.setAttribute("data-vistas", vistas + " • Reciente");

            nuevoItem.innerHTML = `
                <div class="boceto-mini">
                    <img src="${img}" class="img-preview" alt="${titulo}">
                    <img src="${gif}" class="gif-hover" alt="GIF ${titulo}">
                    <span class="duracion-mini">${duracion}</span>
                </div>
                <div class="info-mini">
                    <strong>${titulo}</strong>
                    <span>VideoStream</span>
                    <span>${vistas}</span>
                </div>
                <button class="btn-eliminar" title="Quitar de la cola">✕</button>
            `;

            listaCola.appendChild(nuevoItem);
        }
    });

    // 5. ELIMINAR ITEM Y LIMPIAR COLA
    document.addEventListener("click", (e) => {
        const btnEliminar = e.target.closest(".btn-eliminar");
        if (btnEliminar) {
            e.stopPropagation();
            const itemVideo = btnEliminar.closest(".item-video");
            if (itemVideo) itemVideo.remove();
        }
    });

    const btnLimpiarCola = document.getElementById("btnLimpiarCola");
    if (btnLimpiarCola) {
        btnLimpiarCola.addEventListener("click", (e) => {
            e.stopPropagation();
            listaCola.innerHTML = "";
        });
    }

});