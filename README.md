# Central do Hardware

Este é um projeto acadêmico de e-commerce construído com Next.js (App Router), focado na venda de peças de hardware para PC. O projeto faz parte da Aula 7 de IA & Desenvolvimento e demonstra a integração de componentes modernos com IA.

## 🚀 Funcionalidades

- **Catálogo Temático**: 12 produtos focados no nicho de hardware e periféricos gamer.
- **Carrinho de Compras**: Implementado com React Context API e persistência no localStorage.
- **Busca Semântica com IA (TF-IDF)**: Motor de busca inteligente customizado rodando 100% no servidor, que entende contexto (ex: buscar por "presente para gamer" retorna itens relevantes).
- **Checkout Simulado InfinitePay**: Fluxo de finalização de compra funcional que simula a integração com o gateway de pagamento.
- **Design UI/UX Gamer**: Tema escuro com accent colors em neon/cyan, microinterações e design totalmente responsivo sem dependência de frameworks CSS (usando Vanilla CSS).

## 🛠 Tecnologias Utilizadas

- Next.js 14 (App Router)
- React
- TypeScript
- Vanilla CSS (com CSS Variables)
- TF-IDF (Algoritmo de Busca Semântica Customizado)

## 📦 Como Rodar Localmente

1. Clone este repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie o arquivo `.env.local` baseado no `.env.example` (opcional, o app funciona sem variáveis de ambiente neste formato de entrega)
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🧠 Sobre o Componente de IA (Busca Semântica)

Este projeto implementa um motor de busca semântica do zero utilizando o algoritmo **TF-IDF (Term Frequency - Inverse Document Frequency)** acoplado com **Similaridade de Cosseno**.

### Como funciona:
1. **Corpus Expandido**: Cada produto possui um campo `searchCorpus` contendo sinônimos e contextos de uso (ex: "melhorar fps", "presente", "trabalho").
2. **Processamento (NLP)**: Quando o usuário digita uma query, o texto é normalizado, convertido para minúsculas, tem seus acentos removidos e é limpo de "stopwords" em português (palavras como "de", "para", "com", etc).
3. **Expansão de Query**: A query é expandida usando um dicionário de sinônimos pré-definido.
4. **Cálculo de Similaridade**: A API route `/api/search` calcula a relevância matemática entre o que o usuário digitou e o conteúdo descritivo de cada produto, retornando os que dão "match" através de similaridade de cosseno, não apenas buscas exatas.

A principal vantagem desta abordagem é não depender de APIs externas pagas, garantindo alta performance rodando direto na Vercel Edge/Serverless functions.

## 📝 Documentação e Diagramas

Na pasta `/docs` você encontra imagens e diagramas simplificados da arquitetura do projeto.

---
*Desenvolvido para a Aula 7 do curso.*
