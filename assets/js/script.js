const containerEl = document.getElementById("container");
const todayEl = document.getElementById("firstD");
const formEL = document.getElementById("form");
let cityName = document.querySelector("#search-city");
const buttonEl = document.querySelector("#submit");
let cityNames = JSON.parse(localStorage.getItem("cityNames"));
if (!cityNames) {
  cityNames = [];
}
let APIkey = "e08d32e5cdc2a853e9e401e0f419634b";

buttonEl.addEventListener("click", function (event) {
  event.preventDefault();
  const cities = document.querySelector("#search-city").value;
  if (cities === "") {
    displayMessage("error", "City search cannot be blank");
  } else {
    const cityN = {
      citiesname: cities,
    };
    cityNames.push(cityN);
    localStorage.setItem("cityNames", JSON.stringify(cityNames));
    let weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cities},US&appid=${APIkey}`;
    wUrl(weatherUrl);
    renderCities(cities);
  }
});
function renderCities(cities) {
  let nameCity = document.createElement("button");
  nameCity.textContent = cities;
  nameCity.value = cities;
  nameCity.classList.add("cityButton", "btn", "is-2");
  nameCity.addEventListener("click", function (event) {
    event.preventDefault();
    console.log(event.target.value);
    let weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${event.target.value},US&appid=${APIkey}`;
    wUrl(weatherUrl);
  });

  formEL.appendChild(nameCity);
}

function wUrl(weatherUrl) {
  containerEl.innerHTML = "";
  todayEl.innerHTML = "";
  console.log("go");
  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (let i = 0; i < data.list.length; i += 8) {
        let card = document.createElement("div");
        card.classList.add(
          "card",

          "is-col-min-8",
          "is-5",
          "is-offset7"
        );
        console.log(i);
        // Create elements for displaying weather information
        let cardTitle = document.createElement("h2");
        let cardDate = document.createElement("h2");
        let cardTemp = document.createElement("h3"); // Changed to h2 for better semantics
        let cardWeather = document.createElement("div");
        let cardHumidity = document.createElement("div");
        let cardMain = document.createElement("div");
        let cardWind = document.createElement("div");
        function kelvinToFahrenheit(kelvin) {
          const celsius = kelvin - 273.15;
          const fahrenheit = (celsius * 9) / 5 + 32;
          return fahrenheit;
        }
        let kelvinTemp = data.list[i].main.temp;
        let fahrenheitTemp = kelvinToFahrenheit(kelvinTemp);

        // Set the content for each element
        cardTemp.textContent = `Temp: ${fahrenheitTemp}`;
        cardTitle.textContent = `Weather in ${data.city.name}`; // Title for the card
        cardWeather.textContent = `Condition: ${data.list[i].weather[0]?.main}`; // Weather condition
        cardHumidity.textContent = `Humidity: ${data.list[i].main.humidity}%`; // Humidity
        cardMain.textContent = `Cloudiness: ${data.list[i].clouds.all}%`; // Cloudiness
        cardWind.textContent = `Wind Speed: ${data.list[i].wind.speed} m/s`; // Wind speed
        cardDate.textContent = `Date: ${data.list[i].dt_txt}`;
        // Append elements to the card
        card.appendChild(cardTitle);
        card.appendChild(cardDate);
        card.appendChild(cardTemp);
        card.appendChild(cardWeather);
        card.appendChild(cardHumidity);
        card.appendChild(cardMain);
        card.appendChild(cardWind);

        // Append the card to the container
        containerEl.appendChild(card);

        if (i === 0) {
          const clone = card.cloneNode(true);
          clone.classList.add("is-half", "column", "firstday");
          todayEl.appendChild(clone);
        }
      }
    })
    .catch(function (error) {
      console.error("Error fetching weather data:", error);
    });
}

/*function wUrl(weatherUrl) {
  containerEl.innerHTML = "";
  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (let i = 0; i < 5; i++) {
        let cardWeather = document.createElement("div");
        let cardWind = document.createElement("div");
        let card = document.createElement("div");
        card.classList.add("card", "cell", "is-col-min-8");
        let cardTitle = document.createElement("div");
        let cardHumidity = document.createElement("h2");
        let cardMain = document.createElement("h2");
        cardHumidity.textContent = data.list[i].main.humidity;
        console.log(data.list[i].main.humidity);
        cardTitle.textContent = data.city.name;
        console.log(data.list[i].weather[0]);
        cardWeather.textContent = data.list[i].weather[0]?.main;
        cardMain.textContent = data.list[i].clouds.all;
        cardWind.textContent = data.list[i].wind.speed;
        console.log(data.city.name);

        console.log(data.list[i].clouds.all);
        containerEl.appendChild(card);
        card.appendChild(cardTitle);
        card.appendChild(cardWeather);
        cardWeather.appendChild(cardHumidity);
        cardHumidity.appendChild(cardWind);
        cardWeather.appendChild(cardMain);
      } */
/*let card = document.createElement("div");
  card.classList.add("card", "cell", "is-col-min-8");
  let cardTitle = document.createElement("div");
  cardTitle.textContent = data.city.name;
  console.log(data.city.name);
  containerEl.appendChild(card);
  card.appendChild(cardTitle); */
