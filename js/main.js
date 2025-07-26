document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления карточек при прокрутке
    const cards = document.querySelectorAll('.card');
    const footer = document.querySelector('footer');
    
    // Сначала делаем все карточки видимыми
    cards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
    
    // Затем добавляем анимацию при скролле
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => observer.observe(card));
    
    // Наблюдаем за footer
    if (footer) {
        observer.observe(footer);
    }
});