import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Container, Header, Content, ListItem, Icon, Button, Left, Body, Right, Title, Form, Picker } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
const COLOR = 'color';
export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: ['#BE3715', '#109EE0', '#E4DA11', '#06293D'],
      selected: undefined
    };
  }
  componentDidMount() {
    this.loadAsyncData()
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  loadAsyncData = async () => {
    try {
      const color = await AsyncStorage.getItem(COLOR);
      if (color !== null) {
        this.props.screenProps.color = JSON.parse(color);
        this.props.screenProps.changeColor(color);
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  storeThemeColors = async (color, key) => {
    try {
      color = this.state.color[key];
      await AsyncStorage.setItem(COLOR, JSON.stringify(color));
      this.props.screenProps.color = color;
      this.props.screenProps.changeColor(color);
    } catch (e) {
      console.log(e);
    }
  }



  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: this.props.screenProps.color == '' ? '#06293D' : `${this.props.screenProps.color}` }}>
          <Left style={{ flex: 0.1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('ListNote')}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ alignSelf: 'center', alignItems: 'center' }}>
            <Title>List notes</Title>
          </Body>
          <Right style={{ flex: 0.1 }}></Right>
        </Header>
        <Content>
          <ListItem itemDivider>
            <Text>Preference</Text>
          </ListItem>
          <ListItem icon>
            <Left style={{ flex: 0.2 }}><Text>Theme</Text></Left>
            <Right style={{ flex: 0.8 }}>
              <TouchableOpacity style={{ backgroundColor: '#BE3715', borderRadius: 45, height: 30, width: 30, marginRight: 10 }}
                onPress={(color) => { this.storeThemeColors(color, 0) }} />
              <TouchableOpacity style={{ backgroundColor: '#109EE0', borderRadius: 45, height: 30, width: 30, marginRight: 10 }}
                onPress={(color) => { this.storeThemeColors(color, 1) }} />
              <TouchableOpacity style={{ backgroundColor: '#E4DA11', borderRadius: 45, height: 30, width: 30, marginRight: 10 }}
                onPress={(color) => { this.storeThemeColors(color, 2) }} />
              <TouchableOpacity style={{ backgroundColor: '#06293D', borderRadius: 45, height: 30, width: 30 }}
                onPress={(color) => { this.storeThemeColors(color, 3) }} />
            </Right>
          </ListItem>


          <Form>
            <ListItem icon>
              <Left style={{ flex: 0.2 }}><Text>Size</Text></Left>
              <Right style={{ flex: 0.8 }}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="Small" value="key0" />
                  <Picker.Item label="Medium" value="key1" />
                  <Picker.Item label="Large" value="key2" />
                  <Picker.Item label="Huge" value="key3" />
                </Picker>
              </Right>
            </ListItem>
          </Form>

        </Content>
      </Container>
    );
  }
}
