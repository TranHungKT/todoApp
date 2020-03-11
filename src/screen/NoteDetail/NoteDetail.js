import React, { Component } from 'react';
import { Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Button, Icon, Body, Title, Right, Content, List, ListItem } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { RippleFeedback } from 'react-native-material-ui';
// import Animated from 'react-native-reanimated';


export default class NoteDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isVisible: false,
      chosenDate: '',
      reminder: false,
      header: this.props.navigation.state.params.headName,
    }

  }

  componentDidMount() {
    this.loadAsyncNote();
  }
  toggleReminder = () => {
    this.setState(prevState => ({ reminder: !prevState.reminder }));
  }

  handlePicker = async (chosenDate) => {
    try {
      chosenDate = this.state.chosenDate;
      await AsyncStorage.setItem(this.props.navigation.state.params.headName + 1, JSON.stringify(chosenDate));
      this.setState({ chosenDate })
    } catch (e) {
      console.log(e)
    }
  }
  hidePicker = () => {
    this.setState({
      isVisible: false
    })
  }
  showPicker = () => {
    this.setState({
      isVisible: true
    })
  }
  loadAsyncNote = async () => {
    try {
      const text = await AsyncStorage.getItem(this.props.navigation.state.params.headName);
      if (text !== null) {
        this.setState({ text: JSON.parse(text) })
      }
    } catch (e) {
      console.log(e);
    }

    try {
      const chosenDate = await AsyncStorage.getItem(this.props.navigation.state.params.headName + 1);
      if (chosenDate !== null) {
        this.setState({ chosenDate: JSON.parse(chosenDate) })
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const header = await AsyncStorage.getItem(this.props.navigation.state.params.headName + 2);
      if (header !== null) {
        this.setState({ header: JSON.parse(header) })
      }
    } catch (e) {
      console.log(e);
    }

  }
  saveNote = async (text) => {
    try {
      text = this.state.text
      await AsyncStorage.setItem(this.props.navigation.state.params.headName, JSON.stringify(text));
      this.setState({ text });

    } catch (e) {
      console.log(e);
    }
  }

  saveHeader = async (header) => {
    try {
      header = this.state.header
      await AsyncStorage.setItem(this.props.navigation.state.params.headName + 2, JSON.stringify(header));
      this.setState({ header });
    } catch (e) {
      console.log(e);
    }
  }


  render() {
    let navigation = this.props.navigation.state.params;
    return (
      <Container key={this.props.keyval}>
        <Header style={{ backgroundColor: this.props.screenProps.color == '' ? '#06293D' : `${this.props.screenProps.color}`, height: 180, flexDirection: 'row' }} span>
          <Left style={{ flex: 0.1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('ListNote')}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 0.6 }}>
            <Text style={{ fontSize: 20 }}>Note name</Text>

            <TextInput
              style={styles.headerTitle}
              onChangeText={(header) => this.saveHeader(header)}
              value={this.state.header}
              multiline
            />


          </Body>
          <Right style={{ flex: 0.3, flexDirection: "row", justifyContent: 'space-between' }}>
            <Icon style={{ marginHorizontal: 10 }}
              onPress={this.toggleReminder}
              name={this.state.reminder ? "md-notifications-off" : "md-notifications"} />
            <Icon style={{ marginHorizontal: 10 }} name="md-shirt" />
            <Icon style={{ marginHorizontal: 10 }} name="md-trash" onPress={() => {
              navigation.deletenode(navigation.key);
              this.props.navigation.navigate('ListNote'); navigation.storeNote();
            }}
            />
            <TouchableOpacity style={styles.saveButton}
              onPress={(header, text, chosenDate) => {
                this.saveHeader(header);
                this.saveNote(text);
                this.handlePicker(chosenDate);
                this.props.navigation.navigate('ListNote')
              }}

            >
              <Icon name='md-checkmark' style={styles.save} ></Icon>
            </TouchableOpacity>
          </Right>
        </Header>

        <Content>
          <List>
            <ListItem>
              <Left style={{ flex: 0.1 }}>
                <Icon name='list' />
              </Left>
              <Body>
                <Text style={{ fontSize: 20 }}>Notes</Text>
                <TextInput
                  multiline placeholder="You can note some detail for your work better"
                  value={this.state.text}
                  onChangeText={(text) => this.setState({ text })}
                />
              </Body>

            </ListItem>
            <ListItem onPress={this.showPicker}>
              <Left style={{ flex: 0.1 }}>
                <Icon name='md-clock' />
              </Left>
              <Body>
                <Text style={{ fontSize: 20 }}>Due date</Text>
                <DateTimePickerModal
                  isVisible={this.state.isVisible}
                  onConfirm={chosenDate => {
                    this.setState({
                      isVisible: false,
                      chosenDate: moment(chosenDate).format('MMMM Do YYYY, h:mm:ss a')
                    })
                  }}
                  onCancel={this.hidePicker}
                  mode={'datetime'}
                  is24Hour={true}
                />
                <Text>{this.state.chosenDate.substring()}</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 22,
    color: 'white'
  },
  saveButton: {
    position: 'absolute',
    top: 130,
    right: 0,
    borderRadius: 45,
    width: 55,
    height: 55,
    backgroundColor: '#D8EB17',
    paddingHorizontal: 0
  },
  save: {
    position: 'absolute',
    top: 10,
    fontSize: 30,
    color: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  }
})