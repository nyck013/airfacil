# AirFácil — página de vendas

Página em HTML, CSS e JavaScript puro. Sem instalação, framework ou etapa de compilação. Abra `index.html` no navegador ou envie todos os arquivos e a pasta `assets` para sua hospedagem.

## Arquivos

- `index.html`: conteúdo e estrutura da página.
- `styles.css`: cores, layout base, ondas e animações.
- `mobile.css`: refinamentos para celular e tablet, incluindo telas de 320 px e áreas seguras do iPhone.
- `script.js`: efeitos de entrada, barra de progresso, FAQ, retorno ao topo, botões e avisos.
- `config.js`: caminhos das cinco imagens principais, checkout, WhatsApp e e-mail.
- `assets/`: as três imagens fornecidas e os ícones Font Awesome.
- `favicon.svg`: ícone da aba.

## Ativar os botões de compra

Edite `config.js` e preencha `checkoutUrl` com o endereço HTTPS real do checkout. Preencha `whatsappNumber` com país, DDD e número, somente dígitos, e `supportEmail` com o endereço de atendimento. Nenhum segredo, senha ou token deve ser colocado nesses arquivos públicos.

Enquanto esses dados estiverem vazios, os botões exibirão um aviso e não farão cobranças nem encaminharão visitantes a contatos inventados.

## Design e imagens

As imagens originais foram preservadas. Os recortes são feitos por CSS para aproveitar as fotos, os mockups e os materiais do design enviado. Os títulos, textos, botões e cartões são HTML real e editável, não uma imagem da página inteira. As cinco imagens principais podem ser substituídas pelo bloco `images` do `config.js`, conforme as instruções abaixo. Os demais recortes continuam usando as referências originais.

Os ícones são do Font Awesome Free 6.7.2, sem emojis. Font Awesome: https://fontawesome.com/license/free. A fonte do texto é DM Sans e a dos títulos é Nunito.

## Conteúdo que precisa de confirmação

- O checkout e os contatos reais ainda não foram fornecidos.
- O preço, os materiais, o acesso vitalício, a garantia e o horário foram reproduzidos da oferta enviada. Confira se correspondem ao produto entregue.
- Os seis prints de depoimentos foram fornecidos pelo usuário e foram incluídos sem alterações. Não foi realizada verificação independente de autenticidade.
- A seção de depoimentos repetida nas duas referências foi consolidada em uma só. Os títulos das seções não exibem numeração.
- Esta entrega é a página de vendas. Não inclui o aplicativo de receitas, arquivos do produto, processamento de pagamentos ou envio de acesso por e-mail.

## Acessibilidade e animações

Layout para celular, tablet e computador, FAQ nativo com teclado, indicadores de foco, diálogo acessível e respeito à preferência de movimento reduzido. Efeitos de entrada acontecem uma única vez, com hover nos cartões e botões e flutuação suave no mockup.

## Verificação

JavaScript validado sintaticamente, caminhos de arquivos e âncoras verificados. Não foi possível executar inspeção visual em navegador nesta sessão. Confira a página na sua hospedagem e teste o checkout real antes de iniciar anúncios.

## Atualização para celular

A primeira seção reorganiza título, imagem e botão. Cartões de receitas usam foto e texto lado a lado; os benefícios têm texto HTML e Font Awesome próprios no celular. Há botões maiores, tipografia fluida e barra inferior de acesso à oferta que desaparece quando a oferta ou o atendimento estão visíveis. Animações são mais curtas no celular e os efeitos de hover ficam restritos a dispositivos com ponteiro.

## Colocar sua logo no VS Code

A logo em texto foi substituída por uma tag `<img>` no topo e no rodapé.

1. Abra a pasta AirFacil no VS Code.
2. Coloque sua imagem PNG dentro da pasta `assets` com o nome exato `logo.png`.
3. Abra `index.html` no navegador ou com Live Server.

A imagem não foi fornecida nesta conversa e não está incluída no pacote. A logo só será exibida depois que você adicionar esse arquivo. Use preferencialmente PNG com fundo transparente e recortado próximo da marca, sem grandes margens vazias. Se usar SVG, JPG ou outro nome, altere `src="assets/logo.png"` nas duas imagens do `index.html` para o caminho correto. Apenas renomear a extensão não converte uma imagem.

O CSS mantém a proporção da logo e ajusta seu tamanho para celular e computador. Esta atualização foi aplicada ao pacote de código para uso local.


## Trocar as imagens principais

As capturas enviadas mostram as imagens atuais; os novos arquivos ainda precisam ser adicionados por você.

1. Extraia o ZIP e abra a pasta `AirFacil` no VS Code.
2. Coloque suas novas imagens na pasta `assets`, usando os nomes abaixo.
3. Salve os arquivos e atualize a página no navegador.

| Seção | Arquivo esperado |
| --- | --- |
| Topo: Air Fryer e celular | `assets/topo.png` |
| Mulher comendo | `assets/mulher-comendo.png` |
| Mais praticidade: celular e benefícios | `assets/beneficios.png` |
| Três bônus | `assets/bonus.png` |
| Oferta de R$ 27,90 | `assets/oferta.png` |

Se o arquivo tiver outro nome ou formato, altere `src` no bloco `images` de `config.js`. Por exemplo:

```js
principal: { src: 'assets/meu-topo.jpg', alt: 'Descrição da sua imagem' },
```

Mantenha as vírgulas e as aspas do código. Use nomes sem espaços e confira letras maiúsculas/minúsculas. Renomear `.jpg` para `.png` não converte o formato.

Não substitua `reference-1.jpg`, `reference-2.jpg` ou `reference-3.jpg`: outras imagens da página ainda usam esses arquivos. Cada nova imagem é carregada independentemente. Se o caminho estiver incorreto ou o arquivo ainda não existir, o recorte antigo continuará aparecendo. JavaScript deve estar habilitado para a troca automática.

As imagens novas são exibidas inteiras (`object-fit: contain`), sem distorção, e limitadas ao espaço da seção em celular e computador. Podem sobrar margens quando a proporção do arquivo for diferente da área. Para fotos e montagens maiores, prefira arquivos horizontais; para mockups, PNG ou WebP transparente. A imagem personalizada de benefícios também aparece no celular, acima da lista de benefícios em texto.

A logo permanece configurada separadamente no `index.html` como `assets/logo.png`.


## Atualização: remoção da Chef e carrossel

A seção de apresentação da Chef Clara foi removida. Os três cartões de depoimentos anteriores foram substituídos pelos seis prints enviados, na ordem dos anexos. As imagens foram preservadas, inclusive os textos que aparecem dentro delas.

- Celular: uma imagem por vez, com deslize lateral.
- Tablet: duas imagens por vez; computador: três.
- Setas, indicadores e navegação pelas teclas esquerda/direita, Home e End quando o carrossel está em foco.
- Clique ou toque em “Ampliar” para ler a imagem maior; feche pelo botão X, pela tecla Esc ou clicando fora.
- Sem avanço automático, para permitir ler cada mensagem com calma.
- As imagens ficam em `assets/depoimentos/depoimento-01.png` até `depoimento-06.png`. Os prints têm 600 × 750 px e aparecem inteiros.
- Para substituir um print, troque o arquivo correspondente. Se mudar o nome, atualize `src` e `href` no `index.html`; atualize também `alt` e o nome acessível do link.

Esta atualização usa como base o último ZIP entregue nesta conversa. Alterações feitas somente no seu computador não estão incluídas. Se já adicionou logo, imagens ou links de pagamento localmente, preserve esses arquivos e valores ao aplicar esta atualização.

Verificação desta atualização: estrutura HTML, sintaxe JavaScript, navegação do carrossel em simulação de DOM e integridade dos seis prints conferidas. A inspeção visual em navegador não foi executada porque não havia navegador instalado no ambiente.

Para aplicar somente esta atualização no projeto local: substitua `index.html`, `mobile.css` e `script.js`, e copie a pasta `assets/depoimentos` para dentro da sua pasta `assets`. Preserve seu `config.js` com o checkout e suas imagens. A configuração antiga da Chef, se permanecer no config, não interfere na página porque a seção foi removida. Se você editou outros conteúdos do HTML localmente, compare o `index.html` antes de substituí-lo.


## Contador fixo de duas horas

O contador aparece em uma barra fixa no topo, no celular e no computador. Há também um contador na seção da oferta, sincronizado com o do topo. Ambos usam o mesmo horário final salvo e um único intervalo de atualização. A página reserva a altura da barra para não cobrir o conteúdo. Começa com duas horas na primeira abertura e salva o horário final no armazenamento local do navegador. Atualizar, fechar e voltar não reinicia a contagem: o tempo continua passando com a página fechada. Ao terminar, permanece em 00:00:00, inclusive nas visitas seguintes. Não altera o preço nem bloqueia o checkout.

A persistência vale para o mesmo navegador e endereço do site. Limpar os dados do site, abrir em outro navegador/dispositivo ou mudar o endereço cria uma contagem nova. Navegação privada e armazenamento bloqueado podem impedir a persistência. Ao testar localmente, prefira Live Server com a mesma porta/endereço.

Para aplicar esta alteração, substitua apenas `index.html`, `mobile.css` e `script.js`. Preserve seu `config.js` e suas imagens. Caso tenha alterado o HTML por conta própria, compare os arquivos antes de substituir.

Verificação do contador: simulação de primeira visita, atualização, reabertura após tempo fechado, expiração permanente, sincronização entre abas e armazenamento bloqueado. Sintaxe JavaScript validada.

Migração da versão anterior: se já houver um contador de uma hora salvo, a nova duração passa a ser duas horas a partir do início original, preservando o tempo transcorrido. Exemplo: após 20 minutos de uso, aparecerá 01:40:00. Essa migração acontece uma única vez.

Verificação da versão de duas horas: HTML balanceado, contadores do topo e da oferta sincronizados, persistência, migração do prazo anterior, expiração e cálculo do espaço reservado para a barra conferidos em testes de lógica. Sem inspeção visual em navegador neste ambiente.
