const api_key = '32444405b5283c41960d0ae8f3e0cecf';
const searchCity = document.querySelector(".searchBox input")
const searchBtn = document.querySelector(".searchBox button");
const weather_icon = document.querySelector(".weather-icon");
// const error_message = document.querySelector(".error");

async function checkWeather(city) {
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

    const response = await fetch(api_url)
    var data = await response.json()
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
        weather_icon.src = "./images/404.png"
    }
    else {
        document.querySelector(".error").style.display = "none"
        document.querySelector(".city").innerHTML += data.name
        document.querySelector(".temp").innerHTML += Math.round(data.main.temp - 273.15) + "°C"
        document.querySelector(".humidity").innerHTML += data.main.humidity + " %"
        document.querySelector(".wind").innerHTML += data.wind.speed + " Kmph"

        if (data.weather[0].main == "Clouds") {
            weather_icon.src = "./images/clouds.png"
        }

        else if (data.weather[0].main == "Wind") {
            weather_icon.src = "./images/wind.png"
        }
        else if (data.weather[0].main == "Mist") {
            weather_icon.src = "./images/mist.png"
        }
        else if (data.weather[0].main == "Rain") {
            weather_icon.src = "./images/rain.png"
        }
        document.querySelector(".weather").style.display = "block"

    }
    // console.log(data)

}


searchBtn.addEventListener("click", () => {
    document.querySelector(".city").innerHTML = "";
    document.querySelector(".temp").innerHTML = "";
    document.querySelector(".humidity").innerHTML = "";
    document.querySelector(".wind").innerHTML = "";

    checkWeather(searchCity.value)

    searchCity.value = ""
})
