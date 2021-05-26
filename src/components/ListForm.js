import React, { useContext } from 'react';
import { StyleSheet,View,TouchableOpacity } from 'react-native';
import {ListBox} from '../components/ListItem';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {Context as CheckListContext} from '../context/CheckListContext';

const ListForm=({list,id})=>{ 
    
    const {contDrag}=useContext(CheckListContext);
    return (<View style={styles.cont}>
             <DraggableFlatList
                data={list}
                keyExtractor={i=>i.id.toString()}
                renderItem={({item,index,drag,isActive})=>{
                    return <TouchableOpacity                             
                                style={{
                                        height: 60,
                                        alignItems: "stretch",
                                        justifyContent: "center",
                                }}
                                onLongPress={drag}>
                          <ListBox pid={id} item={item}/>
                    </TouchableOpacity>
            }}
                onDragEnd={(data)=>contDrag(id,data)}
            /> 
        </View>)   
}

const styles=StyleSheet.create({
    cont:{
        height:'100%'
    }
});

export default ListForm;