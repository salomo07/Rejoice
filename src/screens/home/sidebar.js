import React, { Component } from "react";
import { Image, FlatList, View } from "react-native";
import Functions from "./../../Functions.js";
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Content,Text,Container,Left,Right, Badge, ListItem} from "native-base";
import {TouchableOpacity} from "react-native";
import {List,Divider} from 'react-native-paper';
import styles from "./style";

const drawerCover = require("../../../assets/drawer-cover.png");
const drawerImage = require("../../../assets/logo-kitchen-sink.png");


class SideBar extends Component {
  constructor(props) {
    super(props);
    // delete this.props.userdata;
  }
  state = {expanded: true}

  menu1Press(url){
    this.setState({expanded: !this.state.expanded});
  }
  getMenu(userdata){
    return userdata.menu1.map((menu1)=>{
      return(
        <List.Accordion key={menu1._id} title={menu1.label} style={{marginLeft:5,marginRight:5,borderBottomWidth:0.2}} left={props => <Icon style={menu1.iconstyle} name={menu1.iconname}/>} onPress={()=>{this.menu1Press(menu1.url)}} >
          {
            userdata.menu2.map((menu2)=>{
              if(menu2.idmenu1==menu1._id)
              {  
                return (
                  <List.Item onPress={()=>{this.props.navigation.navigate(menu2.url)}} key={menu2._id} title={menu2.label}  left={props =>{return (<View style={{justifyContent:'center',alignItems: 'center', marginLeft:8}}><Icon style={menu2.iconstyle} name={menu2.iconname}/></View> ) } } />)
              }
            })
          }
        </List.Accordion>
      )      
    })
  }
  render() {
    if(this.props.userdata!==undefined)
    return (
      <Container>
        <Content bounces={false} style={{backgroundColor: "#fff", top: -1 }}>
          <Image source={drawerCover} style={styles.drawerCover} />
          <Image square style={styles.drawerImage} source={drawerImage} />

          <List.Section style={{backgroundColor: "#fefefe"}}>
            {this.getMenu(this.props.userdata)}
          </List.Section>
        </Content>
      </Container>
    );
  }
}

export default SideBar;
