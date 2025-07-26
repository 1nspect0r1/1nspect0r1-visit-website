/**
 * Плавная прокрутка к секции
 * @param {string} sectionId - ID целевой секции
 * @param {number} [offset=20] - Отступ сверху в пикселях
 */
function scrollToSection(sectionId, offset = 20) {
  const section = document.getElementById(sectionId);
  if (section) {
    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
    const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * Инициализация кнопки "Наверх"
 */
function initScrollToTopButton() {
  const btn = document.createElement('button');
  btn.id = 'scroll-to-top';
  btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  btn.setAttribute('aria-label', 'Вернуться наверх');
  btn.style.display = 'none';
  
  document.body.appendChild(btn);

  // Стилизация через JavaScript (лучше вынести в CSS)
  Object.assign(btn.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'var(--primary)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
    zIndex: '1000'
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', () => {
    btn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
  });
}

/**
 * Подсветка активного раздела при скролле
 */
function highlightActiveSection() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('[data-nav-link]');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Инициализация при полной загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  initScrollToTopButton();
  highlightActiveSection();
  
  // Обработчик для всех якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });
});

// Экспорт для использования в других модулях (если нужно)
export { scrollToSection };