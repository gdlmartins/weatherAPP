const changeLocation = document.querySelector(".change-location");
const displayOnDOM = document.querySelector(".details");
const card = document.querySelector(".card");
const time = document.querySelector(".time");
const icons = document.querySelector(".icons");

const updateDom = ({ cityDetails, weather }) => {
  //   const { cityDetails, weather } = data;
  //   const cityDetails = data.cityDetails;
  //   const weather = data.weather;

  console.log(cityDetails);
  console.log(weather);

  displayOnDOM.innerHTML = `
      <h5 class="my-3">${cityDetails.EnglishName} - ${cityDetails.AdministrativeArea.LocalizedName}</h5>
      <h7>${cityDetails.Country.EnglishName}</h7>
      <div class="my-3">${weather[0].WeatherText}</div>
      <div class="display-4 my-4">
      <span>${weather[0].Temperature.Metric.Value}</span>
      <span>&deg;C</span>
      <div>
  `;
  const fundo = weather[0].IsDayTime ? "./src/day.svg" : "./src/night.svg";
  time.setAttribute("src", fundo);

  const iconNumber = weather[0].WeatherIcon;

  console.log(iconNumber);

  icons.setAttribute("src", `./src/icons/${iconNumber}.svg`);

  if (card.classList.contains("d-none")) card.classList.remove("d-none");
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  console.log(cityDetails.Key);
  const weather = await getWeather(cityDetails.Key);

  return { cityDetails, weather };
};

const submitHandler = (e) => {
  e.preventDefault();
  const city = changeLocation.city.value.trim();
  changeLocation.reset();

  updateCity(city)
    .then((data) => updateDom(data))
    .catch((err) => console.log(err));

  localStorage.setItem("city", `${city}`);
};

changeLocation.addEventListener("submit", submitHandler);

// accessing Dom

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => updateDom(data))
    .catch((err) => console.log(err));
}
