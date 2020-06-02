import React,{Component} from 'react';
import {API_key} from './api_keys';
import DayCard from './daycard';

class Week_Container extends Component{
    state = {
        fullData: [],
        dailyData: []
      }
    
      componentDidMount = () => {
        const weatherURL =
        `http://api.openweathermap.org/data/2.5/forecast?q=Copenhagen&zip=11102&units=metric&APPID=${API_key}`
    
        fetch(weatherURL)
        .then(res => res.json())
        .then(data => {
          const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
          this.setState({
            fullData: data.list,
            dailyData: dailyData
          }, () => console.log(this.state))
        })
    }

    formatDayCards = () => {
        return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
      }

    render() {

        return (
            <div className="container">
              <h1 className="display-3 pt-5 pb-5 text-white">Forecast</h1>
              <h5 className="display-5 text-light pb-4">Copenhagen, DK</h5>
            <div className="row justify-content-center">

              {this.formatDayCards()}

            </div>
            </div>
            );
    }
}

export default Week_Container;