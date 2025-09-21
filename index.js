const filmsList = document.getElementById("films");
const poster = document.getElementById("poster");
const title = document.getElementById("title");
const runtime = document.getElementById("runtime");
const showtime = document.getElementById("showtime");
const availableTickets = document.getElementById("available-tickets");
const buyButton = document.getElementById("buy-ticket");

let currentFilm = null;

fetch("http://localhost:3000/films")
  .then((res) => res.json())
  .then((films) => {
    films.forEach(renderFilmItem);
    showFilmDetails(films[0]); // show first movie
  });

function renderFilmItem(film) {
  const li = document.createElement("li");
  li.className = "film item";
  li.textContent = film.title;

  if (film.capacity - film.tickets_sold === 0) {
    li.classList.add("sold-out");
  }

  li.addEventListener("click", () => {
    showFilmDetails(film);
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteFilm(film.id, li);
  });

  li.appendChild(deleteBtn);
  filmsList.appendChild(li);
}

function showFilmDetails(film) {
  currentFilm = film;

  poster.src = film.poster;
  title.textContent = film.title;
  runtime.textContent = `${film.runtime} minutes`;
  showtime.textContent = film.showtime;

  const available = film.capacity - film.tickets_sold;
  availableTickets.textContent = available;

  buyButton.textContent = available > 0 ? "Buy Ticket" : "Sold Out";
  buyButton.disabled = available === 0;

  buyButton.onclick = () => {
    if (available > 0) {
      film.tickets_sold += 1;
      updateTickets(film);
    }
  };
}

function updateTickets(film) {
  fetch(`http://localhost:3000/films/${film.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tickets_sold: film.tickets_sold }),
  })
    .then((res) => res.json())
    .then((updatedFilm) => {
      showFilmDetails(updatedFilm);
      postTicket(updatedFilm.id, 1);
    });
}

function postTicket(filmId, count) {
  fetch("http://localhost:3000/tickets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      film_id: filmId,
      number_of_tickets: count,
    }),
  });
}

function deleteFilm(filmId, liElement) {
  fetch(`http://localhost:3000/films/${filmId}`, {
    method: "DELETE",
  }).then(() => {
    liElement.remove();
  });
}
