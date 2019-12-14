import React, { Component } from 'react'
import {StyleSheet,Dimensions} from 'react-native'
import {Container, Content,Text,Button,ActionSheet,Root} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import {observer} from 'mobx-react';
import InformationStore from '../../store/informationStore';
import WaterStore from '../../store/waterStore';
import NavigationService from '../../NavigationService';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import waterStore from '../../store/waterStore';

const {width} = Dimensions.get("window");
const windowSize = width - 64;
const ActionButtons = ["50" , "100" , "200" , "300" , "400" , "500" , "600" , "700" , "800" , "900" , "1000" , "1100" , "1200" , "1300" , "1400" , "1500", "Cancel"];
const cancelButtonIndex = ActionButtons.length - 1;

@observer
export default class Home extends Component {
  constructor(props){
    super(props);
     WaterStore._waterAmount(InformationStore.weight);
     WaterStore._percentage();
  }
  
  static navigationOptions= {
      headerRight: (
        <Button 
        transparent light
        onPress={()=>NavigationService.navigate('Settings')}>
        <Icon style={{fontSize:30, color:'white',paddingRight: 10}} name="person"/>
      </Button>
      )
  };
  
    render() {
      return (
        <Root>
          <Container style={styles.container}>
          <Content contentContainerStyle={{flex: 1}}>

          <Grid>
            <Row size={70} style={styles.rowStyle}>
            <AnimatedCircularProgress
            style={styles.circleProgress}
            size={windowSize}
            width={7}
            fill={WaterStore.percente}
            tintColor="#00e0ff"
            backgroundColor="#3d5875">
            {
              (fill) => (
                <Text style={{color:'white',fontSize: 60}}>
                   %{WaterStore.percente}
                </Text>
              )
            }
          </AnimatedCircularProgress>
          </Row>
            
           <Row size={10} style={styles.rowStyle}>
            <Text style={{fontSize:40,color:'white'}}> {WaterStore.water} / {WaterStore.goalWater}  mL</Text>

           </Row>
            <Row size={20} style={styles.rowStyle}>
            <Button
            style={styles.button}
            onPress={() =>
            ActionSheet.show(
              {
                options: ActionButtons,
                cancelButtonIndex: {cancelButtonIndex},
                destructiveButtonIndex: cancelButtonIndex,
                title: "Select Water Amount"
              },
              buttonIndex => {
                if(ActionButtons[buttonIndex] > 49){
                WaterStore._addWater(parseInt(ActionButtons[buttonIndex]));
                console.log(WaterStore.water);
                }
                }
              )
              }
            >
                <Icon style={{color:'#1A237E',fontSize: 30}} name="local-drink" />
                </Button>
              </Row>
              </Grid>
            </Content>
          </Container>
        </Root>
        
      )
    }
}

const styles=StyleSheet.create({
  container:{
    backgroundColor: '#1976D2'
  },
  button:{
    justifyContent:'center',
    alignItems: 'center',
    height:60,
    width:60,
    borderRadius:100,
    backgroundColor:'white'
  },
  circleProgress:{
    alignItems: 'center'
  },
  rowStyle:{
    justifyContent: 'center',
    alignItems: 'center'
  }
});