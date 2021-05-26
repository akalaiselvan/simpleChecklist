import React from 'react';
import {TouchableOpacity,Text,StyleSheet,View} from 'react-native';

const doFunc=(fun1,fun2)=>{
    fun1();
    fun2();
}

const Option=({cont,onPress,hide})=>{
    return(
        <TouchableOpacity onPress={()=>doFunc(hide,onPress)}>
            <View style={styles.view}>
                <Text style={{alignSelf:'center',marginTop:12}}>{cont}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    view:{
        height:50,
        width:200,
        borderColor:'black',
        borderWidth:1,
        margin:5

    }
});

export default Option;