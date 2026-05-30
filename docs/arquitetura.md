# Documentação - Central do Hardware

Este arquivo existe para cumprir o requisito de entrega da pasta `/docs`.

## Arquitetura do Componente de IA (TF-IDF)

O fluxo de busca inteligente funciona da seguinte maneira:

```mermaid
graph TD
    A[Usuário digita termo] --> B{Termo >= 2 chars?}
    B -- Sim --> C[API /api/search]
    C --> D[Tokenização NLP]
    D --> E[Remoção de Stopwords]
    E --> F[Expansão de Sinônimos]
    F --> G[Cálculo TF-IDF]
    G --> H[Similaridade de Cosseno com Corpus dos Produtos]
    H --> I[Ordenação por Relevância]
    I --> J[Retorna Resultados para UI]
```

## Arquitetura do Checkout (InfinitePay)

```mermaid
graph TD
    A[Carrinho Completo] --> B[Página de Checkout]
    B --> C[Usuário preenche dados e cartão]
    C --> D[Geração de Token Seguro Local]
    D --> E[POST /api/checkout]
    E --> F{Modo Simulado?}
    F -- Sim --> G[Gera Número de Pedido Fictício]
    F -- Não --> H[Chama API Rest da InfinitePay v2]
    G --> I[Retorna Sucesso]
    H --> I
    I --> J[Limpa Carrinho e Exibe Tela de Sucesso]
```
