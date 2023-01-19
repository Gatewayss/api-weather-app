const cityList = document.getElementById('city-list')
const input = document.getElementById('input')
const searchBtn = document.getElementById('search-button')
const APIkey = "dfd0c7f39b9f657980e8a100580bb12c"

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
            //return data 
            displayFiveDayCast(data.list)
            //console.log(data.list[0].main);
    })
}

function displayFiveDayCast(data) {
    console.log("hi");
    for(let i = 0; i < data.length; i++) {
        console.log(data[i].main)
        console.log(data[i].dt_txt)
    } 
}

