# Site Hub · Igor Caires Machado

Site pessoal e hub de pesquisa de Igor Caires Machado. Publicado em inglês pelo GitHub Pages:
https://cairesmachado-svg.github.io/Site_hub/

## Arquivos ativos

| Arquivo | Função |
|---|---|
| `index.html` | Página inicial (raiz do site) |
| `en/index.html` | Redireciona para a raiz (mantém links antigos) |
| `publications/index.html` | Lista completa de publicações, com PDFs quando há arquivo público verificado |
| `projects/<projeto>/en/index.html` | Páginas dos projetos: arenas, regulatory-intermediaries, arqjud, pesquisa-agentiva, labjus |
| `projects/<projeto>/index.html` | Redireciona para a página do projeto |
| `styles.css` | Sistema visual único para todas as páginas (barra marinho #05336B, fundo branco, Source Sans 3) |
| `script.js` | Menu no celular e status do repositório nas páginas de projeto |
| `assets/qr-digital-card.svg` | QR code local do cartão digital |
| `assets/fonts/` | Fonte Source Sans 3 hospedada no site (licença OFL) |
| `.github/workflows/publish.yml` | Build e deploy: copia os arquivos acima para `_site/` e publica |

## Arquivos legados

Não entram no deploy: `*.qmd`, `_quarto.yml` e `projects/assets/`. A antiga página inicial em português
e as páginas de projeto em português continuam no histórico do Git.

A raiz do repositório é o próprio site. Assim, a publicação pelo GitHub Actions e a publicação
direta pela branch `main` geram o mesmo resultado.

## Estrutura da página inicial

1. Research: problema de pesquisa e dimensões da agenda
2. Projects: projetos com etapa e status
3. Publications: seleção e link para a lista completa
4. Writing: ensaios e textos públicos
5. Trajectory: desenvolvimento da agenda
6. Contact: contato, identificadores e cartão digital

## Teste local

```bash
bash -c "$(python3 -c "import yaml;print([s for s in yaml.safe_load(open('.github/workflows/publish.yml'))['jobs']['build']['steps'] if s.get('name','').startswith('Prepare')][0]['run'])")"
python3 -m http.server -d _site 8000
```
