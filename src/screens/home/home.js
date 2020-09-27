import React, {Component,useState,useCallback,useEffect,useContext} from "react";
import { StatusBar,ScrollView,Image,Dimensions,TouchableOpacity,AsyncStorage} from "react-native";
import { Card, CardItem, Left, Right, Body, Thumbnail, Container, Button, Text, Header, Icon, Title, Tabs, Tab, ScrollableTab, TabHeading, View, Item, Input } from "native-base";
import { DataTable } from 'react-native-paper';

import Functions from "./../../Functions.js";
import {AppContext} from './../../../AppContext';

import firebase,{ utils } from '@react-native-firebase/app';
import vision, { VisionFaceContourType } from '@react-native-firebase/ml-vision';

// var DomParser = require('react-native-html-parser').DOMParser;
const deviceWidth = Dimensions.get("window").width;
const cardImage = require("../../../assets/drawer-cover.png");
const logo = require("../../../assets/logo.png");
const pathImages="../../../assets/faceRecog";

var Home=(props) => {
    var userdata=useContext(AppContext).userdata;
    var setUserdata=useContext(AppContext).setUserdata;
    var clearUserData=useCallback(()=>{
      new Functions().localStorage.removeItem('userData');
      setUserdata(null);
      props.navigation.navigate('AuthNavigator');
    })
    console.log(firebase,'facessssssssssssssssssssssssssss')
    var processFaces = useCallback(()=>{
        
    }) 
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon active name="search" />
            <Input placeholder="Search" />
            <Icon active name="people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>

        <Tabs>
          <Tab heading="Users List">
           
          </Tab>
          <Tab heading="Settings">
            <Button block style={{ margin: 15, marginTop: 10 }} onPress={() => clearUserData()}>
              <Text>Sign Out</Text>
            </Button>
            <Button block style={{ margin: 15, marginTop: 10 }} onPress={() => props.navigation.openDrawer()}>
              <Text>Menu</Text>
            </Button>
          </Tab>
        </Tabs>
      </Container>
    );
}


export default Home;
