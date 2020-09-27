import React, { Component,useCallback,useState,useContext} from "react";
import {ImageBackground, View, StatusBar,Alert,KeyboardAvoidingView,ToastAndroid,SafeAreaView} from "react-native";
import {Container, H3, Content,Form, Item,Label,Button,Text} from 'native-base';
import {TextInput,Checkbox,Snackbar,ActivityIndicator,Colors} from 'react-native-paper';
// import vision, { VisionFaceContourType } from '@react-native-firebase/ml-vision';

import styles from "./styles";
import Functions from "./../../Functions.js";
import {AppContext} from './../../../AppContext';
import Splash from "../auth/splash";

import messaging from '@react-native-firebase/messaging';

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logo-kitchen-sink.png");
var AppDesc =require("../../../app.json");

var Login=(props) => {

  var userdata=useContext(AppContext).userdata;
  var setUserdata=useContext(AppContext).setUserdata;

  var [checked, setChecked] = useState(false);
  var [username, setUsername] = useState();
  var [password, setPassword] = useState();
  var [loadIndicator, setLoadIndicator] = useState(false);


  if(userdata!=null){props.navigation.navigate('AppNavigator');}

  var signingIn=useCallback(()=>{
    setLoadIndicator(true);
    if(username==''||password==''||username==undefined||password==undefined)
    {
      setLoadIndicator(false);
      ToastAndroid.show("Please insert your username and password", ToastAndroid.SHORT);
    }
    else
    {
      try 
      {
        var data ={username:username,password:password};      
        new Functions().getJSONFromURL(AppDesc.ipServer+'/api/getuserdetail/',data,(err,res)=>{
          if(err)
          {ToastAndroid.show("An error occurred!", ToastAndroid.SHORT);}
          else
          {
            if(res.length==0){ToastAndroid.show("Username or password is wrong.", ToastAndroid.SHORT);}
            else
            {    
              new Functions().setDataToStorage('userData',res);
              setUserdata(res);
              // props.navigation.navigate('AppNavigator');
            }
          }
          setLoadIndicator(false);
        });
      } 
      catch ({ error }) {
        ToastAndroid.show("An error occurred..",ToastAndroid.SHORT);
        setLoadIndicator(false);
      }
    }
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <Container >
        {
          (<ImageBackground source={launchscreenBg} style={styles.imageContainer} >
            <View style={{}}>
              <ImageBackground source={launchscreenLogo} style={styles.logo} />
              <ActivityIndicator size={'large'} animating={loadIndicator} color={Colors.blue800} />
            </View>
            <KeyboardAvoidingView behavior="padding" enabled>
            <View style={styles.form}>
              <Form >
                <TextInput style={{borderColor:"#ccff00"}} mode='outlined' label="Username" value={username} onChangeText={(u) => {setUsername(u);}}/>

                <TextInput style={{borderColor:"#ccff00"}} secureTextEntry={!checked} value={password} mode='outlined' label="Password" style={{marginTop:10}} onChangeText={(p) => {setPassword(p)}} />
              </Form>
              <View style={{ flexDirection: 'row'}}>
                <View style={{}}>
                </View>
                <View style={{flex:1, flexDirection: 'row',marginTop:5}}>
                  <Checkbox color={"#ccff00"} status={checked? 'checked' : 'unchecked'} onPress={()=>{setChecked(!checked)}}/>
                  <Text style={{marginTop:5}}> Show password</Text>
                </View>
              </View>
              <Form>
                <Button rounded block style={{ margin: 15, marginTop: 10 }} onPress={() => {signingIn();}}>
                  <Text>Sign In</Text>
                </Button>
              </Form>
            </View>
            </KeyboardAvoidingView>
          </ImageBackground>
          )
        }
      </Container>
    </SafeAreaView>
  );
}
export default Login;
