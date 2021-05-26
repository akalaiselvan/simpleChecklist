import React, { useContext, useState } from 'react';
import {View,StyleSheet,Alert} from 'react-native'
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import  Setting from '../components/Setting';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome';
import  Entypo  from 'react-native-vector-icons/Entypo';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import {Context as CheckListContext} from '../context/CheckListContext';
import SelectFont from '../components/SelectFont';


const Settings=({navigation})=>{


    const {switchTheme,removeAll,switchFonts,state:{bgColor,font},state} = useContext(CheckListContext);
    const iconStyle=styles.icon;
    const Font=<FontAwesome name="font" color="black" style={iconStyle}/>
    const theme=<Entypo name="feather" color="black" style={iconStyle}/>
    const backup=<MaterialIcons name="backup" color="black" style={iconStyle}/>
    const remove=<MaterialCommunityIcons name="delete-variant" color="black" style={iconStyle}/>
    const switchFont=(value)=>{
        setModalVisible(!modalVisible)
    }


    const showAlert=(text,func)=>
        Alert.alert('Confirmation',text,
                [{
                    text : 'ok',
                    onPress:()=>func(),
                    style:'cancel',
                },{
                    text: 'Cancel',
                    style:'cancel'
                },
                ],
                {
                    cancelable:true,
                });
                
        const [modalVisible,setModalVisible]=useState(false);

    return <View style={[styles.cont,{backgroundColor:bgColor}]}>
        {<SelectFont switchFonts={switchFonts} modalVisible={modalVisible} setModalVisible={setModalVisible}/>}
        <TouchableOpacity onPress={()=>switchFont()}>
            <Setting content='Font' Icon={Font} font={font} bgColor={bgColor}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={switchTheme}>
            <Setting content='Theme' Icon={theme} font={font} bgColor={bgColor}/>
        </TouchableOpacity>
        {/* <TouchableOpacity >
            <Setting content='Backup/Restore' Icon={backup} font={font} bgColor={bgColor}/>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={()=>showAlert('Wish to delete all Lists',removeAll)}>
            <Setting content='Remove All' Icon={remove} font={font} bgColor={bgColor}/>
        </TouchableOpacity>
    </View>
}

const styles=StyleSheet.create({
    cont:{
        flex:1,
        paddingTop:50,
    },
    fontSelectorView:{
        position:'absolute',
        flex:1,
        backgroundColor:'black',
        height:500,
        width:500
    },
    icon: {
        color: "rgba(30,32,34,1)",
        fontSize: 25,
        height: 25,
        width: 25
      },
});  

Settings.navigationOptions={
    tabBarIcon:()=>(<Ionicons name="settings-outline" size={24} color="black" />)
}

export default Settings;
