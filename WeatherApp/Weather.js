
const searchButton = document.querySelector(".search-button");
const clearButton = document.querySelector(".reset-button")
searchButton.addEventListener(`click` , getWeahter)
clearButton.addEventListener(`click` , clearForm)

async function getWeahter() {
    try {
        const searchCountry = document.getElementById(`search-country`).value;
        if(searchCountry == "") {
            alert("Please Write Country name  :]")
            return;
        }
        console.log(searchCountry);
        let metricUnit = "&units=metric&APPID=9dba2f786ddaedb47db2965eb6642af7"
        let imperialUnit = "&units=imperial&APPID=9dba2f786ddaedb47db2965eb6642af7"
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+ searchCountry + `${metricUnit}`
        , { mode: "cors"});
        const currentData = await response.json();
        console.log("Fetching current weather data from API....", currentData);

        const currentWeather = {
        mainWeather: currentData.weather[0].main,
        place: currentData.name + "," +  currentData.sys.country,
        temp: Math.round(currentData.main.temp),
        humidity:currentData.main.humidity + "%",
        wind: Math.round(currentData.wind.speed)
        };
        console.log(currentWeather);
        weatherInfo(currentWeather);
        backgroundInfo(currentWeather)
    }
        catch(err) {
            console.log("Something has went wrong with fetching the current weather data....", err);

        }
    }

    function weatherInfo(currentWeather) {
        const infoDiv = document.querySelector(`.display-info`)
        const anotherDiv = document.createElement(`div`)
        // let changeButton = document.getElementById(`units`)
        // anotherDiv.appendChild(changeButton)

        anotherDiv.setAttribute(`id`, `card`)
        const city = document.createElement(`p`)
        city.setAttribute(`id` , `city`)
        city.textContent ="Location:"+ " " +currentWeather.place
        anotherDiv.appendChild(city)


        const status = document.createElement(`p`)
        status.setAttribute(`id` , `status`)
        status.textContent = "Sky-Status:" + " " + currentWeather.mainWeather
        anotherDiv.appendChild(status)

        const cityTemp = document.createElement(`p`)
        cityTemp.setAttribute(`id` , `city-temp`)
        cityTemp.textContent ="Temperature:" + " " + currentWeather.temp + "°C" 
        anotherDiv.appendChild(cityTemp)

        const cityWind = document.createElement(`p`)
        cityWind.setAttribute(`id` , `city-wind`)
        cityWind.textContent ="Wind:" + " " + currentWeather.wind + `KM/h`
        anotherDiv.appendChild(cityWind)

        const cityHumidity = document.createElement(`p`)
        cityHumidity.setAttribute(`id` , `humidity`)
        cityHumidity.textContent ="Humidity:" + " "  + currentWeather.humidity
        anotherDiv.appendChild(cityHumidity)

        infoDiv.appendChild(anotherDiv)
        searchButton.style.display = `none`
    }

function clearForm() {
    let body = document.body
    let header = document.querySelector(`.header`)
    document.getElementById(`search-country`).value = ""
    document.querySelector(`.display-info`).innerHTML = ""
    body.style.backgroundImage = `url(https://images.unsplash.com/photo-1528485238486-507af7c0aa19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80)`
    header.style.color =`white`
    searchButton.style.display = `inline-block`
}
function backgroundInfo(currentWeather) {
    let body = document.body;
    let header = document.querySelector(`.header`)
    let changeButton = document.getElementById(`units`)
    let cityTemp = document.getElementById(`city-temp`)
    let cityWind = document.getElementById(`city-wind`)
    let status = document.getElementById(`status`)
    changeButton.innerHTML = `Imperial Units`
    changeButton.addEventListener(`click` , changeUnits)
    let newImage = ["https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"]
            if(currentWeather.mainWeather == "Clouds") {
            body.style.backgroundImage = `url(${newImage})`
            header.style.color = `black`
            status.style.color = `brown`
        } else if (currentWeather.mainWeather == "Clear") {
            body.style.backgroundImage = `url(https://img.freepik.com/free-photo/fantastic-seascape-with-ripples_1232-424.jpg?w=740&t=st=1660722548~exp=1660723148~hmac=128a87d0eccaa7d5b4b2de48f0b078361ed7b6cf9610089759b9c9bf41ad5e70)`
            status.style.color = `green`
        } else if (currentWeather.mainWeather == "Rain") {
            status.style.color = `red`
            body.style.backgroundImage = `url(https://images.pexels.com/photos/39811/pexels-photo-39811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`
        }
        function changeUnits() {
        let kiloMeter = currentWeather.wind
        let miles =Math.round(kiloMeter / 1.609) + "MPh";
        // let mile = Number(currentWeather.wind / 1.609);
        cityWind.textContent = "Wind:" + " " + miles
        
        let fahrenheit = currentWeather.temp * 9 / 5 + 32; 
        cityTemp.textContent = "Temperature:" + " " + fahrenheit + "℉" 
        }
        


}
