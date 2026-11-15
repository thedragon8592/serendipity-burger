/**
 * Base de Datos Centralizada de la Carta — Serendipity Burger
 * Fuente de Verdad Oficial: SERENDIPITY NUEVa carta.pdf
 * Modificaciones Autorizadas: Milestone M1 (Corrección de Precios, Cócteles, Unificación & Adicionales)
 */

export const menuCategories = [
  {
    id: "hamburguesas",
    name: "Hamburguesas",
    macroCategory: "hamburguesas",
    iconKey: "burger",
    icon: "",
    badge: "Artesanales a la Parrilla"
  },
  {
    id: "parrillas-banquetes",
    name: "Parrillas & Banquetes",
    macroCategory: "parrillas-banquetes",
    iconKey: "grill",
    icon: "",
    badge: "Cortes & Para Compartir"
  },
  {
    id: "piqueos",
    name: "Piqueos & Salchipapas",
    macroCategory: "piqueos",
    iconKey: "fries",
    icon: "",
    badge: "Especialidades Criollas"
  },
  {
    id: "cocteles",
    name: "Cócteles (con alcohol)",
    macroCategory: "cocteles",
    iconKey: "cocktail",
    icon: "",
    badge: "Con Alcohol & Jarras"
  },
  {
    id: "postres",
    name: "Postres",
    macroCategory: "postres",
    iconKey: "dessert",
    icon: "",
    badge: "Peligrosa Tentación"
  },
  {
    id: "bebidas",
    name: "Jugos & Bebidas",
    macroCategory: "bebidas",
    iconKey: "beverage",
    icon: "",
    badge: "100% Naturales & Frías"
  },
  {
    id: "adicionales",
    name: "Personaliza tu Burger",
    macroCategory: "adicionales",
    iconKey: "flame",
    icon: "",
    badge: "Adicionales & Carnes"
  }
];

export const banquetesHighlights = [
  {
    id: "banquete-seleccion-premium",
    name: "Selección Premium de Serendipity",
    badge: "Sugerencia del Chef",
    price: 66.00,
    tagline: "Cortes de selección de primera para paladares exigentes",
    description: "Lomo fino de Res + Lomo de chancho + Pechuga de pollo + 2 Palitos de Anticucho + Chaufa + Papas fritas + Ensalada + Crema.",
    servings: "Ideal para 2 a 3 personas",
    featured: true
  },
  {
    id: "banquete-mega-parrilla",
    name: "Mega Parrilla",
    badge: "Más Solicitado",
    price: 76.00,
    tagline: "Experiencia parrillera, fuego lento, punto perfecto",
    description: "P. Lomo Fino + P. Chancho + P. Pollo + Porción de Mollejitas + 1 Palito de Anticucho + Chorizo + Chaufa + Papas fritas + Ensalada + Cremas.",
    servings: "Ideal para 3 a 4 personas",
    featured: true
  },
  {
    id: "banquete-premium-experiencia",
    name: "Banquete Premium",
    badge: "La Máxima Experiencia",
    price: 96.00,
    tagline: "Más que un banquete, es una experiencia de sabor inolvidable",
    description: "P. Lomo Fino + P. Chancho + P. Pollo + Porción de Mollejitas + 2 Palitos de Anticucho + 2 Alitas Completas + Chorizo + Chaufa + Papas fritas + Ensalada + Cremas.",
    servings: "Banquete completo para 4 a 5 personas",
    featured: true
  }
];

export const menuItems = [
  // ==========================================================================
  // 1. HAMBURGUESAS (Patriotas, Festival, Parrilleras, Premium, New Burgers & Kids)
  // ==========================================================================
  // --- Hamburguesas Patriotas ---
  {
    id: "h-peruana-clasica",
    categoryId: "hamburguesas",
    subcategoryId: "patriotas",
    subcategoryName: "Hamburguesas Patriotas",
    name: "H. Peruana o Clásica",
    description: "Ensalada Fresca + Carne de hamburguesa + Papas crujientes + Cremas",
    price: 8.50,
    popular: true
  },
  {
    id: "h-la-bella-vita",
    categoryId: "hamburguesas",
    subcategoryId: "patriotas",
    subcategoryName: "Hamburguesas Patriotas",
    name: "H. La Bella Vita o Italiana",
    description: "Ensalada Fresca + Carne de hamburguesa + Queso mozarella + Peperoni + Papas crujientes + Cremas",
    price: 12.50
  },
  {
    id: "h-cubana",
    categoryId: "hamburguesas",
    subcategoryId: "patriotas",
    subcategoryName: "Hamburguesas Patriotas",
    name: "H. Cubana",
    description: "Ensalada Fresca + Carne de hamburguesa + Huevo + Plátanos fritos + Papas crujientes + Cremas",
    price: 11.00,
    popular: true
  },
  {
    id: "h-mexicana",
    categoryId: "hamburguesas",
    subcategoryId: "patriotas",
    subcategoryName: "Hamburguesas Patriotas",
    name: "H. Mexicana",
    description: "Ensalada Fresca + Carne de hamburguesa + Queso cheddar + Aguacate + Papas crujientes + Cremas",
    price: 12.50
  },
  {
    id: "h-hawaiana",
    categoryId: "hamburguesas",
    subcategoryId: "patriotas",
    subcategoryName: "Hamburguesas Patriotas",
    name: "H. Hawaiana",
    description: "Ensalada Fresca + Carne de hamburguesa + Jamón + Piña + Papas crujientes + Cremas",
    price: 11.50
  },

  // --- Festival Burger ---
  {
    id: "bacon-burger",
    categoryId: "hamburguesas",
    subcategoryId: "festival",
    subcategoryName: "Festival Burger",
    name: "Bacon Burger",
    description: "Ensalada Fresca + Carne de hamburguesa + Queso edam + Tocino crocante + Papas crujientes + Cremas",
    price: 13.50,
    signature: true,
    popular: true
  },
  {
    id: "cheese-burger",
    categoryId: "hamburguesas",
    subcategoryId: "festival",
    subcategoryName: "Festival Burger",
    name: "Cheese Burger",
    description: "Ensalada Fresca + Carne de hamburguesa + Queso edam + Queso cheddar fundido + Papas crujientes + Cremas",
    price: 12.50
  },
  {
    id: "h-choriburger",
    categoryId: "hamburguesas",
    subcategoryId: "festival",
    subcategoryName: "Festival Burger",
    name: "H. Choriburger",
    description: "Ensalada Fresca + Carne de hamburguesa + Chorizo parrillero + Papas crujientes + Cremas",
    price: 11.00
  },
  {
    id: "choripan",
    categoryId: "hamburguesas",
    subcategoryId: "festival",
    subcategoryName: "Festival Burger",
    name: "Choripan",
    description: "Ensalada Fresca + Chorizo parrillero + Papas crujientes + Cremas",
    price: 8.50
  },
  {
    id: "choripan-finas-hierbas",
    categoryId: "hamburguesas",
    subcategoryId: "festival",
    subcategoryName: "Festival Burger",
    name: "Choripan Finas Hierbas",
    description: "Ensalada Fresca + Chorizo finas hierbas + Papas crujientes + Cremas",
    price: 10.50
  },
  {
    id: "royal-finas-hierbas",
    categoryId: "hamburguesas",
    subcategoryId: "festival",
    subcategoryName: "Festival Burger",
    name: "Royal Finas Hierbas",
    description: "Ensalada Fresca + Chorizo finas hierbas + Queso edam + Jamón + Huevo + Papas crujientes + Cremas",
    price: 14.00,
    signature: true
  },

  // --- Hamburguesas Parrilleras ---
  {
    id: "h-pechuga-pollo",
    categoryId: "hamburguesas",
    subcategoryId: "parrilleras",
    subcategoryName: "Hamburguesas Parrilleras",
    name: "H. de Pechuga de Pollo",
    description: "Ensalada Fresca + Pechuga de pollo a la parrilla + Papas crujientes + Cremas",
    price: 10.00
  },
  {
    id: "h-chancho",
    categoryId: "hamburguesas",
    subcategoryId: "parrilleras",
    subcategoryName: "Hamburguesas Parrilleras",
    name: "H. de Chancho",
    description: "Ensalada Fresca + Lomo de chancho a la parrilla + Papas crujientes + Cremas",
    price: 11.00
  },
  {
    id: "h-lomo-fino",
    categoryId: "hamburguesas",
    subcategoryId: "parrilleras",
    subcategoryName: "Hamburguesas Parrilleras",
    name: "H. de Lomo Fino",
    description: "Ensalada Fresca + Lomo Fino de Res a la parrilla + Papas crujientes + Cremas",
    price: 13.00,
    signature: true
  },
  {
    id: "h-extrema",
    categoryId: "hamburguesas",
    subcategoryId: "parrilleras",
    subcategoryName: "Hamburguesas Parrilleras",
    name: "H. Extrema",
    description: "Ensalada Fresca + Pechuga de pollo a la parrilla + Lomo de chancho a la parrilla + Lomo Fino de Res a la parrilla + Papas crujientes + Cremas",
    price: 19.00,
    signature: true,
    popular: true
  },

  // --- Hamburguesas Premium ---
  {
    id: "h-royal",
    categoryId: "hamburguesas",
    subcategoryId: "premium",
    subcategoryName: "Hamburguesas Premium",
    name: "H. Royal",
    description: "Ensalada Fresca + Carne de hamburguesa + Queso edam + Jamón + Huevo + Papas crujientes + Cremas",
    price: 12.50,
    popular: true
  },
  {
    id: "h-doble",
    categoryId: "hamburguesas",
    subcategoryId: "premium",
    subcategoryName: "Hamburguesas Premium",
    name: "H. Doble",
    description: "Ensalada Fresca + Doble Carne de hamburguesa + Queso edam + Papas crujientes + Cremas",
    price: 13.00
  },
  {
    id: "h-mix",
    categoryId: "hamburguesas",
    subcategoryId: "premium",
    subcategoryName: "Hamburguesas Premium",
    name: "H. Mix",
    description: "Ensalada Fresca + Carne de hamburguesa + Pechuga de pollo a la parrilla + Papas crujientes + Cremas",
    price: 13.00
  },
  {
    id: "h-full-size",
    categoryId: "hamburguesas",
    subcategoryId: "premium",
    subcategoryName: "Hamburguesas Premium",
    name: "H. Full Size",
    description: "Ensalada Fresca + Carne de hamburguesa + Queso edam + Tocino + Chorizo parrillero + Papas crujientes + Cremas",
    price: 15.00,
    signature: true
  },
  {
    id: "h-serendipity",
    categoryId: "hamburguesas",
    subcategoryId: "premium",
    subcategoryName: "Hamburguesas Premium",
    name: "H. Serendipity",
    description: "Ensalada Fresca + Carne de hamburguesa + Queso edam + Jamón + Huevo + Tocino + Chorizo + Piña + Papas crujientes + Cremas",
    price: 18.00,
    signature: true,
    popular: true
  },

  // --- New Burgers & Kids ---
  {
    id: "h-pollo-al-hilo",
    categoryId: "hamburguesas",
    subcategoryId: "new-burgers",
    subcategoryName: "New Burgers & Kids",
    name: "H. Pollo al Hilo",
    description: "Ensalada Fresca + Pollo desmechado + Papas crujientes al hilo + Cremas",
    price: 10.00
  },
  {
    id: "pke-burger",
    categoryId: "hamburguesas",
    subcategoryId: "new-burgers",
    subcategoryName: "New Burgers & Kids",
    name: "PKE Burger",
    description: "Hamburguesa especial para los más pequeños con sabor inigualable y textura suave",
    price: 16.90
  },
  {
    id: "magic-box",
    categoryId: "hamburguesas",
    subcategoryId: "new-burgers",
    subcategoryName: "New Burgers & Kids",
    name: "Magic Box",
    description: "H. Kids + Cereal + Bebida + Juguete Sorpresa. “Si tú los engríes, nosotros también...”",
    price: null,
    priceNote: "Consultar con el mozo",
    badge: "Kids Experience"
  },

  // ==========================================================================
  // 2. PARRILLAS & BANQUETES (Combos Grill, Parrillas & Banquetes para Compartir)
  // ==========================================================================
  {
    id: "p-pollo",
    categoryId: "parrillas-banquetes",
    subcategoryId: "combos-grill",
    subcategoryName: "Combos Grill",
    name: "P. Pollo",
    description: "Parrilla de pollo jugoso y doradito + Chaufa + Papas fritas + Ensalada + Cremas",
    price: 15.50
  },
  {
    id: "p-pechuga-pollo",
    categoryId: "parrillas-banquetes",
    subcategoryId: "combos-grill",
    subcategoryName: "Combos Grill",
    name: "P. Pechuga de Pollo",
    description: "Distinción irresistible de pechuga de pollo + Chaufa + Papas fritas + Ensalada + Cremas",
    price: 16.50
  },
  {
    id: "p-alitas-clasicas",
    categoryId: "parrillas-banquetes",
    subcategoryId: "combos-grill",
    subcategoryName: "Combos Grill",
    name: "P. Alitas a la Parrilla (Clásicas)",
    description: "Porción de alitas crujientes y jugosas + Chaufa + Papas fritas + Ensalada + Cremas",
    price: 15.50
  },
  {
    id: "p-alitas-bbq",
    categoryId: "parrillas-banquetes",
    subcategoryId: "combos-grill",
    subcategoryName: "Combos Grill",
    name: "P. Alitas a la Parrilla en Salsa BBQ",
    description: "Alitas glaseadas en deliciosa salsa BBQ ahumada + Chaufa + Papas fritas + Ensalada + Cremas",
    price: 18.50,
    popular: true
  },
  {
    id: "p-alitas-maracuya",
    categoryId: "parrillas-banquetes",
    subcategoryId: "combos-grill",
    subcategoryName: "Combos Grill",
    name: "P. Alitas a la Parrilla en Salsa Maracuyá",
    description: "Alitas bañadas en reducción agridulce de maracuyá + Chaufa + Papas fritas + Ensalada + Cremas",
    price: 18.50
  },
  {
    id: "p-alitas-acevichada",
    categoryId: "parrillas-banquetes",
    subcategoryId: "combos-grill",
    subcategoryName: "Combos Grill",
    name: "P. Alitas a la Parrilla (Salsa Acevichada)",
    description: "Alitas a la parrilla bañadas en cremosa salsa acevichada artesanal + Chaufa + Papas fritas + Ensalada + Cremas",
    price: 18.50,
    popular: true,
    signature: true
  },
  {
    id: "p-chancho",
    categoryId: "parrillas-banquetes",
    subcategoryId: "combos-grill",
    subcategoryName: "Combos Grill",
    name: "P. Chancho",
    description: "Parrilla de Chancho tierno y en su punto + Chaufa + Papas fritas + Ensalada + Cremas",
    price: 18.50
  },
  {
    id: "p-lomo-fino",
    categoryId: "parrillas-banquetes",
    subcategoryId: "combos-grill",
    subcategoryName: "Combos Grill",
    name: "P. Lomo Fino de Res",
    description: "Corte exquisito de lomo a la parrilla, suavidad garantizada + Chaufa + Papas fritas + Ensalada + Cremas",
    price: 20.50,
    signature: true
  },
  {
    id: "p-anticuchos",
    categoryId: "parrillas-banquetes",
    subcategoryId: "combos-grill",
    subcategoryName: "Combos Grill",
    name: "P. Anticuchos",
    description: "2 palitos de anticuchos tiernizados a fuego lento + Papas fritas + Camote caramelizado + Choclo + Ensalada + Cremas",
    price: 16.50,
    popular: true
  },
  {
    id: "p-mollejitas",
    categoryId: "parrillas-banquetes",
    subcategoryId: "combos-grill",
    subcategoryName: "Combos Grill",
    name: "P. Mollejitas a la Parrilla",
    description: "Porción de mollejitas jugosas, doradas y adictivas + Papas fritas + Camote caramelizado + Choclo + Ensalada + Cremas",
    price: 14.50
  },

  // --- Banquetes Parrilleros para Compartir ---
  {
    id: "banquete-item-seleccion",
    categoryId: "parrillas-banquetes",
    subcategoryId: "banquetes",
    subcategoryName: "Banquetes Parrilleros",
    name: "Selección Premium de Serendipity",
    description: "Lomo fino de Res + Lomo de chancho + Pechuga de pollo + 2 Palitos de Anticucho + Chaufa + Papas fritas + Ensalada + Crema (Ideal para 2 a 3 personas)",
    price: 66.00,
    signature: true
  },
  {
    id: "banquete-item-mega",
    categoryId: "parrillas-banquetes",
    subcategoryId: "banquetes",
    subcategoryName: "Banquetes Parrilleros",
    name: "Mega Parrilla",
    description: "P. Lomo Fino + P. Chancho + P. Pollo + Porción de Mollejitas + 1 Palito de Anticucho + Chorizo + Chaufa + Papas fritas + Ensalada + Cremas (Ideal para 3 a 4 personas)",
    price: 76.00,
    signature: true
  },
  {
    id: "banquete-item-premium",
    categoryId: "parrillas-banquetes",
    subcategoryId: "banquetes",
    subcategoryName: "Banquetes Parrilleros",
    name: "Banquete Premium (Experiencia Completa)",
    description: "P. Lomo Fino + P. Chancho + P. Pollo + Porción de Mollejitas + 2 Palitos de Anticucho + 2 Alitas Completas + Chorizo + Chaufa + Papas fritas + Ensalada + Cremas (Banquete para 4 a 5 personas)",
    price: 96.00,
    signature: true
  },

  // ==========================================================================
  // 3. PIQUEOS & SALCHIPAPAS (Especialidades Criollas)
  // ==========================================================================
  {
    id: "salchipapa",
    categoryId: "piqueos",
    subcategoryId: "pincelada",
    subcategoryName: "Piqueos & Salchipapas",
    name: "Salchipapa",
    description: "Salchicha dorada de primera calidad + Papas fritas + Ensalada fresca + Cremas",
    price: 14.50,
    popular: true
  },
  {
    id: "choripapas",
    categoryId: "piqueos",
    subcategoryId: "pincelada",
    subcategoryName: "Piqueos & Salchipapas",
    name: "Choripapas",
    description: "Chorizo selecto parrillero troceado + Papas fritas crujientes + Ensalada + Cremas",
    price: 15.50
  },
  {
    id: "salchi-chori",
    categoryId: "piqueos",
    subcategoryId: "pincelada",
    subcategoryName: "Piqueos & Salchipapas",
    name: "Salchi - Chori",
    description: "Combinación generosa de Salchicha + Chorizo parrillero + Papas fritas + Ensalada + Cremas",
    price: 16.50,
    popular: true
  },
  {
    id: "papa-rellena",
    categoryId: "piqueos",
    subcategoryId: "pincelada",
    subcategoryName: "Piqueos & Salchipapas",
    name: "Papa Rellena",
    description: "Papa exquisita con jugoso relleno tradicional, frita al momento. Antojo 100% Peruano + Ensalada + Cremas",
    price: 7.50
  },

  // ==========================================================================
  // 4. CÓCTELES (Con alcohol & Jarras de Sangría)
  // ==========================================================================
  {
    id: "coctel-sangria-jarra-chica",
    categoryId: "cocteles",
    subcategoryId: "sangria",
    subcategoryName: "Jarras de Sangría",
    name: "Jarra chica de Sangría",
    description: "Jarra de 1 litro de sangría artesanal preparada al momento con vino tinto seleccionado, frutas frescas de estación y toque cítrico (con alcohol)",
    price: 15.00,
    popular: true,
    servings: "Jarra 1 L"
  },
  {
    id: "coctel-sangria-jarra-grande",
    categoryId: "cocteles",
    subcategoryId: "sangria",
    subcategoryName: "Jarras de Sangría",
    name: "Jarra grande de Sangría",
    description: "Jarra familiar de 2 litros de sangría de la casa para compartir en mesa con vino tinto de barrica, cítricos macerados y frutas aromáticas (con alcohol)",
    price: 30.00,
    signature: true,
    servings: "Jarra 2 L"
  },
  {
    id: "coctel-chilcano-clasico",
    categoryId: "cocteles",
    subcategoryId: "cocteleria",
    subcategoryName: "Coctelería Clásica",
    name: "Chilcano Clásico",
    description: "Pisco acholado de selección, ginger ale refrescante, zumo de limón fresco y gotas de amargo de angostura",
    price: 15.00,
    popular: true
  },
  {
    id: "coctel-pisco-sour",
    categoryId: "cocteles",
    subcategoryId: "cocteleria",
    subcategoryName: "Coctelería Clásica",
    name: "Pisco Sour Tradicional",
    description: "Pisco quebranta de selección, zumo de limón fresco, jarabe de goma y clara batida con gotas de amargo de angostura",
    price: 16.00,
    signature: true
  },
  {
    id: "coctel-cuba-libre",
    categoryId: "cocteles",
    subcategoryId: "cocteleria",
    subcategoryName: "Coctelería Clásica",
    name: "Cuba Libre",
    description: "Ron dorado añejo, Coca-Cola bien helada y rodajas de limón fresco en copa alta",
    price: 14.00
  },
  {
    id: "coctel-mojito",
    categoryId: "cocteles",
    subcategoryId: "cocteleria",
    subcategoryName: "Coctelería Clásica",
    name: "Mojito Clásico",
    description: "Ron blanco, hierbabuena fresca macerada, zumo de limón, azúcar y soda refrescante",
    price: 15.00
  },

  // ==========================================================================
  // 5. POSTRES (Peligrosa Tentación)
  // ==========================================================================
  {
    id: "postre-chocolate",
    categoryId: "postres",
    subcategoryId: "tortas",
    subcategoryName: "Tortas Artesanales",
    name: "Torta de Chocolate",
    description: "Húmedo bizcocho relleno y bañado en fudge artesanal de puro cacao",
    price: 13.00,
    popular: true
  },
  {
    id: "postre-sublime",
    categoryId: "postres",
    subcategoryId: "tortas",
    subcategoryName: "Tortas Artesanales",
    name: "Torta de Sublime",
    description: "El inconfundible sabor del chocolate con maní en versión pastelera premium",
    price: 13.00
  },
  {
    id: "postre-tresleches-vainilla",
    categoryId: "postres",
    subcategoryId: "tortas",
    subcategoryName: "Tortas Artesanales",
    name: "Torta Tres Leches de Vainilla (1/2 Litro)",
    description: "Bizcochuelo bañado en salsa tres leches con canela fina aromática (presentación 1/2 litro)",
    price: 13.00,
    signature: true
  },
  {
    id: "postre-tresleches-chocolate",
    categoryId: "postres",
    subcategoryId: "tortas",
    subcategoryName: "Tortas Artesanales",
    name: "Torta Tres Leches de Chocolate (1/2 Litro)",
    description: "Tres leches con cacao puro y textura esponjosa impregnada de crema (presentación 1/2 litro)",
    price: 13.00
  },
  {
    id: "postre-cheesecake-maracuya",
    categoryId: "postres",
    subcategoryId: "cheesecakes",
    subcategoryName: "Cheesecakes",
    name: "Cheesecake de Maracuyá",
    description: "Base crocante con suave queso crema y coulis de maracuyá agridulce",
    price: 12.00
  },
  {
    id: "postre-cheesecake-fresa",
    categoryId: "postres",
    subcategoryId: "cheesecakes",
    subcategoryName: "Cheesecakes",
    name: "Cheesecake de Fresa",
    description: "Mermelada artesanal de fresas sobre tarta de queso horneada",
    price: 12.00
  },
  {
    id: "postre-cheesecake-oreo",
    categoryId: "postres",
    subcategoryId: "cheesecakes",
    subcategoryName: "Cheesecakes",
    name: "Cheesecake de Oreo",
    description: "Crema de queso con abundantes galletas Oreo y base de galleta negra",
    price: 12.00,
    popular: true
  },
  {
    id: "postre-crema-volteada",
    categoryId: "postres",
    subcategoryId: "postres-tradicionales",
    subcategoryName: "Postres Tradicionales",
    name: "Crema Volteada",
    description: "Clásico postre peruano con caramelo brillante y textura aterciopelada",
    price: 12.00
  },
  {
    id: "postre-keke-vainilla",
    categoryId: "postres",
    subcategoryId: "postres-tradicionales",
    subcategoryName: "Postres Tradicionales",
    name: "Keke de Vainilla con Frutos Secos",
    description: "Porción esponjosa con nueces y castañas seleccionadas",
    price: 6.00
  },

  // ==========================================================================
  // 6. JUGOS & BEBIDAS (Milkshakes, Jugos, Batidos, Refrescos, Infusiones & Otras Bebidas)
  // ==========================================================================
  // --- Milkshakes & Helados ---
  { id: "milkshake-fresa", categoryId: "bebidas", subcategoryId: "milkshakes", subcategoryName: "Milkshakes & Helados", name: "Milkshake de Fresa", description: "Cremosa preparación con fresas seleccionadas", price: 12.50 },
  { id: "milkshake-chocolate", categoryId: "bebidas", subcategoryId: "milkshakes", subcategoryName: "Milkshakes & Helados", name: "Milkshake de Chocolate", description: "Intenso chocolate belga con leche entera", price: 12.50 },
  { id: "milkshake-oreo", categoryId: "bebidas", subcategoryId: "milkshakes", subcategoryName: "Milkshakes & Helados", name: "Milkshake de Oreo", description: "Trozos de galleta Oreo triturada y crema chantilly", price: 13.50, popular: true },
  { id: "milkshake-vainilla", categoryId: "bebidas", subcategoryId: "milkshakes", subcategoryName: "Milkshakes & Helados", name: "Milkshake de Vainilla", description: "Esencia fina de vainilla con textura sedosa", price: 12.50 },
  { id: "milkshake-lucuma", categoryId: "bebidas", subcategoryId: "milkshakes", subcategoryName: "Milkshakes & Helados", name: "Milkshake de Lúcuma", description: "Pura pulpa de lúcuma tradicional", price: 13.50 },
  { id: "milkshake-maracumango", categoryId: "bebidas", subcategoryId: "milkshakes", subcategoryName: "Milkshakes & Helados", name: "Milkshake de Maracumango", description: "Dúo refrescante y exótico de maracuyá y mango", price: 13.50 },
  { id: "serendipity-ice-cream", categoryId: "bebidas", subcategoryId: "milkshakes", subcategoryName: "Milkshakes & Helados", name: "Serendipity Ice Cream", description: "4 bolas grandes de helado artesanal + confeti y crujientes adicionales", price: 14.50, signature: true },
  { id: "frappuccino", categoryId: "bebidas", subcategoryId: "milkshakes", subcategoryName: "Milkshakes & Helados", name: "Frappuccino", description: "Café pasado helado, leche cremosa y hielo frappé", price: 14.00 },

  // --- Jugos Deliciosos y Refrescantes ---
  { id: "jugo-pina", categoryId: "bebidas", subcategoryId: "jugos", subcategoryName: "Jugos Naturales", name: "Jugo de Piña", description: "Refrescante fruta natural al instante", price: 7.50 },
  { id: "jugo-papaya", categoryId: "bebidas", subcategoryId: "jugos", subcategoryName: "Jugos Naturales", name: "Jugo de Papaya", description: "Dulzor natural y digestivo", price: 7.50 },
  { id: "jugo-mango", categoryId: "bebidas", subcategoryId: "jugos", subcategoryName: "Jugos Naturales", name: "Jugo de Mango", description: "Mango criollo seleccionado", price: 8.00 },
  { id: "jugo-fresa", categoryId: "bebidas", subcategoryId: "jugos", subcategoryName: "Jugos Naturales", name: "Jugo de Fresa", description: "Fresas frescas y aroma vibrante", price: 8.50 },
  { id: "jugo-guanabana", categoryId: "bebidas", subcategoryId: "jugos", subcategoryName: "Jugos Naturales", name: "Jugo de Guanábana", description: "Suave textura y sabor tropical", price: 8.50 },
  { id: "jugo-arandanos", categoryId: "bebidas", subcategoryId: "jugos", subcategoryName: "Jugos Naturales", name: "Jugo de Arándanos", description: "Antioxidante natural preparado al momento", price: 8.50 },
  { id: "jugo-chirimoya", categoryId: "bebidas", subcategoryId: "jugos", subcategoryName: "Jugos Naturales", name: "Jugo de Chirimoya", description: "Chirimoya de estación cremosa y dulce", price: 9.00 },
  { id: "jugo-lucuma", categoryId: "bebidas", subcategoryId: "jugos", subcategoryName: "Jugos Naturales", name: "Jugo de Lúcuma", description: "El clásico sabor de los Andes", price: 9.50 },
  { id: "jugo-surtido", categoryId: "bebidas", subcategoryId: "jugos", subcategoryName: "Jugos Naturales", name: "Jugo Surtido", description: "Mezcla energética de frutas seleccionadas", price: 9.50, popular: true },
  { id: "jugo-maracumango", categoryId: "bebidas", subcategoryId: "jugos", subcategoryName: "Jugos Naturales", name: "Jugo de Maracumango", description: "Combinación perfecta de maracuyá y mango dulce", price: 9.50, signature: true },

  // --- Batidos con Leche ---
  { id: "batido-papaya", categoryId: "bebidas", subcategoryId: "batidos", subcategoryName: "Batidos con Leche", name: "Batido de Papaya con Leche", description: "Papaya batida con leche fresca", price: 9.00 },
  { id: "batido-mango", categoryId: "bebidas", subcategoryId: "batidos", subcategoryName: "Batidos con Leche", name: "Batido de Mango con Leche", description: "Textura densa y suave sabor tropical", price: 9.50 },
  { id: "batido-fresa", categoryId: "bebidas", subcategoryId: "batidos", subcategoryName: "Batidos con Leche", name: "Batido de Fresa con Leche", description: "El batido clásico por excelencia", price: 9.50 },
  { id: "batido-arandanos", categoryId: "bebidas", subcategoryId: "batidos", subcategoryName: "Batidos con Leche", name: "Batido de Arándanos con Leche", description: "Color y nutrición en cada sorbo", price: 9.50 },
  { id: "batido-guanabana", categoryId: "bebidas", subcategoryId: "batidos", subcategoryName: "Batidos con Leche", name: "Batido de Guanábana con Leche", description: "Exótica guanábana con leche entera", price: 10.00 },
  { id: "batido-lucuma", categoryId: "bebidas", subcategoryId: "batidos", subcategoryName: "Batidos con Leche", name: "Batido de Lúcuma con Leche", description: "Cremosa lúcuma pura con leche fresca", price: 10.50 },
  { id: "batido-chirimoya", categoryId: "bebidas", subcategoryId: "batidos", subcategoryName: "Batidos con Leche", name: "Batido de Chirimoya con Leche", description: "Cremosa chirimoya con toque lácteo", price: 10.50 },
  { id: "batido-mora", categoryId: "bebidas", subcategoryId: "batidos", subcategoryName: "Batidos con Leche", name: "Batido de Mora con Leche", description: "Moras silvestres y leche batida", price: 11.50 },
  { id: "batido-especial", categoryId: "bebidas", subcategoryId: "batidos", subcategoryName: "Batidos con Leche", name: "Batido Especial", description: "Preparación especial de la casa con mezcla nutritiva y fruta selecta", price: 11.50, signature: true },

  // --- Refrescos e Infusiones ---
  { id: "refresco-chicha", categoryId: "bebidas", subcategoryId: "refrescos", subcategoryName: "Refrescos e Infusiones", name: "Vaso de Chicha Morada (Jumbo 20 oz)", description: "Elaborada con maíz morado, piña, manzana y canela", price: 3.50, popular: true },
  { id: "refresco-maracuya", categoryId: "bebidas", subcategoryId: "refrescos", subcategoryName: "Refrescos e Infusiones", name: "Néctar de Maracuyá (20 oz)", description: "Zumo natural dulce y ácido", price: 4.50 },
  { id: "infusion-te", categoryId: "bebidas", subcategoryId: "refrescos", subcategoryName: "Refrescos e Infusiones", name: "Taza de Té", description: "Té clásico caliente", price: 3.00 },
  { id: "infusion-anis", categoryId: "bebidas", subcategoryId: "refrescos", subcategoryName: "Refrescos e Infusiones", name: "Taza de Anís", description: "Infusión aromática digestiva", price: 3.00 },
  { id: "infusion-manzanilla", categoryId: "bebidas", subcategoryId: "refrescos", subcategoryName: "Refrescos e Infusiones", name: "Taza de Manzanilla", description: "Infusión relajante caliente", price: 3.00 },
  { id: "cafe-pasado", categoryId: "bebidas", subcategoryId: "refrescos", subcategoryName: "Refrescos e Infusiones", name: "Taza de Café Pasado", description: "Gota a gota, aroma tostado peruano", price: 4.50 },
  { id: "agua-sanluis-con-gas", categoryId: "bebidas", subcategoryId: "refrescos", subcategoryName: "Refrescos e Infusiones", name: "Agua San Luis con Gas", description: "Botella personal con gas", price: 2.50 },

  // --- Otras Bebidas Frías ---
  { id: "fanta-500", categoryId: "bebidas", subcategoryId: "otras-bebidas", subcategoryName: "Otras Bebidas", name: "Fanta 500 ml", description: "Bebida gaseosa sabor naranja", price: 3.50 },
  { id: "inka-cola-15", categoryId: "bebidas", subcategoryId: "otras-bebidas", subcategoryName: "Otras Bebidas", name: "Inka Kola 1 ½ L", description: "La bebida de sabor nacional para compartir", price: 9.50, popular: true },
  { id: "coca-cola-15", categoryId: "bebidas", subcategoryId: "otras-bebidas", subcategoryName: "Otras Bebidas", name: "Coca Cola 1 ½ L", description: "Sabor original para la mesa", price: 9.50 },
  { id: "gatorade", categoryId: "bebidas", subcategoryId: "otras-bebidas", subcategoryName: "Otras Bebidas", name: "Gatorade", description: "Bebida isotónica hidratante", price: 3.50 },
  { id: "concordia-fresa", categoryId: "bebidas", subcategoryId: "otras-bebidas", subcategoryName: "Otras Bebidas", name: "Concordia Fresa 355 ml", description: "Sabor clásico de fresa", price: 2.00 },
  { id: "agua-sanluis-sin-gas", categoryId: "bebidas", subcategoryId: "otras-bebidas", subcategoryName: "Otras Bebidas", name: "Agua San Luis sin Gas", description: "Agua mineral de mesa", price: 2.50 },
  { id: "guaranita", categoryId: "bebidas", subcategoryId: "otras-bebidas", subcategoryName: "Otras Bebidas", name: "Guaranita", description: "Sabor guaraná refrescante", price: 2.00 }
];

// --- DATOS DETALLADOS PARA LA SECCIÓN "PERSONALIZA TU BURGER" (ADICIONALES) ---
export const burgerCustomizationData = {
  title: "Personaliza tu Hamburguesa a tu Preferencia",
  subtitle: "Hazla única sumando carnes a la parrilla, quesos fundidos o tus adicionales favoritos.",
  categories: [
    {
      group: "Ingredientes & Adicionales",
      items: [
        { name: "Jamón", price: 2.00 },
        { name: "Plátanos Fritos", price: 2.00 },
        { name: "Huevo Frito", price: 2.00 },
        { name: "Aguacate (Palta)", price: 2.50 },
        { name: "Piña Caramelizada", price: 2.50 },
        { name: "Chorizo Parrillero", price: 3.00 },
        { name: "Chorizo Finas Hierbas", price: 3.50 },
        { name: "Tocino Crocante", price: 3.50 },
        { name: "Peperoni", price: 3.00 },
        { name: "Queso (Edam, Mozzarella o Cheddar)", price: 3.00 }
      ]
    },
    {
      group: "Cortes & Carnes Extras",
      items: [
        { name: "Carne de Hamburguesa", price: 4.00 },
        { name: "Pechuga de Pollo a la Parrilla", price: 5.00 },
        { name: "Chancho a la Parrilla", price: 6.00 },
        { name: "Lomo a la Parrilla de Res", price: 7.00 }
      ]
    }
  ],
  cremas: [
    { name: "Mayonesa", note: "Clásica y sedosa" },
    { name: "Aceituna", note: "Toque botijero peruano" },
    { name: "Ketchup", note: "Agridulce tradicional" },
    { name: "Vinagreta", note: "Fresca para ensalada" },
    { name: "Mostaza", note: "Punto justo" },
    { name: "Tártara", note: "Especial de la casa" },
    { name: "Ají de la Casa", note: "Picor sabroso" }
  ]
};
