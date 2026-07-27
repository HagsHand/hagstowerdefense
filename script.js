/* ==========================================================================
   O BRASIL ESCONDIDO — script.js
   JavaScript puro, sem dependências externas.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Ano automático no rodapé ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Cabeçalho: muda de estilo ao rolar ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menu mobile (hambúrguer) ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  const closeMenu = () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // fecha o menu ao clicar em qualquer link
  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // fecha o menu com a tecla Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- Revelar seções ao rolar (IntersectionObserver) ---------- */
  const revealTargets = document.querySelectorAll(
    '.pillar, .creature-card, .proposal-text, .proposal-card, .about h2, .creatures h2'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => io.observe(el));

  /* ---------- Fireflies (luzes-do-mato) flutuando na tela ---------- */
  const fireflyContainer = document.getElementById('fireflies');
  const TOTAL_FIREFLIES = window.innerWidth < 720 ? 14 : 26;

  for (let i = 0; i < TOTAL_FIREFLIES; i++) {
    const fly = document.createElement('span');
    fly.className = 'firefly';

    const left = Math.random() * 100;               // posição horizontal (%)
    const duration = 9 + Math.random() * 10;         // duração da subida (s)
    const delay = Math.random() * 14;                // atraso inicial (s)
    const drift = (Math.random() - 0.5) * 120;       // deslocamento lateral (px)
    const size = 3 + Math.random() * 4;              // tamanho (px)

    fly.style.left = `${left}%`;
    fly.style.width = `${size}px`;
    fly.style.height = `${size}px`;
    fly.style.setProperty('--drift', `${drift}px`);
    fly.style.animationDuration = `${duration}s, ${2 + Math.random() * 2}s`;
    fly.style.animationDelay = `${delay}s, ${delay}s`;

    fireflyContainer.appendChild(fly);
  }

  /* ---------- Botões "Conhecer" das criaturas ---------- */
  // Dados de apoio para cada lenda. Pode futuramente virar uma página própria
  // por criatura (ex.: criaturas/saci.html) — por enquanto, mostra um resumo.
  const creatureInfo = {
    saci: {
      nome: 'Saci-Pererê',
      texto: 'O Saci é um perna-só travesso que vive nos redemoinhos de vento. Como torre, ele atrasa e desorienta os inimigos, criando brechas para suas outras defesas agirem.'
    },
    curupira: {
      nome: 'Curupira',
      texto: 'Guardião da mata com os pés virados para trás, o Curupira confunde quem tenta segui-lo. Como torre, oferece defesa pesada e resistente contra ondas inteiras de invasores.'
    },
    iara: {
      nome: 'Iara',
      texto: 'A mãe-d’água encanta com seu canto. Como torre, a Iara atrai e prende inimigos próximos a rios e lagos, controlando o ritmo da batalha.'
    },
    boitata: {
      nome: 'Boitatá',
      texto: 'Serpente de fogo que protege a mata das queimadas. Como torre, o Boitatá causa dano em área devastador, ideal contra hordas numerosas.'
    }
  };

  document.querySelectorAll('[data-creature-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-creature-btn');
      const info = creatureInfo[key];
      if (!info) return;

      // Por enquanto exibimos um resumo simples.
      // Quando houver páginas individuais, troque por: window.location.href = `criaturas/${key}.html`;
      alert(`${info.nome}\n\n${info.texto}`);
    });
  });

});
