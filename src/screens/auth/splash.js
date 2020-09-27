import React, { Component } from "react";
import { ImageBackground, View, StatusBar,Alert} from "react-native";
import { Container} from 'native-base';
import { ActivityIndicator, Colors } from 'react-native-paper';

import styles from "./styles";
import Functions from "./../../Functions.js";

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logo-kitchen-sink.png");

class Splash extends Component {
  render() {
    return (
      <Container>
        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
        	<View style={styles.logoContainer}>
              <ImageBackground source={launchscreenLogo} style={styles.logo} />
              <ActivityIndicator size={'large'} animating={true} color={Colors.blue800} />
            </View>
        </ImageBackground>
      </Container>
      );
  }
}

export default Splash;
