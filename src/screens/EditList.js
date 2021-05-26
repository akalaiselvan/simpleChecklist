import React,{useContext, useRef,useState} from 'react';
import { Button } from 'react-native';
import { TextInput } from 'react-native';
import {View,StyleSheet,FlatList} from 'react-native';
import {Context as CheckListContext} from '../context/CheckListContext';
import Spacer from '../components/Spacer';
import Colors from '../UI/Color'

const EditList=({navigation})=>{
    const id = navigation.getParam('id');
    const {state,updateList}=useContext(CheckListContext);
    const item=state.list.find(t=>t.id===id);
    const [clist,setclist]=useState(item.lists);
    const [title,setTitle]=useState(item.title);
    const [val,setval]=useState('');

    const addClist=()=>{
        setclist((prev)=>{
            const lastState=[...prev];
            return [...lastState,{value:val,
                    id:Math.round(Date.now())+Math.floor(Math.random()*1001)}];
        })
        setval('');
    }

    const update=(id,val)=>{
        const list =[...clist]
        const child=list.find(f=>f.id===id)
        const ind=list.findIndex(f=>f.id===id)
        child.value=val;
        list[ind]=child;
        setclist(list);
    }

    const save=(id,clist)=>{
        updateList(id,clist,title)
        navigation.navigate('ListView',{id:item.id})
    }

    const listRef=useRef(null);
    const titRef=useRef(null);

    const boxColor=state.bgColor==='#121212'?Colors.darkboxColor:Colors.lightboxColor;

    return<View style={[styles.content,{backgroundColor:state.bgColor}]}>
            <View style={styles.head}>
                        <TextInput autoFocus placeholder='Give some title'
                                ref={titRef}
                                style={[styles.right,
                                    {fontFamily:state.font,backgroundColor:boxColor}]}
                                value={title}
                                onChangeText={(v)=>setTitle(v)}
                                onSubmitEditing={()=>listRef.current.focus()}
                                blurOnSubmit={false}
                                />
                        <Spacer/>
                        <TextInput placeholder='Add checklist' 
                            ref={listRef}
                            style={[styles.inputs,
                                {fontFamily:state.font,backgroundColor:boxColor}]} 
                            value={val} 
                            onChangeText={(v)=>setval(v)}
                            onSubmitEditing={addClist}
                            blurOnSubmit={false}
                            />
                        <Spacer/>
            </View>
        <FlatList
            data={clist}
            keyExtractor={k=>k.id.toString()}
            renderItem={({item})=>{
                return <View>
                        <View style={[styles.Item,{backgroundColor:boxColor}]}>
                            <TextInput value={item.value}
                                        textAlignVertical='center'
                                        marginLeft={15}
                                        onChangeText={(val)=>update(item.id,val)}
                                        style={[styles.input,{fontFamily:state.font}]}
                                        />

                       </View>
                       </View>
            }}
            />
        <View style={styles.bottom}>
                <Button title='save' onPress={()=>save(id,clist)}/>    
        </View>            
    </View>
}

const styles=StyleSheet.create({
    content:{
        flex:1,
    },
    bottom:{
        //backgroundColor:'red',
        position:'absolute',
        height:50,
        bottom:0,
        right:0,
        width:100,
        marginRight:10
    },
    Item:{
        marginTop:5,
        marginBottom:5,
        //backgroundColor:'#f0ffff',
        flexDirection:'row',
        paddingTop:5,
        paddingBottom:5,
        marginLeft:10,
        marginRight:10,
        borderRadius:10

    },
    input:{
        width:'100%'
    },
    head:{
        //backgroundColor:'blue',
        height:20,
        top:0,
        height:100,
        marginBottom:60
    },
    inputs:{
        //backgroundColor:'blue',
        borderColor:'transparent',
        marginLeft:40,
        marginRight:20,
        borderRadius:10,
        padding:10
    },
    right:{
        marginLeft:40,
        marginRight:20,
        marginTop:20,
        borderRadius:10,
        padding:10    
    },
});


EditList.navigationOptions=()=>{
    return {
        title:"Edit mode",
        headerTitleStyle:{
            alignSelf:'center',
            marginRight:60
        },
    }
}

export default EditList;
