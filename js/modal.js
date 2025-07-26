// Открытие модального окна
function openModal(modalId) {
    const modal = document.getElementById(`${modalId}-modal`);
    if (modal) {
        document.body.style.overflow = 'hidden';
        modal.classList.add('show');
    }
}

// Закрытие модального окна
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    document.body.style.overflow = '';
    modals.forEach(modal => modal.classList.remove('show'));
}