const cityList = document.getElementById('city-list')
const input = document.getElementById('input')
const searchBtn = document.getElementById('search-button')
const APIkey = "dfd0c7f39b9f657980e8a100580bb12c"
const currentDate = document.getElementById('current-date')
const city = document.getElementById('current-city')
const date = document.getElementById('current-date')
const temp = document.getElementById('current-temp')
const wind = document.getElementById('current-wind')
const humidity = document.getElementById('current-humidity')
const weatherBlockTemp = document.querySelectorAll('#weather-block-temp')
const weatherBlockWind = document.querySelectorAll('#weather-block-wind')
const weatherBlockDate = document.querySelectorAll('#weather-block-date')
const weatherBlockHum = document.querySelectorAll('#weather-block-humidity')
// https://api.openweathermap.org/data/2.5/weather?q=peshawar&appid=dfd0c7f39b9f657980e8a100580bb12c


function clearText() {
    input.value = "";
}

searchBtn.addEventListener('click', function (e) {
    e.preventDefault()
    let text = input.value
    let li = document.createElement('li')
    li.textContent = text
    cityList.appendChild(li)
    checkValidAPI()
    clearText()
})

function checkValidAPI() {
    let city = input.value
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
    fetch(queryURL)
        .then(function (response) {
            if (response.status === 404) {
                alert("not a city, please try again ");
                //responseText.textContent = response.status
            }
        })
    requestData(queryURL);
}

function requestData(queryURL) {
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            getWeatherData(data.coord.lon, data.coord.lat)
        });
}

function getWeatherData(lon, lat) {
    let apiCall = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey
    fetch(apiCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("new data");
            console.log(data);
            displayFiveDayCast(data)
            todayDisplay(data.city.name, data.list[0].dt_txt.slice(0, 11), data.list[0].main.temp, data.list[0].wind.speed, data.list[0].main.humidity)
        })
}

function displayFiveDayCast(data) {
        weatherBlockDate[0].textContent = data.list[0].dt_txt.slice(0, 11)
        weatherBlockDate[1].textContent = data.list[8].dt_txt.slice(0, 11)
        weatherBlockDate[2].textContent = data.list[16].dt_txt.slice(0, 11)
        weatherBlockDate[3].textContent = data.list[24].dt_txt.slice(0, 11)
        weatherBlockDate[4].textContent = data.list[32].dt_txt.slice(0, 11)

        weatherBlockTemp[0].textContent = data.list[0].main.temp + "°"
        weatherBlockTemp[1].textContent = data.list[8].main.temp + "°"
        weatherBlockTemp[2].textContent = data.list[16].main.temp + "°"
        weatherBlockTemp[3].textContent = data.list[24].main.temp + "°"
        weatherBlockTemp[4].textContent = data.list[32].main.temp + "°"

        weatherBlockWind[0].textContent = data.list[0].wind.speed + " MPH"
        weatherBlockWind[1].textContent = data.list[8].wind.speed + " MPH"
        weatherBlockWind[2].textContent = data.list[16].wind.speed + " MPH"
        weatherBlockWind[3].textContent = data.list[24].wind.speed + " MPH"
        weatherBlockWind[4].textContent = data.list[32].wind.speed + " MPH"

        weatherBlockHum[0].textContent = data.list[0].main.humidity + " %"
        weatherBlockHum[1].textContent = data.list[8].main.humidity + " %"
        weatherBlockHum[2].textContent = data.list[16].main.humidity + " %"
        weatherBlockHum[3].textContent = data.list[24].main.humidity + " %"
        weatherBlockHum[4].textContent = data.list[32].main.humidity + " %"
}


// display the current weather info for the present
function todayDisplay(name, curDate, curTemp, curWind, curHumidity) {
    city.textContent = name
    date.textContent = curDate
    temp.textContent = curTemp + "°"
    wind.textContent = curWind + " MPH"
    humidity.textContent = curHumidity + " %"
}
