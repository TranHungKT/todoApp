import React from 'react';
import { StyleSheet, ScrollView, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';
import NoteTodo from '../../../NoteTodo';
const { width: WIDTH } = Dimensions.get('window')
import { Container, Header, Left, Button, Icon, Body, Title, Fab, Right } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

const NOTE_ARRAY_KEY = 'noteArrray';

export default class ListNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteArrray: [],
      noteText: '',
      hello: false,
      color: ''
    }
  }
  componentDidMount() {
    this.loadAsyncData();
  }



  loadAsyncData = async () => {
    try {
      const noteArrray = await AsyncStorage.getItem(NOTE_ARRAY_KEY);
      if (noteArrray !== null) {
        this.setState({ noteArrray: JSON.parse(noteArrray) })
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  storeNote = async (noteArrray) => {
    try {
      noteArrray = this.state.noteArrray;
      await AsyncStorage.setItem(NOTE_ARRAY_KEY, JSON.stringify(noteArrray));
      this.setState({ noteArrray });
    } catch (e) {
      console.log(e);
    }
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();

  }
  render() {
    let noteArrayValue = this.state.noteArrray;
    let notes = noteArrayValue.map((val, key) => {
      return <NoteTodo key={key} keyval={key} val={val}
        deleteMethod={() => { this.deleteNode(key); this.storeNote(); }}
        onSelectNote={() => this.NoteDetail(key)}
      />
    });

    return (
      <>
        <Container style={{}} >
          <Header style={{ backgroundColor: this.props.screenProps.color == '' ? '#06293D' : `${this.props.screenProps.color}` }}>
            <Left style={{ flex: 0.1 }}>
              <Button
                transparent
                onPress={() => this.props.navigation.openDrawer()}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body style={{ alignSelf: 'center', alignItems: 'center' }}>
              <Title>List notes</Title>
            </Body>
            <Right style={{ flex: 0.1 }}></Right>
          </Header>

          <ScrollView style={{ marginBottom: 100 }}>
            {notes}
          </ScrollView>

          <KeyboardAvoidingView style={styles.input} >
            <TextInput
              style={styles.textinput}
              placeholder="I want to"
              onChangeText={(noteText) => this.setState({ noteText })}
              value={this.state.noteText}
            >
            </TextInput>
            <Button style={{
              alignSelf: 'flex-end',
              borderRadius: 45,
              width: 55,
              height: 55,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: this.props.screenProps.color == '' ? '#06293D' : `${this.props.screenProps.color}`
            }} onPress={() => { this.addNote(); this.storeNote() }}>
              <Icon name="add" />
            </Button>
          </KeyboardAvoidingView>
        </Container>
      </>

    );
  }
  addNote = () => {
    if (this.state.noteText) {
      var d = new Date();
      this.state.noteArrray.push({
        'note': this.state.noteText
      })
      this.setState({ noteText: '' });
      this.setState({ noteArrray: this.state.noteArrray });
      console.log(this.props.screenProps.color);
    }
  }


  deleteNode = (key) => {
    this.state.noteArrray.splice(key, 1);
    this.setState({ noteArrray: this.state.noteArrray });
  }
  NoteDetail(key) {
    this.props.navigation.navigate("NoteDetail", {
      headName: `${this.state.noteArrray[key].note}`,
      deletenode: this.deleteNode.bind(key),
      key: key,
      storeNote: this.storeNote.bind(this)
    });
  }
}

const styles = StyleSheet.create({

  input: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: 0,
  },

  textinput: {
    width: WIDTH - 65,
    height: 55,
    borderRadius: 25,
    fontSize: 16,
    marginLeft: 10,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255,255,255,0.7)',
  },
  addbutton: {

  },
  addbuttonText: {
    alignItems: "center",
    alignContent: 'center',
  }
});



