import { Component } from "react";
import Connection from "./services/connection";
import ipLocation from "./services/ipLocation";
import "./style.scss";
import '../node_modules/bootstrap/dist/css/bootstrap.css'
export default class App extends Component {
  state = {
    city: null,
    country: null,
    temp: null,
    sunset: null,
    sunrise: null,
    snow: null,
    weather: {
      icon: null,
      code: null,
      desc: null
    },
    value: ""  // Controlled input for city name
  };

  conn = new Connection();
  ip = new ipLocation();

  icons = "https://www.weatherbit.io/static/img/icons/";

  componentDidMount() {
    // Fetch location and update weather info based on IP location
    this.ip.getCity().then((city) => {
      if (city) {
        this.conn.dataInfo(city).then((item) => this.dataLoaded(item));
      }
    });
  }


  


  updateInfo = () => {
    const { value } = this.state;
    if (!value) return;
    console.log("Value in updateInfo:", value);
  };

  dataLoaded = (info) => {
    if (info) {
      this.setState(info);
    } else {
      console.log("No information received.");
    }
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    const { value } = this.state;
    console.log("Submitted value:", value);

    // Fetch and update weather info based on the submitted value
    this.conn.dataInfo(value).then((item) => this.dataLoaded(item));
  };

  render() {
    const {
      city,
      country,
      temp,
      feelsLikeTemp,
      sunset,
      sunrise,
      snow,
      weather,
      value
    } = this.state;

    return (
      <div className="card-view w-100">
        <div id="desc">
          <img src={`${weather.icon}`} alt={weather.desc} />
          <h1 class="text-color">{temp}°</h1>
          <h1 class="text-color">{weather.desc}</h1>
        </div>
        <h1 class="text-color">
          {city} {country}
        </h1>
        <h1 class="text-color"> Feels Like: {feelsLikeTemp}°</h1>
        <h1 class="text-color">Sunrise: {sunrise} GMT</h1>
        <h1 class="text-color">Sunset: {sunset} GMT</h1>
        <h1 class="text-color">Snow: {snow}</h1>
        
        <form >
          <div class="row">
<div class="col-lg-6 d-flex justify-content-between">
  <input
            type="text" class="form-control" 
            value={value}
            onChange={this.handleChange}
            placeholder="Input city name"
            required
          />
         
          </div>
          <div class="col-lg-6 d-flex justify-content-between">
          <button type="submit" class="btn btn-primary" onClick={this.handleSubmit}>Submit</button></div>
          </div>
        </form>
      </div>
    );
  }
}
