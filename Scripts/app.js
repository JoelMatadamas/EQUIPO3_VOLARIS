let imagenes = [
    "https://cms.volaris.com/globalassets/startpage/fondo-ibe/3_miercoles/mx_es_dic_home.jpg",
    "https://cms.volaris.com/globalassets/startpage/fondo-ibe/3_miercoles/mx_es_29oct_vclub_home.jpg", 
    "https://cms.volaris.com/globalassets/startpage/fondo-ibe/0_yavas/yavas_rotacion_volaris_inclusive_octubre25-1.jpg"
];

let atras = document.getElementById("atras");
let adelante = document.getElementById("adelante");
let contenedorImagenes = document.getElementById("img");
let puntos = document.getElementById("puntos");
let elementosImagenes = document.querySelector(".imagenes");

let actual = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;
let dragThreshold = 50; 

// Inicializar carrusel
function inicializarCarrusel() {
    contenedorImagenes.innerHTML = '';
    const contenedorSlides = document.createElement('div');
    contenedorSlides.className = 'contenedor-imagenes';
    
    imagenes.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `<img class="img" src="${src}" alt="imagen ${index + 1}" loading="lazy">`;
        contenedorSlides.appendChild(slide);
    });
    
    contenedorImagenes.appendChild(contenedorSlides);
    positionCarrusel();
}

function cambiarSlide(direccion) {
    actual += direccion;
    
    if (actual < 0) {
        actual = imagenes.length - 1;
    } else if (actual >= imagenes.length) {
        actual = 0;
    }
    
    positionCarrusel();
}

function positionCarrusel() {
    const contenedorSlides = document.querySelector('.contenedor-imagenes');
    contenedorSlides.style.transform = `translateX(-${actual * 100}%)`;
    
    puntos.innerHTML = "";
    for (let i = 0; i < imagenes.length; i++) {
        const punto = document.createElement('p');
        if (i === actual) {
            punto.className = 'bold';
        }
        punto.addEventListener('click', () => {
            actual = i;
            positionCarrusel();
        });
        puntos.appendChild(punto);
    }
}

atras.addEventListener('click', () => cambiarSlide(-1));
adelante.addEventListener('click', () => cambiarSlide(1));

elementosImagenes.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    currentX = startX;
    isDragging = true;
});

elementosImagenes.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    
    const contenedorSlides = document.querySelector('.contenedor-imagenes');
    const slideWidth = elementosImagenes.offsetWidth;
    const dragOffset = (diff / slideWidth) * 100;
    contenedorSlides.style.transform = `translateX(calc(-${actual * 100}% + ${dragOffset}%))`;
});

elementosImagenes.addEventListener('touchend', () => {
    if (!isDragging) return;
    
    const diff = currentX - startX;
    const slideWidth = elementosImagenes.offsetWidth;
    
    if (Math.abs(diff) > dragThreshold) {
        if (diff > 0) {
            cambiarSlide(-1); 
        } else {
            cambiarSlide(1); 
        }
    } else {
        positionCarrusel();
    }
    
    isDragging = false;
});


elementosImagenes.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    currentX = startX;
    isDragging = true;
    elementosImagenes.style.cursor = 'grabbing';
});

elementosImagenes.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    currentX = e.clientX;
    const diff = currentX - startX;
    
    
    const contenedorSlides = document.querySelector('.contenedor-imagenes');
    const slideWidth = elementosImagenes.offsetWidth;
    const dragOffset = (diff / slideWidth) * 100;
    contenedorSlides.style.transform = `translateX(calc(-${actual * 100}% + ${dragOffset}%))`;
});

elementosImagenes.addEventListener('mouseup', () => {
    if (!isDragging) return;
    
    const diff = currentX - startX;
    const slideWidth = elementosImagenes.offsetWidth;
    
    if (Math.abs(diff) > dragThreshold) {
        if (diff > 0) {
            cambiarSlide(-1);
        } else {
            cambiarSlide(1);
        }
    } else {
        positionCarrusel();
    }
    
    isDragging = false;
    elementosImagenes.style.cursor = 'grab';
});

elementosImagenes.addEventListener('mouseleave', () => {
    if (isDragging) {
        positionCarrusel();
        isDragging = false;
        elementosImagenes.style.cursor = 'grab';
    }
});

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        cambiarSlide(-1);
    } else if (e.key === 'ArrowRight') {
        cambiarSlide(1);
    }
});


inicializarCarrusel();


function manejarFooterResponsive() {
    const footerDetails = document.querySelectorAll('.footer-columna[open], .footer-columna:not([open])');
    const esDesktop = window.innerWidth > 768;

    footerDetails.forEach(detail => {
        if (detail.tagName === 'DETAILS') {
            if (esDesktop) {
                detail.setAttribute('open', '');
            } else {
                detail.removeAttribute('open');
            }
        }
    });
}

window.addEventListener('load', manejarFooterResponsive);
window.addEventListener('resize', manejarFooterResponsive);