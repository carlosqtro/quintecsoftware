  const productCards = document.querySelector('.product-cards');
  const firstCard = productCards.querySelector('.product-card');
  if (window.innerWidth <= 768) {
    // Calcula el ancho de una tarjeta + el gap para centrar la segunda
    const cardWidth = firstCard.offsetWidth;
    const gap = parseInt(window.getComputedStyle(productCards).gap);
    productCards.scrollLeft = cardWidth + gap - (productCards.offsetWidth * 0.1);
  }