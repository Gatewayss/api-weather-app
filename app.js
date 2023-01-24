const cityList = document.getElementById('city-list')
const input = document.getElementById('input')
const searchBtn = document.getElementById('search-button')
const APIkey = "dfd0c7f39b9f657980e8a100580bb12c"
const curCity = document.getElementById('current-city')
const curDate = document.getElementById('current-date')
const curTemp = document.getElementById('current-temp')
const curWind = document.getElementById('current-wind')
const curHumidity = document.getElementById('current-humidity')
const curIcon = document.getElementById('current-icon')
const weatherBlockTemp = document.querySelectorAll('.weather-block-temp')
const weatherBlockWind = document.querySelectorAll('.weather-block-wind')
const weatherBlockDate = document.querySelectorAll('.weather-block-date')
const weatherBlockHum = document.querySelectorAll('.weather-block-humidity')
const weatherBlockIcon = document.querySelectorAll('.icon')

// search for city by name 
searchBtn.addEventListener('click', function (e) {
    e.preventDefault()
    let text = input.value
    const li = document.createElement('li')
    li.textContent = text
    cityList.appendChild(li)
    checkValidAPI()
    clearText()
})

// clear text input after entering a city
function clearText() {
    input.value = "";
}

// check if api request is valid and alert user if not 
function checkValidAPI() {
    let city = input.value
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
    fetch(queryURL)
        .then(function (response) {
            if (response.status === 404) {
                alert("not a city, please try again ");
            }
        })
    // if valid the data will be requested 
    requestData(queryURL);
}

// returns the longitude and latitude of the city for the to make the second api call
function requestData(queryURL) {
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            getWeatherData(data.coord.lon, data.coord.lat)
        });
}

// requests the data for a 5 day, every 3 hour weather forecast for the city 
function getWeatherData(lon, lat) {
    let apiCall = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey
    fetch(apiCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // returns data to be displayed if the five day cast section 
            displayFiveDayCast(data)
            // returns the current forecast for the current weather section 
            todayDisplay(data.city.name, data.list[0].dt_txt.slice(0, 11), data.list[0].main.temp, data.list[0].wind.speed, data.list[0].main.humidity, data.list[0].weather[0].icon)
            console.log(data);
        })
}

// returns the data for the weather at 12am each day for the 5 day forecast section 
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

    let iconOne = data.list[0].weather[0].icon;
    let iconTwo = data.list[8].weather[0].icon;
    let iconThree = data.list[16].weather[0].icon;
    let iconFour = data.list[24].weather[0].icon;
    let iconFive = data.list[32].weather[0].icon;
    let iconURL = "https://openweathermap.org/img/w/" + iconOne + ".png"
    let iconURL2 = "https://openweathermap.org/img/w/" + iconTwo + ".png"
    let iconURL3 = "https://openweathermap.org/img/w/" + iconThree + ".png"
    let iconURL4 = "https://openweathermap.org/img/w/" + iconFour + ".png"
    let iconURL5 = "https://openweathermap.org/img/w/" + iconFive + ".png"
    
    weatherBlockIcon[0].src = iconURL
    weatherBlockIcon[1].src = iconURL2
    weatherBlockIcon[2].src = iconURL3
    weatherBlockIcon[3].src = iconURL4
    weatherBlockIcon[4].src = iconURL5
}


// display the current weather info for the present day 
function todayDisplay(name, todayDate, todayTemp, todayWind, todayHumidity, todayIcon) {
    let iconURL = "https://openweathermap.org/img/w/" + todayIcon + ".png"
    curIcon.src = iconURL
    curCity.textContent = name
    curDate.textContent = todayDate
    curTemp.textContent = todayTemp + "°"
    curWind.textContent = todayWind + " MPH"
    curHumidity.textContent = todayHumidity + " %"
}

