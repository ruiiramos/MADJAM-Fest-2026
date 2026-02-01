const params = new URLSearchParams(window.location.search)
const id = params.get("id")
const edition = EDITIONS[id]

if (!edition) {
  document.body.innerHTML = "<p>Edição não encontrada</p>"
  throw new Error("Invalid edition ID")
}

// HERO
document.getElementById("edition-title").innerText = edition.title
document.getElementById("edition-logo").src = edition.logo
document.getElementById("edition-description").innerHTML = edition.description

// JAM ICONS MAP
const jamIcons = {
  game: "../assets/icons/game-icon.svg",
  photo: "../assets/icons/photo-icon.svg",
  video: "../assets/icons/video-icon.svg",
  music: "../assets/icons/animation-icon.svg",
  motion: "../assets/icons/animation-icon.svg",
  animation: "../assets/icons/animation-icon.svg"
}

// PROJECTS CONTAINER
const container = document.getElementById("projects-container")

// Add group photo at the top of the container
const groupPhoto = document.getElementById("edition-group-photo")
groupPhoto.src = edition.groupPhoto
container.appendChild(groupPhoto)

// Counter for alternating layout across ALL projects
let projectCounter = 0

edition.contests.forEach((contest, contestIndex) => {
  // Create jam header
  const jamHeader = document.createElement("div")
  jamHeader.className = `jam-header ${contest.type}`
  jamHeader.innerHTML = `
    <img src="${jamIcons[contest.type]}" alt="${contest.name}">
    <h2>${contest.name}</h2>
  `
  container.appendChild(jamHeader)
  
  // Render projects
  contest.projects.forEach((project, projectIndex) => {
    projectCounter++
    
    const card = document.createElement("div")
    card.className = `project-card ${contest.type}`
    
    let mediaContent = ""
    let infoContent = ""
    let linkContent = ""
    let teamContent = ""
    
    // MEDIA (image or video)
    if (contest.type === "game") {
      mediaContent = `
        <div class="project-media" onclick="openModal('${project.image}', 'image')">
          <img src="${project.image}" alt="${project.name}">
        </div>
      `
    } else if (contest.type === "photo") {
      mediaContent = `
        <div class="project-media" onclick="openModal('${project.image}', 'image')">
          <img src="${project.image}" alt="${project.name}">
        </div>
      `
    } else {
      mediaContent = `
        <div class="project-media" onclick="openModal('${project.video}', 'video')">
          <video>
            <source src="${project.video}" type="video/mp4">
          </video>
        </div>
      `
    }
    
    // INFO (title + description)
    if (contest.type === "photo") {
      // Photo jam: include team and link in info area
      infoContent = `
        <div class="project-info">
          <h3>${projectIndex + 1}º – ${project.name}</h3>
          <p>${project.description}</p>
          <div class="photo-team-link-row">
            <div class="project-team">Feito por ${project.team}</div>
            <div class="project-link">
              ${project.link ? `<a href="${project.link}" target="_blank">VER MAIS</a>` : ""}
            </div>
          </div>
        </div>
      `
      linkContent = ""
      teamContent = ""
    } else {
      // Regular jams: standard info
      infoContent = `
        <div class="project-info">
          <h3>${projectIndex + 1}º – ${project.name}</h3>
          <p>${project.description}</p>
        </div>
      `
    }
    
    // LINK and TEAM - only for non-photo jams
    if (contest.type !== "photo") {
      const linkText = contest.type === "game" ? "DOWNLOAD / LINK" : "VER LINK"
      linkContent = `
        <div class="project-link">
          ${project.link ? `<a href="${project.link}" target="_blank">${linkText}</a>` : ""}
        </div>
      `
      
      teamContent = `
        <div class="project-team">
          Feito por ${project.team}
        </div>
      `
    }
    
    // Assemble card
    card.innerHTML = mediaContent + infoContent + linkContent + teamContent
    
    // Add photo gallery if photo jam
    if (contest.type === "photo" && project.additionalPhotos) {
      const gallery = document.createElement("div")
      gallery.className = "photo-gallery"
      gallery.innerHTML = project.additionalPhotos.map(photo => 
        `<img src="${photo}" alt="Foto adicional" onclick="openModal('${photo}', 'image')">`
      ).join('')
      card.appendChild(gallery)
    }
    
    container.appendChild(card)
  })
})

// Create modal
const modal = document.createElement("div")
modal.className = "modal"
modal.id = "mediaModal"
modal.innerHTML = `
  <button class="modal-close" onclick="closeModal()">&times;</button>
  <div class="modal-content" id="modalContent"></div>
`
document.body.appendChild(modal)

// Modal functions
function openModal(src, type) {
  const modal = document.getElementById("mediaModal")
  const content = document.getElementById("modalContent")
  
  if (type === "image") {
    content.innerHTML = `<img src="${src}" alt="Visualização">`
  } else {
    content.innerHTML = `
      <video controls autoplay>
        <source src="${src}" type="video/mp4">
      </video>
    `
  }
  
  modal.classList.add("active")
}

function closeModal() {
  const modal = document.getElementById("mediaModal")
  const content = document.getElementById("modalContent")
  
  // Stop video if playing
  const video = content.querySelector("video")
  if (video) {
    video.pause()
  }
  
  modal.classList.remove("active")
  content.innerHTML = ""
}

// Close modal on click outside
document.addEventListener("click", function(event) {
  const modal = document.getElementById("mediaModal")
  if (event.target === modal) {
    closeModal()
  }
})

// Close modal on ESC key
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeModal()
  }
})
