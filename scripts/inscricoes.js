const formContent = {
    jammers: {
        title: "Inscreve-te hoje!",
        desc: "Preencher o formulário da <strong>MAD Jam Fest</strong> é o primeiro passo para mergulhar nas <strong>48 horas</strong> de criatividade intensa e juntar-se à comunidade que dá vida ao festival.",
        // JAMMERS FORM (Original)
        formLink: "https://docs.google.com/forms/d/e/1FAIpQLSdFp7_CsjAGWkSJCdFXoGrODYlW3bx69Zw1sF9OG8IMH4YzMg/viewform?embedded=true"
    },
    voluntarios: {
        title: "Queres-te tornar parte da equipa MAD?",
        desc: "Para te tornares num voluntário da <strong>MAD Jam Fest</strong>, preenche este formulário, para percebermos que tarefas perferes e terás mais aptidões para realisar durante o evento.",
        // VOLUNTEER FORM (Updated)
        formLink: "https://docs.google.com/forms/d/e/1FAIpQLSezgA8aT-sdWaXhK6hNzphv9seWkOw4fKVaGxquqpUMszFPVQ/viewform?embedded=true" 
    },
    artistas: {
        title: "Palco Aberto",
        desc: "Se queres ser um dos atos que abrem a gala de prémios da <strong>MAD Jam Fest</strong>, preenche este formulário, e envia-nos o projeto / atuação a ser exposto.",
        // ARTIST FORM (Updated)
        formLink: "https://docs.google.com/forms/d/e/1FAIpQLSdYAwrtUToKImIRjAg3FnK-lhRZn5fQKYWr2wqw4UbfPU6G9w/viewform?embedded=true" 
    }
};

function switchForm(type, clickedBtn) {
    // 1. Get Elements
    const titleEl = document.getElementById('hero-title');
    const descEl = document.getElementById('hero-desc');
    const iframeEl = document.getElementById('google-form');
    const allButtons = document.querySelectorAll('.form-tabs .nav-btn');

    // 2. Animate Text Change
    titleEl.style.opacity = 0;
    descEl.style.opacity = 0;

    setTimeout(() => {
        titleEl.innerHTML = formContent[type].title;
        descEl.innerHTML = formContent[type].desc;
        titleEl.style.opacity = 1;
        descEl.style.opacity = 1;
    }, 200);

    // 3. Change Form Link
    iframeEl.src = formContent[type].formLink;

    // 4. Update Button State (Toggle .pressed class)
    allButtons.forEach(btn => btn.classList.remove('pressed'));
    clickedBtn.classList.add('pressed');
}

// Add CSS transitions on load
document.addEventListener('DOMContentLoaded', () => {
    const titleEl = document.getElementById('hero-title');
    const descEl = document.getElementById('hero-desc');
    
    if(titleEl && descEl) {
        titleEl.style.transition = "opacity 0.2s ease";
        descEl.style.transition = "opacity 0.2s ease";
    }
});