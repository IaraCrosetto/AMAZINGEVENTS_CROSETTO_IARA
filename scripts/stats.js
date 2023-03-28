var eventList = [];
const eventsStatistics = document.getElementById('events-statistics')
const upcomingEventsStatisticsByCategory = document.getElementById('upcoming-events-statistics-by-category')
const pastEventsStastisticsByCategory = document.getElementById('past-events-statistics-by-category')

getEvents();

async function getEvents(){
    await fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(data => {
            eventList = data.events;
            //functions
            organizeForAssistance(eventList);
            const pastEventsInOrder = organizeForAssistance(eventList).pastEventsInOrder;
            const upcomingEventsInOrder = organizeForAssistance(eventList).upcomingEventsInOrder;

            printEventsStatistics(upcomingEventsInOrder);
            printEventsStatistics(pastEventsInOrder);
            upcomingEventsStatisticsByCategory.innerHTML = printEventsStatisticsByCategory(getCategorizedEvents(upcomingEventsInOrder));
            pastEventsStastisticsByCategory.innerHTML = printEventsStatisticsByCategory(getCategorizedEvents(pastEventsInOrder));
        })
}

// Events for percentage of attendance
function organizeForAssistance(events) {
    const pastEventsInOrder = events.filter(event => 'assistance' in event).sort((a, b) => (a.assistance/a.capacity)*100 - (b.assistance/b.capacity)*100);
    const upcomingEventsInOrder = events.filter(event => !('assistance' in event)).sort((a, b) => (a.estimate/a.capacity)*100 - (b.estimate/b.capacity)*100);

    return {pastEventsInOrder, upcomingEventsInOrder};
}

// Categorized events
function getCategorizedEvents(events){
    let categorizedEvents = {};
    events.forEach(e => {
        if(!(e.category in categorizedEvents)) {
            categorizedEvents[e.category] = [];
        }
        categorizedEvents[e.category].push(e);
    })
    return categorizedEvents;
}

// Print events for events stastistics table
function printEventsStatistics(events) {
    const eventWithLargerCapacity = events.reduce((max, event) => max.capacity > event.capacity ? max : event, events[0]);
    
    let tableRow = ' ';
    tableRow += (`<tr>
                      <td>${events[events.length-1].name}</td>
                      <td>${events[0].name}</td>
                      <td>${eventWithLargerCapacity.name}</td>
                </tr>`)
    eventsStatistics.innerHTML = tableRow;
}

// Print events for events stastistics by category
function printEventsStatisticsByCategory(categorizedEvents) {

    let newRow = ' ';
    Object.keys(categorizedEvents).forEach(category => {
        console.log();
        newRow += `<tr>
                        <td>${category}</td>
                        <td>$${calculateRevenues(categorizedEvents[category])}</td>
                        <td>${calculateAverageAssistancePercentage(categorizedEvents[category])}%</td>
                    </tr>`;
    });

    return newRow;
}

function calculateAverageAssistancePercentage(events) {
    let sumOfCapacity = 0;
    let sumOfAssistance = 0;

    events.forEach(event => {
        sumOfCapacity += event.capacity; 
        sumOfAssistance += event.assistance || event.estimate; 
    });

    return ((sumOfAssistance / sumOfCapacity) * 100).toFixed(2);
}

function calculateRevenues(events) {
    let revenue = 0;

    events.forEach(event => {
        revenue += event.price;
    });

    return (revenue);
}