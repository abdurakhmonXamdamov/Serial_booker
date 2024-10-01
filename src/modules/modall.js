// Export openModal and closeModal functions
export function closeModal(modalSelectors) {
    const modal = document.querySelector(modalSelectors);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = 'unset';
}

export function openModal(modalSelectors, openInterval) {
    const modal = document.querySelector(modalSelectors);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (openInterval) {
        clearTimeout(openInterval);
    }
}

export default function modaal(modalOpeners, modalSelectors, openInterval) {
    const modalOpenersElems = document.querySelectorAll(modalOpeners);
    const modal = document.querySelector(modalSelectors);

    modalOpenersElems.forEach(open => {
        open.addEventListener('click', () => openModal(modalSelectors, openInterval));
    });

    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelectors);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key == 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelectors);
        }
    });

    function showModalScroll() {
        if (document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight) {
            openModal(modalSelectors, openInterval);
            window.removeEventListener('scroll', showModalScroll);
        }
    }

    window.addEventListener('scroll', showModalScroll);
}
