import React,{Component,useState,useCallback,useContext,useEffect} from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ToastAndroid,AppState} from "react-native";
import {Container} from 'native-base';

import Login from "./screens/auth/login";
import Splash from "./screens/auth/splash";
import Home from "./screens/home/home";
import SideBar from "./screens/home/sidebar";
import {AppContext} from './../AppContext';
import messaging,{firebase} from '@react-native-firebase/messaging';
import Functions from "./Functions.js";

var AppDesc =require("../app.json");
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
var platformOS=Platform.OS;
var screenList={"Transaction":Home,"Report":Home,"Detail":Home,"Master":Home,"Setting":Home,"HomeOut":Home,"ReportMonthly":Home,"ReportDaily":Home,"SettingMenu":Home,"TransactionIn":Home,"TransactionOut":Home,"MasterUser":Home,"MasterProduct":Home,"MasterWarehouse":Home,"DetailUser":Home};


var Navigation=() => {
    var [userdata, setUserdata] = useState();
    var initNavigator="AuthNavigator";
    var refreshUserData=useCallback((data)=>{
        setUserdata(data)
    })
    useEffect(()=>{
      if(userdata==undefined)
      {        
        new Functions().getDataFromStorage('userData',(err,res)=>{
            initNavigator= userdata==null? "AuthNavigator" : "AppNavigator";
            setUserdata(res);
        });
      }
    },[userdata])
    // if(userdata==undefined){return (<Splash/>)}
    return (
        userdata === undefined ? <Splash/>:
        <AppContext.Provider value={{userdata:userdata,setUserdata:refreshUserData}}>         
            <NavigationContainer>
                <Stack.Navigator initialRouteName={initNavigator} headerMode="none">
                    <Stack.Screen name="AuthNavigator" component={props=>{return <Login {...props}/>}}/>
                    <Stack.Screen name="AppNavigator" component={()=>{
                        return(
                        <Drawer.Navigator drawerPosition="right" drawerContent={props => { return <SideBar {...props} userdata={userdata} /> }}>
                            <Drawer.Screen name="Home" component={Home}/>
                            {userdata.menu1.map((val,i)=>{
                                return <Stack.Screen key={val._id} name={val.url}  component={screenList[val.url]} />
                            })}
                            {userdata.menu2.map((val,i)=>{
                                return <Stack.Screen key={val._id} name={val.url} component={screenList[val.url]} />
                            })}
                        </Drawer.Navigator>)
                    }}/>           
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    )
}

export default Navigation;
