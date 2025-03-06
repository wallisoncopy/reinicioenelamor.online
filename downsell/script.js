
document.addEventListener('DOMContentLoaded', function() {
  const ctaButtons = document.querySelectorAll('.cta-button:not(.scroll-to-offers):not(.offer-button)');
  
  // Adiciona efeito de pulsação aos botões para chamar atenção
  setInterval(() => {
    ctaButtons.forEach(button => {
      button.classList.add('pulse');
      setTimeout(() => {
        button.classList.remove('pulse');
      }, 1000);
    });
  }, 3000);
  
  // Rolagem suave para as ofertas quando clica no botão principal
  const scrollToOffersButton = document.querySelector('.scroll-to-offers');
  if (scrollToOffersButton) {
    scrollToOffersButton.addEventListener('click', function(e) {
      e.preventDefault();
      const offersSection = document.querySelector('#ofertas');
      if (offersSection) {
        offersSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // Adiciona evento de clique aos botões (exceto os de oferta que já são links)
  ctaButtons.forEach(button => {
    if (!button.classList.contains('offer-button')) {
      button.addEventListener('click', function() {
        // Aqui você pode adicionar o redirecionamento para a página de vendas
        alert('Obrigado pelo seu interesse! Em breve você receberá mais informações.');
        // window.location.href = "sua-pagina-de-vendas.html";
      });
    }
  });
  
  // Funcionalidade do FAQ
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      
      // Toggle ativo no item atual
      faqItem.classList.toggle('active');
      
      // Ajusta a visualização da resposta com animação
      const answer = question.nextElementSibling;
      if (faqItem.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.style.color = '#ff4081';
      } else {
        answer.style.maxHeight = null;
        question.style.color = '#6a1b9a';
      }
    });
  });
  
  // Para iniciar com todos os FAQs fechados
  document.querySelectorAll('.faq-answer').forEach(answer => {
    answer.style.maxHeight = null;
    answer.style.overflow = 'hidden';
    answer.style.transition = 'max-height 0.3s ease';
  });
  
  // Rastreamento de eventos com o pixel do Meta
  // Rastrear cliques nos botões de oferta
  const offerButtons = document.querySelectorAll('.offer-button');
  offerButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (typeof fbq === 'function') {
        fbq('track', 'InitiateCheckout');
      }
    });
  });
  
  // Rastrear visualização da seção de ofertas
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && typeof fbq === 'function') {
        fbq('track', 'ViewContent', {content_name: 'offers_section'});
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.5});
  
  const offersSection = document.querySelector('#ofertas');
  if (offersSection) {
    observer.observe(offersSection);
  }
});

// Adiciona o estilo de animação pulse no CSS
const style = document.createElement('style');
style.innerHTML = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  .pulse {
    animation: pulse 1s ease-in-out;
  }
`;
document.head.appendChild(style);
