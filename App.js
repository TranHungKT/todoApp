import React from 'react';
import Setting from './src/screen/Setting/Setting';
import Profile from './src/screen/Profile/Profile';
import ListNote from './src/screen/HomeScreen/ListNote';
import NoteDetail from './src/screen/NoteDetail/NoteDetail';
import Calendar from './src/screen/Calendar/Calendar';
import Password from './src/screen/Profile/Password';
import Register from './src/screen/Profile/Register';  
import { createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SideBar from './src/sidebar/Sidebar';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const TabNavigator = createBottomTabNavigator({
  Task: {
    screen: ListNote,
    tabBarOptions:{
      activeTintColor: 'red'
    },
    navigationOptions:{
      tabBarLabel: ({ focused }) => (
        <Text style= {{alignItems: 'center',alignSelf: 'center',fontSize: 13, color: `${focused?'#06293D':'#C7D7DA'}`}}>
        Tasks
      </Text>
     ),
      tabBarIcon: ({focused}) => (
        <Icon name = "tasks" size={20} color={focused?'#06293D':'#C7D7DA'}/>
      )
    }
  },
  Calendar:{
    screen: Calendar,
    navigationOptions:{
      tabBarLabel: ({ focused}) => (
        <Text style= {{alignItems: 'center',alignSelf: 'center',fontSize: 13, color: `${focused?'#06293D':'#C7D7DA'}`}}>
        Calendar
      </Text>
     ),
      tabBarIcon: ({focused}) => (
        <Icon name = "calendar-alt" size={20} color={focused?'#06293D':'#C7D7DA'}/>
      )
    }
  }
  
});

const LoginProfile = createStackNavigator({
  Password:{
    screen: Password,
    navigationOptions: {
      headerShown: false // Will hide header for HomePage
  }
  },
  Profile:{
    screen: Profile,
    navigationOptions: {
      headerShown: false // Will hide header for HomePage
  }
  },
  Register:{
    screen: Register,
    navigationOptions: {
      headerShown: false // Will hide header for HomePage
  }},
  
    initialRouteName: {
      screen: Password
    }
  
})



const DrawerNavigator = createDrawerNavigator({
  ListNote: {
    screen: TabNavigator ,
    navigationOptions:{
    drawerIcon: () => <Icon name = 'list-ul' size = {18}/>
    }
  },
  Profile:{
    screen: LoginProfile,
    navigationOptions: {
      drawerLockMode: 'locked-closed',
      drawerIcon : () => <Icon name = 'user-edit' size = {18}/>
    }
  },
  Setting:{
    screen: Setting,
    navigationOptions: {
      drawerLockMode: 'locked-closed',
      drawerIcon: () => <Icon name = 'whmcs' size = {18}/>
    }
  },
  
},{
  contentComponent: (props) => <SideBar {...props}/>,
  drawerPosition: 'left',
});




const stackNavigator = createStackNavigator({
  ListNote:{
    screen: DrawerNavigator,
    navigationOptions: {
      headerShown: false // Will hide header for HomePage
  }
  },
  NoteDetail:{
    screen: NoteDetail,
    navigationOptions: {
      headerShown: false, // Will hide header for HomePage
      drawerLockMode: 'locked-closed'

    }
  },
  Setting:{
    screen: Setting,
  },
  Profile:{
    screen: Profile,
  },
},{
  initialRouteName: 'ListNote',
})



const AppContainer =  createAppContainer(stackNavigator);

const COLOR = 'color';

export default class App extends React.Component{
  state = {
    size: 16,
    color: ''
  }
  componentDidMount(){
    this.loadAsyncData()
  }

  loadAsyncData = async () => {
    try {
      const color = await AsyncStorage.getItem(COLOR);
      if (color !== null) {
        this.setState({color: JSON.parse(color)})
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  changeColor = (color2) => {
    this.setState({color: color2});
  } 
  render(){
    return(
        <AppContainer screenProps = {{
          size: this.state.size,
          changeColor: this.changeColor,
          color: this.state.color
        }}/>
    )
  }
}