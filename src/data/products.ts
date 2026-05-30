export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  tags: string[];
  specs: string[];
  featured: boolean;
  searchCorpus: string;
}

export const products: Product[] = [
  {
    id: "rtx-4060-8gb",
    name: "RTX 4060 8GB",
    price: 1999.90,
    description: "Placa de vídeo NVIDIA GeForce RTX 4060 com 8GB GDDR6. Arquitetura Ada Lovelace com Ray Tracing e DLSS 3 para gaming em 1080p com máximo desempenho.",
    category: "Placa de Vídeo",
    image: "/products/rtx-4060-8gb.webp",
    tags: ["gpu", "nvidia", "rtx", "gaming", "ray tracing", "dlss"],
    specs: ["8GB GDDR6", "128-bit", "Ada Lovelace", "PCIe 4.0", "DLSS 3", "Ray Tracing"],
    featured: true,
    searchCorpus: "placa de video gpu nvidia geforce rtx 4060 8gb gddr6 gaming jogo jogar desempenho fps frame rate ray tracing dlss render renderizar editar video stream streamer gamer presente presente para gamer melhorar fps alto desempenho performance placa grafica processador grafico upgrade melhorar pc"
  },
  {
    id: "rx-7600-8gb",
    name: "RX 7600 8GB",
    price: 1699.90,
    description: "Placa de vídeo AMD Radeon RX 7600 com 8GB GDDR6. Arquitetura RDNA 3 com excelente custo-benefício para gaming em 1080p.",
    category: "Placa de Vídeo",
    image: "/products/rx-7600-8gb.webp",
    tags: ["gpu", "amd", "radeon", "gaming", "rdna3"],
    specs: ["8GB GDDR6", "128-bit", "RDNA 3", "PCIe 4.0", "FSR 3"],
    featured: true,
    searchCorpus: "placa de video gpu amd radeon rx 7600 8gb gddr6 gaming jogo jogar desempenho fps frame rate fsr render renderizar custo beneficio barato economico gamer presente presente para gamer melhorar fps performance placa grafica processador grafico upgrade melhorar pc"
  },
  {
    id: "monitor-gamer-24-144hz",
    name: 'Monitor Gamer 24" 144Hz',
    price: 899.90,
    description: "Monitor gamer de 24 polegadas com taxa de atualização de 144Hz e tempo de resposta de 1ms. Painel IPS com cores vibrantes para uma experiência imersiva.",
    category: "Monitor",
    image: "/products/monitor-gamer-24-144hz.webp",
    tags: ["monitor", "tela", "display", "144hz", "gaming", "ips"],
    specs: ["24 polegadas", "144Hz", "1ms", "IPS", "Full HD", "FreeSync"],
    featured: true,
    searchCorpus: "monitor tela display 24 polegadas 144hz gaming gamer jogo jogar visualizar imagem imersivo freesync gsync ips full hd 1080p presente presente para gamer setup gamer montar setup escritorio home office trabalho"
  },
  {
    id: "teclado-mecanico-rgb",
    name: "Teclado Mecânico RGB",
    price: 199.90,
    description: "Teclado mecânico com switches blue, iluminação RGB por tecla e construção em alumínio. Ideal para gaming e digitação.",
    category: "Periféricos",
    image: "/products/teclado-mecanico-rgb.webp",
    tags: ["teclado", "mecanico", "rgb", "gaming", "periferico"],
    specs: ["Switch Blue", "RGB por tecla", "Anti-ghosting", "ABNT2", "USB-C"],
    featured: true,
    searchCorpus: "teclado mecanico rgb gaming gamer digitar digitacao escrever switch blue red brown iluminado led colorido periferico acessorio presente presente para gamer presente aniversario setup gamer"
  },
  {
    id: "ssd-sata-480gb",
    name: "SSD SATA 480GB",
    price: 179.90,
    description: "SSD SATA III de 480GB com velocidades de leitura de até 550MB/s. Ideal para upgrade de HD e aumento de performance do sistema.",
    category: "Armazenamento",
    image: "/products/ssd-sata-480gb.webp",
    tags: ["ssd", "sata", "armazenamento", "storage"],
    specs: ["480GB", "SATA III", "550MB/s leitura", "2.5 polegadas"],
    featured: false,
    searchCorpus: "ssd sata armazenamento storage disco hd hard drive guardar arquivos salvar dados velocidade rapido leitura gravacao 480gb upgrade trocar hd melhorar pc mais rapido boot iniciar rapido"
  },
  {
    id: "ssd-nvme-1tb",
    name: "SSD NVMe 1TB",
    price: 349.90,
    description: "SSD NVMe M.2 de 1TB com velocidades de leitura de até 3500MB/s. Ultra rápido para sistema operacional e jogos pesados.",
    category: "Armazenamento",
    image: "/products/ssd-nvme-1tb.webp",
    tags: ["ssd", "nvme", "m2", "armazenamento", "storage"],
    specs: ["1TB", "NVMe M.2", "3500MB/s leitura", "PCIe Gen 3"],
    featured: false,
    searchCorpus: "ssd nvme m.2 m2 armazenamento storage disco ultra rapido velocidade absurda 1tb terabyte guardar arquivos salvar dados jogos pesados sistema operacional boot instantaneo carregar rapido loading rapido upgrade melhorar pc armazenamento rapido"
  },
  {
    id: "ram-ddr4-8gb",
    name: "Memória RAM DDR4 8GB 3200MHz",
    price: 129.90,
    description: "Memória RAM DDR4 de 8GB a 3200MHz. Perfeita para multitarefa e jogos leves com baixa latência CL16.",
    category: "Memória",
    image: "/products/ram-ddr4-8gb.webp",
    tags: ["ram", "memoria", "ddr4", "8gb"],
    specs: ["8GB", "DDR4", "3200MHz", "CL16"],
    featured: false,
    searchCorpus: "memoria ram ddr4 8gb 3200mhz multitarefa abrir programas leve basico upgrade melhorar pc mais memoria lento travando memoria insuficiente expandir memoria"
  },
  {
    id: "ram-ddr4-16gb",
    name: "Memória RAM DDR4 16GB 3200MHz",
    price: 249.90,
    description: "Memória RAM DDR4 de 16GB a 3200MHz com dissipador de calor. Ideal para gaming, edição de vídeo e multitarefa pesada.",
    category: "Memória",
    image: "/products/ram-ddr4-16gb.webp",
    tags: ["ram", "memoria", "ddr4", "16gb"],
    specs: ["16GB", "DDR4", "3200MHz", "CL16", "Dissipador"],
    featured: false,
    searchCorpus: "memoria ram ddr4 16gb 3200mhz gaming gamer edicao video multitarefa pesada upgrade melhorar pc mais memoria lento travando memoria insuficiente expandir memoria programar desenvolvimento render renderizar"
  },
  {
    id: "fonte-500w-80plus",
    name: "Fonte 500W 80 Plus Bronze",
    price: 279.90,
    description: "Fonte de alimentação 500W com certificação 80 Plus Bronze. Eficiência energética com proteções OVP, OCP e SCP para segurança do sistema.",
    category: "Energia",
    image: "/products/fonte-500w-80plus.webp",
    tags: ["fonte", "psu", "energia", "alimentacao"],
    specs: ["500W", "80 Plus Bronze", "PFC Ativo", "Proteção OVP/OCP/SCP"],
    featured: false,
    searchCorpus: "fonte alimentacao psu power supply 500w energia eletrica 80 plus bronze eficiente economia energia protecao seguranca montar pc novo computador upgrade trocar fonte queimou"
  },
  {
    id: "gabinete-gamer-mid",
    name: "Gabinete Gamer Mid Tower",
    price: 299.90,
    description: "Gabinete gamer Mid Tower com painel lateral em vidro temperado e 3 fans RGB pré-instalados. Suporta placas ATX, Micro-ATX e ITX.",
    category: "Gabinete",
    image: "/products/gabinete-gamer-mid.webp",
    tags: ["gabinete", "case", "tower", "gaming", "rgb"],
    specs: ["Mid Tower", "Vidro Temperado", "3x Fans RGB", "ATX/mATX/ITX"],
    featured: false,
    searchCorpus: "gabinete case caixa torre tower mid gaming gamer vidro temperado fan cooler rgb iluminado bonito setup montar pc novo computador estilo visual presente presente para gamer"
  },
  {
    id: "kit-teclado-mouse-gamer",
    name: "Kit Teclado + Mouse Gamer RGB",
    price: 99.90,
    description: "Kit gamer completo com teclado semi-mecânico e mouse 6400 DPI com iluminação RGB. Ótimo custo-benefício para começar no mundo gamer.",
    category: "Periféricos",
    image: "/products/kit-teclado-mouse-gamer.webp",
    tags: ["teclado", "mouse", "kit", "rgb", "gaming", "periferico"],
    specs: ["Semi-mecânico", "Mouse 6400 DPI", "RGB", "ABNT2"],
    featured: false,
    searchCorpus: "kit teclado mouse gamer rgb periferico acessorio combo conjunto basico barato economico custo beneficio iniciante comecar jogar gaming presente presente de aniversario presente barato"
  },
  {
    id: "air-cooler-gamer",
    name: "Air Cooler Gamer",
    price: 89.90,
    description: "Cooler para processador com dissipador de alumínio e fan 120mm RGB. Compatível com Intel e AMD, mantém seu processador gelado durante jogos intensos.",
    category: "Refrigeração",
    image: "/products/air-cooler-gamer.webp",
    tags: ["cooler", "refrigeracao", "fan", "ventilador", "rgb"],
    specs: ["120mm Fan", "RGB", "Intel/AMD", "TDP 150W"],
    featured: false,
    searchCorpus: "cooler refrigeracao ventilador fan processador cpu resfriar esfriar gelado temperatura quente esquentando aquecendo thermal throttling desempenho rgb gaming gamer presente barato"
  }
];

export const categories = [
  "Todos",
  "Placa de Vídeo",
  "Monitor",
  "Periféricos",
  "Armazenamento",
  "Memória",
  "Energia",
  "Gabinete",
  "Refrigeração"
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "Todos") return products;
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}
