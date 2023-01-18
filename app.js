const APIkey = "dfd0c7f39b9f657980e8a100580bb12c"
let city = "Saint Paul"
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;

fetch(queryURL).then((data)=>{
    return data.json();
}).then((newData)=> {
    console.log(newData);
})


// https://api.openweathermap.org/data/2.5/weather?q=peshawar&appid=dfd0c7f39b9f657980e8a100580bb12c