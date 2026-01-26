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

let currentSlide = 0;

function updateCarousel() {
  const member = teamMembers[currentSlide];
  const teamCard = document.querySelector('.team-card');
  
  if (teamCard) {
    teamCard.innerHTML = `
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
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % teamMembers.length;
  updateCarousel();
}

function previousSlide() {
  currentSlide = (currentSlide - 1 + teamMembers.length) % teamMembers.length;
  updateCarousel();
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', function() {
  updateCarousel();
});
