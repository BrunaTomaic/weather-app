import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search_Weather from './components/search_weather';
import Week_Container from './components/week_container';
import {API_key} from './components/api_keys';
import Form from './components/form_component';


class App extends Component {
  constructor(){
    super();
    this.state = { 
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
    };

    this.weatherIcon = {
      Thunderstorm:"wi-	thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }


  calCelsius(temp){
    let cell = Math.floor(temp-273.15)
    return cell
  }

  getWeather = async(event) => {

    event.preventDefault();

    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;

    if(city && country){
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_key}`);
    const response = await api_call.json();

    this.setState({
      city: `${response.name}, ${response.sys.country}`,  
      celsius: this.calCelsius(response.main.temp),
      temp_max: this.calCelsius(response.main.temp_max),
      temp_min: this.calCelsius(response.main.temp_min),
      description: response.weather[0].description,
      error: false,
    })

    this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

    console.log(response)
    }else{
      this.setState({error: true});
    }

  }
 
 render () { 

  return (
<Router>
<div className="App">

<nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
  <div className="container">
  <h1 className="wi wi-day-sunny"></h1>
  <div className="navbar-nav ml-auto pt-2">
    <ul>
          <Link className="text-dark" to="/">Home</Link>
    </ul>
    <ul>
          <Link className="text-dark" to="/week_container">Forecast</Link>
    </ul>
  </div>
  </div>
</nav>


 <Switch>
   <Route exact path="/">
     <h1 className="pt-5 text-white">Weather App</h1>

     <Form loadweather={this.getWeather} 
     error={this.state.error}/>

     <Search_Weather city={this.state.city} 
     country={this.state.country} 
     temp_celsius={this.state.celsius}
     temp_min={this.state.temp_min}
     temp_max={this.state.temp_max}
     description={this.state.description}
     weatherIcon={this.state.icon} />
   </Route>
   <Route path="/week_container"
     component={(props) => <Week_Container {...props}/> } />
 </Switch>
 
</div>
</Router>

  );
}
}
export default App;
