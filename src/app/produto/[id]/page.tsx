import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, products } from "@/data/products";
import AddToCartButton from "./AddToCartButton";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Fallback se não tiver produtos relacionados suficientes na mesma categoria
  if (relatedProducts.length < 4) {
    const more = products
      .filter((p) => p.id !== product.id && !relatedProducts.find((rp) => rp.id === p.id))
      .slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...more);
  }

  return (
    <div className="product-detail">
      <div className="container">
        <nav className="breadcrumb">
          <Link href="/">Início</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href={`/#produtos`}>Catálogo</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        <div className="product-detail-grid">
          <div className="product-detail-image animate-fade-in">
            {product.featured && <span className="product-card-badge" style={{ top: "1rem", left: "1rem" }}>Destaque</span>}
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          <div className="product-detail-info animate-slide-up">
            <div className="product-detail-category">{product.category}</div>
            <h1 className="product-detail-name">{product.name}</h1>
            
            <div className="product-detail-price">{formatPrice(product.price)}</div>
            <div className="product-detail-installment">
              ou em até <span>12x de {formatPrice(product.price / 12)}</span> s/ juros no cartão
            </div>

            <p className="product-detail-description">{product.description}</p>

            <div className="product-detail-specs">
              <h3>Especificações Técnicas</h3>
              <div className="specs-list">
                {product.specs.map((spec, index) => (
                  <span key={index} className="spec-tag">{spec}</span>
                ))}
              </div>
            </div>

            <AddToCartButton product={product} />

            <div className="mt-8 pt-8 border-t border-border flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Garantia de 12 meses direto com o fabricante
              </div>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                Pronta entrega. Envio imediato após aprovação do pagamento
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
