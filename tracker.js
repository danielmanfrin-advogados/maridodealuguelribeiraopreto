(function () {
  var C = window.SITE_CONFIG || {};
  function so(s) { return String(s || '').replace(/\D/g, ''); }

  // Ajusta os links a partir do config.js
  var links = document.querySelectorAll('[data-acao]');
  for (var i = 0; i < links.length; i++) {
    var a = links[i], acao = a.getAttribute('data-acao');
    if (acao === 'whatsapp') {
      var msg = a.getAttribute('data-msg') || C.mensagem || '';
      a.href = 'https://wa.me/' + so(C.whatsapp) + '?text=' + encodeURIComponent(msg);
      a.target = '_blank';
      a.rel = 'noopener';
    } else if (acao === 'ligar') {
      a.href = 'tel:+' + so(C.telefone);
    }
  }

  // Barra de pedido rápido da página inicial
  var rapido = document.getElementById('rapido');
  if (rapido) {
    var onde = document.getElementById('r-onde'), oque = document.getElementById('r-oque');
    var botao = rapido.querySelector('[data-acao]');
    var atualizar = function () {
      var cidade = C.cidade || 'Ribeirão Preto', lugar;
      if (onde.value === '__regiao') lugar = 'na região de ' + cidade;
      else if (onde.value) lugar = 'no bairro ' + onde.value + ', em ' + cidade;
      else lugar = 'em ' + cidade;
      var m = 'Olá! Vim pelo site e gostaria de ' + oque.value + ' ' + lugar + '.';
      botao.setAttribute('data-msg', m);
      botao.href = 'https://wa.me/' + so(C.whatsapp) + '?text=' + encodeURIComponent(m);
    };
    onde.addEventListener('change', atualizar);
    oque.addEventListener('change', atualizar);
    atualizar();
  }

  function sessao() {
    try {
      var s = sessionStorage.getItem('sid');
      if (!s) { s = Math.random().toString(36).slice(2, 10); sessionStorage.setItem('sid', s); }
      return s;
    } catch (e) { return ''; }
  }

  function param(nome) {
    try { return new URLSearchParams(location.search).get(nome) || ''; } catch (e) { return ''; }
  }

  function registrar(acao, local, detalhe) {
    var endpoint = (C.endpoint || C.webhookUrl || '').trim();
    if (!endpoint) return;

    var d = {
      token: C.trackingToken || '479479',
      site: C.site || location.hostname,
      nicho: C.nicho || '',
      acao: acao || '',
      botao: acao || '',
      local: local || '',
      posicao: local || '',
      pagina: location.pathname,
      titulo: document.title,
      origem: document.referrer || '',
      utm_source: param('utm_source'),
      utm_medium: param('utm_medium'),
      utm_campaign: param('utm_campaign'),
      utm_term: param('utm_term'),
      gclid: param('gclid') ? 'sim' : '',
      anuncio: param('gclid') ? 'sim' : 'não',
      dispositivo: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'celular' : 'computador',
      tela: (window.screen ? screen.width + 'x' + screen.height : ''),
      idioma: navigator.language || '',
      detalhe: detalhe || '',
      mensagem: detalhe || '',
      sessao: sessao(),
      _t: Date.now()
    };

    var q = Object.keys(d).map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(d[k]); }).join('&');
    var sep = endpoint.indexOf('?') === -1 ? '?' : '&';
    var url = endpoint + sep + q;

    // 1. Imagem síncrona (método GET universal com cache-buster, segue 302 sem bloqueio de CORS)
    try {
      var img = new Image();
      img.src = url;
    } catch (eImg) {}

    // 2. Beacon API (ideal em mobile quando o app de telefone/whatsapp é aberto)
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url);
      }
    } catch (eBcn) {}

    // 3. POST com JSON (suportado nativamente pelo Code.gs do site com validação de token)
    try {
      if (window.fetch) {
        fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(d),
          keepalive: true
        }).catch(function () {});
      }
    } catch (ePost) {}
  }

  document.addEventListener('click', function (ev) {
    var el = ev.target.closest ? ev.target.closest('[data-acao]') : null;
    if (!el) return;
    registrar(el.getAttribute('data-acao'), el.getAttribute('data-local'), el.getAttribute('data-msg'));
  }, true);

  window.registrarClique = registrar;
})();
