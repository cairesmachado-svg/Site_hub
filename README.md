# Site Hub · Igor Caires Machado

Site pessoal e hub de pesquisa de Igor Caires Machado. Publicado em inglês pelo GitHub Pages:
https://cairesmachado-svg.github.io/Site_hub/

## Arquivos ativos

| Arquivo | Função |
|---|---|
| `en/index.html` | Página inicial (publicada como raiz do site) |
| `publications/index.html` | Lista completa de publicações, com PDFs quando há arquivo público verificado |
| `projects/<projeto>/en/index.html` | Páginas dos projetos: arenas, regulatory-intermediaries, arqjud, pesquisa-agentiva, labjus |
| `styles.css` | Sistema visual único para todas as páginas (paleta A1 Navy editorial, Helvetica) |
| `script.js` | Menu no celular e status do repositório nas páginas de projeto |
| `assets/qr-digital-card.svg` | QR code local do cartão digital |
| `.github/workflows/publish.yml` | Build e deploy: copia os arquivos acima para `_site/` e publica |

## Arquivos legados

Não entram no deploy: `index.html` da raiz, `*.qmd`, `_quarto.yml`, as páginas em português
`projects/<projeto>/index.html` e `projects/assets/`.

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
