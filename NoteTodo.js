import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions
} from 'react-native';
import { Container, ListItem, Icon, Left, Body, Right, Button, List, Card,CheckBox } from 'native-base';


const {WIDTH} = Dimensions.get('window');
class NoteTodo extends Component {
  state = {
    isActive: false,
  }

  completeAction = () =>{
    this.setState(prevState => ({ isActive: !prevState.isActive }))
  }

  render() {
    return (
       <View style = {styles.note} key= {this.props.keyval}>
        <CheckBox onPress = {this.completeAction} 
          checked = {this.state.isActive} 
          style={styles.checkButton} 
          color ={'#06293D'}
          />
        <Body>
          <Button onPress = {this.props.onSelectNote} transparent>
            <Text style={styles.noteText}>{this.props.val.note}</Text>
          </Button>
          
          </Body>
        <TouchableOpacity onPress = {this.props.deleteMethod} style={styles.noteDelete} >
          <Icon name = 'close'/>
        </TouchableOpacity>
      </View> 

    );
  }
}

const styles = StyleSheet.create({
  note: {
    flexDirection: 'row',
    backgroundColor: '#E2EAE6',
    borderRadius: 15,
    alignContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop: 5,
    marginHorizontal:5,
  }, 
  noteText: {
   flex: 0.8,
   fontSize: 15,
   fontWeight: 'bold',
  },
  noteDelete:{
  
  },
  checkButton:{
    borderRadius: 0,
    fontWeight: 'bold',
    fontSize: 30,
    
  }
})
export default NoteTodo;


