"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/data/products";

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="product-card" id={`product-${product.id}`}>
      <Link href={`/produto/${product.id}`}>
        <div className="product-card-image">
          {product.featured && (
            <span className="product-card-badge">Destaque</span>
          )}
          <Image
            src={product.image}
            alt={product.name}
            width={220}
            height={180}
            style={{ objectFit: "contain" }}
          />
        </div>
      </Link>
      <div className="product-card-body">
        <div className="product-card-category">{product.category}</div>
        <h3 className="product-card-name">
          <Link href={`/produto/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="product-card-footer">
          <span className="product-card-price">{formatPrice(product.price)}</span>
          <button
            className="product-card-add-btn"
            onClick={() => addToCart(product)}
            title="Adicionar ao carrinho"
            id={`add-to-cart-${product.id}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
