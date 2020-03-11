import React, {Component} from 'react';
import { FlatList } from 'react-native';
import ForecastCard from './components/ForecastCard';
navigator.geolocation = require('@react-native-community/geolocation');
import {Calendar} from 'react-native-calendars';
export default class App extends Component {
  state = {
            latitude: 0,
			longitude: 0,
			forecast: [],
            error:'',
            select: undefined
  };
  componentDidMount(){
      this.getLocation();
  }


  onDayPress = (day) => {
    this.setState({selected: day.dateString});
  }

  getLocation(){
    navigator.geolocation.getCurrentPosition(
        (position) => {
            this.setState(
                (prevState) => ({
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude
                }), () => { this.getWeather(); }
            );
        },
        (error) => this.setState({ forecast: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
}
getWeather(){
    let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&cnt=16&appid=4e8b3ecbbcc4ed759869e5a53c3b98fe';


    fetch(url)
    .then((response) => response.json())
    .then(data => {
        this.setState((prevState, props) => ({
            forecast: data
        }
        ));
    })
}
  render() {
    return (<>
        <Calendar 
            onDayPress={this.onDayPress}
            markedDates={{
              [this.state.selected]: {
                selected: true, 
                disableTouchEvent: true, 
                selectedDotColor: 'orange'
              }
            }}
        />
        <FlatList data={this.state.forecast.list} style={{marginTop:20}} keyExtractor={item => item.dt_txt} renderItem={({item}) => <ForecastCard detail={item} location={this.state.forecast.city.name} />} />
		</>
        );
	}
}

