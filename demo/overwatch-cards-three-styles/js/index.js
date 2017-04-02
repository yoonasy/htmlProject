const cardsToFlip = document.querySelectorAll('.card.animate');

setTimeout(function() {
    Array.from(cardsToFlip).forEach((card, i) => {
        setTimeout(() => card.classList.remove('animate'), i * 100);
    });
}, 500)