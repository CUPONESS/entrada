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
// services/aliexpressService.js

class AliExpressService {
    constructor() {
        this.appKey = 'VOTRE_APP_KEY';
        this.appSecret = 'VOTRE_APP_SECRET';
        this.affiliateId = 'VOTRE_AFFILIATE_ID';
        this.baseURL = 'https://api.aliexpress.com/rest';
        this.accessToken = null;
    }

    // Méthode pour obtenir le token d'accès
    async getAccessToken() {
        try {
            const response = await fetch('/api/aliexpress/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    appKey: this.appKey,
                    appSecret: this.appSecret
                })
            });
            
            const data = await response.json();
            this.accessToken = data.access_token;
            return this.accessToken;
        } catch (error) {
            console.error('Erreur lors de la récupération du token:', error);
            return null;
        }
    }

    // Méthode pour rechercher des produits
    async searchProducts(keywords, options = {}) {
        const params = {
            method: 'aliexpress.affiliate.product.query',
            app_key: this.appKey,
            sign_method: 'md5',
            timestamp: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
            format: 'json',
            v: '2.0',
            fields: 'product_id,product_title,product_main_image_url,target_original_price,target_sale_price,target_currency,discount,evaluate_rate,commission_rate,shop_url,deep_link,shop_id',
            keywords: keywords,
            page_size: options.pageSize || 20,
            page_no: options.pageNo || 1,
            category_id: options.categoryId || '',
            sort: options.sort || 'popularity_desc',
            platform_product_type: options.platformType || 'ALL'
        };

        // Ajouter l'ID d'affiliation si disponible
        if (this.affiliateId) {
            params.affiliate_id = this.affiliateId;
        }

        try {
            const response = await fetch('/api/aliexpress/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            });

            const data = await response.json();
            return this.formatProducts(data);
        } catch (error) {
            console.error('Erreur lors de la recherche de produits:', error);
            return [];
        }
    }

    // Méthode pour obtenir les produits populaires
    async getHotProducts(category = 'electronics', limit = 20) {
        return await this.searchProducts('', {
            categoryId: this.getCategoryId(category),
            sort: 'popularity_desc',
            pageSize: limit
        });
    }

    // Méthode pour formater les produits de l'API
    formatProducts(apiData) {
        if (!apiData.results || !apiData.results.products) {
            return [];
        }

        return apiData.results.products.map((product, index) => ({
            id: product.product_id || index + 1,
            nombre: product.product_title,
            descripcion: this.generateDescription(product.product_title),
            precio: `€${parseFloat(product.target_sale_price || 0).toFixed(2)}`,
            precioOriginal: `€${parseFloat(product.target_original_price || 0).toFixed(2)}`,
            descuento: this.calculateDiscount(product.target_original_price, product.target_sale_price),
            imagen: this.getImageType(product.product_title),
            enlace: product.deep_link || product.shop_url,
            rating: this.parseRating(product.evaluate_rate),
            vendidos: this.formatSalesCount(product),
            envioGratis: this.hasFreeShipping(product),
            commission: product.commission_rate,
            imageUrl: product.product_main_image_url,
            shopId: product.shop_id
        }));
    }

    // Méthodes utilitaires
    calculateDiscount(originalPrice, salePrice) {
        const original = parseFloat(originalPrice);
        const sale = parseFloat(salePrice);
        
        if (original > 0 && sale > 0) {
            const discount = ((original - sale) / original) * 100;
            return `${Math.round(discount)}%`;
        }
        return '0%';
    }

    parseRating(ratingString) {
        if (!ratingString) return 4.0;
        const rating = parseFloat(ratingString);
        return isNaN(rating) ? 4.0 : Math.min(rating, 5.0);
    }

    formatSalesCount(product) {
        // Simulation du nombre de ventes basé sur la popularité
        const baseSales = Math.floor(Math.random() * 5000) + 500;
        return baseSales >= 1000 ? `${(baseSales / 1000).toFixed(1)}k` : baseSales.toString();
    }

    hasFreeShipping(product) {
        // Simulation - dans la réalité, vous devriez vérifier les données de livraison
        return Math.random() > 0.3;
    }

    generateDescription(productTitle) {
        const descriptions = {
            'phone': 'Smartphone haute performance avec écran HD, appareil photo avancé et batterie longue durée.',
            'headphones': 'Casque audio qualité supérieure avec réduction de bruit et confort optimal.',
            'smartwatch': 'Montre connectée avec suivi d\'activité, notifications et design élégant.',
            'tablet': 'Tablette polyvalente parfaite pour le travail et les loisirs.',
            'camera': 'Appareil photo professionnel avec fonctionnalités avancées pour des clichés parfaits.',
            'speaker': 'Haut-parleur portable avec son immersif et autonomie exceptionnelle.'
        };

        const title = productTitle.toLowerCase();
        for (const [key, desc] of Object.entries(descriptions)) {
            if (title.includes(key)) {
                return desc;
            }
        }

        return 'Produit de qualité supérieure avec excellent rapport qualité-prix. Livraison rapide disponible.';
    }

    getImageType(productTitle) {
        const title = productTitle.toLowerCase();
        if (title.includes('phone') || title.includes('smartphone')) return 'phone';
        if (title.includes('headphone') || title.includes('earphone')) return 'headphones';
        if (title.includes('watch') || title.includes('smartwatch')) return 'smartwatch';
        if (title.includes('tablet')) return 'tablet';
        if (title.includes('camera')) return 'camera';
        if (title.includes('speaker')) return 'speaker';
        return 'default';
    }

    getCategoryId(category) {
        const categories = {
            'electronics': '1',
            'phones': '509',
            'computers': '2',
            'home': '15',
            'sports': '18',
            'fashion': '3'
        };
        return categories[category] || '';
    }
}

// Instance globale du service
const aliExpressService = new AliExpressService();
// Modifier la fonction cargarProductos pour utiliser l'API
async function cargarProductos(categoria = 'electronics') {
    const gridProductos = document.getElementById('productsGrid');
    
    if (!gridProductos) {
        console.error('Elemento productsGrid no encontrado');
        return;
    }
    
    // Afficher le chargement
    gridProductos.innerHTML = '<div class="loading">🔄 Chargement des produits AliExpress...</div>';
    
    try {
        // Récupérer les produits depuis l'API AliExpress
        const productos = await aliExpressService.getHotProducts(categoria, 12);
        
        if (productos.length === 0) {
            gridProductos.innerHTML = '<div class="error">Aucun produit trouvé. Utilisation des produits par défaut.</div>';
            // Charger les produits par défaut en cas d'erreur
            cargarProductosPorDefecto();
            return;
        }
        
        let productosHTML = '';
        productos.forEach((producto, index) => {
            const productoHTML = crearProductoHTML(producto, index);
            productosHTML += productoHTML;
        });
        
        productosCache = productosHTML;
        gridProductos.innerHTML = productosHTML;
        animarProductos();
        
    } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        gridProductos.innerHTML = '<div class="error">Erreur de chargement. Utilisation des produits par défaut.</div>';
        cargarProductosPorDefecto();
    }
}

// Fonction de fallback avec produits par défaut
function cargarProductosPorDefecto() {
    // Votre code actuel pour les produits statiques
    const gridProductos = document.getElementById('productsGrid');
    let productosHTML = '';
    
    productos.forEach((producto, index) => {
        const productoHTML = crearProductoHTML(producto, index);
        productosHTML += productoHTML;
    });
    
    gridProductos.innerHTML = productosHTML;
    animarProductos();
}
// Ajouter cette fonction pour les filtres de catégorie
function inicializarFiltrosCategorias() {
    const categorias = [
        { id: 'electronics', nombre: 'Électronique', emoji: '📱' },
        { id: 'phones', nombre: 'Téléphones', emoji: '📞' },
        { id: 'computers', nombre: 'Informatique', emoji: '💻' },
        { id: 'home', nombre: 'Maison', emoji: '🏠' },
        { id: 'sports', nombre: 'Sports', emoji: '⚽' },
        { id: 'fashion', nombre: 'Mode', emoji: '👕' }
    ];
    
    const contenedorFiltros = document.createElement('div');
    contenedorFiltros.className = 'category-filters';
    
    categorias.forEach(categoria => {
        const boton = document.createElement('button');
        boton.className = 'category-filter';
        boton.innerHTML = `${categoria.emoji} ${categoria.nombre}`;
        boton.onclick = () => filtrarPorCategoria(categoria.id);
        contenedorFiltros.appendChild(boton);
    });
    
    // Insérer les filtres avant la grille de produits
    const gridProductos = document.getElementById('productsGrid');
    gridProductos.parentNode.insertBefore(contenedorFiltros, gridProductos);
}

async function filtrarPorCategoria(categoriaId) {
    // Mettre à jour l'interface
    document.querySelectorAll('.category-filter').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Charger les produits de la catégorie
    await cargarProductos(categoriaId);
}
/* Styles pour les filtres de catégorie */
.category-filters {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin: 20px 0;
    padding: 15px;
    background: var(--card-bg);
    border-radius: 12px;
    box-shadow: var(--shadow);
}

.category-filter {
    padding: 10px 20px;
    border: 2px solid var(--primary-color);
    background: transparent;
    color: var(--primary-color);
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
}

.category-filter:hover,
.category-filter.active {
    background: var(--primary-color);
    color: white;
    transform: translateY(-2px);
}

/* États de chargement et d'erreur */
.loading {
    text-align: center;
    padding: 40px;
    font-size: 18px;
    color: var(--primary-color);
}

.error {
    text-align: center;
    padding: 20px;
    background: #ffebee;
    color: #c62828;
    border-radius: 8px;
    margin: 20px 0;
}

/* Commission rate badge */
.commission-badge {
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
    margin-left: 8px;
}
// Modifier la fonction d'initialisation
function inicializarSitio() {
    console.log('🚀 Entrada.pro - Initialisation avec API AliExpress');
    
    document.body.classList.add('loaded');
    
    // Initialiser les filtres
    inicializarFiltrosCategorias();
    
    // Charger les produits électroniques par défaut
    cargarProductos('electronics');
    
    // Garder le reste de votre code existant
    rotarBanners();
    optimizarImagenes();
    efectosScroll();
    optimizarRendimiento();
    
    setTimeout(() => {
        microInteracciones();
    }, 500);
}
// api/aliexpress/products.js (côté serveur)
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const params = req.body;
            
            // Ajouter la signature ici (requis par l'API AliExpress)
            const signature = generateSignature(params, VOTRE_APP_SECRET);
            params.sign = signature;
            
            const response = await fetch('https://api.aliexpress.com/rest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(params)
            });
            
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Erreur API AliExpress' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
