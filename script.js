// Datos de los productos con más información
const productos = [
    {
        id: 1,
        nombre: "Smartphone Xiaomi",
        descripcion: "Teléfono inteligente con cámara de alta resolución y batería de larga duración. Perfecto para uso diario y fotografía.",
        precio: "€199.99",
        precioOriginal: "€299.99",
        descuento: "33%",
        imagen: "phone",
        enlace: "https://es.aliexpress.com/item/1005005903452898.html",
        rating: 4.5,
        vendidos: "2.3k",
        envioGratis: true
    },
    {
        id: 2,
        nombre: "Auriculares Bluetooth",
        descripcion: "Auriculares inalámbricos con cancelación de ruido y sonido premium. Batería de 30 horas.",
        precio: "€49.99",
        precioOriginal: "€89.99",
        descuento: "44%",
        imagen: "headphones",
        enlace: "https://amazon.es/dp/B08NFT6GJ8",
        rating: 4.8,
        vendidos: "5.1k",
        envioGratis: true
    },
    {
        id: 3,
        nombre: "Reloj Inteligente",
        descripcion: "Smartwatch con monitor de actividad, notificaciones inteligentes y resistencia al agua.",
        precio: "€79.99",
        precioOriginal: "€149.99",
        descuento: "47%",
        imagen: "smartwatch",
        enlace: "https://es.aliexpress.com/item/1005005958742345.html",
        rating: 4.3,
        vendidos: "1.8k",
        envioGratis: false
    },
    {
        id: 4,
        nombre: "Tablet Android",
        descripcion: "Tablet de 10 pulgadas con alta resolución, 128GB almacenamiento y 8GB RAM.",
        precio: "€159.99",
        precioOriginal: "€259.99",
        descuento: "38%",
        imagen: "tablet",
        enlace: "https://amazon.es/dp/B0C3QZV3WJ",
        rating: 4.6,
        vendidos: "967",
        envioGratis: true
    },
    {
        id: 5,
        nombre: "Cámara Deportiva",
        descripcion: "Cámara 4K impermeable para deportes extremos. Incluye múltiples accesorios.",
        precio: "€89.99",
        precioOriginal: "€179.99",
        descuento: "50%",
        imagen: "camera",
        enlace: "https://es.aliexpress.com/item/1005005921564873.html",
        rating: 4.7,
        vendidos: "3.2k",
        envioGratis: true
    },
    {
        id: 6,
        nombre: "Altavoz Portátil",
        descripcion: "Altavoz Bluetooth con sonido surround, bass boost y batería de 12 horas.",
        precio: "€39.99",
        precioOriginal: "€69.99",
        descuento: "43%",
        imagen: "speaker",
        enlace: "https://amazon.es/dp/B08CZCSJV1",
        rating: 4.4,
        vendidos: "4.5k",
        envioGratis: false
    }
];

// Íconos para las imágenes
const iconosProductos = {
    'phone': 'fas fa-mobile-alt',
    'headphones': 'fas fa-headphones',
    'smartwatch': 'fas fa-clock',
    'tablet': 'fas fa-tablet-alt',
    'camera': 'fas fa-camera',
    'speaker': 'fas fa-volume-up'
};

// Sistema de caché para productos
let productosCache = null;
let bannerInterval = null;

// Función optimizada para cargar productos
function cargarProductos() {
    const gridProductos = document.getElementById('productsGrid');
    
    if (!gridProductos) {
        console.error('Elemento productsGrid no encontrado');
        return;
    }
    
    // Usar caché si está disponible
    if (productosCache) {
        gridProductos.innerHTML = productosCache;
        animarProductos();
        return;
    }
    
    // Mostrar estado de carga
    gridProductos.innerHTML = '<div class="loading">Cargando productos...</div>';
    
    // Simular carga asíncrona
    setTimeout(() => {
        let productosHTML = '';
        
        productos.forEach((producto, index) => {
            const productoHTML = crearProductoHTML(producto, index);
            productosHTML += productoHTML;
        });
        
        productosCache = productosHTML;
        gridProductos.innerHTML = productosHTML;
        animarProductos();
    }, 300);
}

// Función para crear HTML de producto optimizado
function crearProductoHTML(producto, index) {
    const estrellasHTML = crearEstrellas(producto.rating);
    const envioGratisHTML = producto.envioGratis ? '<span class="envio-gratis">✈️ Envío Gratis</span>' : '';
    
    return `
        <div class="product-card" data-product-id="${producto.id}" style="animation-delay: ${index * 0.1}s">
            <div class="product-image">
                <i class="${iconosProductos[producto.imagen] || 'fas fa-box'}"></i>
            </div>
            <div class="product-badge">${producto.descuento}% OFF</div>
            <h3 class="product-title">${producto.nombre}</h3>
            <div class="product-rating">
                ${estrellasHTML}
                <span class="rating-text">(${producto.rating})</span>
            </div>
            <p class="product-description">${producto.descripcion}</p>
            <div class="product-price-container">
                <span class="product-price-original">${producto.precioOriginal}</span>
                <div class="product-price">${producto.precio}</div>
            </div>
            <div class="product-meta">
                <span class="vendidos">🔥 ${producto.vendidos} vendidos</span>
                ${envioGratisHTML}
            </div>
            <button class="buy-button" onclick="comprarProducto('${producto.enlace}', '${producto.nombre}')">
                Comprar Ahora <i class="fas fa-shopping-cart"></i>
            </button>
        </div>
    `;
}

// Función para crear estrellas de rating
function crearEstrellas(rating) {
    const estrellasEnteras = Math.floor(rating);
    const tieneMitadEstrella = rating % 1 >= 0.5;
    let estrellasHTML = '';
    
    for (let i = 0; i < estrellasEnteras; i++) {
        estrellasHTML += '<i class="fas fa-star"></i>';
    }
    
    if (tieneMitadEstrella) {
        estrellasHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const estrellasVacias = 5 - Math.ceil(rating);
    for (let i = 0; i < estrellasVacias; i++) {
        estrellasHTML += '<i class="far fa-star"></i>';
    }
    
    return estrellasHTML;
}

// Función mejorada para comprar producto
function comprarProducto(enlace, nombreProducto) {
    // Analytics tracking simulado
    console.log(`🛒 Producto clickeado: ${nombreProducto}`);
    
    // Efecto visual feedback
    event.target.classList.add('clicked');
    
    // Abrir enlace con atributos de seguridad
    setTimeout(() => {
        window.open(enlace, '_blank', 'noopener,noreferrer');
    }, 200);
}

// Función optimizada para rotar banners
function rotarBanners() {
    const banners = [
        {
            titulo: "¡Ofertas Exclusivas!",
            subtitulo: "Hasta 50% de descuento",
            emoji: "🎉"
        },
        {
            titulo: "Envío Gratis",
            subtitulo: "En compras superiores a €50",
            emoji: "✈️"
        },
        {
            titulo: "Nuevos Productos",
            subtitulo: "Cada semana",
            emoji: "🆕"
        },
        {
            titulo: "Clientes Satisfechos",
            subtitulo: "⭐⭐⭐⭐⭐",
            emoji: "😊"
        },
        {
            titulo: "Garantía de Calidad",
            subtitulo: "30 días de devolución",
            emoji: "🛡️"
        }
    ];
    
    const bannerElement = document.getElementById('affiliateBanner');
    if (!bannerElement) return;
    
    let indice = 0;
    
    // Limpiar intervalo anterior si existe
    if (bannerInterval) {
        clearInterval(bannerInterval);
    }
    
    // Función para actualizar banner
    function actualizarBanner() {
        const banner = banners[indice];
        bannerElement.innerHTML = `
            <div class="banner-content">
                <div class="banner-emoji">${banner.emoji}</div>
                <h4>${banner.titulo}</h4>
                <p>${banner.subtitulo}</p>
            </div>
        `;
        
        // Animación de cambio
        bannerElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            bannerElement.style.transform = 'scale(1)';
        }, 100);
        
        indice = (indice + 1) % banners.length;
    }
    
    // Actualizar inmediatamente y luego cada 4 segundos
    actualizarBanner();
    bannerInterval = setInterval(actualizarBanner, 4000);
}

// Función para animar productos cuando aparecen
function animarProductos() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Función para optimizar imágenes (lazy loading)
function optimizarImagenes() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Función para añadir efectos de scroll
function efectosScroll() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Efecto de header que se oculta/muestra
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Función para mejorar el rendimiento
function optimizarRendimiento() {
    // Debounce para eventos de scroll
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimizar eventos de resize
    window.addEventListener('resize', debounce(() => {
        // Re-calcular layouts si es necesario
        console.log('Viewport optimizado');
    }, 250));
}

// Función para añadir micro-interacciones
function microInteracciones() {
    // Efecto hover en botones
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Función principal de inicialización
function inicializarSitio() {
    console.log('🚀 Entrada.pro - Inicialización del sitio');
    
    // Marcar body como cargado
    document.body.classList.add('loaded');
    
    // Cargar productos
    cargarProductos();
    
    // Iniciar rotación de banners
    rotarBanners();
    
    // Inicializar optimizaciones
    optimizarImagenes();
    efectosScroll();
    optimizarRendimiento();
    
    // Añadir micro-interacciones después de un pequeño retraso
    setTimeout(() => {
        microInteracciones();
    }, 500);
    
    console.log('✅ Sitio Entrada.pro cargado con éxito');
}

// Manejo de errores mejorado
window.addEventListener('error', function(e) {
    console.error('❌ Error detectado:', e.error);
    // Opcional: enviar errores a servicio de analytics
});

// Inicialización cuando DOM está listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarSitio);
} else {
    inicializarSitio();
}

// Service Worker para caching (opcional, para PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registrado:', registration);
            })
            .catch(error => {
                console.log('Error en Service Worker:', error);
            });
    });
}

// Exportar funciones para uso global
window.comprarProducto = comprarProducto;
window.cargarProductos = cargarProductos;