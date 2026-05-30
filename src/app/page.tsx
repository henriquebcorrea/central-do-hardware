"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products, categories, getFeaturedProducts } from "@/data/products";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const featuredProducts = getFeaturedProducts();

  const filteredProducts = activeCategory === "Todos" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge animate-slide-up">
              ⚡ Upgrade seu Setup
            </span>
            <h1 className="hero-title animate-slide-up" style={{ animationDelay: "100ms" }}>
              Performance Extrema <br />
              para seu Jogo
            </h1>
            <p className="hero-description animate-slide-up" style={{ animationDelay: "200ms" }}>
              Encontre as melhores placas de vídeo, processadores e periféricos na Central do Hardware.
              Entregamos performance para quem exige o máximo.
            </p>
            <div className="hero-cta animate-slide-up" style={{ animationDelay: "300ms" }}>
              <Link href="#produtos" className="btn btn-primary">
                Ver Catálogo
              </Link>
              <Link href="#destaques" className="btn btn-secondary">
                Destaques
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="destaques" className="featured-section">
        <div className="container">
          <h2 className="section-title">Em Destaque</h2>
          <div className="featured-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="produtos" className="products-section">
        <div className="container">
          <h2 className="section-title">Catálogo Completo</h2>
          
          <div className="category-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-12 text-center text-text-muted">
                Nenhum produto encontrado nesta categoria.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Garantia de Qualidade</h3>
              <p>Produtos 100% originais com garantia direto com o fabricante.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h3>Entrega Expressa</h3>
              <p>Envio rápido para todo o Brasil. Seu setup não pode esperar.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <h3>Pagamento Facilitado</h3>
              <p>Parcele em até 12x no cartão ou com desconto via Pix.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <h3>Suporte Gamer</h3>
              <p>Equipe especializada para te ajudar a escolher o componente certo.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
