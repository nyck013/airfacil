/* Configure os destinos reais antes de divulgar a página. Não inclua segredos aqui. */
window.AIRFACIL_CONFIG = Object.freeze({
  // IMAGENS: coloque os arquivos na pasta assets ou altere os caminhos abaixo.
  // Use a extensão real do arquivo (.png, .jpg, .webp etc.).
  // Se o arquivo não existir, a imagem atual será mantida.
  images: {
    principal: { src: 'assets/topo.png', alt: 'Air Fryer e aplicativo AirFácil' },
    refeicao: { src: 'assets/mulher-comendo.png', alt: 'Mulher saboreando uma refeição' },
    beneficios: { src: 'assets/beneficios.png', alt: 'Aplicativo e benefícios do Cardápio Air Fryer' },
    bonus: { src: 'assets/bonus.png', alt: 'Os três bônus do Cardápio Air Fryer' },
    oferta: { src: 'assets/oferta.png', alt: 'Materiais incluídos na oferta do Cardápio Air Fryer' }
  },
  checkoutUrl: 'https://pay.cakto.com.br/ecmny3j_1180328', // Ex.: https://pay.cakto.com.br/SEU-CHECKOUT
  whatsappNumber: '5513997914733', // Código do país + DDD + número, somente dígitos.
  supportEmail: 'contato@airfacil.com.br',
  whatsappMessage: 'Olá! Quero saber mais sobre o Cardápio Air Fryer.'
});
