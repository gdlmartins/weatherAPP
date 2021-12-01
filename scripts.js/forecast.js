class Forecast {
  constructor() {
    this.key = "vBYbffPFFCy9jwAXtKyHpAjAh2WG20a2";
    this.weatherURI =
      "https://dataservice.accuweather.com/currentconditions/v1/";
    this.citURI =
      "https://dataservice.accuweather.com/locations/v1/cities/search";
  }
  async updateCity(city) {
    const cityDetails = await this.getCity(city);
    const weather = await this.getWeather(cityDetails.Key);

    return { cityDetails, weather };
  }

  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;

    const response = await fetch(this.citURI + query);
    const data = await response.json();

    console.log(data[0]);
    return data[0];
  }

  async getWeather(id) {
    const query = `${id}?apikey=${key}`;

    const response = await fetch(this.citURI + query);
    const data = await response.json();

    return data;
  }
}
