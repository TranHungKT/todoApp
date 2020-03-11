import React, { Component } from 'react';
import { View, Text, Alert, ImageBackground, Image, StyleSheet,TouchableOpacity} from 'react-native';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { ListItem, Body, Left,Icon, Right } from 'native-base';


export default SideBar = props => (
    <View style={{ flex: 1, flexDirection: 'column' }}>
        <ImageBackground
            source={require("../assets/background.jpg")}
            style={{ width: undefined, padding: 16, paddingTop: 48, flex: 0.1 }}
        >
            <Image source={require("../assets/lanvy.jpg")}
                style={styles.profile} />
        </ImageBackground>
        <View style={{ flex: 0.85 }}>
            <DrawerNavigatorItems {...props} />
        </View>
        <View style={{flex: 0.05}}>
            <View style={{flexDirection: 'row'}}>
                <Left style={{flex: 0.2, alignSelf: 'center',alignItems: 'center'}}>
                    <Icon name = 'md-information-circle' 
                    onPress = {()=> Alert.alert('This is an app I make for my girl friend',
                        'Hope you enjoy it'
                    )}/>
                </Left>
                <Body style = {styles.author}>
                   <TouchableOpacity onPress = {()=> Alert.alert('This is an app I make for my girl friend',
                        'Hope you enjoy it'
                    )}>
                       <Text> Author</Text>
                   </TouchableOpacity>
                </Body>
            </View>
            

        </View>
    </View>
);

const styles = StyleSheet.create({
    profile: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#FFF",
    },
    author: {
       position: 'absolute',
       left: 45
    }
})