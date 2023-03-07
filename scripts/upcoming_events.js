const upcomingEventsCardsContainer = document.getElementById('upcoming_events_cards');
let cards = '';

console.log(data.currentDate);

const today = new Date(data.currentDate);

for (const event of data.events) {
    if(new Date(event.date) > today){
        cards +=   `<div class="col">
                        <div class="card h-100">
                            <img src='${event.image}' class="card-img-top" alt="Museum Tour">
                            <div class="card-body d-flex flex-column justify-content-between">
                                <div class="card-text" id="card-text">
                                    <h5 class="card-title">${event.name}</h5>
                                    <p class="card-description">${event.description}</p>  
                                </div>
                                <div class="card-interaction d-flex justify-content-between align-items-center">
                                    <span>Price $${event.price}</span>
                                    <a href="./details.html">View more</a>
                                </div>
                            </div>
                        </div>
                    </div>`
    }
}

console.log(cards);
upcomingEventsCardsContainer.innerHTML = cards;