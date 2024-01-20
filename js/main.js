

// ed4b642ead774b47959193702241801

// http://api.weatherapi.com/v1

// /forecast.json

// /search.json


// current day 

let searchInput = document.querySelector('#searchInput');
let todayName = document.querySelector('#todayName');
let todayDate = document.querySelector('#todayDate');
let todayMonth = document.querySelector('#todayMonth');
let currentCity = document.querySelector('#currentCity');
let currentTemp = document.querySelector('#currentTemp');
let currentIcon = document.querySelector('#currentIcon');
let currentStatus = document.querySelector('#currentStatus');
let humidity = document.querySelector('#humidity');
let wind = document.querySelector('#wind');
let direction = document.querySelector('#direction');

// next days

let nextDayName = document.querySelectorAll('.nextDayName');
let nextDayIcon = document.querySelectorAll('.nextDayIcon');
let nextDayMaxTemp = document.querySelectorAll('.nextDayMaxTemp');
let nextDayMinTemp = document.querySelectorAll('.nextDayMinTemp');
let nextDayStatus = document.querySelectorAll('.nextDayStatus');




async function getApi(city) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ed4b642ead774b47959193702241801&q=${city}&days=3&aqi=no&alerts=no`)
    let result = await (response.json())
    // console.log(result);
    return result;


}

function getCurrentWeather(result) {

    let currentDate = new Date()
    todayName.innerHTML = currentDate.toLocaleDateString('en-US' , {weekday: 'long'})
    todayDate.innerHTML = currentDate.getDate()
    todayMonth.innerHTML = currentDate.toLocaleDateString('en-US' , {month: 'long'})
    currentCity.innerHTML = result.location.name;
    currentTemp.innerHTML = result.current.temp_c;
    currentIcon.setAttribute('src', result.current.condition.icon);
    currentIcon.setAttribute('alt', 'weather icon');
    currentStatus.innerHTML = result.current.condition.text;
    humidity.innerHTML = result.current.humidity + '%';
    wind.innerHTML = result.current.wind_kph + ' km/h';
    direction.innerHTML = result.current.wind_dir;


}


function getNextDays(result) {

    for (let i = 0; i < 2; i++) {

        let nextDayDate = new Date (result.forecast.forecastday[i+1].date)
        nextDayName[i].innerHTML = nextDayDate.toLocaleDateString('en-US' , {weekday: 'long'})
        nextDayIcon[i].setAttribute('src', result.forecast.forecastday[i + 1].day.condition.icon);
        nextDayIcon[i].setAttribute('alt', 'weather icon ');
        nextDayMaxTemp[i].innerHTML = result.forecast.forecastday[i + 1].day.maxtemp_c;
        nextDayMinTemp[i].innerHTML = result.forecast.forecastday[i + 1].day.mintemp_c;
        nextDayStatus[i].innerHTML = result.forecast.forecastday[i + 1].day.condition.text;

    }

}



searchInput.addEventListener( 'keyup' , function (){

let city = searchInput.value;

getStarted(city);


} )


async function getStarted(city = 'cairo') {

    let result = await getApi(city);

    if( !result.error ){

    getCurrentWeather(result);
    getNextDays(result);

    }
}

getStarted();
