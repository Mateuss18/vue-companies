# Vue Companies

<div align="center">

**Descubra empresas brasileiras e internacionais que desenvolvem com Vue.js**

[![Deploy](https://img.shields.io/badge/deploy-vercel-black?logo=vercel)](https://vue-companies.vercel.app)
[![Nuxt 4](https://img.shields.io/badge/nuxt-4.3.1-00DC82?logo=nuxt.js)](https://nuxt.com)
[![Vue 3](https://img.shields.io/badge/vue-3.5-42b883?logo=vue.js)](https://vuejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[🌐 Ver Site](https://vue-companies.vercel.app) · [📝 Reportar Bug](https://github.com/mateuss18/vue-companies/issues) · [✨ Sugerir Feature](https://github.com/mateuss18/vue-companies/issues)

</div>

---

## 📖 Sobre

Plataforma que cataloga empresas que utilizam Vue.js ou Nuxt em sua stack de tecnologia. Ideal para desenvolvedores procurando oportunidades em empresas que valorizam o ecossistema Vue.

**Atualmente:** 42+ empresas catalogadas 🎉

### ✨ Features

- 🏢 Lista curada de empresas que usam Vue.js/Nuxt
- 🌍 Empresas brasileiras e internacionais
- 🔍 Informações sobre localização, tamanho e modelo de trabalho
- 🎨 Interface moderna e responsiva
- 🚀 Performance otimizada (SSG)
- 📱 Mobile-first design

---

## 🛠️ Stack Tecnológica

- **Framework:** [Nuxt 4](https://nuxt.com)
- **UI Framework:** [Nuxt UI 4](https://ui.nuxt.com)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com)
- **Ícones:** [Phosphor Icons](https://phosphoricons.com)
- **Logos:** [Logo.dev API](https://logo.dev)
- **Analytics:** Google Analytics (via nuxt-gtag)
- **Deploy:** [Vercel](https://vercel.com)

---

## 🚀 Começando

### Pré-requisitos

- Node.js 20+
- pnpm (recomendado) ou npm

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/mateuss18/vue-companies.git
cd vue-companies
```

2. Instale as dependências:

```bash
pnpm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Edite `.env` e adicione sua chave do Logo.dev:

```env
LOGO_DEV_PUBLIC_KEY=sua_chave_aqui
```

> 💡 Obtenha uma chave gratuita em [logo.dev](https://logo.dev)

4. Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

Acesse http://localhost:3000 🎉

---

## 📦 Scripts Disponíveis

```bash
pnpm dev          # Inicia servidor de desenvolvimento
pnpm build        # Build de produção
pnpm generate     # Gera site estático (SSG)
pnpm preview      # Preview do build local
pnpm lint         # Lint do código
```

---

## 📂 Estrutura do Projeto

```
vue-companies/
├── app/
│   ├── components/        # Componentes Vue
│   │   ├── CompanyCard.vue
│   │   ├── CompaniesList.vue
│   │   ├── HeroSection.vue
│   │   └── ...
│   ├── pages/
│   │   └── index.vue      # Página inicial
│   ├── assets/
│   │   ├── css/           # Estilos globais
│   │   └── imgs/          # Imagens (backgrounds)
│   └── types/
│       └── company.ts     # Tipos TypeScript
├── data/
│   └── companies.json     # Dados das empresas
├── public/
│   ├── imgs/
│   │   ├── logos/         # Logos locais (principais)
│   │   └── placeholder-logo.svg
│   └── fonts/             # Fontes Alexandria
├── nuxt.config.ts
└── app.config.ts
```

---

## 🏢 Estrutura de Dados

Cada empresa no `data/companies.json` contém:

```json
{
  "id": 1,
  "name": "Nome da Empresa",
  "slug": "nome-empresa",
  "domain": "empresa.com.br",
  "country": "Brasil",
  "city": "São Paulo",
  "size": "Média",
  "workModel": "hybrid",
  "website": "https://empresa.com.br",
  "linkedin": "https://linkedin.com/company/empresa",
  "description": "Breve descrição da empresa",
  "tags": ["fintech", "b2b"],
  "createdAt": "2026-03-07"
}
```

### Tamanhos de Empresa

- **Startup:** 1-50 funcionários
- **Pequena:** 51-200 funcionários
- **Média:** 201-1.000 funcionários
- **Grande:** 1.001-5.000 funcionários
- **Corporação:** 5.000+ funcionários

### Modelos de Trabalho

- `remote` - 100% remoto
- `hybrid` - Híbrido
- `onsite` - Presencial

---

## 🖼️ Sistema de Logos

O projeto usa uma estratégia híbrida para logos:

1. **Logos locais** (`/public/imgs/logos/`) - Empresas principais (carregamento instantâneo)
2. **Logo.dev API** - Fallback automático via domínio
3. **Logo.dev por nome** - Segunda tentativa
4. **Placeholder** - SVG customizado como último recurso

```vue
<!-- Fluxo automático no CompanyCard.vue -->
<img @error="handleLogoError" />
```

Isso economiza requisições da API e melhora performance.

---

## 🎨 Personalização

### Cores

As cores são definidas em `app/assets/css/main.css` usando Tailwind 4:

```css
@theme {
  --color-bg: #0e1417;
  --color-primary: #60af61;
  --color-secondary: #b8e178;
  /* ... */
}
```

### Tipografia

Fonte principal: **Alexandria** (self-hosted em `/public/fonts/`)

---

## 🤝 Contribuindo

Quer adicionar uma empresa? Siga estes passos:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-empresa`)
3. Adicione a empresa em `data/companies.json`
4. (Opcional) Adicione logo em `public/imgs/logos/`
5. Commit (`git commit -m 'Add: Nova Empresa'`)
6. Push (`git push origin feature/nova-empresa`)
7. Abra um Pull Request

### Critérios para adicionar empresas

- ✅ Usa Vue.js ou Nuxt como framework principal
- ✅ Tem vagas ativas ou histórico de contratação
- ✅ Informações públicas verificáveis

---

## 📊 Roadmap

- [ ] Filtros por localização e tamanho
- [ ] Busca por nome/tecnologia
- [ ] Seção de vagas integrada
- [ ] Páginas individuais por empresa
- [ ] API pública
- [ ] Expansão para outros frameworks

---

## 📝 License

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

**Feito com 💚 por Mateus Lopes**

[⬆ Voltar ao topo](#-vue-companies)

</div>
