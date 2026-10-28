/**
 * Configurações principais do portal Marido de Aluguel em Ribeirão Preto.
 *
 * Para alterar o número de WhatsApp ou telefone de contato de todo o site,
 * basta editar os valores abaixo (apenas dígitos, com código do país 55 e DDD 16).
 */
window.SITE_CONFIG = {
  site: "maridodealuguelribeiraopreto",
  nicho: "marido de aluguel",
  whatsapp: "5516900000000",   // Altere aqui: 55 + DDD + número (exemplo: 5516999998888)
  telefone: "5516900000000",   // Altere aqui para ligações diretas
  mensagem: "Olá! Vim pelo site Marido de Aluguel em Ribeirão Preto e preciso de serviços de reparo em Ribeirão Preto.",
  cidade: "Ribeirão Preto",
  endpoint: "https://script.google.com/macros/s/AKfycbzNOf1W0H8qo7UEY0AGEyLIF3ksLYgj2YELKy9OytgORZ_3Zs6PmRGl_a2p9w-myqdnlg/exec"

  // Planilha de captação de cliques / webhook (deixe vazio se não usar)
  // Se preenchido com a URL do script do Google Sheets, receberá os eventos de clique
  webhookUrl: "https://script.google.com/macros/s/AKfycbzNOf1W0H8qo7UEY0AGEyLIF3ksLYgj2YELKy9OytgORZ_3Zs6PmRGl_a2p9w-myqdnlg/exec",
  trackingToken: "479479",

};
