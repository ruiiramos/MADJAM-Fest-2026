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
document.getElementById("edition-group-photo").src = edition.groupPhoto

// PROJECTS
const container = document.getElementById("projects-container")

edition.projects.forEach((project, index) => {
  const card = document.createElement("div")
  card.className = "project-card"

  card.innerHTML = `
    <div class="project-image">
      <img src="${project.image}" alt="${project.name}">
    </div>

    <div class="project-info">
      <h3>${index + 1}º – ${project.name}</h3>
      <p>${project.description}</p>
      <span>Feito por ${project.team}</span>
      ${project.link ? `<a href="${project.link}" target="_blank">DOWNLOAD / LINK</a>` : ""}
    </div>
  `

  container.appendChild(card)
})