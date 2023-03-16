const queryString = location.search;
const params = new URLSearchParams(queryString);
const _id = params.get("_id");
const eventDetailed = data.events.find(event => event._id == _id);

const div = document.querySelector("#details_cards")
div.innerHTML = `<div class="card mb-3" style="max-width: 790px;">
                    <div class="row g-0">
                        <div class="details_card_img col-md-6">
                            <img src="${eventDetailed.image}" class="img-fluid" alt="Image">
                        </div>
                        <div class="col-md-6 my-4">
                            <div class="card-body">
                                <h5 class="card-title">${eventDetailed.name}</h5>
                                <p class="card-text"><span class="text-muted">${eventDetailed.date} (${eventDetailed.category})</span></p>
                                <p class="card-text">${eventDetailed.description}</p>
                                <p class="card-text"><small>Place: ${eventDetailed.place} - Price: $${eventDetailed.price}</small></p>
                                <p class="card-text"><small class="text-muted">Capacity: ${eventDetailed.capacity} - Assistance: ${eventDetailed.assistance}</small></p>           
                            </div>
                        </div>
                    </div>
                </div>
                </br>
                <small class="text-muted"><a href="./index.html" class="card-link">Return to the homepage</a></small>
                `       
