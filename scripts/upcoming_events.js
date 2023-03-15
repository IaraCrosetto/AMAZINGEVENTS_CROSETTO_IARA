//Constants
const upcomingEventsCardsContainer = document.getElementById('upcoming_events_cards');
const checkboxesContainer = document.getElementById('checkboxes_container')
const input = document.getElementById('search_input');

//Actions from functions
generateCheckboxes(data.events);
generateUpcomingEventsCardsHTML(data.events, data.currentDate);


//Listening events (When)
input.addEventListener('input', finalFilter);
checkboxesContainer.addEventListener('change', finalFilter);

//SupeFilter
function finalFilter() {  
    let filteringText = textFilter(data.events, input.value);
    let filteringCheckboxes = checkboxFilter(filteringText);
    generateUpcomingEventsCardsHTML(filteringCheckboxes, data.currentDate);
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

//Card generator
function generateUpcomingEventsCardsHTML(events, currentDate) {
    if (events.length == 0) {
        upcomingEventsCardsContainer.innerHTML = `<p class="text-center">The event was not found.</p>`
        return
    }
    let cards = '';
    const today = new Date(currentDate);
    for (const event of events) {
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
                                        <a href="./details.html" class="text-center">View more</a>
                                    </div>
                                </div>
                            </div>
                        </div>`
        }
    }
    upcomingEventsCardsContainer.innerHTML = cards;
}

//Fiters
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