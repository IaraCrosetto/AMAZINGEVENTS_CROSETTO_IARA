const queryParams = new URLSearchParams(window.location.search);
const eventId = queryParams.get("id");

getEvent(eventId);

async function getEvent(eventId) {
    await fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(data => {
            let myEvent = data.events.find(e => e._id == eventId);
            populateData(myEvent);
        });
}

function populateData(myEvent){
    const div = document.querySelector("#details_cards")
    div.innerHTML = `<div class="card mb-3" style="max-width: 790px;">
                        <div class="row g-0">
                            <div class="details_card_img col-md-6">
                                <img src="${myEvent.image}" class="img-fluid" alt="Image">
                            </div>
                            <div class="col-md-6 my-4">
                                <div class="card-body">
                                    <h5 class="card-title">${myEvent.name}</h5>
                                    <p class="card-text"><span class="text-muted">${myEvent.date} (${myEvent.category})</span></p>
                                    <p class="card-text">${myEvent.description}</p>
                                    <p class="card-text"><small>Place: ${myEvent.place} - Price: $${myEvent.price}</small></p>
                                    <p class="card-text"><small class="text-muted">Capacity: ${myEvent.capacity} - Assistance: ${myEvent.assistance}</small></p>           
                                </div>
                            </div>
                        </div>
                    </div>
                    </br>
                    <small class="text-muted"><a href="./index.html" class="card-link-return">Return to the homepage</a></small>
                    `       
    
}

