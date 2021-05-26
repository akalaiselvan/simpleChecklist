import React, { useContext, useEffect } from 'react';
import {View,TouchableOpacity,StyleSheet} from 'react-native';
import {Context as CheckListContext} from '../context/CheckListContext';
import ListForm from '../components/ListForm';
import EvilIcons from 'react-native-vector-icons/EvilIcons'; 
import { HeaderBackButton } from 'react-navigation-stack';
const ListView=({navigation})=>{

    const {state}=useContext(CheckListContext);
    const id=navigation.getParam('id');
    const item=state.list.find(t=>t.id===id);
    //console.log(JSON.stringify(item.lists))
    return <View style={{backgroundColor:state.bgColor}}>
        <ListForm list={item.lists} id={id}/>
    </View>
}

ListView.navigationOptions=({navigation})=>{
   return {
    title:"View",
    headerTitleStyle:{
        alignSelf:'center'
    },
    headerRight:()=>(<TouchableOpacity style={{marginRight:25}}
                        onPress={()=>navigation.navigate('EditList',
                        {id:navigation.getParam('id')})}>
        <EvilIcons name="pencil" size={35} color="black" />
    </TouchableOpacity>) ,
    headerLeft:()=>(<HeaderBackButton onPress={()=>navigation.navigate('Checklists')}/>),   
    };
}
export default ListView;
