import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Button, Icon, Body, Right, Title, ListItem, Content } from 'native-base';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const NAME = 'name';
const DATEOFBIRTH = 'dateofbirth';
const EMAIL = 'email';
const IDENTITY = 'IDENTITY';
const PASSPORT = 'PASSPORT';
const BANK = 'bank';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dateofbirth: '',           
      email: '',
      identity: '',
      passport: '',
      bank: '',
    };
  }
  componentDidMount() { this.loadAsyncNote() }

  loadAsyncNote = async () => {
    try {
      const name = await AsyncStorage.getItem(NAME);
      if (name !== null) {
        this.setState({ name: JSON.parse(name) })
      }
    } catch (e) {
      console.log(e);
    }

    try {
      const dateofbirth = await AsyncStorage.getItem(DATEOFBIRTH);
      if (dateofbirth !== null) {
        this.setState({ dateofbirth: JSON.parse(dateofbirth) })
      }
    } catch (e) {
      console.log(e);
    }

    try {
      const email = await AsyncStorage.getItem(EMAIL);
      if (email !== null) {
        this.setState({ email: JSON.parse(email) })
      }
    } catch (e) {
      console.log(e);
    }

    try {
      const identity = await AsyncStorage.getItem(IDENTITY);
      if (identity !== null) {
        this.setState({ identity: JSON.parse(identity) })
      }
    } catch (e) {
      console.log(e);
    }

    try {
      const passport = await AsyncStorage.getItem(PASSPORT);
      if (passport !== null) {
        this.setState({ passport: JSON.parse(passport) })
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const bank = await AsyncStorage.getItem(BANK);
      if (bank !== null) {
        this.setState({ bank: JSON.parse(bank) })
      }
    } catch (e) {
      console.log(e);
    }
  }
  saveName = async (name) => {
    try {
      name = this.state.name;
      await AsyncStorage.setItem(NAME, JSON.stringify(name));
      this.setState({ name });

    } catch (e) {
      console.log(e);
    }
  }
  saveDate = async (dateofbirth) => {
    try {
      dateofbirth = this.state.dateofbirth;
      await AsyncStorage.setItem(DATEOFBIRTH, JSON.stringify(dateofbirth));
      this.setState({ dateofbirth });

    } catch (e) {
      console.log(e);
    }
  }
  saveEmail = async (email) => {
    try {
      email = this.state.email;
      await AsyncStorage.setItem(EMAIL, JSON.stringify(email));
      this.setState({ email });

    } catch (e) {
      console.log(e);
    }
  }
  saveIdentity = async (identity) => {
    try {
      identity = this.state.identity;
      await AsyncStorage.setItem(IDENTITY, JSON.stringify(identity));
      this.setState({ identity });

    } catch (e) {
      console.log(e);
    }
  }
  savePassport = async (passport) => {
    try {
      passport = this.state.passport;
      await AsyncStorage.setItem(PASSPORT, JSON.stringify(passport));
      this.setState({ passport });

    } catch (e) {
      console.log(e);
    }
  }
  saveBank = async (bank) => {
    try {
      bank = this.state.bank;
      await AsyncStorage.setItem(BANK, JSON.stringify(bank));
      this.setState({ bank });

    } catch (e) {
      console.log(e);
    }
  }



  render() {
    return (
      <Container>
        <View style={{ flex: 0.5, backgroundColor: this.props.screenProps.color == '' ? '#06293D' : `${this.props.screenProps.color}` }}>
          <Header style={{ flexDirection: 'column', backgroundColor: this.props.screenProps.color == '' ? '#06293D' : `${this.props.screenProps.color}` }} >
            <Left style={styles.buttonBack}>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate('ListNote')}
              >
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body style={{ flexDirection: 'column' }}>
              <Title style={styles.titleHeader}>Profile</Title>
              <Avatar
                rounded
                source={require('../../assets/lanvy.jpg')}
                size='xlarge'
                containerStyle={{ top: 60 }}
                showEditButton
                editButton={{ name: 'camera', backgroundColor: 'white', type: 'font-awesome', color: 'blue' }}

              />
            </Body>
            <Right style={styles.buttonSave}>
              <TouchableOpacity style={{backgroundColor: this.props.screenProps.color == '' ? '#06293D' : `${this.props.screenProps.color}`}}
                onPress={(name, dateofbirth, email, identity, passport, bank) => {
                  this.saveName(name);
                  this.saveDate(dateofbirth);
                  this.saveEmail(email);
                  this.saveIdentity(identity);
                  this.savePassport(passport);
                  this.saveBank(bank);
                  this.props.navigation.navigate('ListNote');
                }}>
                <Text style={{ fontSize: 14, color: 'white' }}
                >SAVE</Text>
              </TouchableOpacity>
            </Right>
          </Header>
        </View>
        <Content style={{ flex: 0.5 }}>
          <ListItem style={{ flowDirection: 'column' }}>
            <Body>
              <Text style={styles.text}>User name</Text>
              <TextInput
                multiline
                value={this.state.name}
                onChangeText={(name) => this.setState({ name })}
                style={{ fontSize: 16, fontWeight: 'bold' }}
              />
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text style={styles.text}>Date of Birth</Text>
              <TextInput
                multiline
                value={this.state.dateofbirth}
                onChangeText={(dateofbirth) => this.setState({ dateofbirth })}
                style={{ fontSize: 16, fontWeight: 'bold' }}
              />
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text style={styles.text}>Email</Text>
              <TextInput
                multiline
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
                style={{ fontSize: 16, fontWeight: 'bold' }}
              />
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text style={styles.text}>Identity</Text>
              <TextInput
                multiline
                value={this.state.identity}
                onChangeText={(identity) => this.setState({ identity })}
                style={{ fontSize: 16, fontWeight: 'bold' }}
              />
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text style={styles.text}>Passport</Text>
              <TextInput
                multiline
                value={this.state.passport}
                onChangeText={(passport) => this.setState({ passport })}
                style={{ fontSize: 16, fontWeight: 'bold' }}
              />
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text style={styles.text}>Bank</Text>
              <TextInput
                multiline
                value={this.state.bank}
                onChangeText={(bank) => this.setState({ bank })}
                style={{ fontSize: 16, fontWeight: 'bold' }}
              />
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  buttonBack: {
    position: 'absolute',
    top: 10,
    left: 0,
    flex: 0.1
  },
  titleHeader: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    top: 10,
    fontSize: 24
  },
  avatar: {
    position: 'absolute',
    top: 40
  },
  buttonSave: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: '#06293D',
    flex: 0.1
  },
  text: {
    color: '#BFCDCB'
  }
})