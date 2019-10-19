import React from "react";
import Header from "./Header";
import Form from "./Form";
import Weather from "./Weather";

//My API Key
const theKEY = "ca0ae6770cf78e7b7e4737ead2cd2f5d";

class App extends React.Component {
  state = {
    temperature: "",
    city: "",
    country: "",
    humidity: "",
    description: "",
    error: ""
  }

  // use async function for quicker response from API
  getWeather = async (e) => {
    
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    //Api call below, we put in the city and country and provide the hard coded unique API key
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${theKEY}&units=metric`);
    // above function returns JSON file
    //JSON read
    const data = await api_call.json();
    if (city && country) {
      this.setState({
        temperature: data.main.temp, 
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description, 
        // call error message when no input is enteref
        error: ""
      });
    } else {
      this.setState({
        temperature: "",
        city: "",
        country: "",
        humidity: "",
        description: "",
        error: "Please enter both the city and country into the inputs."
      });
    }
  }
  render() {
    return (
      <div>
        <div>
          <Header/>
        </div>
        <div>
          <Form getWeather={this.getWeather} />
          <Weather 
            temperature={this.state.temperature}
            humidity={this.state.humidity}
            city={this.state.city}
            country={this.state.country}
            description={this.state.description}
            error={this.state.error}
          />
        </div>      
      </div>
    );
  }
};

export default App;
