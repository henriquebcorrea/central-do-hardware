import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-name">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" />
                <line x1="9" y1="1" x2="9" y2="4" />
                <line x1="15" y1="1" x2="15" y2="4" />
                <line x1="9" y1="20" x2="9" y2="23" />
                <line x1="15" y1="20" x2="15" y2="23" />
                <line x1="20" y1="9" x2="23" y2="9" />
                <line x1="20" y1="14" x2="23" y2="14" />
                <line x1="1" y1="9" x2="4" y2="9" />
                <line x1="1" y1="14" x2="4" y2="14" />
              </svg>
              Central do Hardware
            </div>
            <p>
              Sua loja de peças de PC com os melhores preços e entrega rápida.
              Monte o setup dos seus sonhos com componentes de qualidade.
            </p>
          </div>

          <div className="footer-section">
            <h4>Navegação</h4>
            <ul>
              <li><Link href="/">Início</Link></li>
              <li><Link href="/#produtos">Produtos</Link></li>
              <li><Link href="/carrinho">Carrinho</Link></li>
              <li><Link href="/checkout">Checkout</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Categorias</h4>
            <ul>
              <li><Link href="/">Placas de Vídeo</Link></li>
              <li><Link href="/">Memória RAM</Link></li>
              <li><Link href="/">Armazenamento</Link></li>
              <li><Link href="/">Periféricos</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Suporte</h4>
            <ul>
              <li><Link href="/">Contato</Link></li>
              <li><Link href="/">FAQ</Link></li>
              <li><Link href="/">Política de Troca</Link></li>
              <li><Link href="/">Rastrear Pedido</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Central do Hardware. Todos os direitos reservados. 
          Projeto acadêmico – Aula 7 IA & Desenvolvimento.
        </div>
      </div>
    </footer>
  );
}
