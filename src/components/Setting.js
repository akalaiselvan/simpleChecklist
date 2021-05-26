import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Colors from '../UI/Color'

const Setting =({content,Icon,font,bgColor})=>{
  //const boxColor=bgColor==='#121212'?'#263238':'#f0ffff';
  const boxColor=bgColor==='#121212'?Colors.darkboxColor:Colors.lightboxColor;
  return (
    <View style={styles.container}>
      <View
        style={[styles.button,{backgroundColor:boxColor}]}>
        <View style={styles.iconRow}>
          {Icon}
        </View>
        <Text style={[styles.setting,{fontFamily:font}]}>{content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
        alignSelf:'center',
  },
  button: {
    borderRadius:30,
    width: 350,
    height: 65,
    //backgroundColor: "rgba(212,244,252,1)",
    flexDirection: "row",
    marginTop: 5,
    marginBottom:10
  },
  iconRow: {
    height: 27,
    flexDirection: "row",
    marginRight: 15,
    marginLeft: 85,
    marginTop: 20,
  },
  setting: {
    color: "#121212",
    fontSize: 19,
    marginTop: 20,
  },
});

export default Setting;
