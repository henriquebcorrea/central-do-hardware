"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-24 text-center">
        <div className="max-w-md mx-auto flex flex-col items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-bg-tertiary flex items-center justify-center text-text-muted mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </div>
          <h1 className="font-heading text-2xl font-bold text-text-bright">Seu carrinho está vazio</h1>
          <p className="text-text-secondary">
            Parece que você ainda não adicionou nenhum componente ao seu carrinho.
            Dê uma olhada em nosso catálogo e escolha as melhores peças para o seu setup.
          </p>
          <Link href="/#produtos" className="btn btn-primary mt-4">
            Voltar para a loja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="section-title">Seu Carrinho</h1>

        <div className="cart-page-grid">
          <div className="cart-page-items">
            {items.map((item) => (
              <div key={item.product.id} className="cart-page-item">
                <div className="cart-page-item-image">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                
                <div className="cart-page-item-info">
                  <div className="cart-page-item-category">{item.product.category}</div>
                  <Link href={`/produto/${item.product.id}`} className="cart-page-item-name hover:text-primary transition-colors">
                    {item.product.name}
                  </Link>
                  <div className="text-sm text-text-secondary mt-1 md:hidden">
                    {formatPrice(item.product.price)}
                  </div>
                </div>

                <div className="hidden md:block font-heading font-bold text-primary w-32 text-right">
                  {formatPrice(item.product.price)}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className="cart-qty-btn"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="cart-qty-value">{item.quantity}</span>
                  <button
                    className="cart-qty-btn"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="hidden md:block font-heading font-bold text-text-bright w-32 text-right">
                  {formatPrice(item.product.price * item.quantity)}
                </div>

                <button
                  className="cart-item-remove ml-4"
                  onClick={() => removeFromCart(item.product.id)}
                  title="Remover produto"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Resumo do Pedido</h2>
            
            <div className="cart-summary-row">
              <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} itens)</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            
            <div className="cart-summary-row">
              <span>Frete Expresso</span>
              <span className="text-success font-semibold">Grátis</span>
            </div>
            
            <div className="cart-summary-row mt-4 pt-4 border-t border-border">
              <span>Desconto Pix (10%)</span>
              <span className="text-success">- {formatPrice(totalPrice * 0.1)}</span>
            </div>

            <div className="cart-summary-total">
              <span>Total no Pix</span>
              <span className="cart-total-value">{formatPrice(totalPrice * 0.9)}</span>
            </div>
            
            <div className="text-right text-sm text-text-muted mb-6">
              ou {formatPrice(totalPrice)} em até 12x no cartão
            </div>

            <Link href="/checkout" className="btn btn-primary w-full text-center text-lg py-4">
              Ir para o Pagamento
            </Link>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-text-muted">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Ambiente 100% seguro
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
