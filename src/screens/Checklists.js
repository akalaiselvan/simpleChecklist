import React, { useContext, useEffect, useState } from 'react';
import { View,Text } from 'react-native';
import {StyleSheet,Share,ToastAndroid} from 'react-native';
import {Context as CheckListContext} from '../context/CheckListContext';
import ListItem from '../components/ListItem';
import Iconf from 'react-native-vector-icons/Feather';
import { TouchableHighlight } from 'react-native';
import { TouchableOpacity ,FlatList} from 'react-native';
import Search from '../components/SearchBar';
import Modal from '../UI/Modal';
import Option from '../components/Option';
import {NavigationEvents} from 'react-navigation';

const Checklists=({navigation})=>{
    const showToast=(content)=>{
        ToastAndroid.showWithGravity(content,ToastAndroid.SHORT,ToastAndroid.CENTER);
    }

    const {state,deleteSelected,hdr,list,misc,
        setStates,isLoaded,setReqLoad,setMisc}=useContext(CheckListContext);
    const [keyPress,setKeyPress]=useState(false);
    const [modalVisible,setModalVisible]=useState(false);
    const [selected,setSelected]=useState('');
    const [cont,setCont]=useState('');
    const [results,setResults]=useState(state.list);

      const loadData=()=>{
	console.log('Hdr '+hdr.length)
	console.log('List '+list.length)
	console.log('Misc'+misc.length)
          if(isLoaded&&state.reqLoad){  
                if(hdr.length > 0 && list.length > 0 && misc.length>0){
	        	        console.log('Setting state')
                        setReqLoad();
                        setStates(hdr,list,misc);
                }else{
                    console.log('No hdr and dtl found so setting misc');
                    if(misc.length>0){
                    console.log('Setting misc');
                        setMisc(misc)
                    }
                }
            }
        };

        useEffect(()=>{
		console.log('IN USE EFFECT')
            loadData();
        },[hdr,list,misc]);

    
        const showModal=(id)=>{
            setSelected(id)
            setModalVisible(!modalVisible)
        }

        const onShare=(id)=>{
            const item=state.list.find(t=>t.id===id);
            const title= item.title;
            const cont=[];
            item.lists.forEach(element => {
                cont.push(element.value);
            });
            const res=cont.map(e=>{
                return "  * "+e+"\n"
        })
            try{
                const result=Share.share({
                    message:`Checklist Title : ${title} \n\n List Items : \n\n${res.join('')}`
                    
                });
            }catch(error){
                alert(error.message);
            }
        }

        const SearchResults=()=>{
            if(cont==''){
                showToast('Give some text to search');
                return;
            }
            setCont('');
            const lists=results;
            let searchResults=lists.filter(item=>{
                return item.title.toLowerCase().includes(cont.toLocaleLowerCase())
            });
            if(searchResults.length===0){
                showToast('No results found');
                return;
            }
            setResults(searchResults);
        }

        const clearErr=()=>{
            setResults(state.list)
        }



    return <View style={[styles.view,{backgroundColor:state.bgColor}]}>
        <NavigationEvents onWillFocus={clearErr}/>
        <Search context={cont} setCon={setCont} doSearch={SearchResults} style={{marginTop:200}}/>
        <View style={styles.cont}>
            <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} >
                <Option cont='Edit' id={selected} 
                        onPress={()=>navigation.navigate('EditList',
                        {id:selected})}
                        hide={()=>setModalVisible(!modalVisible)}/>
                <Option cont='Delete' id={selected} 
                        onPress={()=>{deleteSelected(selected)
                                      setResults(state.list)}}
                        hide={()=>setModalVisible(!modalVisible)}/>
                <Option cont='Share' id={selected} 
                        onPress={()=>onShare(selected)}
                        hide={()=>setModalVisible(!modalVisible)}/>
            </Modal>
            
            <FlatList
                data={results}
                keyExtractor={i=>i.id.toString()}
                renderItem={({item})=>{
                    return <TouchableOpacity
                                activeOpacity={0.5}
                                onLongPress={()=>showModal(item.id)}
                                onPress={()=>navigation.navigate('ListView',{id:item.id})}>
                            <ListItem item={item} func={()=>showModal(item.id)} font={state.font} bgColor={state.bgColor}/>
                            </TouchableOpacity> 
                }}
            />
        </View>
        <View style={styles.addbutt}>
        <TouchableHighlight style={keyPress? styles.plusPressed:styles.plus}
                          onHideUnderlay={()=>setKeyPress(false)} 
                          onShowUnderlay={()=>setKeyPress(true)}
                          onPress={()=>navigation.navigate('AddList')}>
            <Iconf name='plus' size={40} color='white' />
        </TouchableHighlight>
        </View>        
    </View>
}

const styles=StyleSheet.create({
    view:{
        flex:1,
        justifyContent:'flex-start',
        
    },
    cont:{
        marginTop:10,
        flex:1
    },
    addbutt:{
        position:'absolute',
        bottom:0,
        right:0,
        marginBottom:40,
        marginRight:40
    },
    delButt:{
        position:'absolute',
        width:100,
        left:35,
        top:-12
    },
    plus:{
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor:'#17184B',
        borderRadius:50,
    },
    plusPressed:{
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor:'#31A2F2',
        borderRadius:50,
        marginLeft:4,
        marginTop:3
    }
});


Checklists.defaultNavigationOptions=()=>{
    return{
        title:"Checklists",
    headerTitleStyle:{
        alignSelf:'center'
    },
    }
    
}

export default Checklists;
