import React from 'react';
import { TouchableOpacity,Modal,Pressable } from 'react-native';
import { FlatList } from 'react-native';
import {View,Text,StyleSheet} from 'react-native';

const font=['normal','notoserif','sans-serif','sans-serif-light','sans-serif-thin',
    'sans-serif-condensed','sans-serif-medium','serif','Roboto','monospace']

const SelectFonts=({switchFonts,setModalVisible,modalVisible})=>{
        return  <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=>{
            setModalVisible(!modalVisible)
        }}
      >
        <Pressable style={styles.modalCenter} onPress={()=>setModalVisible(!modalVisible)}>
            <View style={styles.modalView}>
                <View style={styles.scrollArea}>
                        <FlatList
                            data={font}
                            keyExtractor={k=>k}
                            renderItem={({item})=>{
                                return <TouchableOpacity onPress={()=>{
                                    switchFonts(item)
                                    setModalVisible(!modalVisible)}}>
                                        <View style={styles.fontSelect}>
                                            <Text style={{fontFamily:item}}>{item}</Text>
                                        </View>
                                </TouchableOpacity>
                            }
                            }
                        />
                    </View>
                </View>
        </Pressable>
      </Modal>
}

const styles = StyleSheet.create({
    scrollArea: {
      width: 334,
      height: 525,
      backgroundColor: "rgba(230, 230, 230,1)",
      marginTop: 1,
      marginLeft: 21,
      borderRadius:10
    },
    fontSelect:{
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'black',
        height:40,
        width:'90%',
        marginLeft:18,
        marginTop:10,
        borderRadius:2

    },
    modalCenter:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'rgba(0,0,0,0.5)'
  },
  modalView:{
      borderRadius: 20,
      alignItems: "center",
  }
  });


  export default SelectFonts;