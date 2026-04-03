# D&D 5e — Gerador de Fichas

Aplicação web para criação e gerenciamento de fichas de personagem para **Dungeons & Dragons 5ª Edição**. Desenvolvida com React e Vite, funciona completamente no navegador — sem necessidade de servidor ou banco de dados.

## Funcionalidades

- **Wizard em 8 passos** para criar personagens do zero (raça, classe, atributos, perícias, combate, equipamentos, magias e backstory)
- **D20 animado** com SVG temático — crítico e falha crítica destacados visualmente
- **Rolagem de dados completa:** d4, d6, d8, d10, d12, d20, d100, vantagem, desvantagem e notação livre (ex.: `2d6+3`)
- **Ficha de personagem** com HP tracker, slots de magia, inventário e condições
- **Exportação em PDF** fiel à ficha exibida em tela
- **Exportação / importação JSON** para backup e compartilhamento de personagens
- **Múltiplos personagens** salvos no navegador via localStorage
- **3 temas visuais:** Grimório Sombrio, Pergaminho e Cristal Élfico

## Tecnologias

| Lib | Versão | Função |
|---|---|---|
| React | 19 | Interface e estado |
| Vite | 8 | Build e servidor local |
| jsPDF | 4 | Geração de PDF |
| html2canvas | 1 | Captura da ficha como imagem |

## Como rodar localmente

### 1. Pré-requisito — Node.js

Acesse [nodejs.org](https://nodejs.org) e baixe a versão **LTS**. Após instalar, abra o terminal e confirme:

```bash
node -v
npm -v
```

### 2. Instalar dependências

Abra o terminal **dentro da pasta do projeto** (`dnd-sheet`) e execute:

```bash
npm install
```

Esse comando baixa todas as bibliotecas listadas no `package.json`. Só precisa rodar uma vez.

### 3. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

O terminal vai exibir algo como:

```
  VITE v8.x  ready in 300ms
  ➜  Local:   http://localhost:5173/
```

Abra o endereço `http://localhost:5173` no navegador e o projeto estará rodando.

> **Atenção:** não abra o `index.html` diretamente no navegador com duplo clique — isso não funciona para projetos React/Vite. Sempre use `npm run dev`.

## Como publicar no GitHub

```bash
# 1. Inicializar o repositório
git init

# 2. Adicionar os arquivos (excluindo node_modules automaticamente via .gitignore)
git add .

# 3. Primeiro commit
git commit -m "feat: gerador de fichas D&D 5e com D20 animado e exportação PDF"

# 4. Criar o repositório no GitHub (site ou CLI)
#    Se usar GitHub CLI:
gh repo create dnd-sheet --public --source=. --remote=origin --push

#    Ou, se criar manualmente no site:
git remote add origin https://github.com/SEU_USUARIO/dnd-sheet.git
git branch -M main
git push -u origin main
```

## Estrutura do projeto

```
dnd-sheet/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── dice/
│   │   │   └── DiceRoller.jsx    # Dado D20 animado + todos os dados
│   │   ├── sheet/
│   │   │   └── CharacterSheet.jsx
│   │   └── steps/
│   │       ├── Step1Basic.jsx    # Raça, classe, background
│   │       ├── Step2Abilities.jsx
│   │       ├── Step3Skills.jsx
│   │       ├── Step4Combat.jsx
│   │       ├── Step5Equipment.jsx
│   │       ├── Step6Features.jsx
│   │       ├── Step7Spells.jsx
│   │       └── Step8Backstory.jsx
│   ├── data/                     # Dados do sistema D&D 5e
│   │   ├── backgrounds.js
│   │   ├── classes.js
│   │   ├── equipment.js
│   │   ├── races.js
│   │   ├── skills.js
│   │   └── spells.js
│   ├── hooks/
│   │   └── useCharacter.jsx      # Estado global do personagem
│   ├── styles/
│   │   ├── app.css
│   │   └── theme.css
│   ├── utils/
│   │   ├── calculations.js
│   │   └── dice.js               # Funções de rolagem de dados
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Licença

MIT
