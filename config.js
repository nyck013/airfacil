/* Configure os destinos reais antes de divulgar a página. Não inclua segredos aqui. */
window.AIRFACIL_CONFIG = Object.freeze({
  // IMAGENS: coloque os arquivos na pasta assets ou altere os caminhos abaixo.
  // Use a extensão real do arquivo (.png, .jpg, .webp etc.).
  // Se o arquivo não existir, a imagem atual será mantida.
  images: {
    principal: { src: 'assets/topo.jpg', alt: 'Air Fryer e aplicativo AirFácil' }
  },
  checkoutUrl: 'https://pay.wiapy.com/btOw9ye-Bre9', // Ex.: https://pay.cakto.com.br/SEU-CHECKOUT
  whatsappNumber: '5513997914733', // Código do país + DDD + número, somente dígitos.
  supportEmail: 'contatoairfacil@gmail.com',
  whatsappMessage: 'Olá! Quero saber mais sobre o Cardápio Air Fryer.'
});
