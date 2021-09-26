const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.Booked)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();
let ticketPrice = +movieSelect.value;

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//update total and count
function updateSelectedcount () {
    const SelectedSeats = document.querySelectorAll('.row .seat.Selected');

    const seatsIndex = [...SelectedSeats].map(function(seat) {
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('SelectedSeats', JSON.stringify(seatsIndex))

    const SelectedSeatscount = SelectedSeats.length;

    count.innerText = SelectedSeatscount;
    total.innerText = SelectedSeatscount * ticketPrice;
} 

// Get data from localstorage and populate the UI
function populateUI() {
    const SelectedSeats = JSON.parse(localStorage.getItem('SelectedSeats'));

    if(SelectedSeats !== null && SelectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(SelectedSeats.indexOf(index) > -1) {
                seat.classList.add('Selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex != null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//Movie Select Event
movieSelect.addEventListener('change', e=> {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value); 
    updateSelectedcount();        
}) 

container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('Booked')) {
        e.target.classList.toggle('Selected');
    }

    updateSelectedcount(); 
});

updateSelectedcount();
