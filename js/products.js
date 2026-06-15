/**
 * products.js — Base de données des produits
 * Centralise tous les produits du catalogue.
 * Pour ajouter un produit : copier un objet et modifier ses valeurs.
 */

const PRODUCTS = [
  {
    id: 1,
    name: "Montre Élégance Noir",
    category: "montres",
    price: 189.00,
    oldPrice: 249.00,
    badge: "Promo",
    rating: 4.8,
    reviews: 124,
    stock: 15,
    description: "Une montre raffinée au design épuré. Bracelet en cuir véritable, verre saphir anti-rayures et mouvement japonais de précision. Parfaite pour toutes les occasions.",
    features: ["Mouvement japonais Miyota", "Verre saphir", "Bracelet cuir véritable", "Étanchéité 5ATM", "Garantie 2 ans"],
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600&q=80",
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=600&q=80"
    ],
    featured: true
  },
  {
    id: 2,
    name: "Sac Cuir Minimaliste",
    category: "maroquinerie",
    price: 145.00,
    oldPrice: null,
    badge: "Nouveau",
    rating: 4.9,
    reviews: 87,
    stock: 8,
    description: "Sac en cuir pleine fleur, fabriqué artisanalement en Italie. Design minimaliste avec compartiments bien pensés pour un usage quotidien ou professionnel.",
    features: ["Cuir pleine fleur", "Fabrication artisanale", "Doublure en lin", "Fermeture magnétique", "Bandoulière amovible"],
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80"
    ],
    featured: true
  },
  {
    id: 3,
    name: "Parfum Or Noir",
    category: "parfums",
    price: 95.00,
    oldPrice: null,
    badge: null,
    rating: 4.7,
    reviews: 203,
    stock: 30,
    description: "Une fragrance boisée et envoûtante. Notes de tête : bergamote et poivre. Notes de cœur : oud et rose. Notes de fond : santal et ambre. Un parfum pour les âmes audacieuses.",
    features: ["100ml Eau de Parfum", "Notes boisées & épicées", "Longue tenue 12h+", "Flacon rechargeable", "Coffret cadeau inclus"],
    image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
      "https://images.unsplash.com/photo-1568037631851-e2cf9b7fe631?w=600&q=80"
    ],
    featured: true
  },
  {
    id: 4,
    name: "Carnet Premium Doré",
    category: "papeterie",
    price: 38.00,
    oldPrice: null,
    badge: null,
    rating: 4.6,
    reviews: 56,
    stock: 50,
    description: "Carnet A5 à couverture rigide en lin, avec tranche dorée et papier ivoire 120g/m². Idéal pour les créatifs et les professionnels exigeants.",
    features: ["Format A5", "240 pages ivoire 120g", "Tranche dorée", "Reliure cousue", "Marque-page en satin"],
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80",
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=80",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80"
    ],
    featured: false
  },
  {
    id: 5,
    name: "Lunettes Architecte",
    category: "accessoires",
    price: 210.00,
    oldPrice: 275.00,
    badge: "Promo",
    rating: 4.5,
    reviews: 44,
    stock: 12,
    description: "Montures en acétate premium, design géométrique inspiré du Bauhaus. Verres polarisés UV400. Un accessoire iconique qui traverse les tendances.",
    features: ["Acétate premium", "Verres polarisés UV400", "Charnières ressort", "Étui rigide inclus", "Garantie 1 an"],
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80"
    ],
    featured: true
  },
  {
    id: 6,
    name: "Bougie Ambiance Luxe",
    category: "maison",
    price: 55.00,
    oldPrice: null,
    badge: "Best-seller",
    rating: 4.9,
    reviews: 312,
    stock: 25,
    description: "Bougie en cire de soja, parfumée aux huiles essentielles de cèdre et vétiver. 60 heures de combustion, contenant en verre recyclé avec couvercle en laiton.",
    features: ["Cire de soja 100%", "Huiles essentielles pures", "60h de combustion", "Contenant recyclable", "Mèche en coton"],
    image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&q=80",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80",
      "https://images.unsplash.com/photo-1616396678406-e0f8c3fb4d38?w=600&q=80"
    ],
    featured: false
  },
  {
    id: 7,
    name: "Stylo Plume Or",
    category: "papeterie",
    price: 125.00,
    oldPrice: null,
    badge: null,
    rating: 4.8,
    reviews: 78,
    stock: 6,
    description: "Stylo plume en résine noire avec plume en acier rhodié 18K. Équilibré, confortable, il transforme chaque signature en œuvre d'art.",
    features: ["Plume 18K rhodiée", "Résine noire premium", "Cartouche & convertisseur", "Boîte cadeau", "Gravure possible"],
    image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600&q=80",
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&q=80",
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80"
    ],
    featured: false
  },
  {
    id: 8,
    name: "Bracelet Jonc Doré",
    category: "bijoux",
    price: 72.00,
    oldPrice: null,
    badge: "Nouveau",
    rating: 4.7,
    reviews: 91,
    stock: 20,
    description: "Jonc en laiton plaqué or 18K, finition brossée mate. Design intemporel, port confortable. Résistant à l'eau et aux activités quotidiennes.",
    features: ["Laiton plaqué or 18K", "Finition brossée", "Résistant à l'eau", "Diamètre ajustable", "Sachet velours inclus"],
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
      "https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=600&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80"
    ],
    featured: true
  }
];

// Catégories disponibles
const CATEGORIES = [
  { id: "all", name: "Tous les produits", icon: "✦" },
  { id: "montres", name: "Montres", icon: "⌚" },
  { id: "maroquinerie", name: "Maroquinerie", icon: "👜" },
  { id: "parfums", name: "Parfums", icon: "🌿" },
  { id: "papeterie", name: "Papeterie", icon: "✒️" },
  { id: "accessoires", name: "Accessoires", icon: "🕶️" },
  { id: "maison", name: "Maison", icon: "🕯️" },
  { id: "bijoux", name: "Bijoux", icon: "💍" }
];

// Helpers
const getProductById = (id) => PRODUCTS.find(p => p.id === parseInt(id));
const getFeaturedProducts = () => PRODUCTS.filter(p => p.featured);
const getProductsByCategory = (cat) => cat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
