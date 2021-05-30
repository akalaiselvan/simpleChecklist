import React,{useState,useContext, useRef,useEffect} from 'react';
import {Button,ToastAndroid, TouchableOpacity} from 'react-native';
import Spacer from '../components/Spacer';
import ListForm from '../components/ListForm';
import {View,StyleSheet,TextInput } from 'react-native';
import {Context as checklistContext} from '../context/CheckListContext';
import Colors from '../UI/Color'
import Plus from 'react-native-vector-icons/Feather';

const AddList=({navigation})=>{


    const showToast=(content)=>{
        ToastAndroid.showWithGravity(content,ToastAndroid.SHORT,ToastAndroid.CENTER);
    }

    const {addChecklist,state}=useContext(checklistContext);
    const [title,setTitle]=useState('');
    const [value,setValue]=useState('');
    const [clist,setclist]=useState([]);

    useEffect(()=>{
        const id=navigation.getParam('id');
        if(id){
            const item=state.list.find(t=>t.id===id);
            setTitle(item.title);
            setclist(item.lists);
        }
    },[]
    );

    const addClist=()=>{
        if(value==''){
            showToast("List value can't be empty");
            return;
        }
        setclist((prev)=>{
            const lastState=[...prev];
            return [...lastState,{value:value,
                    id:Math.round(Date.now())+Math.floor(Math.random()*1001)}];
        })
        setValue('');
    }

    const saveChecklist=()=>{
	if(clist.length<1){
            showToast("Add some task to your list");
            return;
        }
        if(title===''){
            showToast("Give some title to your list");
            titRef.current.focus();
            return;
        }else{
            addChecklist({title,clist});
        }
        setTitle('');
        setclist([]);
        navigation.navigate('Checklists');
    }

    const listRef=useRef(null);
    const titRef=useRef(null);

    const boxColor=state.bgColor==='#121212'?Colors.darkboxColor:Colors.lightboxColor;
    return <View style={[styles.view,{backgroundColor:state.bgColor}]}>   
        <View>
            <View style={styles.head}>
                <TextInput autoFocus placeholder='Give some title'
                        placeholderTextColor={'#666'}
                        maxLength={50}
                        ref={titRef}
                        style={[styles.right,
                            {fontFamily:state.font,backgroundColor:boxColor}]}
                        value={title}
                        onChangeText={(v)=>setTitle(v)}
                        onSubmitEditing={()=>listRef.current.focus()}
                        blurOnSubmit={false}/>
                <Spacer/>
                    <TextInput placeholder='Add checklist' 
                        placeholderTextColor={'#666'}
                        maxLength={75}
                        ref={listRef}
                        style={[styles.input,{fontFamily:state.font,backgroundColor:boxColor}]} 
                        value={value} 
                        onChangeText={(v)=>setValue(v)}
                        onSubmitEditing={addClist}
                        blurOnSubmit={false}
                        />
                        <TouchableOpacity style={styles.plus} onPress={addClist}>
                            <Plus name='plus' size={40} color={boxColor} style={{}}/>    
                        </TouchableOpacity>
                <Spacer/>
            </View>
            <View style={styles.content}>
                <ListForm list={clist} id={navigation.getParam('id')}/>
            </View>   
            </View> 
            <View style={styles.bottom}>     
            <Spacer/>
                <Button style={styles.button} title='save' onPress={saveChecklist}/>
            </View>
    </View>
}

const styles=StyleSheet.create({
    button:{
        backgroundColor: 'red',
        borderRadius: 10,
    },
    view:{
        // flex:1,
        // justifyContent:'flex-start',
    },
    head:{
        height:20,
        top:0,
        height:100,
        marginBottom:10,
    },
    input:{
        borderColor:'transparent',
        marginLeft:20,
        marginRight:20,
        borderRadius:10,
        padding:10,
        color:'#333',
        width:288
    },
    right:{
        marginLeft:20,
        marginRight:20,
        marginTop:20,
        borderRadius:10,
        padding:10,
        color:'#333',
    },
    content:{
        //backgroundColor:'pink',
        height:'80%',
        marginTop:50
    },
    bottom:{
        //backgroundColor:'red',
        position:'absolute',
        height:100,
        bottom:10,
        left:160,
        width:100
    },
    plus:{
        width:40,
        //backgroundColor:'blue',
        alignSelf:'flex-end',
        position:'absolute',
        top:90,
        right:10
    }
});

AddList.navigationOptions=()=>{
    return{
        title:"Create new list",
    headerTitleStyle:{
        alignSelf:'center',
        marginRight:60
    },
    }
}

export default AddList;
