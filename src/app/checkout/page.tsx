"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState<any>(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Simula tokenização do cartão (como a InfinitePay faria no frontend)
      const mockCardToken = "tok_" + Math.random().toString(36).substring(2, 15);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            name: formData.name,
            email: formData.email,
            cpf: formData.cpf,
          },
          items: items.map(item => ({
            id: item.product.id,
            quantity: item.quantity,
            price: item.product.price
          })),
          total: totalPrice,
          cardToken: mockCardToken, // Enviamos apenas o token gerado, nunca dados reais
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao processar pagamento");
      }

      setOrderComplete(data.order);
      clearCart();
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro inesperado");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Se o pedido foi concluído com sucesso
  if (orderComplete) {
    return (
      <div className="container py-24">
        <div className="max-w-2xl mx-auto bg-bg-secondary border border-border rounded-xl p-8 shadow-lg">
          <div className="order-success">
            <div className="order-success-icon animate-fade-in">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            
            <h2 className="animate-slide-up">Pagamento Aprovado!</h2>
            <p className="animate-slide-up" style={{ animationDelay: "100ms" }}>
              Obrigado pela sua compra, {orderComplete.customer.name.split(' ')[0]}.
            </p>
            <p className="animate-slide-up" style={{ animationDelay: "200ms" }}>
              Seu pedido já está sendo preparado para envio.
            </p>
            
            <div className="mt-8 p-6 bg-bg-tertiary rounded-lg border border-border text-left animate-slide-up" style={{ animationDelay: "300ms" }}>
              <div className="text-sm text-text-muted mb-1">Número do Pedido</div>
              <div className="order-number mb-4">{orderComplete.id}</div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-text-muted">Total Pago</div>
                  <div className="font-heading font-bold text-primary">{formatPrice(orderComplete.total)}</div>
                </div>
                <div>
                  <div className="text-text-muted">Método de Pagamento</div>
                  <div className="font-medium">{orderComplete.payment.method}</div>
                </div>
              </div>
            </div>

            <div className="mt-8 animate-slide-up" style={{ animationDelay: "400ms" }}>
              <Link href="/" className="btn btn-primary">
                Voltar para a Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Se o carrinho estiver vazio e não for sucesso
  if (items.length === 0) {
    return (
      <div className="container py-24 text-center">
        <h1 className="font-heading text-2xl font-bold mb-4">Carrinho Vazio</h1>
        <p className="mb-8 text-text-secondary">Adicione produtos antes de ir para o checkout.</p>
        <Link href="/" className="btn btn-primary">
          Voltar para a loja
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="section-title">Finalizar Compra</h1>

        <div className="simulated-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <div>
            <strong>MODO SIMULADO:</strong> Esta página simula a integração com a InfinitePay. 
            Nenhuma cobrança real será feita. Você pode digitar dados fictícios.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout-grid">
          <div className="checkout-forms flex flex-col gap-8">
            
            {error && (
              <div className="p-4 bg-danger/10 border border-danger/30 text-danger rounded-md text-sm font-medium">
                {error}
              </div>
            )}

            <div className="checkout-form-section">
              <h2>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Dados Pessoais
              </h2>
              <div className="form-group">
                <label>Nome Completo</label>
                <input required name="name" type="text" value={formData.name} onChange={handleInputChange} placeholder="Ex: João da Silva" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>E-mail</label>
                  <input required name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="joao@exemplo.com" />
                </div>
                <div className="form-group">
                  <label>CPF</label>
                  <input required name="cpf" type="text" value={formData.cpf} onChange={handleInputChange} placeholder="000.000.000-00" />
                </div>
              </div>
            </div>

            <div className="checkout-form-section">
              <h2>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Pagamento (InfinitePay Simulado)
              </h2>
              <div className="form-group">
                <label>Número do Cartão</label>
                <input required name="cardNumber" type="text" value={formData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" maxLength={19} />
              </div>
              <div className="form-group">
                <label>Nome Impresso no Cartão</label>
                <input required name="cardName" type="text" value={formData.cardName} onChange={handleInputChange} placeholder="JOAO S SILVA" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Validade</label>
                  <input required name="cardExpiry" type="text" value={formData.cardExpiry} onChange={handleInputChange} placeholder="MM/AA" maxLength={5} />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input required name="cardCvv" type="text" value={formData.cardCvv} onChange={handleInputChange} placeholder="123" maxLength={4} />
                </div>
              </div>
            </div>
          </div>

          <div className="cart-summary sticky top-24">
            <h2>Resumo do Pedido</h2>
            
            <div className="max-h-60 overflow-y-auto mb-4 border-b border-border pb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 mb-3 items-center">
                  <div className="w-12 h-12 bg-bg-tertiary rounded flex items-center justify-center p-1 shrink-0">
                    <Image src={item.product.image} alt={item.product.name} width={40} height={40} style={{ objectFit: "contain" }} />
                  </div>
                  <div className="text-sm flex-1">
                    <div className="truncate text-text-bright font-medium">{item.product.name}</div>
                    <div className="text-text-muted">Qtd: {item.quantity}</div>
                  </div>
                  <div className="text-sm font-bold text-primary">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            
            <div className="cart-summary-row">
              <span>Frete Expresso</span>
              <span className="text-success font-semibold">Grátis</span>
            </div>

            <div className="cart-summary-total">
              <span>Total a Pagar</span>
              <span className="cart-total-value">{formatPrice(totalPrice)}</span>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full text-center text-lg py-4 mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processando..." : "Confirmar Pagamento"}
            </button>

            <div className="mt-4 text-center text-xs text-text-muted flex flex-col items-center gap-2">
              <svg viewBox="0 0 100 30" width="80" height="24">
                {/* Simplified InfinitePay Logo representation */}
                <rect width="100" height="30" fill="transparent"/>
                <text x="10" y="20" fill="#00d4ff" fontFamily="sans-serif" fontSize="14" fontWeight="bold">InfinitePay</text>
              </svg>
              Pagamento processado com segurança via InfinitePay
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
