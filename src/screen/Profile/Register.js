import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Dimensions, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import { Icon, Left, Body, Right, Button } from 'native-base';
import { register } from '../../../api';

const { height: HEIGHT } = Dimensions.get('window');
const { width: WIDTH } = Dimensions.get('window')

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password1: '',
      password2: '',
      press: false,
    };
  }
  _register= async () => {
    try {
      const success = await register(this.state.username, this.state.password1,this.state.password2)
      this.props.navigation.navigate('Password')
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
      <KeyboardAvoidingView style={{ backgroundColor: '#06293D', flex: 1 }}>
        <View style={styles.title}>
          <Text style={styles.loginTitle}>Register</Text>
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
            placeholder="password1"
            onChangeText={(password1) => this.setState({ password1 })}
            value={this.state.password}
            secureTextEntry={true}
          >
          </TextInput>
        </View>
        <View style={styles.input}>
          <Left style={{ flex: 0 }}>
            <Icon name='ios-lock' style={{ fontSize: 32, marginLeft: 5 }} />
          </Left>
          <TextInput
            placeholder="password2"
            onChangeText={(password2) => this.setState({ password2 })}
            value={this.state.password}
            secureTextEntry={true}
          >
          </TextInput>
        </View>
        <Text style={{ color: 'white', alignSelf: 'center', marginTop: 10,backgroundColor: '#06293D'  }}>{this.state.err}</Text>
        <TouchableOpacity style={styles.loginButton} onPress={this._register}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>  
      </KeyboardAvoidingView>
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
    // textDecorationLine: 'underline',
    // textShadowColor: '#D50000',
    fontFamily: 'sans-serif',
    textShadowRadius: 10,
    textShadowOffset: { width: 2, height: 2 },
    textTransform: 'uppercase',
    textAlignVertical: 'top',
  },
  text: {
    // fontSize: 18,
    color: 'white',
    // fontStyle: 'italic',
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
    top: HEIGHT - 40,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  registerText: {
    color: 'white',
  },
  registerButton: {
    color: 'red'
  }
  
})

