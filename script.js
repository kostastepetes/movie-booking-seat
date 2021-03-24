const container = document.querySelector(".container");

const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const selectedMovie = document.getElementById("chosenMovie");
const select = document.getElementById("movie");

var movie = select.value;
var price = select.options[select.selectedIndex].getAttribute("price");
var selectedSeatsCount = 0;

function updateCount() {
  const selected = document.querySelectorAll(".row .seat.selected");
  selectedSeatsCount = selected.length;

  const seatsIndex = [...selected].map(function (seat) {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  count.innerText = selectedSeatsCount;
  updatePrice(price, selectedSeatsCount);
}

function updatePrice(price, amount) {
  const totale = amount * price;
  total.innerText = totale;
  if (amount != 0) {
    localStorage.setItem("totale", totale);
  }
}

function popolaUI() {
  const selectdSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  console.log(selectdSeats);
  if (selectdSeats != null && selectdSeats.length > 0) {
    count.innerText = selectdSeats.length;
    seats.forEach((seat, index) => {
      if (selectdSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const movieTotal = localStorage.getItem("totale");
  if (movieTotal != null && movieTotal != 0) {
    total.innerText = movieTotal;
  }
  const movieChoice = localStorage.getItem("chosenMovie");
  if (movieChoice != null) {
    selectedMovie.innerText =
      movieChoice.charAt(0).toUpperCase() + movieChoice.slice(1);
    select.value = movieChoice;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  movie = select.value;
  price = select.options[select.selectedIndex].getAttribute("price");
  selectedMovie.innerText = movie.charAt(0).toUpperCase() + movie.slice(1);
  updatePrice(price, 0);
  populateUI();
});
select.addEventListener("change", function () {
  price = parseInt(this.options[this.selectedIndex].getAttribute("price"));
  movie = this.options[this.selectedIndex].value;
  selectedMovie.innerText = movie.charAt(0).toUpperCase() + movie.slice(1);
  localStorage.setItem("chosenMovie", movie);
  updatePrice(price, selectedSeatsCount);
});

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateCount();
  }
});
