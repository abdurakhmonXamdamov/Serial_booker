import { openModal, closeModal } from './modall';

export default function form(openInterval) {
    const forms = document.querySelectorAll('form');

    forms.forEach((item) => {
        bindData(item);
    });

    const msg = {
        loading: '../img/spinner.svg',
        success: 'Thanks for filling out the form',
        failure: 'Something went wrong'
    };

    async function postData(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: data
        });

        return res.json();
    }

    function bindData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitting = document.createElement('img');
            submitting.src = msg.loading;
            submitting.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.append(submitting);

            const inputs = form.querySelectorAll('input');
            const obj = {};

            inputs.forEach((input) => {
                obj[input.getAttribute('name')] = input.value;
            });

            postData('http://localhost:3000/request', JSON.stringify(obj))
                .then((res) => {
                    console.log(res);
                    showThanksModal(msg.success);
                    submitting.remove();
                })
                .catch(() => {
                    showThanksModal(msg.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModal = document.querySelector('.modal__dialog');
        prevModal.classList.add('hide');
        openModal('.modal', openInterval); // Using openModal here

        const responseMod = document.createElement('div');
        responseMod.classList.add('modal__dialog');

        responseMod.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(responseMod);
        setTimeout(() => {
            responseMod.remove();
            prevModal.classList.add('show');
            prevModal.classList.remove('hide');
            closeModal('.modal'); // Using closeModal here
        }, 3500);
    }
}
