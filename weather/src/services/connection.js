// import fetch from "node-fetch";

export default class Connection {
    api_base = "https://api.weatherapi.com/v1/forecast.json";
    api_key = "key=1a0ce4e00166459e8ac94601242610"
   // api_key = "key=6ca7dcac211346a1ae03e110c4c973c1";
  // api_key = "key=5d50cb77a4d850371ce5a430e31c9b24";
    log = console.log;
  
    data = async (url) => {
      let res = await fetch(url);
      if (!res.ok) {
        throw new Error(`could not fetch ${url} status: ${res.status}`);
      }
      return await res.json();
    };
  
    dataInfo = async (cityName = "baku") => {
      try {
          const city = await this.data(
              `${this.api_base}current?q=${cityName}&${this.api_key}&lang=en`
          ).then((data) => data);
  
          // Check if city is defined and is an array with at least one element
          if (city) {
              return this.transformData(city);
          } else {
              throw new Error("City data is not available or is empty");
          }
      } catch (error) {
          console.error("Error fetching city data:", error);
          // Handle error appropriately, e.g., show a message to the user
          return null; // or a default value
      }
  };
  
  
    transformData = (data) => {
      return {
        city: data.location.name,
        country: data.location.country,
        temp: data.forecast.forecastday[0].day.maxtemp_c,
        feelsLikeTemp: data.forecast.forecastday[0].day.maxtemp_c,
        sunset: data.forecast.forecastday[0].astro.sunset,
        sunrise: data.forecast.forecastday[0].astro.sunrise,
        //snow: daily_chance_of_snow,
        weather: {
          icon: data.current.condition.icon,
          code: data.current.condition.code,
          description: data.current.condition.text
        }
      };
    };
  }
  