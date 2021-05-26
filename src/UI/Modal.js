import React, { useState } from 'react';
import {View,TouchableOpacity,Pressable,Modal,StyleSheet} from 'react-native';

const ModalView=({children,modalVisible,setModalVisible})=>{

    return <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={()=>{
            setModalVisible(!modalVisible)
    }}
>
    <Pressable style={styles.modalCenter} onPress={()=>setModalVisible(!modalVisible)}>
        <View style={styles.modalView}>
        <Pressable onPress={()=>console.log('Content clicked')}>
            {children}
        </Pressable>    
        </View>
    </Pressable>
</Modal>
}

const styles=StyleSheet.create({
    modalCenter:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        //marginTop:25,
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    modalView:{
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
});

export default ModalView;