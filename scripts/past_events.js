//Constants
const pastEventsCardsContainer = document.getElementById('past_events_cards');
const checkboxesContainer = document.getElementById('checkboxes_container')
const input = document.getElementById('search_input');
var eventList = [];
var currentDate;

//Listening events (When)
input.addEventListener('input', finalFilter);
checkboxesContainer.addEventListener('change', finalFilter);

//Calls
getEvents();

//WORKING WITH API: I now know what I'm doing c:
async function getEvents(){
    await fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(data => {
            eventList = data.events;
            currentDate = data.currentDate;
            generatePastEventsCardsHTML(eventList, currentDate);
            generateCheckboxes(eventList);
        })
}

//Card generator
function generatePastEventsCardsHTML(events, currentDate) {
    if (events.length == 0) {
        pastEventsCardsContainer.innerHTML = `<p class="text-center">The event was not found.</p>`
        return
    }
    let cards = '';
    const today = new Date(currentDate);
    for (const event of events) {
        if(new Date(event.date) < today){
            cards +=   `<div class="col">
                            <a href="./details.html?id=${event._id}" class="card-link text-center">
                                <div class="card h-100 card-hover">
                                    <img src='${event.image}' class="card-img-top" alt="Museum Tour">
                                    <div class="card-body d-flex flex-column justify-content-between">
                                        <div class="card-text" id="card-text">
                                            <h5 class="card-title">${event.name}</h5>
                                            <p class="card-description">${event.description}</p>  
                                        </div>
                                        <div class="card-interaction d-flex justify-content-between align-items-center px-3">
                                            <p>Price: $${event.price}</p>
                                            <p><small class="text-muted">${event.date}</small></p>
                                        </div>
                                    </div>  
                                </div>
                            </a>
                        </div>`
        }
    }
    pastEventsCardsContainer.innerHTML = cards;
}

//Checkbox generator
function generateCheckboxes(events) {
    let arrayCategories = events.map(event => event.category);
    // Set es un método que presenta una colección que no permite elementos repetidos
    // Luego a Set lo convierto en Array
    let setCategories = new Set(arrayCategories);
    let arrayCheckboxes = Array.from(setCategories);
    let checkboxes = '';
    arrayCheckboxes.forEach(category => {
        checkboxes +=`<label>
                        <input type="checkbox" name="category2" value="${category}">
                        ${category}
                      </label>`  
    })
    checkboxesContainer.innerHTML = checkboxes;
}

//SupeFilter
function finalFilter() {  
    let filteringText = textFilter(eventList, input.value);
    let filteringCheckboxes = checkboxFilter(filteringText);
    generatePastEventsCardsHTML(filteringCheckboxes, currentDate);
} 

//Filters
function textFilter(events, text) {
    let arrayFilteredText = events.filter(event => event.name.toLowerCase().includes(text.toLowerCase()));
    return arrayFilteredText;
}
function checkboxFilter(events) {
    let checkboxesFiltered = document.querySelectorAll("input[type = 'checkbox']");
    console.log((checkboxesFiltered));
    let arrayCheckboxes = Array.from(checkboxesFiltered);
    let arrayCheckboxesChecked = arrayCheckboxes.filter(checkbox => checkbox.checked);
    let arrayCheckboxesCheckedValues = arrayCheckboxesChecked.map(checkboxChecked => checkboxChecked.value);
    let arrayFiltered = events.filter(event => arrayCheckboxesCheckedValues.includes(event.category));
    if (arrayCheckboxesChecked.length > 0) {
        return arrayFiltered;
    }
    return events;
}