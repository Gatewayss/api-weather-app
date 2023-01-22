const cityList = document.getElementById('city-list')
const input = document.getElementById('input')
const searchBtn = document.getElementById('search-button')
const APIkey = "dfd0c7f39b9f657980e8a100580bb12c"
const currentDate = document.getElementById('current-date')
console.log(currentDate);
const city = document.getElementById('current-city')
const date = document.getElementById('current-date')
const temp = document.getElementById('current-temp')
const wind = document.getElementById('current-wind')
const humidity = document.getElementById('current-humidity')

const weatherBlockDate = document.querySelectorAll('#weather-block-date')
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
            //console.log(data.list[0].dt_txt);
            //console.log(data.list[0].main);
        })
}

function displayFiveDayCast(data) {
    console.log("hi");

    for (let i = 0; i < 5; i++) {
        var startDt = dayjs().add([i], 'day').startOf('day').toString();
        
        var endDt = dayjs().add([i], 'day').subtract(12, 'hour').endOf('day');
        
        weatherBlockDate[i].textContent = startDt.slice(0,12)  
        
        
        }
    }





// display the current weather info for the present
function todayDisplay(name, curDate, curTemp, curWind, curHumidity) {
    city.textContent = name
    date.textContent = curDate
    temp.textContent = curTemp
    wind.textContent = curWind + " MPH"
    humidity.textContent = curHumidity + " %"
}
