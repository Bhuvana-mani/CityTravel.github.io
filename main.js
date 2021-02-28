const submitBtn = document.getElementById("submit");
const inputs = document.getElementById("main-form").elements;
const placeInput = inputs["place"];
const placeCity = document.getElementById("city-name");
const mainPage = document.getElementById("main-page");
const userAccount = document.getElementById("user-account");
const hotelBtn = document.getElementById("hotels-btn");
const restaurantBtn = document.getElementById("restaurants-btn");
const thingstodoBtn = document.getElementById("thingstodo-btn");
const monumentsBtn = document.getElementById("monuments-btn");
const showInfo = document.getElementById("show-info");
const cityBoxesBtn = Array.from(document.getElementsByClassName("box"));
const closeBar = document.getElementById("close-bar");
const showInfoDiv = document.getElementById("showInfoDiv");
const Currentweather = document.getElementById("initial-weather");


const api = {
  key: "bc5968f4b239943f185627ac83619ed6",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const clientId = '4BW4Z1VVYDITXLBFWAOJCD5H1BI310NT3UFAAYS5GMZWQTTQ';
const clientSecret = 'GR22135U0U2JE3SHAKSNGXLZJKPBEXK4MNH2KWGVO3F4BFEI';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

document.addEventListener("DOMContentLoaded", function () {
  eventListeners();
});

function eventListeners() {
    
    submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    placeCity.innerText = placeInput.value;
    mainPage.classList.add("hide");
    userAccount.classList.remove("hide");
      getWeatherResults(placeInput.value);
    
  });

  //  weather forecast api

  function getWeatherResults(query) {
    fetch(`${api.baseurl}forecast?q=${query}&units=metric&APPID=${api.key}`)
      .then((forecast) => {
        return forecast.json();
      })
      .then(displayForecast);
  }
  function displayForecast(forecast) {
    let city = placeInput.value;
    let arr = forecast.list;
    // first day
    let obj = arr.find((o) => o.dt_txt.includes("15:00:00"));
    
    // icon
    let firstIconCode = obj.weather[0].icon;
    let WeatherDescription = obj.weather[0].description;
    const img = document.createElement("IMG");
    img.src = "http://openweathermap.org/img/w/" + firstIconCode + ".png";
    img.alt = WeatherDescription;
    Currentweather.appendChild(img);

    // temperature
    const initialTemp = document.createElement("H3");
    let Temperature = `${Math.round(obj.main.temp)} C`;
    initialTemp.innerText = Temperature;
    Currentweather.appendChild(initialTemp);

    // weather description
    const Weather = document.createElement("H4");
    Weather.innerText = WeatherDescription;
    Currentweather.appendChild(Weather);
    
    function getPlaceResults(query) {
      fetch(`${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20180101}`)
        .then((box) => {
          return box.json();
        })
        .then(displayplaces);
    }
    cityBoxesBtn.forEach((box) =>
    box.addEventListener("click", (e) => {
      showInfoDiv.classList.remove("hide");

      if (e.target.value === "thingstodo") {
        showInfo.innerHTML = `
      <iframe id="thingstodo-frame"
      width="1200"
      height="700"
      src="https://api.foursquare.com/v2/venues/explore?&client_id=4BW4Z1VVYDITXLBFWAOJCD5H1BI310NT3UFAAYS5GMZWQTTQ&client_secret=GR22135U0U2JE3SHAKSNGXLZJKPBEXK4MNH2KWGVO3F4BFEI&near=${placeInput.value}&v=20210228">
      </iframe>`;
      } else if (e.target.value === "restaurants") {
        showInfo.innerHTML = `
      <iframe id="restaurants-frame"
      width="1200"
      height="700"
      src="https://api.foursquare.com/v2/venues/explore?&client_id=4BW4Z1VVYDITXLBFWAOJCD5H1BI310NT3UFAAYS5GMZWQTTQ&client_secret=GR22135U0U2JE3SHAKSNGXLZJKPBEXK4MNH2KWGVO3F4BFEI&near=${placeInput.value}&v=20210228">
     </iframe>`;
      } else if (e.target.value === "monuments") {
        showInfo.innerHTML = `
      <iframe id="monuments-frame"
      width="1200"
      height="700"
      src="https://api.foursquare.com/v2/venues/explore?&client_id=4BW4Z1VVYDITXLBFWAOJCD5H1BI310NT3UFAAYS5GMZWQTTQ&client_secret=GR22135U0U2JE3SHAKSNGXLZJKPBEXK4MNH2KWGVO3F4BFEI&near=${placeInput.value}&v=20210228">
     </iframe>`;
      } else if (e.target.value === "hotels") {
        showInfo.innerHTML = `
      <iframe id="hotels-frame"
      width="1200"
      height="700"
      src="https://api.foursquare.com/v2/venues/explore?&client_id=4BW4Z1VVYDITXLBFWAOJCD5H1BI310NT3UFAAYS5GMZWQTTQ&client_secret=GR22135U0U2JE3SHAKSNGXLZJKPBEXK4MNH2KWGVO3F4BFEI&near=${placeInput.value}&v=20210228">
     </iframe>`;
      }
    })
  );

  closeBar.addEventListener("click", () => {
    showInfoDiv.classList.add("hide");
  });
  }

 

 
}
