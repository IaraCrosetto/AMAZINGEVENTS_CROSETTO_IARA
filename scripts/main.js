//Constants
const homeCardsContainer = document.getElementById('home_cards');
const checkboxesContainer = document.getElementById('checkboxes_container')
const input = document.getElementById('search_input');
var eventList = [];

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
            generateCardsHTML(eventList);
            generateCheckboxes(eventList);
        })
        
}

//Cards generator
function generateCardsHTML(events) {
    if (events.length == 0) {
        homeCardsContainer.innerHTML = `<p class="text-center">The event was not found.</p>`
        return
    }
    let cards = '';
    events.forEach(event => {
        cards += `<div class="col">
                        <a href="./details.html?event=${encodeURIComponent(JSON.stringify(event))}" class="card-link text-center">
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
    });
    homeCardsContainer.innerHTML = cards;
}

//Checkbox generator
function generateCheckboxes(events) {
    let arrayCategories = events.map(event => event.category);
    // Set es un método que presenta una colección que no permite elementos repetidos
    // Luego a Set lo convierto en Array
    //let setCategories = new Set(arrayCategories);
    //let arrayCheckboxes = Array.from(setCategories);
    let arrayCheckboxes = Array.from(new Set(arrayCategories));

    let checkboxes = '';
    arrayCheckboxes.forEach(category => {
        checkboxes +=`<label>
                        <input type="checkbox" name="category2" value="${category}">
                        ${category}
                      </label>`  
    })
    checkboxesContainer.innerHTML = checkboxes;
}

//SuperFilter
function finalFilter() {  
    /*let filteringText = textFilter(data.events, input.value);
    let filteringCheckboxes = checkboxFilter(filteringText);
    generateCardsHTML(filteringCheckboxes);*/
    generateCardsHTML(checkboxFilter(textFilter(eventList, input.value)));
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
