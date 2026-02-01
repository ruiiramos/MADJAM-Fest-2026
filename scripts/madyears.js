// Team carousel data
const teamMembers = [
  {
    name: 'João Silva',
    role: 'Coordenador Geral',
    description: 'Responsável pela organização e coordenação de todas as atividades do evento, garantindo que tudo corre bem.',
    contact: 'joao@madjamfest.pt',
    avatar: 'https://i.pravatar.cc/300?u=member1'
  },
  {
    name: 'Maria Santos',
    role: 'Coordenadora de Comunicação',
    description: 'Gere toda a comunicação do evento, desde as redes sociais até à imprensa, garantindo que a MAD chega a todos.',
    contact: 'maria@madjamfest.pt',
    avatar: 'https://i.pravatar.cc/300?u=member6'
  },
  {
    name: 'Pedro Costa',
    role: 'Coordenador Técnico',
    description: 'Responsável por toda a infraestrutura técnica do evento, desde o equipamento até ao suporte aos participantes.',
    contact: 'pedro@madjamfest.pt',
    avatar: 'https://i.pravatar.cc/300?u=member3'
  },
  {
    name: 'Ana Rodrigues',
    role: 'Coordenadora de Voluntários',
    description: 'Gere a equipa de voluntários, assegurando que todos têm o que precisam para tornar o evento um sucesso.',
    contact: 'ana@madjamfest.pt',
    avatar: 'https://i.pravatar.cc/300?u=member4'
  },
  {
    name: 'Ricardo Ferreira',
    role: 'Coordenador de Parcerias',
    description: 'Estabelece e mantém relações com parceiros e patrocinadores, garantindo o apoio necessário ao evento.',
    contact: 'ricardo@madjamfest.pt',
    avatar: 'https://i.pravatar.cc/300?u=member5'
  }
];

let currentTeamMember = 0;
const totalMembers = teamMembers.length;
let autoPlayTimer;
let resumeTimer;
let teamCards = [];

// Video player controls
function initVideoPlayer() {
  const video = document.getElementById('madVideo');
  const playBtn = document.getElementById('playBtn');
  
  if (!video || !playBtn) return;
  
  // Play/Pause functionality
  playBtn.addEventListener('click', function() {
    if (video.paused) {
      video.play();
      playBtn.classList.add('hidden');
    } else {
      video.pause();
      playBtn.classList.remove('hidden');
    }
  });
  
  // Show play button when video is paused
  video.addEventListener('pause', function() {
    playBtn.classList.remove('hidden');
  });
  
  // Hide play button when video is playing
  video.addEventListener('play', function() {
    playBtn.classList.add('hidden');
  });
  
  // Show play button when video ends
  video.addEventListener('ended', function() {
    playBtn.classList.remove('hidden');
  });
  
  // Click on video to play/pause
  video.addEventListener('click', function() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
}

function createTeamCards() {
  const carousel = document.querySelector('.team-carousel');
  if (!carousel) return;

  // Remove the existing team-card placeholder
  const placeholder = carousel.querySelector('.team-card');
  if (placeholder) {
    placeholder.remove();
  }

  // Create container for cards
  const container = document.createElement('div');
  container.className = 'team-card-container';
  
  // Create all team cards
  teamMembers.forEach((member, index) => {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.innerHTML = `
      <img src="${member.avatar}" alt="${member.name}" class="team-photo">
      <div class="team-info">
        <h3>Nome:</h3>
        <p class="team-name">${member.name}</p>
        <h3>Papel:</h3>
        <p>${member.role}</p>
        <h3>O que faz:</h3>
        <p>${member.description}</p>
        <h3>Contacto:</h3>
        <p><a href="mailto:${member.contact}">${member.contact}</a></p>
      </div>
    `;
    
    // Add click listener
    card.addEventListener('click', () => {
      if (card.classList.contains('prev')) previousSlide();
      if (card.classList.contains('next')) nextSlide();
    });
    
    container.appendChild(card);
  });

  // Insert container between the buttons
  const nextButton = carousel.querySelector('.carousel-btn.next');
  carousel.insertBefore(container, nextButton);

  // Store reference to cards
  teamCards = container.querySelectorAll('.team-card');
}

function updateTeamCarousel() {
  if (teamCards.length === 0) return;

  // Remove all classes
  teamCards.forEach(card => {
    card.classList.remove('active', 'prev', 'next');
  });

  // Calculate indices
  const prevIndex = (currentTeamMember - 1 + totalMembers) % totalMembers;
  const nextIndex = (currentTeamMember + 1) % totalMembers;

  // Set classes
  teamCards[currentTeamMember].classList.add('active');
  teamCards[prevIndex].classList.add('prev');
  teamCards[nextIndex].classList.add('next');
}

function nextSlide(isAuto = false) {
  currentTeamMember = (currentTeamMember + 1) % totalMembers;
  updateTeamCarousel();
  if (!isAuto) handleManualInteraction();
}

function previousSlide() {
  currentTeamMember = (currentTeamMember - 1 + totalMembers) % totalMembers;
  updateTeamCarousel();
  handleManualInteraction();
}

function handleManualInteraction() {
  clearInterval(autoPlayTimer);
  clearTimeout(resumeTimer);

  resumeTimer = setTimeout(() => {
    startAutoPlay();
  }, 10000);
}

function startAutoPlay() {
  clearInterval(autoPlayTimer);
  autoPlayTimer = setInterval(() => {
    nextSlide(true);
  }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initVideoPlayer();
  createTeamCards();
  updateTeamCarousel();
  startAutoPlay();
});
