document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('form-toast');
    const submitButton = form.querySelector('[type="submit"]');
    const originalButtonText = submitButton.textContent;

    function showToast(type, message) {
        toast.className = 'toast toast--' + type + ' show';
        toast.textContent = message;
        setTimeout(function () {
            toast.className = 'toast';
            toast.textContent = '';
        }, 6000);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        toast.className = 'toast';
        toast.textContent = '';

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(function (response) {
                if (response.ok) {
                    showToast('success', 'Thank you for your message! We will get back to you soon.');
                    form.reset();
                } else {
                    showToast('error', 'Something went wrong. Please try again or contact us directly.');
                }
            })
            .catch(function () {
                showToast('error', 'Something went wrong. Please try again or contact us directly.');
            })
            .finally(function () {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
    });
});
