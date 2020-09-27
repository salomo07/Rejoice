const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  imageContainer: {
    height:deviceHeight,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    position: "relative",
    width: 280,
    height: 100,
  },
  form: {
  marginTop: 12,
  width:deviceWidth-(deviceWidth/10)
  }
};
