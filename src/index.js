let commentMap = {
  "01d": "☀️ Perfect drying day!",
  "02d": "🌞 Mostly sunny, still great for laundry",
  "03d": "⛅ Partly cloudy but fine for drying",
  "04d": "☁️ Drying might take longer",
  "09d": "🌦️ Not ideal for laundry",
  "10d": "🚫🌧️ Keep it inside",
  "11d": "⛈️ Laundry can wait",
  "13d": "❄️ Unless you want frozen socks",
  "50d": "🌫️ Slow drying ahead",
};

let imageMap = {
  "01d": "images/sunny.png",
  "02d": "images/sunny.png",
  "03d": "images/clouds.png",
  "04d": "images/clouds.png",
  "09d": "images/lightrain.png",
  "10d": "images/rain.png",
  "11d": "images/rain.png",
  "13d": "images/rain.png",
  "50d": "images/mist.png",
};

function showCityElement(response) {
  console.log(response.data);
  let searchCity = document.querySelector("#city");
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  console.log(`Coord:${lat},${lon}`);
  let temperatureElement = document.querySelector("#temperature");
  let iconElement = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;
  let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  let dateElement = document.querySelector("#day");
  let dt = response.data.dt;
  let timezone = response.data.timezone;
  let date = new Date((dt + timezone) * 1000);
  let descriptionElement = document.querySelector("#description");
  let currentDescription = response.data.weather[0].icon;
  let commentElement = document.querySelector("#comment");
  let laundryComment = commentMap[currentDescription];
  let imageElement = document.querySelector("#image");
  let laundryImage = imageMap[currentDescription];

  if (currentDescription.endsWith("d") && commentMap[currentDescription]) {
    commentElement.innerHTML = laundryComment;
    descriptionElement.innerHTML = response.data.weather[0].description;
  } else {
    commentElement.innerHTML = "Did you bring your laundry in?";
    descriptionElement.innerHTML = "";
  }
  if (currentDescription.endsWith("d") && imageMap[currentDescription]) {
    imageElement.innerHTML = `<img src="${laundryImage}" alt="Laundry weather"/>`;
  } else {
    imageElement.innerHTML = `<img src="images/night.png" alt="Laundry night" />`;
  }

  searchCity.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  iconElement.innerHTML = `<img src="${iconUrl}"/>`;
  dateElement.innerHTML = formatDate(date);
}

function showForecastElement(response) {
  console.log(response.data.list);
  let forecastList = response.data.list;

  let dailyForecast = forecastList.filter((forecast) =>
    forecast.dt_txt.includes("12:00:00")
  );

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = "";

  dailyForecast.forEach((forecast) => {
    let temp = Math.round(forecast.main.temp);
    let date = new Date(forecast.dt * 1000);
    let day = date.toLocaleDateString("en-Au", { weekday: "short" });
    let icon = forecast.weather[0].icon;
    iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    forecastElement.innerHTML += `
    <div class="forecast-details">
     <div class="forecast-day">${day}</div>
     <img src="${iconUrl}" class="forecast-icon"/>
     <div id="forecast-temp" class="forecast-temp">${temp}</div>
    </div>`;
  });
}

function formatDate(date) {
  let hour = date.getUTCHours();
  let minute = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getUTCDay()];

  if (hour < 10) hour = `0${hour}`;
  if (minute < 10) minute = `0${minute}`;
  return `${day} ${hour}:${minute}`;
}

function displayCity(city) {
  let apiKey = "d1193959d2d841ec7555416d715716a6";

  let currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(currentApiUrl).then(showCityElement);
  axios.get(forecastApiUrl).then(showForecastElement);
}

function searchForCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");

  displayCity(searchInput.value);
}

let searchCityElement = document.querySelector("#search-form");
searchCityElement.addEventListener("submit", searchForCity);

displayCity("Perth");
