import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { Icon, Left, Body, Right, Button } from 'native-base';
import { login } from '../../../api';

const { height: HEIGHT } = Dimensions.get('window');
const { width: WIDTH } = Dimensions.get('window')

export default class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      press: false,
    };
  }
  _login = async () => {
    try {
      const success = await login(this.state.username, this.state.password)
      this.props.navigation.navigate('Profile')
    } catch (err) {
      const errMessage = err.message
      this.setState({ err: errMessage })
    }
  }

  hidePassword = () => {
    this.setState(prevState => ({ press: !prevState.press }));
  }

  render() {
    return (
      <View style={{ backgroundColor: this.props.screenProps.color == '' ? '#06293D' : `${this.props.screenProps.color}`, flex: 1 }}>
        <View style={styles.title}>
          <Text style={styles.loginTitle}>Login</Text>
          <Text style={styles.text}>For your important infomation</Text>
        </View>
        <View style={styles.input}>
          <Left style={{ flex: 0 }}>
            <Icon name='ios-contact' style={{ fontSize: 32, marginLeft: 5 }} />
          </Left>
          <TextInput
            placeholder="username"
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
          >
          </TextInput>
        </View>
        <View style={styles.input}>
          <Left style={{ flex: 0 }}>
            <Icon name='ios-lock' style={{ fontSize: 32, marginLeft: 5 }} />
          </Left>
          <TextInput
            placeholder="password"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            secureTextEntry={true}
          >
          </TextInput>
        </View>
        <Text style={{ color: 'white', alignSelf: 'center', marginTop: 10,backgroundColor: this.props.screenProps.color == '' ? '#06293D' : `${this.props.screenProps.color}`  }}>{this.state.err}</Text>
        <TouchableOpacity style={styles.loginButton} onPress={this._login}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.register}>
          <Text style={styles.registerText}>If you do not have account? Let's</Text>
          <TouchableOpacity style = {{marginLeft: 4}} onPress = {() =>this.props.navigation.navigate('Register')}>
              <Text style = {{color: 'red'}}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    flex: 0.4,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  loginTitle: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 40,
    textAlign: 'center',
    fontFamily: 'sans-serif',
    textShadowRadius: 10,
    textShadowOffset: { width: 2, height: 2 },
    textTransform: 'uppercase',
    textAlignVertical: 'top',
  },
  text: {
    color: 'white',
  },
  input: {
    flexDirection: 'row',
    backgroundColor: '#E2EAE6',
    borderRadius: 25,
    height: 50,
    marginHorizontal: 15,
    marginTop: 20,
  },
  loginButton: {
    position: 'absolute',
    top: HEIGHT - 300,
    width: WIDTH - 155,
    left: 155 / 2,
    height: 55,
    borderRadius: 55,
    backgroundColor: '#E2EAE6' 
  },
  loginText: {
    alignSelf: 'center',
    fontSize: 26,
    color: 'blue',
  },
  register: {
    position: 'absolute',
    top: HEIGHT - 100,
    alignSelf: 'center', 
    flexDirection: 'row'
  },
  registerText: {
    color: 'white',
  },
})

