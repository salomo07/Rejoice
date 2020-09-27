import React from 'react';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar} from 'react-native';
import Navigation from "./src/Navigation";
console.disableYellowBox = true;

const App= () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </>
  );
};

export default App;