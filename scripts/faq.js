document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.faq-search input');
  const faqItems = document.querySelectorAll('.faq-item');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();

    faqItems.forEach(item => {
      const question = item.querySelector('summary span')?.textContent.toLowerCase() || '';

      const match = question.includes(query);

      if (match) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
        item.removeAttribute('open');
      }
    });
  });
});