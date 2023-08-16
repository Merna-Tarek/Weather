var currentLocation;

// putting GeoLocation API in A Promise
function getPosition() {
return new Promise(function (position) {
    navigator.geolocation.getCurrentPosition(position);
});
}
// converting the Geolocation API to use Async
async function getPositionRetrived() {
const position = await getPosition();
currentLocation = position.coords.latitude + "," + position.coords.longitude;
}

// Fetching Parsing and Storing the response from weather API
async function getWeatherForecast(currentLocation) {
console.log(currentLocation);
let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b53d2d6fd7cb48998be133754231508&q=${currentLocation}&days=3`);
if (response.ok && 400 != response.status) {
    weatherInfo = await response.json();
    displayCurrent();
    displayForcast1();
    displayForcast2();
}
}


function getWeekday(i) {
const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const date = new Date(weatherInfo.forecast.forecastday[i].date);
let Day = days[date.getUTCDay()];
return Day;
}

function getmonth(i) {
const months = [
    "January",
    "Februery",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const date = new Date(weatherInfo.forecast.forecastday[i].date);
let month = months[date.getUTCMonth()];
return month;
}

// function to get the day of date
function getDate(i) {
const date = new Date(weatherInfo.forecast.forecastday[i].date);
let dayDate = date.getUTCDate();
return dayDate;
}

// Display function for the current weather conditions
function displayCurrent() {
var locationSearch = document.querySelector("#locationSearch");
var day = document.querySelector("#day");
var date = document.querySelector("#date");
var loc = document.querySelector("#location");
var currentIcon = document.querySelector("#currentIcon");
var currentTemp = document.querySelector("#currentTemp");
var currentWeatherCondition = document.querySelector("#currentWeatherCondition");
var rainChance = document.querySelector("#rainChance");
var windSpeed = document.querySelector("#windSpeed");
var windDir = document.querySelector("#windDir");

var e = new Date(weatherInfo.current.last_updated);
let i = 0;
day.innerHTML = getWeekday(i);
date.innerHTML = getDate(i) + " " + getmonth(i);
loc.innerHTML = weatherInfo.location.name;
currentTemp.innerHTML = weatherInfo.current.temp_c + "<sup>o</sup>" + "C";
currentIcon.setAttribute("src","https:" + `${weatherInfo.current.condition.icon}`);
currentWeatherCondition.innerHTML = weatherInfo.current.condition.text;
rainChance.innerHTML =weatherInfo.forecast.forecastday[i].day.daily_chance_of_rain + "%";
windSpeed.innerHTML = weatherInfo.current.wind_kph + " km/h";
windDir.innerHTML = weatherInfo.current.wind_dir;
}

// Display function for the forcasted weather conditions of the first day
function displayForcast1() {
var day1 = document.querySelector("#day1");
var forcastedWeatherCond1 = document.querySelector("#forcastedWeatherCond1");
var forcastedMaxTemp1 = document.querySelector("#forcastedMaxTemp1");
var forcastedMinTemp1 = document.querySelector("#forcastedMinTemp1");
var forcastedWeatherCondText1 = document.querySelector("#forcastedWeatherCondText1");
let forcast = weatherInfo.forecast.forecastday;

let i = 1;
day1.innerHTML = getWeekday(i);
forcastedWeatherCond1.setAttribute("src","https:" + `${forcast[i].day.condition.icon}`);
forcastedMaxTemp1.innerHTML = forcast[i].day.maxtemp_c + "<sup>o</sup>" + "C";
forcastedMinTemp1.innerHTML = forcast[i].day.mintemp_c + "<sup>o</sup>";
forcastedWeatherCondText1.innerHTML = forcast[i].day.condition.text;
}

// Display function for the forcasted weather conditions of the Second day
function displayForcast2() {
var day2 = document.querySelector("#day2");
var forcastedWeatherCond2 = document.querySelector("#forcastedWeatherCond2");
var forcastedMaxTemp2 = document.querySelector("#forcastedMaxTemp2");
var forcastedMinTemp2 = document.querySelector("#forcastedMinTemp2");
var forcastedWeatherCondText2 = document.querySelector("#forcastedWeatherCondText2");
let forcast = weatherInfo.forecast.forecastday;

let i = 2;
day2.innerHTML = getWeekday(i);
forcastedWeatherCond2.setAttribute("src","https:" + `${forcast[i].day.condition.icon}`);
forcastedMaxTemp2.innerHTML = forcast[i].day.maxtemp_c + "<sup>o</sup>" + "C";
forcastedMinTemp2.innerHTML = forcast[i].day.mintemp_c + "<sup>o</sup>";
forcastedWeatherCondText2.innerHTML = forcast[i].day.condition.text;
}

// Async self-invoked fuction to get and display the data in the shown order
(async function geolocation() {
await getPositionRetrived();
await getWeatherForecast(currentLocation);
})();

// Event listener for the search input to get and display the data in the shown order
locationSearch.addEventListener("input", async function () {
await getWeatherForecast(locationSearch.value);
});

