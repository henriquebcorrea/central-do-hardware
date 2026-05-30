import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { customer, items, total } = body;

    // Validação básica
    if (!customer || !items || !total) {
      return Response.json(
        { error: "Dados incompletos. Envie customer, items e total." },
        { status: 400 }
      );
    }

    if (!customer.name || !customer.email) {
      return Response.json(
        { error: "Nome e email do cliente são obrigatórios." },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return Response.json(
        { error: "O carrinho está vazio." },
        { status: 400 }
      );
    }

    // ============================================
    // MODO SIMULADO - InfinitePay
    // ============================================
    // Em produção, aqui seria feita a integração real
    // com a API da InfinitePay para processar o pagamento.
    // 
    // Exemplo de integração real (comentado):
    // const infinitePayResponse = await fetch('https://api.infinitepay.io/v2/transactions', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.INFINITEPAY_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     amount: Math.round(total * 100), // em centavos
    //     payment_method: 'credit_card',
    //     card_token: body.cardToken,
    //     description: `Pedido Central do Hardware`,
    //     customer: {
    //       name: customer.name,
    //       email: customer.email,
    //       document: customer.cpf,
    //     },
    //   }),
    // });
    // ============================================

    // Simula processamento (delay de 1-2 segundos)
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 1000)
    );

    // Gera número de pedido
    const orderNumber = `CDH-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Simula resposta de sucesso
    return Response.json({
      success: true,
      simulated: true,
      order: {
        id: orderNumber,
        status: "confirmed",
        total,
        items: items.length,
        customer: {
          name: customer.name,
          email: customer.email,
        },
        payment: {
          method: "Cartão de Crédito (Simulado)",
          provider: "InfinitePay (Modo Simulado)",
          status: "approved",
        },
        createdAt: new Date().toISOString(),
      },
      message: "Pedido realizado com sucesso! (Modo Simulado)",
    });
  } catch {
    return Response.json(
      { error: "Erro interno ao processar o pedido." },
      { status: 500 }
    );
  }
}
